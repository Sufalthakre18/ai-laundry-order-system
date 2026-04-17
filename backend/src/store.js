import { v4 as uuidv4 } from 'uuid';

// Hardcoded price list (configurable)
export const PRICE_LIST = {
  shirt: 50,
  pants: 60,
  saree: 120,
  jacket: 150,
  suit: 200,
  dress: 100,
  kurta: 70,
  dupatta: 40,
  bedsheet: 80,
  towel: 30,
};

export const ORDER_STATUSES = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

// In-memory store
const orders = new Map();

export const createOrder = ({ customerName, phone, garments }) => {
  const id = uuidv4().slice(0, 8).toUpperCase();

  const processedGarments = garments.map((g) => {
    const name = g.name.toLowerCase();
    const pricePerItem = g.pricePerItem ?? PRICE_LIST[name] ?? 50;
    const quantity = g.quantity ?? 1;
    return { name: g.name, quantity, pricePerItem, subtotal: quantity * pricePerItem };
  });

  const totalAmount = processedGarments.reduce((sum, g) => sum + g.subtotal, 0);

  const order = {
    id,
    customerName,
    phone,
    garments: processedGarments,
    totalAmount,
    status: 'RECEIVED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 days
  };

  orders.set(id, order);
  return order;
};

export const getAllOrders = ({ status, search } = {}) => {
  let result = Array.from(orders.values());

  if (status) {
    result = result.filter((o) => o.status === status.toUpperCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (o) =>
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.garments.some((g) => g.name.toLowerCase().includes(q))
    );
  }

  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getOrderById = (id) => orders.get(id.toUpperCase()) ?? null;

export const updateOrderStatus = (id, status) => {
  const order = orders.get(id.toUpperCase());
  if (!order) return null;
  if (!ORDER_STATUSES.includes(status)) return { error: 'Invalid status' };

  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
};

export const getDashboard = () => {
  const all = Array.from(orders.values());
  const statusCount = ORDER_STATUSES.reduce((acc, s) => {
    acc[s] = all.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return {
    totalOrders: all.length,
    totalRevenue: all.reduce((sum, o) => sum + o.totalAmount, 0),
    ordersPerStatus: statusCount,
  };
};