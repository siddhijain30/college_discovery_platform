require('dotenv').config();
const express = require('express');
const cors = require('cors');

const collegeRoutes = require('./routes/colleges');
const compareRoutes = require('./routes/compare');
const predictorRoutes = require('./routes/predictor');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Improved Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
<<<<<<< HEAD
  'https://college-discovery-platform-orpin.vercel.app/api'

=======
  'http://localhost:3000',
  'https://college-discovery-platform-orpin.vercel.app' // Add your specific Vercel URL
>>>>>>> 98ce94f86d1276ce454f813cedbef188babcc411
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
<<<<<<< HEAD

=======
    
>>>>>>> 98ce94f86d1276ce454f813cedbef188babcc411
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      // Log the origin for easier debugging
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// 2. THE ROUTE PREFIX
// Your code defines routes under /api/...
app.use('/api/colleges', collegeRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/predictor', predictorRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// IMPORTANT: Catch-all for undefined routes (helps debug 404s)
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});