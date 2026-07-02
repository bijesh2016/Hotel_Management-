# 🛠️ 502 Bad Gateway Fix & Troubleshooting Guide

## Problem
Getting `502 Bad Gateway` error when trying to login from the admin panel.
URL: `POST http://localhost:5173/api/auth/login`

## Root Causes & Solutions

### ✅ FIXED: Frontend Proxy Configuration
**Issue**: Frontend was configured to proxy API calls to `http://localhost:3000` but backend runs on `http://localhost:5000`

**Solution Applied**: Updated `vite.config.js` to use correct port
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // Changed from 3000 to 5000
    changeOrigin: true,
  },
}
```

---

## Complete Setup Checklist

### Step 1: Database Setup
```bash
cd Backend
# Run database setup script
.\setup-db.bat  # Windows
# or
bash setup-db.sh  # Linux/Mac
```

This will:
- ✅ Create `hotel_reservation` database
- ✅ Create all required tables
- ✅ Insert test users

**Test Credentials:**
- Admin: `admin@example.com` / `admin123`
- Customer: `customer@example.com` / `customer123`

### Step 2: Verify Database Connection
```bash
# From psql terminal, connect to the database
psql -U postgres -h localhost -d hotel_reservation

# Check tables
\dt

# Check test users
SELECT id, full_name, email, role FROM users;
```

### Step 3: Start Backend
```bash
cd Backend
npm install  # If not done already
npm run watch
```

**Expected Output:**
```
✅ Database connection established
📊 Database: hotel_reservation on localhost:5432

🚀 Server is running on http://localhost:5000
📚 API Documentation: http://localhost:5000/api-docs
🧪 Test Auth: http://localhost:5000/api/auth
💻 Frontend: http://localhost:5173
```

### Step 4: Start Frontend
```bash
cd Frontend
npm install  # If not done already
npm run dev
```

**Expected Output:**
```
VITE v4.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 5: Test Login
1. Open: `http://localhost:5173`
2. Login with credentials:
   - Email: `admin@example.com`
   - Password: `admin123`

---

## Detailed Troubleshooting

### Issue 1: Database Connection Fails
**Error**: `❌ Database connection failed`

**Solution**:
```bash
# Check if PostgreSQL is running
# Windows: Services > PostgreSQL service should be "Running"
# or use psql from command line
psql -U postgres

# If psql command not found, add PostgreSQL to PATH
# PostgreSQL default: C:\Program Files\PostgreSQL\15\bin
```

### Issue 2: "Database does not exist"
**Error**: `error: database "hotel_reservation" does not exist`

**Solution**:
```bash
# Run database setup script
cd Backend
.\setup-db.bat

# Or manually create database
psql -U postgres
CREATE DATABASE hotel_reservation;
\c hotel_reservation
\i ./src/database/schema.sql
```

### Issue 3: Login Still Returns 502
**Solution**:
1. Check backend console for errors
2. Verify `.env` file has correct credentials:
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_reservation
JWT_SECRET=klljsafcgerfd1236jhft7hbdg47
```

3. Check if backend is running on port 5000:
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

### Issue 4: CORS Errors
**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**: Already configured in `express.config.js`
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
```

### Issue 5: Invalid Credentials Error
**Error**: `Invalid credentials` after login

**Solution**:
- Ensure test users were created: Run `setup-db.bat`
- Or create manually:
```sql
-- Insert test users (requires bcrypt hashed passwords)
INSERT INTO users (full_name, email, password, role)
VALUES 
  ('Admin User', 'admin@example.com', '$2b$10$8vgC4XQrOBrXNXW1tL8s.eVx0FBqAD8J5c.JqhMYLsJvwc.cqZMvm', 'admin'),
  ('Customer User', 'customer@example.com', '$2b$10$N3jHJXaFVqKpvKzrWLvhNuEQY5xKw8X5vEqYn0L8w9s0q9s0q9s0q', 'customer');
```

---

## API Testing

### Test 1: Health Check
```bash
GET http://localhost:5000/health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-06-10T12:00:00.000Z"
}
```

### Test 2: Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```
**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "full_name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Test 3: Protected Route
```bash
GET http://localhost:5000/api/test/profile
Authorization: Bearer <your-token-from-login>
```

---

## Quick Restart Steps
```bash
# Terminal 1 - Backend
cd Backend
npm run watch

# Terminal 2 - Frontend  
cd Frontend
npm run dev

# Open browser
http://localhost:5173
```

---

## Port Verification
Ensure these ports are available:
- **5000** - Backend API
- **5173** - Frontend (Vite dev server)
- **5432** - PostgreSQL

Check with:
```bash
# Windows
netstat -ano

# Linux/Mac
lsof -i -P -n | grep LISTEN
```

---

## Environment Configuration

**Backend (.env)** - Located at `Backend/.env`:
```env
PORT=5000
HOST=localhost
NODE_ENV=development

DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_reservation

JWT_SECRET=klljsafcgerfd1236jhft7hbdg47
JWT_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

**Frontend (vite.config.js)** - Already configured to proxy to `http://localhost:5000`

---

## Success Indicators

✅ All of these should work:
1. Backend starts without errors
2. Database connection shows "✅ Database connection established"
3. Frontend loads at `http://localhost:5173`
4. Login form appears
5. Credentials accepted and dashboard loads
6. API docs accessible at `http://localhost:5000/api-docs`

---

## Getting Help

If still having issues:
1. Check backend console for error messages
2. Check browser console (F12) for network errors
3. Verify all environment variables in `.env`
4. Ensure PostgreSQL is running
5. Check firewall isn't blocking ports 5000/5173

