# Nerdery Final Challenge - Task Manager

- Live Site URL: [Ravn Task Management ](https://task-management-app-seven-ruby.vercel.app/)

## Project Description

This project is a task management application developed as part of the Nerdery program. It allows users to manage their tasks efficiently with a user-friendly interface. A modern task management application built with React and TypeScript that allows users to efficiently manage and organize their tasks.

## Features

- **Task Management:** Create, view, and organize tasks
- **Multiple Views:**
  - Grid view for kanban-style task management
  - List view for detailed task information
- **Task Organization:**
  - Group tasks by status (Backlog, Todo, In Progress, Done, Cancelled)
  - Task details include points, due dates, assignees, and tags
- **Interactive UI:**
  - Collapsible task groups
  - Keyboard navigation for selecting options
  - Focus trap for modals and dialogs
  - Loading skeletons for better UX
- **Responsive Design:** Clean and modern interface that adapts to different screen sizes

## Gifs or Screenshots of the Working Application

Screenshots TBA

## Built With

### Core Technologies

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and development server

### State Management & Data Fetching

- **Apollo Client** - GraphQL client for data fetching
- **React Context** - Local state management

### UI Components & Styling

- **SVG Icons** - Custom icon components
- **Tailwind Merge** - Dynamic class name merging
- **CLSX** - Conditional class names

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **SVGR** - SVG to React component conversion

## Setup/Running Instructions

1. Clone the repository:
   ```sh
   git clone /Users/alessandrochinchilla/Developer/Nerdery/task-management-challenge
   ```
2. Navigate to the project directory and install dependencies:
   ```sh
   cd task-management-challenge
   npm install
   ```
3. Create a .env file with the following variables:
   ```sh
   VITE_GRAPHQL_API_URL=your_graphql_api_url
   VITE_GRAPHQL_API_TOKEN=your_api_token
   ```
4. Start the development server:

   ```sh
   npm run dev
   ```

   ## Available Scripts

   - `npm run dev` - Start development server
   - `npm run build` - Build for production
   - `npm run lint` - Run ESLint
   - `npm run prettier` - Format code
   - `npm run typecheck` - Check TypeScript types
   - `npm run codegen` - Generate GraphQL types

   ## Project Structure

   ```
   src/
   ├── apollo/     # Apollo client setup
   ├── components/ # React components
   ├── config/     # Configuration files
   ├── context/    # React context
   ├── graphql/    # GraphQL queries and types
   ├── hooks/      # Custom React hooks
   ├── lib/        # Utility functions
   ├── services/   # External services
   ├── styles/     # Global styles
   └── types/      # TypeScript type definitions
   ```

   ## Upcoming Features

   - Task creation modal dialog
   - Task editing capabilities
   - Advanced filtering and search
   - Drag and drop task reordering
   - Rich text descriptions
