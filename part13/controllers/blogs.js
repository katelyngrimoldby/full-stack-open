const router = require('express').Router()
const singleRouter = require('express').Router()
const {Blog} = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
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

singleRouter.delete('/', async (req, res) => {
  if(req.blog) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

singleRouter.put('/', async (req, res) => {
  if(req.blog) {
    req.blog.likes = req.blog.likes + req.body.likes
    await req.blog.save()
  
    res.json({likes: req.blog.likes})
  } else {
    res.status(404).end
  }
})

router.use('/:id', blogFinder, singleRouter)

module.exports = router