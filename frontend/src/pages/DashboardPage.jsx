import { QuestCard } from '../components/QuestCard'
import { XPBar } from '../components/XPBar'

export function DashboardPage({ user, progress, quests, onStart, onSubmitProof }) {
  return (
    <div className="stack">
      <XPBar user={user} progress={progress} />
      <section className="stack">
        <h2>Daily Quests</h2>
        {quests.length === 0 ? <p className="muted">No quests yet. Create one.</p> : null}
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} onStart={onStart} onSubmitProof={onSubmitProof} />
        ))}
      </section>
    </div>
  )
}
