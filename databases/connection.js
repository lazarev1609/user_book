const mysql = require('mysql2');

const connection = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "",
    database: "user_book"
})

module.exports = {
    connection: connection
}