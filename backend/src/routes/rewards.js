const express = require('express')
const { rewards, getPrimaryUser } = require('../data/store')

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ rewards })
})

router.post('/:id/redeem', (req, res) => {
  const user = getPrimaryUser()
  const reward = rewards.find((candidate) => candidate.id === req.params.id)

  if (!reward) {
    return res.status(404).json({ message: 'Reward not found.' })
  }

  if (reward.stock <= 0) {
    return res.status(400).json({ message: 'Reward out of stock.' })
  }

  if (user.xp < reward.xpCost) {
    return res.status(400).json({ message: 'Not enough XP to redeem this reward.' })
  }

  user.xp -= reward.xpCost
  reward.stock -= 1

  return res.json({ user, reward, message: `${reward.name} claimed.` })
})

module.exports = router
