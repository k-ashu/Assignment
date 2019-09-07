const mysql = require('mysql2/promise')

async function createDatabase(values){
    try{
        const con = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password'  //change this field to your password
        })
        await con.query('CREATE DATABASE IF NOT EXISTS seedData')
        await con.query('CREATE TABLE IF NOT EXISTS seedData.person (personId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), power INT, familyID INT, universeID INT)')
        await con.query('INSERT INTO seedData.person (name, power, familyId, universeId) VALUES ?',[values])
        await con.query('CREATE TABLE IF NOT EXISTS seedData.universe_family AS(SELECT universeId, familyId, SUM(power) AS total_power FROM seedData.person GROUP BY universeId, familyId)')
        await con.query('CREATE TABLE IF NOT EXISTS seedData.family AS (SELECT familyId, IF(count=1,1,0) AS isBalanced from ( select familyId, count(distinct total_power) as count from seedData.universe_family group by familyId ) as temp)')
    }
    catch(e){
        console.log(e)
    }
}

module.exports = createDatabase 
