export function ProfilePage({ user }) {
  if (!user) return null

  return (
    <section className="panel stack">
      <h2>Profile</h2>
      <p><strong>Avatar:</strong> {user.avatar}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Level:</strong> {user.level}</p>
      <p><strong>Streak:</strong> {user.streak} day(s)</p>
    </section>
  )
}
