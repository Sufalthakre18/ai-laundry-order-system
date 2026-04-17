import { useEffect, useState } from 'react';
import { createOrder, fetchPrices } from '../api/orders';

const emptyGarment = () => ({ name: '', quantity: 1, pricePerItem: '' });

export default function CreateOrder() {
  const [form, setForm] = useState({ customerName: '', phone: '', garments: [emptyGarment()] });
  const [prices, setPrices] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrices().then((d) => setPrices(d.prices));
  }, []);

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateGarment = (i, field, value) => {
    const garments = [...form.garments];
    garments[i] = { ...garments[i], [field]: value };
    // Auto-fill price from price list
    if (field === 'name' && prices[value.toLowerCase()]) {
      garments[i].pricePerItem = prices[value.toLowerCase()];
    }
    setForm((f) => ({ ...f, garments }));
  };

  const addGarment = () => setForm((f) => ({ ...f, garments: [...f.garments, emptyGarment()] }));

  const removeGarment = (i) =>
    setForm((f) => ({ ...f, garments: f.garments.filter((_, idx) => idx !== i) }));

  const totalBill = form.garments.reduce(
    (sum, g) => sum + (Number(g.pricePerItem) || 0) * (Number(g.quantity) || 0),
    0
  );

  const handleSubmit = async () => {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const order = await createOrder({
        customerName: form.customerName,
        phone: form.phone,
        garments: form.garments.map((g) => ({
          name: g.name,
          quantity: Number(g.quantity),
          ...(g.pricePerItem ? { pricePerItem: Number(g.pricePerItem) } : {}),
        })),
      });
      setResult(order);
      setForm({ customerName: '', phone: '', garments: [emptyGarment()] });
    } catch (e) {
      setError(e.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-order">
      {result && (
        <div className="success-banner">
          ✅ Order Created! ID: <strong>{result.id}</strong> — Total: <strong>₹{result.totalAmount}</strong>
          <button onClick={() => setResult(null)}>✕</button>
        </div>
      )}
      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="form-group">
        <label>Customer Name</label>
        <input
          value={form.customerName}
          onChange={(e) => updateField('customerName', e.target.value)}
          placeholder="e.g. Rahul Sharma"
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="e.g. 9876543210"
        />
      </div>

      <h3>Garments</h3>
      {form.garments.map((g, i) => (
        <div key={i} className="garment-row">
          <input
            list="garment-list"
            placeholder="Garment name"
            value={g.name}
            onChange={(e) => updateGarment(i, 'name', e.target.value)}
          />
          <datalist id="garment-list">
            {Object.keys(prices).map((p) => (
              <option key={p} value={p.charAt(0).toUpperCase() + p.slice(1)} />
            ))}
          </datalist>
          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={g.quantity}
            onChange={(e) => updateGarment(i, 'quantity', e.target.value)}
          />
          <input
            type="number"
            placeholder="Price/item"
            value={g.pricePerItem}
            onChange={(e) => updateGarment(i, 'pricePerItem', e.target.value)}
          />
          <span className="subtotal">₹{(Number(g.pricePerItem) || 0) * (Number(g.quantity) || 0)}</span>
          {form.garments.length > 1 && (
            <button className="btn-remove" onClick={() => removeGarment(i)}>✕</button>
          )}
        </div>
      ))}

      <div className="form-actions">
        <button className="btn-secondary" onClick={addGarment}>+ Add Garment</button>
        <span className="total-preview">Total: <strong>₹{totalBill}</strong></span>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Order'}
        </button>
      </div>

      {Object.keys(prices).length > 0 && (
        <div className="price-hint">
          <strong>Price List:</strong>{' '}
          {Object.entries(prices).map(([item, price]) => (
            <span key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}: ₹{price} &nbsp;</span>
          ))}
        </div>
      )}
    </div>
  );
}