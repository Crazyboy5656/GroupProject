export function RewardCard({ reward, userXp, onRedeem }) {
  const disabled = reward.stock <= 0 || userXp < reward.xpCost

  return (
    <article className="panel">
      <div className="row space-between">
        <h3>{reward.name}</h3>
        <span className="badge">{reward.xpCost} XP</span>
      </div>
      <p className="muted">{reward.description}</p>
      <p>Stock: {reward.stock}</p>
      <button type="button" disabled={disabled} onClick={() => onRedeem(reward.id)}>
        {reward.stock <= 0 ? 'Out of stock' : 'Redeem reward'}
      </button>
    </article>
  )
}
