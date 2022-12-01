const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

let authors = [
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
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
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const MONGO_URI=process.env.MONGO_URI

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]!
    ): Book,
    editAuthor(
      name: String!
      setBorn: Int!
    ): Author
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
    }
  },

  // Author: {
  //   bookCount: (root) => books.filter(book => book.author === root.name).length
  // },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({name: args.author})

      if(!author) {
        const newAuthor = new Author({name: args.author})
        const book = new Book({...args, author: newAuthor._id})
        await newAuthor.save()
        return book.save()
      }
      const book = new Book({...args, author: author._id})
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if(author) {
        author.born = args.setBorn
        return author.save()
      }
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
  
}

startServer()