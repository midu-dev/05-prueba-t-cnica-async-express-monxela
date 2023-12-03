import express, { Router } from 'express'

export const app = express()
app.use(express.json())

const items = [{
  id: 1,
  content: 'Item 1'
}]

let currentId = 2

const getAllItems = (req, res) => {
  try {
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getItem = (req, res) => {
  try {
    const { id } = req.params
    const item = items.find(item => item.id.toString() === id)
    if (item === undefined) res.status(404).json({ message: 'Item not found' })
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addItem = (req, res) => {
  try {
    const { content } = req.body
    const newItem = {
      id: currentId,
      content
    }
    items.push(newItem)
    currentId++
    res.json(newItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateItem = (req, res) => {
  try {
    const { id } = req.params
    const item = items.find(item => item.id.toString() === id)
    if (item === undefined) res.status(404).json({ message: 'Item not found' })
    const { content } = req.body
    item.content = content
    items.push(item)
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteItem = (req, res) => {
  try {
    const { id } = req.params
    const itemIndex = items.findIndex(item => item.id.toString() === id)
    if (itemIndex !== -1) items.splice(itemIndex, 1)
    res.json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const itemsRoutes = Router()

itemsRoutes.get('/items', getAllItems)
itemsRoutes.post('/items', addItem)
itemsRoutes.get('/items/:id', getItem)
itemsRoutes.patch('/items/:id', updateItem)
itemsRoutes.delete('/items/:id', deleteItem)

app.use(itemsRoutes)

export const server = app.listen(3000)
