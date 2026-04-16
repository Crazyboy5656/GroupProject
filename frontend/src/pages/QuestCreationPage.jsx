import { useState } from 'react'
import { difficultyToXp } from '../utils/format'

const categories = ['Strength', 'Intelligence', 'Discipline']

export function QuestCreationPage({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [category, setCategory] = useState('Discipline')

  const xpReward = difficultyToXp(difficulty)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return

    onCreate({
      title: title.trim(),
      description: description.trim(),
      difficulty,
      category,
      xpReward,
    })

    setTitle('')
    setDescription('')
    setDifficulty('easy')
    setCategory('Discipline')
  }

  return (
    <form className="panel stack" onSubmit={handleSubmit}>
      <h2>Create Quest</h2>
      <label htmlFor="title">Title</label>
      <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Quest title" />

      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Quest description" rows="3" />

      <label htmlFor="difficulty">Difficulty</label>
      <select id="difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="category">Category</label>
      <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <p className="muted">Reward preview: {xpReward} XP</p>
      <button type="submit">Create Quest</button>
    </form>
  )
}
