import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getDashboard,
  PRICE_LIST,
  ORDER_STATUSES,
} from './store.js';

const router = Router();

// POST /api/orders — Create order
router.post('/', (req, res) => {
  const { customerName, phone, garments } = req.body;

  if (!customerName || !phone || !Array.isArray(garments) || garments.length === 0) {
    return res.status(400).json({ error: 'customerName, phone, and garments[] are required' });
  }

  for (const g of garments) {
    if (!g.name || !g.quantity || g.quantity < 1) {
      return res.status(400).json({ error: 'Each garment needs a name and quantity >= 1' });
    }
  }

  const order = createOrder({ customerName, phone, garments });
  res.status(201).json(order);
});

// GET /api/orders — List orders (with optional ?status= and ?search=)
router.get('/', (req, res) => {
  const { status, search } = req.query;
  const orders = getAllOrders({ status, search });
  res.json(orders);
});

// GET /api/orders/:id — Get single order
router.get('/:id', (req, res) => {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// PATCH /api/orders/:id/status — Update status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status is required' });

  const result = updateOrderStatus(req.params.id, status);
  if (!result) return res.status(404).json({ error: 'Order not found' });
  if (result.error) return res.status(400).json(result);

  res.json(result);
});

// GET /api/dashboard
router.get('/meta/dashboard', (req, res) => {
  res.json(getDashboard());
});

// GET /api/prices — Return price list
router.get('/meta/prices', (req, res) => {
  res.json({ prices: PRICE_LIST, statuses: ORDER_STATUSES });
});

export default router;