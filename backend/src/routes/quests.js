const express = require('express')
const { quests, getPrimaryUser, createQuest } = require('../data/store')

const router = express.Router()

router.get('/', (_req, res) => {
  const user = getPrimaryUser()
  const userQuests = quests.filter((quest) => quest.userId === user.id)
  res.json({ quests: userQuests })
})

router.post('/', (req, res) => {
  const user = getPrimaryUser()
  const title = req.body.title?.trim()

  if (!title) {
    return res.status(400).json({ message: 'Quest title is required.' })
  }

  const quest = createQuest(req.body, user.id)
  return res.status(201).json({ quest })
})

router.patch('/:id/state', (req, res) => {
  const { id } = req.params
  const { state } = req.body
  const validStates = ['not_started', 'in_progress', 'awaiting_verification', 'completed']

  if (!validStates.includes(state)) {
    return res.status(400).json({ message: 'Invalid quest state.' })
  }

  const quest = quests.find((candidate) => candidate.id === id)
  if (!quest) {
    return res.status(404).json({ message: 'Quest not found.' })
  }

  quest.state = state
  return res.json({ quest })
})

module.exports = router
