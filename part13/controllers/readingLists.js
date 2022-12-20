const { ReadingList } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const list = await ReadingList.create(req.body)
  res.json(list)
})

module.exports = router