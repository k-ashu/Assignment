const express = require('express')
const router = new express.Router()

//router to get every person's data from person table 
router.get('/people',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')
        const people = await connection.query('Select * from person')
        if(people[0].length)
            res.send(people[0])
        else
            res.send({Message:"No entry found"})
    }
    catch(e){
        res.send(e)
    }
})

//Router to insert data to table
router.post('/person',async function(req,res){
    const connection = await require('../database/connectionConfig')
    try{
        const {power,familyId,universeId} = req.body
        var data_universe_family = {universeId:universeId, familyId:familyId, total_power:power}
        var data_family = {familyId:familyId,isBalanced:1}
        await connection.query(`INSERT INTO person SET ? `, [req.body])
        universe_exists = await connection.query(`SELECT * FROM universe_family WHERE familyId = ${familyId} AND universeId = ${universeId}`)
        //checking if this universe and family combination already exists if yes then update existing record else create new record
        if(universe_exists[0].length)
            await connection.query(`UPDATE universe_family SET total_power = total_power  + ${power} WHERE familyId = ${familyId} AND universeId = ${universeId}`)
        else
            await connection.query('INSERT INTO universe_family SET ?',[data_universe_family])
        //checking if family already exists if yes then check whether it is still balanced or not else create a new record in family table  
        family_exists = await connection.query(`SELECT * FROM family WHERE familyId = ${familyId}`)
        if(family_exists[0].length){
            const disitnct_power = await connection.query('select count(distinct total_power) as count from universe_family group by familyId')
            const value = disitnct_power[0][0].count==1?1:0
            await connection.query(`UPDATE family SET isBalanced = ${value}`)
        }
        else{
            await connection.query('INSERT INTO family SET ?',[data_family])
        }
        res.send("Data Insertion successful")
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = router