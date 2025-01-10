# Nerdery Final Challenge - Task Manager

- Live Site URL: [Ravn Task Management ](https://task-management-app-seven-ruby.vercel.app/)

## Project Description

This task management application was developed as part of the Nerdery trainee program. The goal is to provide a modern, efficient, and user-friendly platform for managing tasks. Designed with a focus on scalability and clean architecture, this app offers multiple views, robust task organization features, and a highly interactive interface.

## Features

- **Task Management:**
  - Create, view, organize, and delete tasks
  - Group tasks by status (Backlog, Todo, In Progress, Done, Cancelled)
  - Assign points, due dates, tags, and assignees to tasks
- **Multiple Views:**
  - Grid View: Kanban-style task organization
  - List View: Detailed task information
- **Interactive UI:**
  - Drag-and-drop functionality for task reordering
  - Collapsible task groups
  - Native dialog and select components
  - Task filtering via header input
  - Focus trap for modals and dialogs
  - Keyboard navigation
  - Loading skeletons for a better user experience
- **Responsive Design:**
  - Optimized for various screen sizes with a modern, clean interface

## Gifs or Screenshots of the Working Application

Screenshots TBA

## Built With

### Core Technologies

- **React 18**: UI library
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool and development server
- **Zod**: TypeScript schema validation

### State Management & Data Fetching

- **Apollo Client**: GraphQL client for data fetching
- **React Context**: Local state management

### Routing and Form Handling

- **React Router**: Declarative routing
- **React Hook Form**: Efficient form handling

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing
- **SVGR**: SVG to React component conversion

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
   .github/                # GitHub configuration files
      workflows/           # CI/CD workflows
         ci-cd.yaml
   src/
      apollo/              # Apollo Client setup
         client.ts
      assets/              # Static assets like icons and images
         icons/
            white/
      components/          # Reusable UI components
         common/
         dialog/           # Dialog components and related logic
            components/
            context/
            hooks/
            primitives/
         errors/           # Error handling components
         form/             # Form components
         layouts/          # Layout components
         select/           # Select dropdown components
            context/
            primitives/
         tasks/            # Task-related components
            hooks/
            layout/
            ui/
            views/
         ui/               # General UI components
      config/              # Configuration files
      context/             # React context providers
      graphql/             # GraphQL queries and mutations
      hooks/               # Custom React hooks
      lib/                 # Utility functions and libraries
      mocks/               # Mock data for testing
      pages/               # Page components
      routes/              # Application routes
      styles/              # Global styles
      types/               # TypeScript types
      App.tsx              # Main application component
      main.tsx             # Application entry point
      vite-env.d.ts        # Vite environment types
   .gitignore              # Git ignore file
   .prettierrc             # Prettier configuration
   codegen.ts              # GraphQL code generation configuration
   eslint.config.js        # ESLint configuration
   index.html              # Main HTML file
   package.json            # NPM package configuration
   postcss.config.js       # PostCSS configuration
   README.md               # Project README file
   tailwind.config.js      # Tailwind CSS configuration
   tsconfig.app.json       # TypeScript configuration for the app
   tsconfig.json           # TypeScript configuration
   tsconfig.node.json      # TypeScript configuration for Node.js
   vercel.json             # Vercel deployment configuration
   vite.config.ts          # Vite configuration
   vscode.tailwind.json    # VSCode Tailwind CSS configuration
   ```

   ## Folder Structure and Architecture

   The project follows a clean architecture with a well-organized folder structure, ensuring proper separation of concerns. Below is a detailed description of the folder structure:

   - **Components:**

     - **Common:** Contains small to medium reusable components used across the project.
     - **Dialog:** Includes dialog components and related logic, organized into subfolders for components, context, hooks, and primitives.
     - **Errors:** Error handling components.
     - **Form:** Components related to form handling.
     - **Layouts:** Layout components, including the main project layout which uses React Router's `Outlet` to render pages.
     - **Select:** Custom select dropdown components, organized into context and primitives.
     - **Tasks:** Task-related components, organized into hooks, layout, UI, and views.
     - **UI:** Main UI components such as Header and Sidebar.

   - **Config:** Configuration files, variants, and navigation settings for the main components.

   - **Context:** Global context providers used across the project.

   - **Hooks:** Custom React hooks for various functionalities, from UI improvements to niche functions.

   - **GraphQL:** Files generated by codegen, including custom hooks and queries.

   - **Lib:** Utility functions and libraries used throughout the project.

   - **Mocks:** Mock data for testing purposes.

   - **Pages:** Main page components configured with React Router's `Outlet` to be rendered in the main layout.

   - **Routes:** Application routes configuration.

   - **Styles:** Global styles.

   - **Types:** TypeScript types and Zod form schemas.

   ## Styling

   The project uses Tailwind CSS for styling, providing a utility-first approach to design and ensuring a modern, clean interface.

   ## CI/CD Workflow

   A basic GitHub workflow has been implemented to run after each push to the `develop` branch. This workflow builds and deploys the project to Vercel, providing a continuous integration and continuous deployment (CI/CD) pipeline. This setup was added to gain experience with CI/CD workflows and to establish a basic configuration for the project.

   ## Routing

   A dedicated `router` folder is included to manage the application's routes. React Router is used to configure paths and render the appropriate components, ensuring a seamless navigation experience.
