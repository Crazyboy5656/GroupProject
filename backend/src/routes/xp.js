const express = require('express')
const { getPrimaryUser } = require('../data/store')
const { getProgress } = require('../utils/leveling')

const router = express.Router()

router.get('/', (_req, res) => {
  const user = getPrimaryUser()
  const progress = getProgress(user)
  res.json({ user, progress })
})

module.exports = router
