import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/CreateOrder';
import Orders from './pages/Orders';


const TABS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'create', label: '➕ New Order' },
  { id: 'orders', label: '📋 Orders' },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧺 Quick Laundry Manager</h1>
        <nav>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'create' && <CreateOrder />}
        {tab === 'orders' && <Orders />}
      </main>
    </div>
  );
}