const express = require('express')
const app = express()
require('express-async-errors')
const {PORT} = require('./util/config')
const { connectToDatabase } = require('./util/db')

const {errorHandler, tokenExtractor} = require('./util/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists')
const logoutRouter = require('./controllers/logout')


app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/reading_lists', readingListRouter)
app.use('/api/logout', tokenExtractor ,logoutRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()