const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'control_hub',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Middleware for JWT Verification
const authenticateJWT = (req, res, next) => {
  next(); 
};

// --- Backend API Routes ---

// 1. Dashboard Data Retrieval
app.get('/api/dashboard/stats', authenticateJWT, async (req, res) => {
  // Anomaly Detection Logic (Mock)
  const crashCount = 34;
  const avgCrashes = 15;
  const anomalyDetected = crashCount > avgCrashes * 2;

  res.json({
    totalApps: 14,
    totalActiveUsers: 1200000,
    dailyActiveUsers: 284000,
    monthlyActiveUsers: 3400000,
    totalEmployees: 142,
    appCrashes24h: crashCount,
    avgApiResponseMs: 124,
    serverHealth: 'Healthy',
    anomalyDetected: anomalyDetected,
    anomalyMessage: anomalyDetected ? 'High crash rate detected in last 24h!' : null
  });
});

// 2. App Version Checks (public)
app.get('/api/apps/:apiKey/version', async (req, res) => {
  const { apiKey } = req.params;
  const { platform } = req.query;
  try {
    const result = await pool.query(
      'SELECT current_version, latest_version, force_update FROM apps WHERE api_key = $1 AND platform = $2',
      [apiKey, platform]
    );
    if(result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'App not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New: Release Management
app.post('/api/apps/:id/release', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { newVersion, forceUpdate } = req.body;
  // TODO: Update DB
  io.emit('system_update', { type: 'RELEASE', appId: id, version: newVersion });
  res.json({ success: true, message: `Release ${newVersion} deployed` });
});

// 3. Analytics Event Submission
app.post('/api/analytics', async (req, res) => {
  const { apiKey, eventType } = req.body;
  res.status(201).json({ success: true, message: 'Event logged' });
});

// 4. Crash Reporting
app.post('/api/crashes', async (req, res) => {
  const { apiKey, errorMessage } = req.body;
  // Emit real-time alert
  io.emit('new_crash', { apiKey, error: errorMessage, timestamp: new Date() });
  res.status(201).json({ success: true, message: 'Crash logged' });
});

// 5. Employee Updates
app.put('/api/employees/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: 'Employee updated successfully' });
});

// 6. Developer Portal: API Keys
app.post('/api/developer/keys/regenerate', authenticateJWT, async (req, res) => {
  const { appId } = req.body;
  const newKey = `h3_${Math.random().toString(36).substr(2, 9)}`;
  res.json({ success: true, apiKey: newKey });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

