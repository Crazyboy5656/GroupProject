import { RewardCard } from '../components/RewardCard'

export function RewardsPage({ rewards, userXp, onRedeem }) {
  return (
    <section className="stack">
      <h2>Reward Marketplace</h2>
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} userXp={userXp} onRedeem={onRedeem} />
      ))}
    </section>
  )
}
