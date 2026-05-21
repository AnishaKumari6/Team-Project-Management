require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const client = require('prom-client');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
client.register.setDefaultLabels({
  app: "tpms-backend"
});

app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "TPMS backend is live"
  });
});
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on :${PORT}`);
});
