Certainly! Here’s an updated version of your README with a proper table of contents (index) added. The index links to the various sections within the document, making it easier to navigate.

---

# Job Application Approval Management System

A comprehensive web application designed to manage job application submissions and approvals in a sequential workflow (Reviewer1 → Reviewer2 → Reviewer3 → Approver). Users can submit their job applications with their personal details and CV, and these applications go through a multi-step review and approval process.

## Table of Contents

1. [Features](#features)
2. [Environment Variables](#environment-variables)
3. [Tech Stack](#tech-stack)
4. [Key Libraries Used](#key-libraries-used)
5. [Project Setup](#project-setup)
    1. [Clone the Repository](#1-clone-the-repository)
    2. [Install Backend Dependencies](#2-install-backend-dependencies)
    3. [Install Frontend Dependencies](#3-install-frontend-dependencies)
    4. [Set up Environment Variables](#4-set-up-environment-variables)
    5. [Run the Application](#5-run-the-application)
6. [Roles & Permissions](#roles--permissions)
7. [Application Workflow](#application-workflow)
8. [Authentication](#authentication)
9. [Sample Login Credentials](#sample-login-credentials)
10. [Remarks](#remarks)
11. [Future Enhancements](#future-enhancements)
12. [Contributing](#contributing)

---

## Features

- **Job Application Submission**: Users (Application Initiators) can submit their applications along with their details and CV.
- **Approval Workflow**: The application goes through a sequential review process involving three reviewers and an approver.
- **Reviewer & Approver Roles**: Reviewers and Approvers can approve or reject applications. They can also leave remarks that are visible to the application initiator.
- **Application Status**: The application initiator can view the status of their application at any time.
- **User Authentication**: All roles (Application Initiator, Reviewer, Approver) can securely log in with their credentials.
- **Role-Based Access Control**: Different users have different access permissions based on their role.

---

## Environment Variables

To run this project, create a `.env` file and add the following environment variables:

### Backend
```env
MONGODB_URI=your_mongodb_connection_string
PORT=port_number
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend
```env
VITE_API_URI=your_backend_api_url
VITE_UPLOAD_PRESENT=your_upload_present
VITE_CLOUDINARY_URI=your_cloudinary_url
```

---

## Tech Stack

- **Frontend:**
  - React.js (v18)
  - Redux Toolkit (for state management)
  - Material-UI (MUI) for design components
  - Axios for making HTTP requests
  - React Router for routing
  - JWT for authentication

- **Backend:**
  - Node.js
  - Express.js (v4.x)
  - MongoDB with Mongoose (for database)
  - Multer (for handling file uploads)
  - Bcrypt.js (for password hashing)
  - JSON Web Tokens (JWT) for authentication
  - Cloudinary for file storage

- **Database:**
  - MongoDB

---

## Key Libraries Used

### Backend
```bash
npm install express mongoose cors dotenv bcrypt jsonwebtoken multer cloudinary
```
- `express`: Web framework for Node.js
- `mongoose`: MongoDB ODM
- `cors`: Middleware for enabling Cross-Origin Request Sharing
- `dotenv`: Loads environment variables
- `bcrypt`: Password hashing library
- `jsonwebtoken`: For creating and verifying JWTs
- `multer`: Middleware for handling file uploads
- `cloudinary`: For uploading files to Cloudinary.

### Frontend
```bash
npm install react-router-dom react-redux @reduxjs/toolkit axios @mui/material @mui/icons-material @mui/x-data-grid jwt-decode
```
- `react-router-dom`: For routing in React applications
- `axios`: For making HTTP requests
- `@reduxjs/toolkit`: For state management with Redux
- `react-redux`: For connecting React to Redux
- `@mui/material`: For Material-UI components
- `@mui/icons-material`: For Material-UI icons
- `@mui/x-data-grid`: For data tables
- `jwt-decode`: To decode JWTs for frontend authentication

---

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/IshantSomani/job_application_approval_system.git
cd job_application_approval_system
```

### 2. Install Backend Dependencies
Navigate to the `backend` directory and install the necessary packages:
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
Navigate to the `frontend` directory and install the necessary packages:
```bash
cd frontend
npm install
```

### 4. Set up Environment Variables
Create a `.env` file in both the `backend` and `frontend` directories and add the appropriate environment variables as described above.

### 5. Run the Application

#### Backend
To start the backend server, run:
```bash
cd backend
npm start
```

#### Frontend
To start the frontend development server, run:
```bash
cd frontend
npm run dev
```

---

## Roles & Permissions

- **Application Initiator (Job Seeker)**:  
  - Can submit job applications with personal details and a resume (CV).
  - Can view the status of their application.
  - Can view remarks from reviewers and the approver.

- **Reviewer**:  
  - Can view all the details of an application including the resume.
  - Can approve or reject the application with remarks.
  - There are 3 reviewers in the system (Reviewer1, Reviewer2, Reviewer3).

- **Approver**:  
  - Can view the final details of an application after it passes through all reviewers.
  - Can approve or reject the application with remarks.
  - Final decision-making authority.

---

## Application Workflow

1. **Submission**: The Application Initiator submits a job application.
2. **Reviewers' Process**: The application is reviewed sequentially by three reviewers (Reviewer1 → Reviewer2 → Reviewer3).
3. **Approval**: After the reviewers approve the application, the final approver can approve or reject it.
4. **Status Updates**: The Application Initiator is notified of the status and any remarks made by the reviewers and approver.

---

## Authentication

- **JWT Authentication** is used to secure the application.
- **Login** is required for all users (Application Initiator, Reviewer, Approver).
- After successful login, JWT tokens are issued and used for subsequent requests.

---

## Sample Login Credentials

You can use the following credentials to log in as different users:

### Approver 1 (Final decision-maker)
- **Email**: `approver1@gmail.com`
- **Password**: `123`

### Approver (Final decision-maker)
- **Email**: `approver@gmail.com`
- **Password**: `123`

---

### Reviewer 1
- **Email**: `reviewer1@gmail.com`
- **Password**: `123`

### Reviewer (Review applications)
- **Email**: `reviewer@gmail.com`
- **Password**: `123`

---

### Application Initiator (User)
- **Email**: `user@gmail.com`
- **Password**: `123`

---

## Remarks

- Reviewers and the Approver can leave remarks on applications, which will be visible to the Application Initiator.
- The application initiator can track the status of their application at all times, seeing each step of the review process.

---

## Future Enhancements

- Add email notifications for status updates.
- Implement more granular role-based access control for different permission levels.
- Add a dashboard for admins to monitor the overall status of all applications.

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

By following the above setup and guidelines, you will be able to run and contribute to the **Job Application Approval Management System** project.