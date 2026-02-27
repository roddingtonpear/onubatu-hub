const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const notationRoutes = require('./routes/notation');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/chat', chatRoutes);
app.use('/api/notation', notationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🥁 OnuBatú Hub server running on port ${PORT}`);
});
