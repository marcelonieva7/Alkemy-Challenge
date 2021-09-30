/* eslint-disable no-console */
const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err.code)
    return
  }
  if (connection) connection.release()
  console.log('DB is Connected')
})

pool.query = promisify(pool.query)

module.exports = pool
