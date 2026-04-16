/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(null)
  const [quests, setQuests] = useState([])
  const [rewards, setRewards] = useState([])
  const [activeQuestForVerification, setActiveQuestForVerification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const clearMessages = useCallback(() => {
    setError('')
    setInfo('')
  }, [])

  const refreshAll = useCallback(async () => {
    try {
      setLoading(true)
      const [auth, xpData, questData, rewardData] = await Promise.all([
        api.login(),
        api.getXp(),
        api.getQuests(),
        api.getRewards(),
      ])
      setUser(auth.user)
      setProgress(xpData.progress)
      setQuests(questData.quests)
      setRewards(rewardData.rewards)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshAll()
  }, [refreshAll])

  const signup = useCallback(async (username) => {
    try {
      clearMessages()
      const data = await api.signup({ username })
      setUser(data.user)
      setInfo('Signed in successfully.')
    } catch (err) {
      setError(err.message)
    }
  }, [clearMessages])

  const createQuest = useCallback(async (payload) => {
    try {
      clearMessages()
      const data = await api.createQuest(payload)
      setQuests((prev) => [data.quest, ...prev])
      setInfo('Quest created.')
    } catch (err) {
      setError(err.message)
    }
  }, [clearMessages])

  const moveQuestState = useCallback(async (id, state) => {
    try {
      clearMessages()
      const data = await api.updateQuestState(id, state)
      setQuests((prev) => prev.map((quest) => (quest.id === id ? data.quest : quest)))
      if (state === 'awaiting_verification') {
        setActiveQuestForVerification(data.quest)
      }
      setInfo(`Quest moved to ${state.replaceAll('_', ' ')}.`)
    } catch (err) {
      setError(err.message)
    }
  }, [clearMessages])

  const verifyQuest = useCallback(async (questId, proofPayload) => {
    try {
      clearMessages()
      const data = await api.verifyQuest(questId, proofPayload)
      setQuests((prev) => prev.map((quest) => (quest.id === questId ? data.quest : quest)))
      setUser(data.user)
      setProgress(data.progress)
      setActiveQuestForVerification(null)
      if (data.approved) {
        setInfo('Proof approved. XP granted.')
      } else {
        setError(data.reason)
      }
    } catch (err) {
      setError(err.message)
    }
  }, [clearMessages])

  const redeemReward = useCallback(async (rewardId) => {
    try {
      clearMessages()
      const data = await api.redeemReward(rewardId)
      setUser(data.user)
      setRewards((prev) => prev.map((reward) => (reward.id === rewardId ? data.reward : reward)))
      setInfo(data.message)
    } catch (err) {
      setError(err.message)
    }
  }, [clearMessages])

  const value = useMemo(() => ({
    user,
    progress,
    quests,
    rewards,
    loading,
    error,
    info,
    signup,
    createQuest,
    moveQuestState,
    verifyQuest,
    redeemReward,
    activeQuestForVerification,
    setActiveQuestForVerification,
    clearMessages,
    refreshAll,
  }), [
    user,
    progress,
    quests,
    rewards,
    loading,
    error,
    info,
    signup,
    createQuest,
    moveQuestState,
    verifyQuest,
    redeemReward,
    activeQuestForVerification,
    clearMessages,
    refreshAll,
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }

  return context
}
