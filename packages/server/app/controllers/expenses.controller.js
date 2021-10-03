/* eslint-disable no-console */
const pool = require('../database')
const expenseModel = require('../models/expense.model')
const TABLE = 'Expenses'

const getAllExpenses = async (req, res) => {
  const { limit = 0, offset = 0, category } = req.query
  try {
    const query = await pool.query(
      `SELECT Expenses.id, Expenses.category_id, Expenses.amount, Expenses.description, Expenses.created_at, Expense_categories.category_name, 'gasto' AS 'type' FROM Expenses 
      INNER JOIN Expense_categories ON Expenses.category_id = Expense_categories.id 
      ${category ? `WHERE \`category_id\` = ${category}` : ''}
      ORDER BY \`created_at\` DESC 
      ${limit ? 'LIMIT ' + limit + ' OFFSET ' + offset : ''}`,
    )

    const queryTotal = await pool.query(`SELECT SUM(\`amount\`) AS 'total' FROM \`${TABLE}\``)

    res.status(200).json({
      data: query,
      totalExpenses: queryTotal[0]?.total,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const saveExpense = async ({ body }, res) => {
  try {
    const validBody = await expenseModel.validateAsync(body, { convert: false })
    const { insertId } = await pool.query(`INSERT INTO \`${TABLE}\` set ?`, [validBody])
    res.status(200).json({ ...validBody, id: insertId, type: 'gasto' })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const getExpense = async ({ params }, res) => {
  const { expenseId } = params
  try {
    const query = await pool.query(`SELECT * FROM \`${TABLE}\` WHERE \`id\` = ?`, expenseId)
    if (query.length === 0) res.status(400).send('Not found an expense whith id ' + expenseId)
    res.status(200).json(...query)
  } catch (err) {
    res.status(500).send(err)
  }
}
const deleteExpense = async ({ params }, res) => {
  const { expenseId } = params
  try {
    const { affectedRows } = await pool.query(
      `DELETE FROM \`${TABLE}\` WHERE \`id\` = ?`,
      expenseId,
    )
    if (!affectedRows) {
      res.status(400).send('Not found an expense whith id ' + expenseId)
      return
    }
    res.status(200).send(`Deleted id ${expenseId}`)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
const updateExpense = async ({ body, params }, res) => {
  try {
    const validBody = await expenseModel.validateAsync(body, { convert: false })
    const { amount, description, created_at, category_id } = validBody
    const expenseId = Number(params.expenseId)

    const query = await pool.query(
      `UPDATE \`${TABLE}\` SET amount = ?, description = ?, created_at = ?, category_id = ? WHERE \`id\` = ?`,
      [amount, description, created_at, category_id, expenseId],
    )
    if (!query.affectedRows) {
      res.status(400).send('Not found an expense whith id ' + expenseId)
      return
    }
    res.status(200).json({ ...validBody, id: expenseId, type: 'gasto' })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

module.exports = {
  getAllExpenses,
  saveExpense,
  getExpense,
  deleteExpense,
  updateExpense,
}
