const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Production-grade Dynamic CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (such as mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow if matches CLIENT_URL
    if (process.env.CLIENT_URL && (process.env.CLIENT_URL === '*' || origin === process.env.CLIENT_URL)) {
      return callback(null, true);
    }
    // Allow local development origins
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    // For deployed environments (Vercel, Netlify, Render, custom domains), reflect requesting origin to safely allow credentials
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static folder for uploaded medical documents and avatars
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cycle', require('./routes/cycle'));
app.use('/api/daily', require('./routes/dailyLog'));
app.use('/api/assessments', require('./routes/assessments'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/vault', require('./routes/vault'));
app.use('/api/medications', require('./routes/medications'));
app.use('/api/wearable', require('./routes/wearable'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/api/nearby', require('./routes/nearby'));
app.use('/api/sms', require('./routes/sms'));
app.use('/api/admin', require('./routes/admin'));

// Health check endpoint with rich diagnostics
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'online',
    platform: 'FemTech - AI-IoT Women’s Health & Wellness',
    tagline: 'Your Health. Your Pattern. Your FemTech.',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      connected: mongoose.connection.readyState === 1,
      state: mongoose.connection.readyState === 1 ? 'connected' : mongoose.connection.readyState === 2 ? 'connecting' : 'disconnected'
    },
    system: {
      nodeVersion: process.version,
      memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      platform: process.platform
    },
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'Server Health & Diagnostics' },
      { path: '/api/assessments/pcos', method: 'POST', description: 'Clinical PCOS Risk & Nutrition Blueprint' },
      { path: '/api/assessments/thyroid', method: 'POST', description: 'Clinical Thyroid Risk & Nutrition Blueprint' },
      { path: '/api/wearable/data', method: 'GET', description: 'Live Wearable & Biometrics Telemetry' },
      { path: '/api/cycle/latest', method: 'GET', description: 'Cycle Tracking & Phase Inference' },
      { path: '/api/daily/trends', method: 'GET', description: 'Daily Wellness & Symptom Trends' },
      { path: '/api/sms/send-direct-sms', method: 'POST', description: 'Direct GSM / Fast2SMS Notification Relay' }
    ]
  });
});

// Interactive Root Dashboard for Web & Mobile Inspection
app.get(['/', '/api'], (req, res) => {
  const mongoose = require('mongoose');
  const dbConnected = mongoose.connection.readyState === 1;
  const uptime = Math.floor(process.uptime());
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FemTech Backend Server • Live Status & API Explorer</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body {
      background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 45%, #fef2f2 100%);
      color: #1e293b;
      min-height: 100vh;
      padding: 30px 20px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .container {
      width: 100%;
      max-width: 900px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border-radius: 24px;
      border: 1px solid #fecdd3;
      box-shadow: 0 16px 40px rgba(225, 29, 72, 0.12);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #e11d48 0%, #be123c 60%, #881337 100%);
      color: white;
      padding: 36px 30px;
      position: relative;
    }
    .header h1 {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header p {
      font-size: 1rem;
      opacity: 0.92;
      margin-top: 6px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-top: 14px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 10px #4ade80;
      display: inline-block;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
    .content { padding: 30px; }
    .grid-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      margin-bottom: 26px;
    }
    .stat-card {
      background: #fff5f7;
      border: 1px solid #fecdd3;
      border-radius: 14px;
      padding: 16px 20px;
    }
    .stat-label { font-size: 0.78rem; text-transform: uppercase; color: #881337; font-weight: 700; letter-spacing: 0.5px; }
    .stat-value { font-size: 1.3rem; font-weight: 800; color: #1e293b; margin-top: 4px; }
    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #881337;
      margin: 24px 0 12px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }
    .api-card {
      background: #ffffff;
      border: 1.5px solid #fbcfe8;
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      transition: all 0.2s ease;
    }
    .api-card:hover {
      border-color: #e11d48;
      box-shadow: 0 6px 18px rgba(225, 29, 72, 0.15);
      transform: translateY(-2px);
    }
    .api-badge {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      width: fit-content;
    }
    .badge-get { background: #dcfce7; color: #15803d; }
    .badge-post { background: #fee2e2; color: #b91c1c; }
    .api-endpoint { font-size: 0.95rem; font-weight: 700; color: #1e293b; font-family: monospace; }
    .api-desc { font-size: 0.82rem; color: #64748b; line-height: 1.4; }
    .btn-action {
      background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
      color: white;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: opacity 0.2s ease;
    }
    .btn-action:hover { opacity: 0.9; }
    .btn-secondary {
      background: #fff1f2;
      color: #be123c;
      border: 1px solid #fecdd3;
    }
    .btn-secondary:hover { background: #ffe4e6; }
    #responseViewer {
      margin-top: 20px;
      background: #0f172a;
      color: #f8fafc;
      border-radius: 12px;
      padding: 16px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      max-height: 320px;
      display: none;
    }
    .app-links {
      background: linear-gradient(135deg, #fff1f2 0%, #fef2f2 100%);
      border: 1.5px dashed #f43f5e;
      border-radius: 16px;
      padding: 20px;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌸 FemTech Server Dashboard</h1>
      <p>AI-IoT Women’s Health, Diagnostics & Wellness Platform</p>
      <div class="status-badge">
        <span class="dot"></span>
        <span>BACKEND ONLINE • READY • PORT 5000</span>
      </div>
    </div>

    <div class="content">
      <div class="grid-stats">
        <div class="stat-card">
          <div class="stat-label">Server Status</div>
          <div class="stat-value" style="color: #15803d;">Healthy (200 OK)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Database (MongoDB)</div>
          <div class="stat-value" style="color: ${dbConnected ? '#15803d' : '#d97706'};">
            ${dbConnected ? 'Connected 🟢' : 'Connecting / Standby 🟡'}
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Uptime</div>
          <div class="stat-value">${hours}h ${minutes}m ${seconds}s</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Node Runtime</div>
          <div class="stat-value">${process.version}</div>
        </div>
      </div>

      <div class="app-links">
        <h3 style="color: #881337; font-size: 1.1rem; margin-bottom: 8px;">🚀 Quick Application Access</h3>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 12px;">Open the FemTech application directly in your browser or on your smartphone:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <a href="http://localhost:5173" target="_blank" class="btn-action">🖥️ Open Frontend (Localhost:5173)</a>
          <a href="http://192.168.0.7:5173" target="_blank" class="btn-action btn-secondary">📲 Open Frontend (Phone WiFi: 192.168.0.7:5173)</a>
          <a href="/api/health" target="_blank" class="btn-action btn-secondary">🔍 View JSON Health (/api/health)</a>
        </div>
      </div>

      <div class="section-title">⚡ Live Endpoint Sandbox (Click to Test)</div>
      <div class="links-grid">
        <div class="api-card">
          <div>
            <span class="api-badge badge-get">GET</span>
            <div class="api-endpoint">/api/health</div>
            <div class="api-desc">System health check, uptime, memory, and database status.</div>
          </div>
          <button class="btn-action" onclick="testEndpoint('/api/health', 'GET')">Test Live in Browser</button>
        </div>

        <div class="api-card">
          <div>
            <span class="api-badge badge-post">POST</span>
            <div class="api-endpoint">/api/assessments/pcos</div>
            <div class="api-desc">Run PCOS clinical risk scoring & full nutritional protocol recommendations.</div>
          </div>
          <button class="btn-action" onclick="testPCOS()">Test PCOS Assessment</button>
        </div>

        <div class="api-card">
          <div>
            <span class="api-badge badge-post">POST</span>
            <div class="api-endpoint">/api/assessments/thyroid</div>
            <div class="api-desc">Run Thyroid clinical risk calculation & personalized hormone blueprint.</div>
          </div>
          <button class="btn-action" onclick="testThyroid()">Test Thyroid Assessment</button>
        </div>

        <div class="api-card">
          <div>
            <span class="api-badge badge-get">GET</span>
            <div class="api-endpoint">/api/wearable/data</div>
            <div class="api-desc">Retrieve wearable biometrics (HR, BP, BBT, SpO2, HRV, VO2Max).</div>
          </div>
          <button class="btn-action" onclick="testEndpoint('/api/wearable/data', 'GET')">Fetch Wearables</button>
        </div>

        <div class="api-card">
          <div>
            <span class="api-badge badge-get">GET</span>
            <div class="api-endpoint">/api/cycle/latest</div>
            <div class="api-desc">Fetch cycle predictions, follicular/luteal phases, and ovulation window.</div>
          </div>
          <button class="btn-action" onclick="testEndpoint('/api/cycle/latest', 'GET')">Fetch Cycle Data</button>
        </div>

        <div class="api-card">
          <div>
            <span class="api-badge badge-get">GET</span>
            <div class="api-endpoint">/api/daily/trends?days=7</div>
            <div class="api-desc">Fetch 7-day trend logs for sleep, hydration, and biometric patterns.</div>
          </div>
          <button class="btn-action" onclick="testEndpoint('/api/daily/trends?days=7', 'GET')">Fetch Trends</button>
        </div>
      </div>

      <div id="responseTitle" style="display:none; font-weight: 700; color: #1e293b; margin-top: 16px; font-size: 0.9rem;"></div>
      <pre id="responseViewer"></pre>
    </div>
  </div>

  <script>
    async function testEndpoint(endpoint, method, body = null) {
      const viewer = document.getElementById('responseViewer');
      const title = document.getElementById('responseTitle');
      title.style.display = 'block';
      title.innerText = 'Testing ' + method + ' ' + endpoint + '...';
      viewer.style.display = 'block';
      viewer.innerText = 'Loading...';

      try {
        const options = { method, headers: { 'Content-Type': 'application/json' } };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(endpoint, options);
        const data = await res.json();
        title.innerText = method + ' ' + endpoint + ' • Status: ' + res.status + ' ' + res.statusText;
        viewer.innerText = JSON.stringify(data, null, 2);
      } catch (err) {
        title.innerText = 'Error calling ' + endpoint;
        viewer.innerText = 'Error: ' + err.message;
      }
    }

    function testPCOS() {
      testEndpoint('/api/assessments/pcos', 'POST', {
        answers: {
          irregular_periods: true,
          excess_hair: true,
          weight_gain: true,
          acne: true,
          hair_thinning: false,
          fatigue: true
        }
      });
    }

    function testThyroid() {
      testEndpoint('/api/assessments/thyroid', 'POST', {
        answers: {
          fatigue: true,
          weight_change: true,
          cold_sensitivity: true,
          dry_skin: true,
          constipation: false,
          mood_changes: true
        }
      });
    }
  </script>
</body>
</html>`;

  res.send(html);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌸 FemTech Server running gracefully on port ${PORT}`);
  console.log(`🌸 Tagline: "Your Health. Your Pattern. Your FemTech."`);
});
