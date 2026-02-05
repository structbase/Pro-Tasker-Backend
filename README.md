# Pro-Tasker Backend API

Node.js + Express + MongoDB API for Pro-Tasker. This backend provides secure
JWT authentication, ownership-based authorization, and full CRUD for Projects
and Tasks.

## ✅ Backend Requirements Coverage

- Modular structure (routes/controllers/models/utils)
- JWT auth with protected routes
- Password hashing with bcrypt (pre-save hook)
- Ownership-based authorization for Projects and Tasks
- RESTful CRUD for Projects and Tasks
- Tasks nested under Projects

## 🔐 Authentication

- Register and Login return a JWT
- JWT is required for all Project/Task routes
- Token must be sent as:

```
Authorization: Bearer <JWT>
```

## 📌 API Endpoints

Base URL: `/api`

### Auth

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| POST   | `/users/register` | Register a new user   |
| POST   | `/users/login`    | Login and receive JWT |

### Projects (Protected)

| Method | Endpoint        | Description                         |
| ------ | --------------- | ----------------------------------- |
| POST   | `/projects`     | Create a project                    |
| GET    | `/projects`     | Get all projects for logged-in user |
| GET    | `/projects/:id` | Get a single project (owner only)   |
| PUT    | `/projects/:id` | Update a project (owner only)       |
| DELETE | `/projects/:id` | Delete a project (owner only)       |

### Tasks (Protected & Nested)

| Method | Endpoint            | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| POST   | `/:projectId/tasks` | Create task in owned project                 |
| GET    | `/:projectId/tasks` | Get all tasks for owned project              |
| GET    | `/tasks/:taskId`    | Get a single task (owner via parent project) |
| PUT    | `/tasks/:taskId`    | Update task (owner via parent project)       |
| DELETE | `/tasks/:taskId`    | Delete task (owner via parent project)       |

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```
MONGO_URI=your_mongodb_connection_string
PORT=3001
JWT_SECRET=your_jwt_secret
SALTING_ROUNDS=10
CLIENT_ORIGIN=http://localhost:5173
```

## ▶️ Run Locally

```bash
npm install
npm run dev
```

Server:

```
http://localhost:3001
```

## 🗂️ Folder Structure (Backend)

```
backend/
├── config/
│   └── db-connection.js
├── controllers/
│   ├── project/
│   ├── task/
│   └── user/
├── models/
│   ├── Project.js
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── utils/
│   └── auth.js
├── server.js
└── README.md
```

## 🧪 Notes on Authorization

- Projects are filtered by `user` ownership
- Tasks are authorized via the parent project’s `user`
- Invalid ObjectIds return 404 for project/task lookups
- Passwords are hashed using bcrypt before persistence.
- JWTs are signed using server-side secrets and validated via middleware.

## 🌐 Production Deployment Notes

```
- Hosted on Render
- Backend may hibernate after inactivity
- First request may take 10–30 seconds
```

## 🎨 Frontend Application

The Pro-Tasker backend is designed to work with a dedicated React + TypeScript frontend that provides the user interface, authentication flows, and project/task management experience.

👉 **Live Application:**  
[Open Live App](https://github.com/structbase/Pro-Tasker-frontend)

👉 **Frontend Demo Video:**  
[Watch Demo](https://youtu.be/j7-10ilHeCw)

👉 **Live Frontend Demo**
[Watch Demo](https://frontend-b-9tki.onrender.com/)

The frontend connects to this backend through RESTful API endpoints and handles:

- User authentication and session management
- Project and task interface workflows
- Protected routes and client-side authorization
- Responsive UI and theme management

This backend serves as the primary API layer responsible for data storage, authentication, and business logic while the frontend delivers the interactive user experience.

---

## ✍️ Author

Developed by **Abenezer**
