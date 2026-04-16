export function formatQuestState(state) {
  if (!state) return 'Unknown'
  return state.replaceAll('_', ' ')
}

export function difficultyToXp(difficulty) {
  if (difficulty === 'hard') return 80
  if (difficulty === 'medium') return 40
  return 20
}
