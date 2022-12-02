const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const { execute, subscribe } = require('graphql')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/user')

const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = 'SECRET'

///end of imports

console.log('connecting to', MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



{
}

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  
  const schema = makeExecutableSchema({typeDefs, resolvers})

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })
  const serverCleanup = useServer({schema}, wsServer)

  const server = new ApolloServer({
    schema, 
    plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const token = req ? req.headers.authorization : null
        if(token && token.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
            token.substring(7), JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
    
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000`);
}

startServer()