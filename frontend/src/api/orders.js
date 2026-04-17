const BASE = `${import.meta.env.VITE_API_URL}/api/orders`;
console.log('API BASE:', BASE); // add this temporarily


export const createOrder = async (data) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchOrders = async ({ status = '', search = '' } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (search) params.set('search', search);
  const res = await fetch(`${BASE}?${params}`);
  return res.json();
};

export const updateStatus = async (id, status) => {
  const res = await fetch(`${BASE}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchDashboard = async () => {
  const res = await fetch(`${BASE}/meta/dashboard`);
  return res.json();
};

export const fetchPrices = async () => {
  const res = await fetch(`${BASE}/meta/prices`);
  return res.json();
};