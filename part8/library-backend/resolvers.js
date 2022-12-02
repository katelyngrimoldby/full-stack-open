const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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

      if(!author) {
        const newAuthor = new Author({name: args.author})
        try {
          await newAuthor.save()
          const book = new Book({...args, author: newAuthor._id})
          const populatedBook = await book.populate('author', {name: 1})
          await populatedBook.save()
          pubsub.publish('BOOK_ADDED', {bookAdded: populatedBook})

          return populatedBook
        } catch(error) {
          throw new GraphQLError('Invalid argument value', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
      }

      const book = new Book({...args, author: author._id})

      try {
        const populatedBook = await book.populate('author', {name: 1})
        await populatedBook.save()

        pubsub.publish('BOOK_ADDED', {bookAdded: populatedBook})

        return populatedBook
      } catch(error) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
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
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers