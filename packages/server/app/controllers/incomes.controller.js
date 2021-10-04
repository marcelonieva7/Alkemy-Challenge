/* eslint-disable no-console */
const pool = require('../database')
const incomeModel = require('../models/income.model')
const TABLE = 'Incomes'

const getAllIncomes = async (req, res) => {
  const { limit = 0, offset = 0, category } = req.query
  try {
    const query = await pool.query(
      `SELECT Incomes.id, Incomes.category_id, Incomes.amount, Incomes.description, Incomes.created_at, Income_categories.category_name, 'ingreso' AS 'type' FROM Incomes 
      INNER JOIN Income_categories ON Incomes.category_id = Income_categories.id 
      ${category ? `WHERE \`category_id\` = ${category}` : ''}
      ORDER BY \`created_at\` DESC 
      ${limit ? 'LIMIT ' + limit + ' OFFSET ' + offset : ''}`,
    )

    const queryTotal = await pool.query(`SELECT SUM(\`amount\`) AS 'total' FROM \`${TABLE}\``)

    res.status(200).json({
      data: query,
      totalIncomes: queryTotal[0]?.total,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const saveIncome = async ({ body }, res) => {
  try {
    const validBody = await incomeModel.validateAsync(body, { convert: false })
    const { insertId } = await pool.query(`INSERT INTO \`${TABLE}\` set ?`, [validBody])
    res.status(200).json({ ...validBody, id: insertId, type: 'ingreso' })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const getIncome = async ({ params }, res) => {
  const { incomeId } = params
  try {
    const query = await pool.query(`SELECT * FROM \`${TABLE}\` WHERE \`id\` = ?`, incomeId)
    if (query.length === 0) res.status(400).send('Not found an income whith id ' + incomeId)
    res.status(200).json(...query)
  } catch (err) {
    res.status(500).send(err)
  }
}
const deleteIncome = async ({ params }, res) => {
  const { incomeId } = params
  try {
    const { affectedRows } = await pool.query(`DELETE FROM \`${TABLE}\` WHERE \`id\` = ?`, incomeId)
    if (!affectedRows) {
      res.status(400).send('Not found an income whith id ' + incomeId)
      return
    }
    res.status(200).send(`Deleted id ${incomeId}`)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const updateIncome = async ({ body, params }, res) => {
  try {
    const validBody = await incomeModel.validateAsync(body, { convert: false })
    const { amount, description, created_at, category_id } = validBody
    const incomeId = Number(params.incomeId)

    const query = await pool.query(
      `UPDATE \`${TABLE}\` SET amount = ?, description = ?, created_at = ?, category_id = ? WHERE \`id\` = ?`,
      [amount, description, created_at, category_id, incomeId],
    )
    if (!query.affectedRows) {
      res.status(400).send('Not found an income whith id ' + incomeId)
      return
    }
    res.status(200).json({ ...validBody, id: incomeId, type: 'ingreso' })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

module.exports = {
  getAllIncomes,
  saveIncome,
  getIncome,
  deleteIncome,
  updateIncome,
}
