const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create({...req.body, created_at: Date(), updated_at: Date()})
  res.json(user)
})

router.get('/:username', async (req, res) => {
  const user = await User.findOne({
     where: {username: req.params.username },
     include: [{
      association: 'readings',
      attributes: {exclude: ['userId']},
      through: {attributes: ['read', 'id']}
     },
    {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }]
    })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: {username: req.params.username }})
  if (user) {
    user.username = req.body.username
    user.updated_at = Date()
    user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router