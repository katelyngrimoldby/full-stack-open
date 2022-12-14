const router = require('express').Router()
const singleRouter = require('express').Router()
const { Op } = require('sequelize')
const {Blog, User} = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where =  {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
    console.log(where)
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})


router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if(user.disabled) {
    return res.status(401).json({error: 'Invalid permissions'})
  }
  const blog = await Blog.create({...req.body, userId: user.id, created_at: Date(), updated_at: Date()})
  return res.json(blog)
})

const blogFinder = async (req, res, next) => {
  const {id} = req.params

  req.blog = await Blog.findByPk(id)
  if(!req.blog) return res.status(404).end()

  next()
}

singleRouter.get('/', async (req, res) => {
  if(req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end
  }
})

singleRouter.delete('/', tokenExtractor, async (req, res) => {
  if(req.blog) {
    const user = await User.findByPk(req.decodedToken.id)
    if (user && user.id == req.blog.userId && !user.disabled) {
      await req.blog.destroy()
      res.status(204).end()
    } else {
      res.status(401).json({error: "Invalid authentication"})
    }
  } else {
    res.status(404).end()
  }
})

singleRouter.put('/', async (req, res) => {
  if(req.blog) {
    req.blog.likes = req.blog.likes + Number(req.body.likes)
    req.blog.updated_at = Date()
    console.log(req.blog)
    await req.blog.save()
  
    res.json({likes: req.blog.likes})
  } else {
    res.status(404).end
  }
})

router.use('/:id', blogFinder, singleRouter)

module.exports = router