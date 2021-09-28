/* eslint-disable no-console */
const getAllOperations = async (req, res) => {
  try {
    res.status(200).json({ message: 'get all' })
  } catch (err) {
    console.log(err)
  }
}
const saveOperation = async (req, res) => {
  try {
    res.status(200).json({ message: 'save' })
  } catch (err) {
    console.log(err)
  }
}
const getOperation = async (req, res) => {
  try {
    res.status(200).json({ message: 'get one' })
  } catch (err) {
    console.log(err)
  }
}
const deleteOperation = async (req, res) => {
  try {
    res.status(200).json({ message: 'delete' })
  } catch (err) {
    console.log(err)
  }
}
const updateOperation = async (req, res) => {
  try {
    res.status(200).json({ message: 'update' })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAllOperations,
  saveOperation,
  getOperation,
  deleteOperation,
  updateOperation,
}
