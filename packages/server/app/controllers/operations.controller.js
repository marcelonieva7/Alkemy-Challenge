/* eslint-disable no-console */
const pool = require('../database')

const getAllOperations = async (req, res) => {
  const { limit = 0, offset = 0 } = req.query
  try {
    const query = await pool.query(
      `SELECT \`id\`, \`amount\`, \`description\`, \`created_at\`, 'ingreso' AS 'type' FROM \`Incomes\` 
      UNION ALL
      SELECT \`id\`, \`amount\`, \`description\`, \`created_at\`, 'gasto' AS 'type' FROM \`Expenses\`
      ORDER BY \`created_at\` DESC 
      ${limit ? 'LIMIT ' + limit + ' OFFSET ' + offset : ''}`,
    )
    const totalIncomes = await pool.query(`SELECT SUM(\`amount\`) AS 'total' FROM \`Incomes\``)
    const totalExpenses = await pool.query(`SELECT SUM(\`amount\`) AS 'total' FROM \`Expenses\``)

    res.status(200).json({
      data: query,
      total: {
        incomes: totalIncomes[0].total,
        expenses: totalExpenses[0]?.total,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}
module.exports = { getAllOperations }
