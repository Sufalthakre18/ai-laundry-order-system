import { useEffect, useState } from 'react';
import { fetchOrders, updateStatus } from '../api/orders';

const STATUSES = ['', 'RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

const STATUS_COLORS = {
  RECEIVED: '#3b82f6',
  PROCESSING: '#f59e0b',
  READY: '#10b981',
  DELIVERED: '#6b7280',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const load = () => fetchOrders({ status, search }).then(setOrders);

  useEffect(() => {
    load();
  }, [status, search]);

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus(id, newStatus);
    load();
  };

  return (
    <div className="orders-page">
      <div className="filters">
        <input
          placeholder="Search by name, phone, garment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s || 'All Statuses'}</option>
          ))}
        </select>
      </div>

      {orders.length === 0 && <p className="empty">No orders found.</p>}

      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
              <div>
                <span className="order-id">#{order.id}</span>
                <span className="order-customer"> {order.customerName}</span>
                <span className="order-phone"> · {order.phone}</span>
              </div>
              <div className="order-meta">
                <span className="order-amount">₹{order.totalAmount}</span>
                <span
                  className="status-badge"
                  style={{ background: STATUS_COLORS[order.status] }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {expanded === order.id && (
              <div className="order-detail">
                <table>
                  <thead>
                    <tr><th>Garment</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
                  </thead>
                  <tbody>
                    {order.garments.map((g, i) => (
                      <tr key={i}>
                        <td>{g.name}</td>
                        <td>{g.quantity}</td>
                        <td>₹{g.pricePerItem}</td>
                        <td>₹{g.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="order-dates">
                  <span>Created: {new Date(order.createdAt).toLocaleString()}</span>
                  <span>Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                </div>

                <div className="status-update">
                  <label>Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    {STATUSES.slice(1).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}