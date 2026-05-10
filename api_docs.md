# 📘 API Documentation

> Complete API reference for the Project Management Backend

**Base URL:** `http://localhost:8000/api`

**Current Version:** 1.0.0

---

## Table of Contents

- [Authentication APIs](#-authentication-apis)
- [Project APIs](#-project-apis)
- [Task APIs](#-task-apis)
- [Error Responses](#-error-responses)
- [Authentication](#authentication)

---

## 🔐 Authentication APIs

### Register User

Register a new user account.

**Endpoint:**

```http
POST /auth/register
```

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "developer"
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### Login User

Authenticate user and receive JWT tokens.

**Endpoint:**

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "developer"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User

Retrieve the authenticated user's profile.

**Endpoint:**

```http
GET /auth/me
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "developer"
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Unauthorized - Invalid token"
}
```

---

## 📁 Project APIs

### Create Project

Create a new project.

**Endpoint:**

```http
POST /projects
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "name": "Project Alpha",
  "description": "Backend infrastructure project",
  "priority": "high"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Project Alpha",
    "description": "Backend infrastructure project",
    "owner": "507f1f77bcf86cd799439011",
    "members": [],
    "status": "active",
    "priority": "high",
    "deadline": null
  }
}
```

---

### Get User Projects

Retrieve all projects for the authenticated user.

**Endpoint:**

```http
GET /projects
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "success": true,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Project Alpha",
      "description": "Backend infrastructure project",
      "owner": "507f1f77bcf86cd799439011",
      "members": ["507f1f77bcf86cd799439013"],
      "status": "active",
      "priority": "high"
    }
  ]
}
```

---

### Add Project Member

Add a user to a project.

**Endpoint:**

```http
POST /projects/:id/add-member
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "userId": "507f1f77bcf86cd799439013"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Member added successfully"
}
```

---

### Remove Project Member

Remove a user from a project.

**Endpoint:**

```http
POST /projects/:id/remove-member
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "userId": "507f1f77bcf86cd799439013"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

---

### Delete Project

Delete a project (only owner).

**Endpoint:**

```http
POST /projects/:id
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Error Response (403):**

```json
{
  "success": false,
  "message": "Only project owner can delete the project"
}
```

---

## ✅ Task APIs

### Create Task

Create a new task within a project.

**Endpoint:**

```http
POST /task
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "title": "Build Authentication System",
  "description": "Implement JWT-based authentication",
  "project": "507f1f77bcf86cd799439012",
  "assignedTo": "507f1f77bcf86cd799439013",
  "priority": "high",
  "dueDate": "2026-06-01"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Build Authentication System",
    "description": "Implement JWT-based authentication",
    "project": "507f1f77bcf86cd799439012",
    "assignedTo": "507f1f77bcf86cd799439013",
    "priority": "high",
    "status": "pending",
    "dueDate": "2026-06-01"
  }
}
```

---

### Get Tasks

Retrieve tasks with optional filtering.

**Endpoint:**

```http
GET /task
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Query Parameters:**

- `projectId` (optional): Filter tasks by project ID
- `status` (optional): Filter by status (pending, in_progress, done)
- `priority` (optional): Filter by priority (low, medium, high)

**Example:**

```http
GET /task?projectId=507f1f77bcf86cd799439012&status=pending
```

**Success Response (200):**

```json
{
  "success": true,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Build Authentication System",
      "project": "507f1f77bcf86cd799439012",
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439013",
        "username": "john_doe",
        "email": "john@example.com"
      },
      "priority": "high",
      "status": "pending"
    }
  ]
}
```

---

### Update Task

Update task details or status.

**Endpoint:**

```http
PATCH /task/:id
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "status": "in_progress",
  "priority": "medium"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Build Authentication System",
    "status": "in_progress",
    "priority": "medium"
  }
}
```

---

### Delete Task

Delete a task.

**Endpoint:**

```http
DELETE /task/:id
```

**Headers:**

```http
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 🔐 Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid input data"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized - Please provide valid token"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Authentication

All protected endpoints require the `Authorization` header with a Bearer token:

```http
Authorization: Bearer <your_access_token>
```

**Token Format:**

- Access tokens expire based on `ACCESSEXPIRY` (default: 1 day)
- Refresh tokens expire based on `REFRESHEXPIRY` (default: 7 days)
- Use the refresh token to obtain a new access token when expired

---

## Rate Limiting

- API requests are limited to 100 requests per minute per IP
- Exceeding limits returns 429 Too Many Requests

---

## CORS

CORS is enabled for development. Configure in production by updating the CORS settings in `src/app.js`.
