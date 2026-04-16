import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { useApp } from './context/AppContext'
import { AuthPanel } from './pages/AuthPanel'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { QuestCreationPage } from './pages/QuestCreationPage'
import { RewardsPage } from './pages/RewardsPage'
import { VerificationPage } from './pages/VerificationPage'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const {
    user,
    progress,
    quests,
    rewards,
    loading,
    error,
    info,
    createQuest,
    moveQuestState,
    verifyQuest,
    redeemReward,
    activeQuestForVerification,
    setActiveQuestForVerification,
  } = useApp()

  const handleStart = (questId) => {
    moveQuestState(questId, 'in_progress')
  }

  const handleSubmitProof = (questId) => {
    moveQuestState(questId, 'awaiting_verification')
    const selected = quests.find((quest) => quest.id === questId)
    if (selected) {
      setActiveQuestForVerification({ ...selected, state: 'awaiting_verification' })
    }
    setActiveTab('verify')
  }

  return (
    <div className="app-shell">
      <header className="header">
        <h1>Side Quest Life</h1>
        <p className="muted">Gamified productivity prototype from Stitch files</p>
      </header>

      <AuthPanel />

      {loading ? <p>Loading...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      {info ? <p className="info-text">{info}</p> : null}

      {activeTab === 'dashboard' ? (
        <DashboardPage user={user} progress={progress} quests={quests} onStart={handleStart} onSubmitProof={handleSubmitProof} />
      ) : null}

      {activeTab === 'create' ? <QuestCreationPage onCreate={createQuest} /> : null}

      {activeTab === 'verify' ? (
        <VerificationPage
          quest={activeQuestForVerification}
          onVerify={verifyQuest}
        />
      ) : null}

      {activeTab === 'rewards' ? <RewardsPage rewards={rewards} userXp={user?.xp || 0} onRedeem={redeemReward} /> : null}

      {activeTab === 'profile' ? <ProfilePage user={user} /> : null}

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
