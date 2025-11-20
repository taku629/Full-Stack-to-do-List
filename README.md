# Fullstack Task Manager

A modern, full-stack task management application built with React, TypeScript, Node.js, and Express. This project demonstrates comprehensive full-stack development skills including RESTful API design, authentication, real-time updates, and responsive UI design.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Project Management**: Create, read, update, and delete projects
- **Task Management**: Full CRUD operations for tasks
- **Kanban Board**: Visual task organization (To Do, In Progress, Done)
- **Priority Levels**: Categorize tasks by priority (Low, Medium, High)
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: WebSocket support for live collaboration
- **Persistent Storage**: JSON file-based database (easily replaceable with SQL/NoSQL)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Context API** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **JWT** for authentication
- **bcryptjs** for password hashing
- **WebSocket** for real-time updates
- **JSON file storage** (production-ready with easy database migration)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fullstack-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 📁 Project Structure

```
fullstack-task-manager/
├── backend/
│   ├── src/
│   │   ├── data/              # JSON database files
│   │   ├── middleware/        # Auth middleware
│   │   ├── models/            # TypeScript interfaces
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utilities (datastore, websocket)
│   │   └── server.ts          # Express server setup
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/        # React components
    │   ├── contexts/          # Context providers
    │   ├── pages/             # Page components
    │   ├── services/          # API service layer
    │   ├── types/             # TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env                   # Environment variables
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### WebSocket
- `ws://localhost:5000/ws?token=<jwt-token>` - Real-time updates

## 🎨 Features Showcase

### User Authentication
- Secure registration with password hashing
- JWT-based authentication
- Protected routes on both frontend and backend

### Project Management
- Create multiple projects
- Switch between projects seamlessly
- Delete projects with cascading task deletion

### Task Organization
- Kanban-style board with three columns
- Drag-and-drop task status changes (via Move button)
- Priority-based color coding
- Task descriptions and details

### Responsive Design
- Mobile-first approach
- Beautiful gradient backgrounds
- Smooth transitions and hover effects
- Modern card-based UI

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation
- CORS configuration

## 🚢 Deployment

### Backend Deployment (Example with Heroku)

1. Create a `Procfile`:
```
web: npm run start
```

2. Ensure your `package.json` has a start script:
```json
"scripts": {
  "start": "node dist/server.js"
}
```

3. Build and deploy:
```bash
npm run build
git push heroku main
```

### Frontend Deployment (Example with Vercel)

1. Update `.env` with your production API URL
2. Build the project:
```bash
npm run build
```
3. Deploy to Vercel:
```bash
vercel --prod
```

## 📈 Future Enhancements

- [ ] Database migration to PostgreSQL/MongoDB
- [ ] File attachments for tasks
- [ ] Task comments and activity log
- [ ] Email notifications
- [ ] Task due dates with reminders
- [ ] Team collaboration features
- [ ] Dark mode support
- [ ] Task search and filtering
- [ ] Data export functionality
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a portfolio project to demonstrate full-stack development capabilities.

## 🙏 Acknowledgments

- Tailwind CSS for the beautiful styling utilities
- React team for the amazing framework
- Express.js for the robust backend framework
