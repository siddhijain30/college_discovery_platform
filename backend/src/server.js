require('dotenv').config();
const express = require('express');
const cors = require('cors');

const collegeRoutes = require('./routes/colleges');
const compareRoutes = require('./routes/compare');
const predictorRoutes = require('./routes/predictor');

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed origins: local dev + any Vercel deployment
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.vercel\.app$/,  // matches any *.vercel.app subdomain
];

// CORS Middleware — must be before routes and express.json
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some((allowed) =>
      allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
    );
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/predictor', predictorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
