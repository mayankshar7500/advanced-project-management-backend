# 🚀 Advanced Project Management Backend

A scalable, production-ready Project Management Backend API built with Node.js, Express, MongoDB, and JWT Authentication. Designed for modern team collaboration with role-based access control, real-time task management, and enterprise-grade security.

---

## ⚡ Features

### 🔐 Authentication & Security

- User registration and login with secure JWT tokens
- Access tokens and refresh tokens with expiration
- Password encryption with bcrypt
- Protected routes with middleware authentication
- Helmet for HTTP security headers

### 📁 Project Management

- Create and manage multiple projects
- Add/remove team members to projects
- Project status tracking (active, completed, archived)
- Priority levels (low, medium, high)
- Deadline management

### ✅ Task Management

- Create tasks within projects
- Assign tasks to team members
- Track task status (pending, in_progress, done)
- Priority and deadline management
- Task filtering and pagination

### 🛡️ Role-Based Access Control

- User roles: Developer, Manager, Admin
- Project owner privileges
- Task assignment restrictions
- Member-only access control

### ✔️ Data Validation

- Zod schema validation for all inputs
- Comprehensive error handling
- Request validation middleware
- Type-safe API responses

### 🎯 Production Ready

- Environment-based configuration
- Logging with Morgan
- Security headers with Helmet
- Clean architecture with service layer pattern
- Soft deletes for data integrity

---

## 🛠️ Tech Stack

| Technology     | Version | Purpose             |
| -------------- | ------- | ------------------- |
| **Node.js**    | 18+     | Runtime environment |
| **Express.js** | 5.2     | Web framework       |
| **MongoDB**    | 6.0+    | NoSQL database      |
| **Mongoose**   | 9.6     | ODM                 |
| **JWT**        | 9.0     | Authentication      |
| **Zod**        | 4.4     | Schema validation   |
| **bcrypt**     | 6.0     | Password hashing    |
| **Helmet**     | 8.1     | Security headers    |
| **Morgan**     | 1.10    | HTTP logging        |

---

## 📂 Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── auth.controllers.js
│   ├── project.controllers.js
│   └── task.controller.js
│
├── services/             # Business logic
│   ├── auth.services.js
│   ├── project.services.js
│   └── task.service.js
│
├── models/               # Database schemas
│   ├── user.models.js
│   ├── project.models.js
│   └── task.models.js
│
├── routes/               # API endpoints
│   ├── auth.routes.js
│   ├── project.routes.js
│   └── task.routes.js
│
├── middlewares/          # Custom middleware
│   ├── auth.middlewares.js
│   └── validate.middlewares.js
│
├── validations/          # Zod schemas
│   ├── user.validation.js
│   ├── project.validation.js
│   ├── task.validation.js
│   └── common.validation.js
│
├── utils/                # Utility functions
│   ├── Api-error.js
│   ├── Api-response.js
│   └── AsyncHandler.js
│
├── db/
│   └── index.js          # Database connection
│
├── app.js                # Express app setup
└── index.js              # Entry point

```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- npm or yarn

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/proj-management.git
cd proj-management
```

**2. Install dependencies**

```bash
npm install
```

**3. Setup environment variables**

Create a `.env` file in the root directory:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/proj-management

# JWT Secrets
ACCESSKEY=your_super_secret_access_key_change_this
REFRESHKEY=your_super_secret_refresh_key_change_this

# Token Expiry
ACCESSEXPIRY=1d
REFRESHEXPIRY=7d
```

**4. Start the server**

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start at `http://localhost:8000`

---

## 🌐 API Endpoints

### Base URL

```
http://localhost:8000/api
```

### Authentication Routes

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register new user        |
| POST   | `/auth/login`    | User login               |
| GET    | `/auth/me`       | Get current user profile |

### Project Routes

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| POST   | `/projects`                   | Create project   |
| GET    | `/projects`                   | Get all projects |
| POST   | `/projects/:id/add-member`    | Add member       |
| POST   | `/projects/:id/remove-member` | Remove member    |
| POST   | `/projects/:id`               | Delete project   |

### Task Routes

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/task`     | Create task                |
| GET    | `/task`     | Get tasks (with filtering) |
| PATCH  | `/task/:id` | Update task                |
| DELETE | `/task/:id` | Delete task                |

📖 **Full API documentation available in [api_docs.md](./api_docs.md)**

---

## 🔐 Authentication Flow

```
1. User registers → Password hashed → User created
   ↓
2. User logs in → Credentials verified → JWT tokens issued
   ↓
3. Store accessToken (client) & refreshToken (secure storage)
   ↓
4. Include accessToken in Authorization header for requests
   ↓
5. When token expires → Use refreshToken to get new accessToken
```

---

## 🛡️ Authorization Rules

### Projects

- **Create:** Authenticated users can create projects (become owner)
- **Read:** Only project members can view project details
- **Update:** Owner can modify project
- **Delete:** Only owner can delete project
- **Members:** Owner can add/remove members

### Tasks

- **Create:** Project members can create tasks
- **Assign:** Only project owner can assign tasks
- **Update:** Assigned user or owner can update task
- **Delete:** Assigned user or owner can delete task

---

## 📊 Data Models

### User Schema

```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed),
  role: String (developer|manager|admin, default: developer),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Schema

```javascript
{
  name: String (required),
  description: String,
  owner: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  status: String (active|completed|archived),
  priority: String (low|medium|high),
  deadline: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema

```javascript
{
  title: String (required),
  description: String,
  project: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User),
  status: String (pending|in_progress|done),
  priority: String (low|medium|high),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 💡 Example Usage

### Register a User

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Create a Project

```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "E-Commerce Platform",
    "description": "Build scalable e-commerce backend",
    "priority": "high"
  }'
```

### Create a Task

```bash
curl -X POST http://localhost:8000/api/task \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Setup Database",
    "project": "PROJECT_ID",
    "assignedTo": "USER_ID",
    "priority": "high"
  }'
```

---

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0", // Password hashing
  "dotenv": "^17.4.2", // Environment variables
  "express": "^5.2.1", // Web framework
  "helmet": "^8.1.0", // Security headers
  "jsonwebtoken": "^9.0.3", // JWT tokens
  "mongoose": "^9.6.1", // MongoDB ODM
  "morgan": "^1.10.1", // HTTP logging
  "zod": "^4.4.3" // Schema validation
}
```

---

## 🔧 Configuration

### Environment Variables

| Variable        | Description               | Default     |
| --------------- | ------------------------- | ----------- |
| `PORT`          | Server port               | 3000        |
| `NODE_ENV`      | Environment mode          | development |
| `MONGODB_URI`   | MongoDB connection string | -           |
| `ACCESSKEY`     | JWT access token secret   | -           |
| `REFRESHKEY`    | JWT refresh token secret  | -           |
| `ACCESSEXPIRY`  | Access token expiry       | 1d          |
| `REFRESHEXPIRY` | Refresh token expiry      | 7d          |

---

## 🚢 Deployment

### Prerequisites

- Deployed MongoDB instance (MongoDB Atlas recommended)
- Node.js hosting (Heroku, Railway, Vercel, AWS, etc.)
- Environment variables configured

### Deployment Steps

1. **Set environment variables** on your hosting platform
2. **Build** the project (if needed)
3. **Run** `npm start`


---

## 🧪 Testing

Run tests (when implemented):

```bash
npm test
```

---

## 📝 Contributing

Contributions are welcome!

---

## 🐛 Known Issues

- Update project endpoint (PATCH) not yet implemented
- Consider adding pagination to task/project listing
- Add file upload functionality for tasks

---

## 🔐 Security Best Practices

✅ Implemented:

- Password hashing with bcrypt
- JWT token-based authentication
- CORS protection with Helmet
- Input validation with Zod
- Role-based access control
- SQL injection prevention via Mongoose

⚠️ Before Production:

- [ ] Change JWT secrets in `.env`
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for specific domains
- [ ] Setup rate limiting
- [ ] Enable logging and monitoring
- [ ] Use MongoDB authentication
- [ ] Setup automated backups

---

## 📈 Performance Tips

- Index frequently queried fields in MongoDB
- Use pagination for large datasets
- Cache frequently accessed data
- Use connection pooling
- Monitor API response times

---

## 🗺️ Roadmap

- [ ] Update project endpoint
- [ ] Task comments system
- [ ] Real-time notifications (WebSockets)
- [ ] File upload support
- [ ] Activity logs
- [ ] Advanced filtering and search
- [ ] API rate limiting
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] GraphQL API option

---

## 📄 License

ISC License - see LICENSE file for details

---

## 👨‍💻 Author

**Mayank Sharma**

## 🤝 Support

For issues and questions:

- Open an issue on GitHub
- Check API documentation in [api_docs.md](./api_docs.md)
- Review code examples in this README

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Guide](https://jwt.io/)
- [Zod Documentation](https://zod.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Made with ❤️ by Mayank Sharma**
