const { getLevelFromXp } = require('../utils/leveling')

const users = [
  {
    id: 'u1',
    username: 'Hero',
    avatar: '🧙',
    xp: 90,
    level: 1,
    streak: 2,
    attributes: {
      strength: 5,
      intelligence: 6,
      discipline: 5,
    },
  },
]

const quests = [
  {
    id: 'q1',
    title: 'Read 20 pages',
    description: 'Focused reading session',
    difficulty: 'easy',
    xpReward: 20,
    category: 'Intelligence',
    state: 'not_started',
    userId: 'u1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'q2',
    title: 'Morning run',
    description: 'Run for 20 minutes',
    difficulty: 'medium',
    xpReward: 45,
    category: 'Strength',
    state: 'in_progress',
    userId: 'u1',
    createdAt: new Date().toISOString(),
  },
]

const submissions = []

const rewards = [
  { id: 'r1', name: 'Premium Theme Pack', xpCost: 120, stock: 5, description: 'Unlock exclusive app skins.' },
  { id: 'r2', name: 'Focus Soundtrack', xpCost: 80, stock: 10, description: 'Digital productivity soundtrack.' },
  { id: 'r3', name: 'Study Boost Credits', xpCost: 200, stock: 3, description: 'Credits for premium study tools.' },
]

let questCounter = 3
let submissionCounter = 1

function getPrimaryUser() {
  const user = users[0]
  user.level = getLevelFromXp(user.xp)
  return user
}

function createQuest(payload, userId) {
  const quest = {
    id: `q${questCounter}`,
    title: payload.title,
    description: payload.description || '',
    difficulty: payload.difficulty || 'easy',
    xpReward: Number(payload.xpReward) || 10,
    category: payload.category || 'Discipline',
    state: 'not_started',
    userId,
    createdAt: new Date().toISOString(),
  }
  questCounter += 1
  quests.unshift(quest)
  return quest
}

function createSubmission(payload) {
  const submission = {
    id: `s${submissionCounter}`,
    questId: payload.questId,
    userId: payload.userId,
    timestamp: payload.timestamp,
    photoData: payload.photoData,
    result: payload.result,
    reason: payload.reason,
  }
  submissionCounter += 1
  submissions.unshift(submission)
  return submission
}

module.exports = {
  users,
  quests,
  submissions,
  rewards,
  getPrimaryUser,
  createQuest,
  createSubmission,
}
