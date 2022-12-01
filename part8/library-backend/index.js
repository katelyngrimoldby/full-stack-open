const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose')
require('dotenv').config()
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

let authors = [
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [

  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = 'SECRET'

console.log('connecting to', MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `#graphql
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    # bookCount: Int!
  }

  type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBorn: Int!
    ): Author
    createUser(
    username: String!
    favouriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author', {name: 1})
      if(args.genre) {
        result = await Book.find({genres: {$in: [args.genre]}}).populate('author', {name: 1})
      }

      return result
    },
    allAuthors: async () => {
      const result = Author.find({})

      return result
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },

  // Author: {
  //   bookCount: (root) => books.filter(book => book.author === root.name).length
  // },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      }

      const author = await Author.findOne({name: args.author})

      console.log(author.name)

      if(!author) {
        const newAuthor = new Author({name: args.author})
        try {
          await newAuthor.save()
          const book = new Book({...args, author: newAuthor._id})
          const populatedBook = await book.populate('author', {name: 1})
          await populatedBook.save()
        } catch(error) {
          throw new GraphQLError('Invalid argument value', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
        return book
      }

      const book = new Book({...args, author: author._id})
      console.log(book)

      try {
        const populatedBook = await book.populate('author', {name: 1})
        await populatedBook.save()
      } catch(error) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      }

      const author = await Author.findOne({name: args.name})
      author.born = args.setBorn

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
    
      return author
    },

    createUser: async (root, args) => {
      const user = new User({...args})

      return user.save()
        .catch(error => {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if(!user || args.password !== 'password') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {context: async ({req}) => {
      const token = req ? req.headers.authorization : null
      if(token && token.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          token.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
  
        return { currentUser }
      }
    }
  });
  
  console.log(`🚀  Server ready at: ${url}`);
  
}

startServer()