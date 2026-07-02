# JWT Protection & Role-Based Access Testing Guide

## Overview
This guide demonstrates how to test JWT token-based authentication and role-based authorization in the Hotel Reservation System API.

## Endpoints Created

### 1. Test Routes (Protected JWT)

#### GET /api/test/health
- **Description**: Public health check (No authentication required)
- **Method**: GET
- **Auth**: None
- **Expected Response**:
```json
{
  "message": "Test route is working",
  "timestamp": "2026-06-10T12:00:00.000Z"
}
```

#### GET /api/test/profile
- **Description**: Protected route - Requires valid JWT token
- **Method**: GET
- **Auth**: Bearer Token (Required)
- **Headers**:
```
Authorization: Bearer <your-jwt-token>
```
- **Expected Response** (with valid token):
```json
{
  "message": "Protected route accessed",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "customer"
  }
}
```
- **Expected Response** (without token or invalid token):
```json
{
  "message": "Access denied. No token provided."
}
```

---

### 2. Admin Routes (Role-Based Access)

All admin routes require:
- Valid JWT token with `role: "admin"`
- If user role is not "admin", access is forbidden

#### GET /api/admin/dashboard
- **Description**: Admin dashboard access
- **Method**: GET
- **Auth**: Bearer Token (Admin only)
- **Expected Response** (Admin user):
```json
{
  "message": "Welcome Admin",
  "adminUser": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```
- **Expected Response** (Non-admin user):
```json
{
  "message": "Access forbidden"
}
```

#### GET /api/admin/users
- **Description**: Get all users (Admin only)
- **Method**: GET
- **Auth**: Bearer Token (Admin only)

#### GET /api/admin/reports
- **Description**: Get system reports (Admin only)
- **Method**: GET
- **Auth**: Bearer Token (Admin only)

#### GET /api/admin/hotel-owners
- **Description**: Get all hotel owners (Admin only)
- **Method**: GET
- **Auth**: Bearer Token (Admin only)

---

## Step-by-Step Testing Guide

### Step 1: Create Test User Accounts

First, create two test users:
1. A regular customer
2. An admin user

```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "customer@example.com",
  "password": "password123",
  "role": "customer"
}

POST /api/auth/register
Content-Type: application/json

{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

### Step 2: Login and Get Tokens

#### Login as Customer:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

**Copy the token**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### Login as Admin:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Copy the admin token**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### Step 3: Test Protected Route with Customer Token

#### Request:
```bash
GET /api/test/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Expected Response:
```json
{
  "message": "Protected route accessed",
  "user": {
    "id": 1,
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

---

### Step 4: Test Admin Route with Customer Token

#### Request:
```bash
GET /api/admin/dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Expected Response (403 Forbidden):
```json
{
  "message": "Access forbidden"
}
```

---

### Step 5: Test Admin Route with Admin Token

#### Request:
```bash
GET /api/admin/dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Expected Response:
```json
{
  "message": "Welcome Admin",
  "adminUser": {
    "id": 2,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### Step 6: Test Without Token

#### Request:
```bash
GET /api/test/profile
```

#### Expected Response (401 Unauthorized):
```json
{
  "message": "Access denied. No token provided."
}
```

---

## How Middleware Works

### 1. Authentication Middleware (`auth.middleware.js`)
- Checks for `Authorization` header
- Extracts Bearer token
- Verifies JWT signature using `JWT_SECRET`
- Attaches decoded user info to `req.user`

### 2. Role Authorization Middleware (`role.middleware.js`)
- Takes required role(s) as parameter: `authorizeRoles('admin')`
- Checks if `req.user.role` matches allowed role
- Returns 403 Forbidden if role doesn't match

---

## Testing with Swagger UI

1. Open Swagger UI: `http://localhost:5000/api-docs`
2. Look for "Test" and "Admin" sections
3. Click "Try it out" on any endpoint
4. For protected routes:
   - Click the lock icon or "Authorize" button
   - Enter: `Bearer <your-token-here>`
   - Try the request

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Invalid or expired token" | Make sure token is correctly copied and not expired |
| "Access denied. No token provided." | Add `Authorization: Bearer <token>` header |
| "Access forbidden" | Verify user has required role (admin for admin routes) |
| Token not working in Swagger | Use format: `Bearer eyJhbG...` (with "Bearer " prefix) |

---

## Database Setup (Future Implementation)

When connecting to actual database, user roles should be:
- `customer` - Regular users
- `admin` - System administrators
- `hotel_owner` - Hotel management

Example table structure:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables Required

```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=7d
```

