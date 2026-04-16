const express = require('express')
const { getPrimaryUser } = require('../data/store')

const router = express.Router()

router.post('/signup', (req, res) => {
  const user = getPrimaryUser()
  const username = req.body.username?.trim()
  if (username) {
    user.username = username
  }

  res.json({ user })
})

router.post('/login', (_req, res) => {
  const user = getPrimaryUser()
  res.json({ user })
})

module.exports = router
