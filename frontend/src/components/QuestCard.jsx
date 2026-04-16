import { formatQuestState } from '../utils/format'

export function QuestCard({ quest, onStart, onSubmitProof }) {
  return (
    <article className="panel">
      <div className="row space-between">
        <h3>{quest.title}</h3>
        <span className="badge">+{quest.xpReward} XP</span>
      </div>
      <p className="muted">{quest.description || 'No description provided.'}</p>
      <p className="muted">{quest.category} · {quest.difficulty}</p>
      <p>Status: <strong>{formatQuestState(quest.state)}</strong></p>
      <div className="row">
        {quest.state === 'not_started' && (
          <button type="button" onClick={() => onStart(quest.id)}>
            Start Quest
          </button>
        )}
        {(quest.state === 'in_progress' || quest.state === 'awaiting_verification') && (
          <button type="button" onClick={() => onSubmitProof(quest.id)}>
            Submit Proof
          </button>
        )}
      </div>
    </article>
  )
}
