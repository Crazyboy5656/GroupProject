import { useState } from 'react'
import { useApp } from '../context/AppContext'

export function AuthPanel() {
  const { signup } = useApp()
  const [username, setUsername] = useState('Hero')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!username.trim()) return
    signup(username)
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3>Sign in / Sign up</h3>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username"
      />
      <button type="submit">Continue</button>
    </form>
  )
}
