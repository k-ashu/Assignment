const express = require('express')
const app = express()

const createDatabase = require('./database/createDatabase')
const input = require('./database/inputData')
const universeRouter = require('./routers/universe')
const familyRouter = require('./routers/family')
const personRouter = require('./routers/person')

app.use(express.json())
app.use(universeRouter)
app.use(personRouter)
app.use(familyRouter)

port = 3000 || process.env.port

//Uncomment the following line to create database in local system.
//NOTE :  Change the connection configuration accordingly in createDatabse.js file inside database folder
//createDatabase(input)

app.listen(port , function(){
    console.log(`Server is running on port : ${port}`)
})