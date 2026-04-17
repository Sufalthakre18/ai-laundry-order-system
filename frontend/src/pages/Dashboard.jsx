import { useEffect, useState } from 'react';
import { fetchDashboard } from '../api/orders';

const STATUS_COLORS = {
  RECEIVED: '#3b82f6',
  PROCESSING: '#f59e0b',
  READY: '#10b981',
  DELIVERED: '#6b7280',
};

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard().then(setData);
  }, []);

  if (!data) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <div className="stat-cards">
        <div className="stat-card highlight">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{data.totalOrders}</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">₹{data.totalRevenue}</span>
        </div>
      </div>

      <h3>Orders by Status</h3>
      <div className="status-grid">
        {Object.entries(data.ordersPerStatus).map(([status, count]) => (
          <div key={status} className="status-card" style={{ borderColor: STATUS_COLORS[status] }}>
            <span className="status-dot" style={{ background: STATUS_COLORS[status] }} />
            <span className="status-name">{status}</span>
            <span className="status-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}