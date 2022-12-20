const { ReadingList, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const list = await ReadingList.create(req.body)
  res.json(list)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const list = await ReadingList.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)

  if(list) {
    if(user && user.id == list.userId) {
      list.read = req.body.read
      await list.save()
      res.json(list)
    } else {
      res.status(401).json({error: "Invalid authentication"})
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router