const express = require('express')
const router = new express.Router()

//Route to check if the given family is balanced or not
router.get('/family/isBalanced/:fid',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')
        const isBalanced = await connection.query(`SELECT isBalanced FROM family WHERE familyId = ${req.params.fid} `)
        if(isBalanced[0].length){
            res.send(isBalanced[0])
        }
        else
            res.status(404).send({Error:"Family not found."})
    }
    catch(e){
        res.send(e)
    }
})

//Route to get all unbalanced family
router.get('/family/unbalanced/',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')
        const unbalanced = await connection.query(`SELECT familyId FROM family WHERE isBalanced = 0 `)
        if(unbalanced[0].length){
            res.send(unbalanced[0])
        }
        else
            res.send({Error:"No unbalanced family found"})
    }
    catch(e){
        res.send(e)
    }
})

//Balance a given family
router.get('/family/balance/:fid',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')
        const isBalanced = await connection.query(`SELECT isBalanced FROM family WHERE familyId = ${req.params.fid} `)
        //checking if family exists
        if(!isBalanced[0].length){  
            res.status(404).send({Error:"Family not found."})
        }
        // Checking if already balanced
        else if((isBalanced[0][0]).isBalanced)
            res.send({Message:"Family already balanced"})
        //Balancing family   
        else{
            const result = await connection.query(`SELECT * FROM universe_family WHERE familyId = ${req.params.fid} `)
            const families = result[0]
            const balancingPower = families[0].total_power
            families.forEach(
                (obj)=>{
                    obj.difference=balancingPower-obj.total_power
                }
            )
            families.forEach(
                async(obj)=>{
                    try{
                        await connection.query(`UPDATE person SET power = power + ${obj.difference} WHERE familyId = ${obj.familyId} AND universeId = ${obj.universeId} LIMIT 1`)
                        await connection.query(`UPDATE universe_family SET total_power = ${balancingPower} WHERE familyId = ${obj.familyId} AND universeId = ${obj.universeId}`)
                        await connection.query(`UPDATE family SET isBalanced=1 WHERE familyId = ${obj.familyId}`)
                    }
                    catch(e){
                        console.log(e)
                    }
                }
            )   
            //res.send(families)
            res.send({Message:"Family balancing successful"})
        } 
            
    }
    catch(e){
        res.send(e)
    }
})

//Route to get all family IDs
router.get('/families',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')
        const families = await connection.query('SELECT familyId FROM family')
        if(families[0].length){
            res.send(families[0])
        }
        else
            res.status(404).send({Error:"No family found"})
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router