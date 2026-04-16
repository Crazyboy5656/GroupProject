export function Navbar({ activeTab, onTabChange }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'create', label: 'Create Quest' },
    { key: 'verify', label: 'Verify' },
    { key: 'rewards', label: 'Rewards' },
    { key: 'profile', label: 'Profile' },
  ]

  return (
    <nav className="nav-grid">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={activeTab === tab.key ? 'nav-tab active' : 'nav-tab'}
          onClick={() => onTabChange(tab.key)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
