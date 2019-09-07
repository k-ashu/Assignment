const express = require('express')
const router = new express.Router()

//Route to list families in a paticular universe
router.get('/universe/:uid',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')

        const families = await connection.query(`SELECT familyId FROM universe_family WHERE universeId = ${req.params.uid}`)
        if(families[0].length)
            res.send(families[0])
        else
            res.status(404).send({Error:"Universe does not exists."})
    }
    catch(e){
        res.send(e)
    }
})

//Route to get a family's data from all universes
router.get('/universe/family/:fid',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')

        const data = await connection.query(`SELECT * FROM universe_family WHERE familyId = ${req.params.fid}`)
        if(data[0].length)
            res.send(data[0])
        else
            res.status(404).send({Error:"Universe does not exists."})
    }
    catch(e){
        res.send(e)
    }
})

//Route to get all universes
router.get('/universes',async function(req,res){
    try{
        const connection = await require('../database/connectionConfig')

        const universes = await connection.query('SELECT DISTINCT( universeID) AS universeIDs FROM universe_family')
        if(universes[0].length)
            res.send(universes[0])
        else
            res.status(404).send({Error:"No universe found."})
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router