export function XPBar({ user, progress }) {
  if (!user || !progress) return null

  const percentage = Math.min(100, Math.round((progress.current / progress.required) * 100))

  return (
    <section className="panel">
      <div className="row space-between">
        <h2>{user.username}</h2>
        <span>Level {progress.level}</span>
      </div>
      <p className="muted">XP: {user.xp} / {progress.nextMin}</p>
      <div className="xp-track" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div className="xp-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="attributes">
        <div>💪 {user.attributes.strength}</div>
        <div>🧠 {user.attributes.intelligence}</div>
        <div>🛡️ {user.attributes.discipline}</div>
      </div>
    </section>
  )
}
