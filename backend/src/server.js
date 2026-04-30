require('dotenv').config();
const express = require('express');
const cors = require('cors');

const collegeRoutes = require('./routes/colleges');
const compareRoutes = require('./routes/compare');
const predictorRoutes = require('./routes/predictor');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
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
