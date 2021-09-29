/* eslint-disable no-console */
const pool = require('../database')

const TABLE = 'operations'

const getAllOperations = async (req, res) => {
  const { limit } = req.query
  try {
    const query = await pool.query(`SELECT * FROM \`${TABLE}\` ORDER BY \`created_at\` DESC`)
    if (limit && limit <= query.length) query.length = limit
    res.status(200).json(query)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const saveOperation = async (req, res) => {
  try {
    const operation = req.body
    const { insertId } = await pool.query(`INSERT INTO \`${TABLE}\` set ?`, [operation])
    res.status(200).json({ ...operation, id: insertId })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const getOperation = async (req, res) => {
  const { operationId } = req.params
  try {
    const query = await pool.query(`SELECT * FROM \`${TABLE}\` WHERE \`id\` = ?`, operationId)
    if (query.length === 0) res.status(400).send('Not found an operation whith id ' + operationId)
    res.status(200).json(...query)
  } catch (err) {
    res.status(500).send(err)
  }
}
const deleteOperation = async (req, res) => {
  const { operationId } = req.params
  try {
    const { affectedRows } = await pool.query(
      `DELETE FROM \`${TABLE}\` WHERE \`id\` = ?`,
      operationId,
    )
    if (!affectedRows) {
      res.status(400).send('Not found an operation whith id ' + operationId)
      return
    }
    res.status(200).send(`Deleted id ${operationId}`)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const updateOperation = async (req, res) => {
  const { amount, description, created_at } = req.body
  const { operationId } = req.params
  try {
    const query = await pool.query(
      `UPDATE \`${TABLE}\` SET amount = ?, description = ?, created_at = ? WHERE \`id\` = ?`,
      [amount, description, created_at, operationId],
    )
    if (!query.affectedRows) {
      res.status(400).send('Not found an operation whith id ' + operationId)
      return
    }
    res.status(200).json({ ...req.body, id: operationId })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

module.exports = {
  getAllOperations,
  saveOperation,
  getOperation,
  deleteOperation,
  updateOperation,
}
