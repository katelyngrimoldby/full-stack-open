const router = require('express').Router()
const singleRouter = require('express').Router()
const {Blog} = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const blogFinder = async (req, res, next) => {
  const {id} = req.params

  req.blog = Blog.findByPk(id)
  if(!req.blog) res.status(404).end()

  next()
}

singleRouter.delete('/', async (req, res) => {
  await req.blog.destroy()
  res.status(204).end()
})

router.use('/:id', blogFinder, singleRouter)

module.exports = router