# GooX API Documentation

This document provides details for the frontend to interact with the GooX-BE backend.

## Base URL
`http://localhost:3606`

---

## Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.
- Upon login, a token is returned in the response and also set as an `httpOnly` cookie.
- For requests requiring authentication, you should include the token in the `Authorization` header as a Bearer token:
  `Authorization: Bearer <your_token>`
- Or, if CORS is configured correctly, the browser will automatically send the `token` cookie.

---

## 1. User Endpoints

### Register
**Endpoint**: `POST /api/user/register`  
**Description**: Register a new account.

**Request Body**:
```json
{
  "username": "your_username",
  "password": "your_password",
  "confirmPassword": "your_password"
}
```

**Response**:
```json
{
  "status": "true",
  "comment": "User registered successfully!"
}
```

---

### Login
**Endpoint**: `POST /api/user/login`  
**Description**: Authenticate user and receive a token.

**Request Body**:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response**:
```json
{
  "status": "true",
  "comment": "Login successfully!",
  "token": "eyJhbGci..."
}
```

---

### Logout
**Endpoint**: `POST /api/user/logout`  
**Description**: Clear the authentication cookie.

---

### Get Current User Profile
**Endpoint**: `GET /api/user/me`  
**Authentication**: Required

**Response**:
```json
{
  "status": "true",
  "comment": "User profile fetched successfully!",
  "data": {
    "_id": "...",
    "username": "...",
    "appenid": "...",
    "role": "...",
    "status": "..."
  }
}
```

---

### Update Appen ID
**Endpoint**: `POST /api/user/appenid`  
**Authentication**: Required

**Request Body**:
```json
{
  "appenid": "your_appen_id"
}
```

---

## 2. KPI Endpoints

### Create KPI Record
**Endpoint**: `POST /api/kpi`  
**Authentication**: Required

**Request Body**:
```json
{
  "appen_id": "your_appen_id",
  "kpi_count": 150,
  "job_id": "optional_job_id",
  "record_id": "optional_record_id",
  "occurred_at": "2024-04-27T12:00:00Z" 
}
```

---

### Get My KPI List
**Endpoint**: `GET /api/kpi`  
**Authentication**: Required  
**Description**: Fetches all KPI records associated with the current user's `appenid`.

**Response**:
```json
{
  "status": "true",
  "comment": "KPI fetched successfully!",
  "data": [
    {
      "appen_id": "...",
      "kpi_count": 150,
      "occurred_at": "..."
    }
  ]
}
```

---

## Frontend Integration Example (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3606/api',
  withCredentials: true // Important for sending/receiving cookies
});

// Login Example
export const login = async (username, password) => {
  const response = await api.post('/user/login', { username, password });
  return response.data;
};

// Fetch KPI Example
export const getMyKPIs = async () => {
  const response = await api.get('/kpi');
  return response.data;
};
```
