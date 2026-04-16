const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700]

function getLevelFromXp(xp) {
  const normalizedXp = Math.max(0, Number(xp) || 0)
  let level = 1
  for (let index = 1; index < LEVEL_THRESHOLDS.length; index += 1) {
    if (normalizedXp >= LEVEL_THRESHOLDS[index]) {
      level = index + 1
    }
  }

  if (normalizedXp >= LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]) {
    const extra = normalizedXp - LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
    level = LEVEL_THRESHOLDS.length + Math.floor(extra / 600)
  }

  return level
}

function getXpWindow(level) {
  const currentLevel = Math.max(1, Number(level) || 1)
  const currentMin = LEVEL_THRESHOLDS[currentLevel - 1] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (currentLevel - LEVEL_THRESHOLDS.length) * 600
  const nextMin = LEVEL_THRESHOLDS[currentLevel] ?? currentMin + 600

  return {
    currentMin,
    nextMin,
  }
}

function getProgress(user) {
  const level = getLevelFromXp(user.xp)
  const { currentMin, nextMin } = getXpWindow(level)
  return {
    level,
    currentMin,
    nextMin,
    current: Math.max(0, user.xp - currentMin),
    required: Math.max(1, nextMin - currentMin),
  }
}

function addXp(user, amount, category) {
  const xpToAdd = Math.max(0, Number(amount) || 0)
  user.xp += xpToAdd
  user.level = getLevelFromXp(user.xp)

  if (category === 'Strength') {
    user.attributes.strength += 1
  } else if (category === 'Intelligence') {
    user.attributes.intelligence += 1
  } else if (category === 'Discipline') {
    user.attributes.discipline += 1
  }

  return user
}

module.exports = {
  addXp,
  getLevelFromXp,
  getProgress,
  LEVEL_THRESHOLDS,
}
