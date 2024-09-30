
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'new',
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 100,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log('error connectiong database', err)
    } else {
        console.log('connected to the database')
        // pool.releaseConnection()
    }
}
)

module.exports = pool.promise();

