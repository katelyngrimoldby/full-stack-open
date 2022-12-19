const express = require('express')
const app = express()
require('express-async-errors')
const {PORT} = require('./util/config')
const { connectToDatabase } = require('./util/db')

const {errorHandler} = require('./util/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

app.use(express.json())

app.use('/api/blogs/', blogRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()