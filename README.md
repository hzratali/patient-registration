# Patient Management App

A simple React-based patient management system that allows users to register patients and run raw SQL queries. This project uses:

- **React** for the frontend
- **Material UI (MUI)** for UI components and styling
- **PGlite** (via `@electric-sql/pglite`) for an in-browser PostgreSQL-like database

## Features

- Patient registration with name, age, and gender
- Display of registered patients in a DataGrid
- Run raw SQL queries and view results dynamically
- Responsive layout with sidebar navigation

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hzratali/patient-registration.git
   cd patient-registration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure

- `App.jsx` - Main application logic and view control
- `components/`
  - `Header.jsx` - App header
  - `Sidebar.jsx` - Navigation sidebar
  - `RegisterPatient.jsx` - Patient registration form and display
  - `QueryPanel.jsx` - Raw SQL query execution and results display

## Dependencies

- `@mui/material`
- `@mui/icons-material`
- `@mui/x-data-grid`
- `@electric-sql/pglite`
