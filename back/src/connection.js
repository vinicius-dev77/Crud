//Conectando o MySQL
// recebendo  os dados do banco 
const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'crud_2024_3',

})

module.exports = connection 