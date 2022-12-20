const router = require("express").Router();
const { Session } = require('../models');

router.delete('/', async (req, res) => {
  await Session.destroy({where: {userId: req.decodedToken.id}})

  res.status(204).json({message: 'logout successful'})
})

module.exports = router