# Student Management Frontend Specification

## Overview

Develop a frontend to manage a database of students using **React**, **TypeScript**, and modern frontend libraries/frameworks. The application consists of two main pages with different routes using **React Router**.

## Tech Stack

### Core Framework and Libraries:

- **React** (v18.2.0)
- **React DOM** (v18.2.0)
- **TypeScript**

### Build Tool:

- **Vite** (v4.3.9)

### Routing:

- **React Router DOM** (v6.26.2)

### UI Components and Styling:

- **Radix UI** (various components)
- **Tailwind CSS** (v3.3.2)
- **Tailwind CSS Animate**
- **Class Variance Authority**
- **clsx**
- **Tailwind Merge**

### Form Handling:

- **React Hook Form** (v7.53.0)

### Animation:

- **Framer Motion** (v11.5.4)

### Icons:

- **Lucide React** (v0.244.0)
- **React Icons** (v5.3.0)

### State Management:

- **Zustand** (v4.5.5)

### Validation:

- **Zod** (v3.23.8)

### Development Tools:

- **ESLint**
- **TypeScript ESLint**
- **Prettier** (with Tailwind CSS plugin)
- **Autoprefixer**
- **PostCSS**

### Measurement:

- **React Use Measure** (v2.1.1)

## Styling

Use company branding colors as per the included branding guide. Implement styling using **TailwindCSS**.

## Backend Integration

Backend endpoints are defined in the included Postman file.

## Pages

### 1. Grid Page

- Display a grid of students that can be filtered and sorted.
- Implement a form with validations to add new students.
- Allow individual record updates and deletions.
- Include recent lookups from the **Lookup Page**, persisted across page changes.
- Clicking on a recent lookup opens a drawer with more student details.

#### Features:

- Sorting by **ID**, **Name**, **Class**, and **GPA** (ascending/descending).
- Client-side search functionality.
- Pagination with customizable page size and navigation buttons.
- "Add Student" modal with form validation.
- "Edit" modal for updating student information.
- Delete functionality with success/failure toasts.
- Responsive design with horizontal scroll for the table.

### 2. Lookup Page

- Implement a search bar for looking up students by **UUID**.
- Display student name when found.
- Open a drawer with detailed student information when clicked.
- Add searched students to recent lookups (persisted using Zustand).
- Show "No student found" message if the search yields no results.
- Implement debounce effect (2ms) on the search input.
- Responsive design.

## Setup Instructions

## App Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server

## Backend Setup

1. Open terminal and run `./run_server` to start the backend
2. Import the Postman file to Postman
3. Create environment variables as needed
