# Task Manager Frontend

Modern React application with TypeScript for task management.

## Technology Stack

- React 18 with TypeScript
- Vite for fast development
- React Router for navigation
- Axios for API communication
- Tailwind CSS for styling
- Context API for state management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CreateProjectModal.tsx
│   ├── CreateTaskModal.tsx
│   ├── ProjectCard.tsx
│   ├── ProtectedRoute.tsx
│   └── TaskCard.tsx
├── contexts/            # React Context providers
│   └── AuthContext.tsx
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── services/            # API service layer
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features

### Authentication
- User registration with validation
- Secure login
- Persistent sessions with localStorage
- Protected routes

### Project Management
- Create projects with descriptions
- Visual project selection
- Project deletion with confirmation

### Task Management
- Create tasks with title, description, and priority
- Kanban-style board (To Do, In Progress, Done)
- Move tasks between columns
- Delete tasks with confirmation
- Priority color coding

### UI/UX
- Responsive design for all screen sizes
- Beautiful gradient backgrounds
- Smooth transitions and animations
- Intuitive modals for creation
- Loading states
- Error handling with user feedback

## Component Documentation

### AuthContext
Provides authentication state and methods throughout the application.

```typescript
const { user, token, login, register, logout, isLoading } = useAuth();
```

### ProtectedRoute
Wraps routes that require authentication.

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Dashboard
Main application view showing projects and tasks.

### ProjectCard
Displays project information with selection and deletion options.

### TaskCard
Displays task with priority indicator and status change button.

### CreateProjectModal / CreateTaskModal
Modal dialogs for creating new projects and tasks.

## API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in `src/services/api.ts`.

Authentication token is automatically attached to requests via Axios interceptor.

## Styling

Tailwind CSS is used for all styling. Key classes:

- `bg-gradient-to-br from-blue-500 to-purple-600` - Gradient backgrounds
- `shadow-lg`, `shadow-md` - Card shadows
- `hover:shadow-md` - Hover effects
- `transition-all` - Smooth transitions

## State Management

- **Authentication**: Context API (`AuthContext`)
- **Local State**: React useState hooks
- **Server State**: Direct API calls with local caching

## Error Handling

- API errors are caught and displayed to users
- Form validation before submission
- Confirmation dialogs for destructive actions
- Loading states during async operations

## Performance Optimizations

- Vite for fast development and optimized builds
- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with proper state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.
