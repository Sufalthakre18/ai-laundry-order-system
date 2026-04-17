import express from 'express';
import cors from 'cors';
import orderRoutes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/orders', orderRoutes);

// 404 fallback
app.use((_, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/api/orders`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/orders/meta/dashboard`);
});