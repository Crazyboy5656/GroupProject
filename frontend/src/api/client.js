const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export const api = {
  login: () => request('/auth/login', { method: 'POST' }),
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  getXp: () => request('/xp'),
  getQuests: () => request('/quests'),
  createQuest: (payload) => request('/quests', { method: 'POST', body: JSON.stringify(payload) }),
  updateQuestState: (id, state) => request(`/quests/${id}/state`, { method: 'PATCH', body: JSON.stringify({ state }) }),
  verifyQuest: (questId, payload) => request(`/verify/${questId}`, { method: 'POST', body: JSON.stringify(payload) }),
  getRewards: () => request('/rewards'),
  redeemReward: (rewardId) => request(`/rewards/${rewardId}/redeem`, { method: 'POST' }),
}
