import express from 'express';
import cors from 'cors';
import orderRoutes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Allow your Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ai-laundry-order-system.vercel.app',
  ],
}));

app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/orders', orderRoutes);
app.use((_, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});