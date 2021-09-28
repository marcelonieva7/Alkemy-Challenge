/* eslint-disable no-console */
const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err.code)
  }
  if (connection) connection.release()
  console.log('DB is Connected')
  return
})

pool.query = promisify(pool.query)

module.exports = pool
