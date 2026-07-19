# Job Portal Frontend

A React + Vite frontend for a job portal application with recruiter and applicant flows.

## Overview

This project is a recruiter dashboard and job browsing frontend built with React, Vite, Tailwind CSS, Redux, and React Router.

Key features:
- recruiter login and signup
- company registration and job posting
- admin job listing and applicant management
- applicant resume viewing and status updates
- search and filter support for jobs and companies

## Tech stack

- React 18
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- React Hook Form
- Sonner for toast notifications

## Project structure

- `src/Pages/` - main page views such as `AdminJobCreate`, `Applicants`, `Home`, `JobDetail`, and profile pages
- `src/Components/Shared/` - shared UI components like `Navbar`, `JobCard`, and `Footer`
- `src/Components/ui/` - reusable UI primitives for buttons, inputs, popovers, selects, tables, and dialogs
- `src/CustomHook/` - data-fetching hooks for jobs, companies, and applications
- `src/Redux/` - Redux slices and store configuration
- `src/util/constant.js` - API endpoint constants

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Run ESLint checks:

```bash
npm run lint
```

## Backend configuration

The frontend expects a backend API at the URLs defined in `src/util/constant.js`.
Update these constants if your backend runs on a different host or port.

## Notes

- Ensure recruiter users are registered and logged in before accessing `/admin/job/create`.
- Company data should be available before creating a job.
- Applicant status updates are handled through the application API and should update immediately in the UI.
