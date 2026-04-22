const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
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

// Middleware for JWT Verification
const authenticateJWT = (req, res, next) => {
  // In a real app, verify JSON Web Token here
  // If valid, attach user to req.user and call next()
  next(); 
};

// --- Backend API Routes ---

// 1. Dashboard Data Retrieval
app.get('/api/dashboard/stats', authenticateJWT, async (req, res) => {
  // Demo mock data response
  res.json({
    totalApps: 14,
    totalActiveUsers: 1200000,
    dailyActiveUsers: 284000,
    monthlyActiveUsers: 3400000,
    totalEmployees: 142,
    appCrashes24h: 34,
    avgApiResponseMs: 124,
    serverHealth: 'Healthy'
  });
});

// 2. App Version Checks (public)
app.get('/api/apps/:apiKey/version', async (req, res) => {
  const { apiKey } = req.params;
  const { platform } = req.query; // os platform param
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

// 3. Analytics Event Submission (public via API Key)
app.post('/api/analytics', async (req, res) => {
  const { apiKey, eventType, deviceModel, osVersion, appVersion, sessionId } = req.body;
  // TODO: validate API key, insert event into DB
  res.status(201).json({ success: true, message: 'Event logged' });
});

// 4. Crash Reporting
app.post('/api/crashes', async (req, res) => {
  const { apiKey, errorMessage, stackTrace, deviceModel, osVersion, appVersion } = req.body;
  // TODO: validate API key, insert crash dump into DB
  res.status(201).json({ success: true, message: 'Crash logged' });
});

// 5. Employee Updates
app.put('/api/employees/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  // TODO: Update employee record in DB
  res.json({ success: true, message: 'Employee updated successfully' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
