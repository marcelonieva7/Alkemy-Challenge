/* eslint-disable no-console */
const pool = require('../database')
const operationModel = require('../models/operations.model')
const TABLE = 'operations'

const getAllOperations = async (req, res) => {
  const { limit = 0, offset = 0 } = req.query
  try {
    const query = await pool.query(
      `SELECT * FROM \`${TABLE}\` ORDER BY \`created_at\` DESC 
      ${limit ? 'LIMIT ' + limit + ' OFFSET ' + offset : ''}`,
    )
    const queryTotal = await pool.query(
      `SELECT \`typeOf\`, SUM(\`amount\`) AS 'total' FROM \`${TABLE}\` GROUP BY \`typeOf\``,
    )

    res.status(200).json({
      data: query,
      totalByType: {
        income: queryTotal.find(({ typeOf }) => typeOf === 'income')?.total,
        expense: queryTotal.find(({ typeOf }) => typeOf === 'expense')?.total,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const saveOperation = async ({ body }, res) => {
  try {
    const validBody = await operationModel.validateAsync(body, { convert: false })
    const { insertId } = await pool.query(`INSERT INTO \`${TABLE}\` set ?`, [validBody])
    res.status(200).json({ ...validBody, id: insertId })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const getOperation = async ({ params }, res) => {
  const { operationId } = params
  try {
    const query = await pool.query(`SELECT * FROM \`${TABLE}\` WHERE \`id\` = ?`, operationId)
    if (query.length === 0) res.status(400).send('Not found an operation whith id ' + operationId)
    res.status(200).json(...query)
  } catch (err) {
    res.status(500).send(err)
  }
}
const deleteOperation = async ({ params }, res) => {
  const { operationId } = params
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
const updateOperation = async ({ body, params }, res) => {
  try {
    const validBody = await operationModel.validateAsync(body, { convert: false })
    const { amount, description, created_at } = validBody
    const operationId = Number(params.operationId)

    const query = await pool.query(
      `UPDATE \`${TABLE}\` SET amount = ?, description = ?, created_at = ? WHERE \`id\` = ?`,
      [amount, description, created_at, operationId],
    )
    if (!query.affectedRows) {
      res.status(400).send('Not found an operation whith id ' + operationId)
      return
    }
    res.status(200).json({ ...validBody, id: operationId })
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
