const mysql = require('mysql2/promise')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', //change this field to your password
    database: 'seedData'
})

module.exports = connection
