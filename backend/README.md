# Task Manager Backend

RESTful API server for the Task Manager application.

## Technology Stack

- Node.js with Express
- TypeScript
- JWT for authentication
- WebSocket for real-time updates
- JSON file-based storage

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Project Endpoints

All project endpoints require authentication via Bearer token.

#### Get All Projects
```
GET /api/projects
Authorization: Bearer <token>

Response:
[
  {
    "id": "project-id",
    "name": "Project Name",
    "description": "Project Description",
    "userId": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create Project
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description"
}

Response:
{
  "id": "project-id",
  "name": "New Project",
  "description": "Project description",
  "userId": "user-id",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Project
```
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Project
```
DELETE /api/projects/:id
Authorization: Bearer <token>

Response:
{
  "message": "Project deleted successfully"
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks
Authorization: Bearer <token>

Response: Array of all user's tasks
```

#### Get Tasks by Project
```
GET /api/tasks/project/:projectId
Authorization: Bearer <token>

Response: Array of tasks for the specified project
```

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "projectId": "project-id"
}

Response:
{
  "id": "task-id",
  "title": "Task Title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "projectId": "project-id",
  "userId": "user-id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "in-progress",
  "priority": "high"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response:
{
  "message": "Task deleted successfully"
}
```

## WebSocket Connection

Connect to WebSocket for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:5000/ws?token=<jwt-token>');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received update:', data);
};

// Send updates
ws.send(JSON.stringify({
  type: 'task_updated',
  data: { taskId: '123', status: 'done' }
}));
```

## Database

The application uses a JSON file-based database stored in `src/data/database.json`. This can be easily migrated to a proper database like PostgreSQL or MongoDB by implementing a new datastore class.

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend integration
- Input validation on all endpoints

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
