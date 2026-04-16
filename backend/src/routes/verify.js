const express = require('express')
const { quests, getPrimaryUser, createSubmission } = require('../data/store')
const { addXp, getProgress } = require('../utils/leveling')

const router = express.Router()

function isFreshTimestamp(rawTimestamp) {
  const submittedAt = new Date(rawTimestamp).getTime()
  if (Number.isNaN(submittedAt)) {
    return false
  }

  const drift = Math.abs(Date.now() - submittedAt)
  return drift <= 3 * 60 * 1000
}

router.post('/:questId', (req, res) => {
  const user = getPrimaryUser()
  const { questId } = req.params
  const { timestamp, photoData } = req.body

  const quest = quests.find((candidate) => candidate.id === questId && candidate.userId === user.id)
  if (!quest) {
    return res.status(404).json({ message: 'Quest not found.' })
  }

  if (quest.state !== 'awaiting_verification' && quest.state !== 'in_progress') {
    return res.status(400).json({ message: 'Quest is not ready for verification.' })
  }

  const hasPhoto = typeof photoData === 'string' && photoData.startsWith('data:image/') && photoData.length > 500
  const timestampValid = isFreshTimestamp(timestamp)
  const approved = hasPhoto && timestampValid

  const result = approved ? 'approved' : 'rejected'
  const reason = approved ? 'Verification passed.' : 'Photo or timestamp validation failed.'

  createSubmission({
    questId,
    userId: user.id,
    timestamp,
    photoData,
    result,
    reason,
  })

  if (approved) {
    quest.state = 'completed'
    addXp(user, quest.xpReward, quest.category)
  } else {
    quest.state = 'in_progress'
  }

  const progress = getProgress(user)

  return res.json({
    approved,
    reason,
    quest,
    user,
    progress,
  })
})

module.exports = router
