require('dotenv').config();
const express = require('express');
const cors = require('cors');

const collegeRoutes = require('./routes/colleges');
const compareRoutes = require('./routes/compare');
const predictorRoutes = require('./routes/predictor');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'https://https://college-discovery-platform-orpin.vercel.app', // Your specific Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Only if you are using cookies/sessions
}));

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
