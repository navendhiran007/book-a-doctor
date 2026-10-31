🏥 Book a Doctor
A Role-Based Healthcare Appointment Booking and Management Platform

<p align="center">
<strong>A Full-Stack MERN Application for Connecting Patients, Doctors, and Healthcare Administrators</strong>
</p>

<p align="center">
📘 <strong>Project Documentation:</strong>
<a href="https://drive.google.com/drive/folders/1lECpc1WkaxaIMLJEfghR42fDPfcWh8Hz?usp=sharing">View Complete Project Documentation</a>
<br/><br/>
<a href="https://github.com/navendhiran007/book-a-doctor">Repository</a> •
<a href="backend/">Backend</a> •
<a href="frontend/">Frontend</a> •
<a href="https://drive.google.com/drive/folders/1zTvhOIsNH-8Mz8xShseyUr-a_7F2ebs7?usp=sharing">Project Video</a>
</p>

<p align="center">
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p align="center">
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

📌 Table of Contents
Project Overview
Project Objectives
Key Features
User Roles
Technology Stack
System Architecture
Application Workflow
Database Architecture
API Documentation
Project Structure
Installation and Setup
Environment Configuration
Security and Authorization
Testing and Deployment
Future Enhancements
Project Documentation
Contributing
License
🚀 Project Overview

Book a Doctor is a full-stack healthcare appointment booking and management platform developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

The application provides a centralized platform where patients can discover doctors, explore professional profiles, request appointments, upload medical documents, and track appointment notifications.

It also provides dedicated dashboards for doctors and administrators to manage appointments, maintain professional information, review registrations, and monitor platform activities.

The system follows a role-based architecture with separate functionalities and access permissions for Patients, Doctors, and Administrators.

🎯 Problem Statement

Traditional healthcare appointment management often involves manual scheduling, limited access to doctor information, and inefficient communication between patients and healthcare providers.

Book a Doctor addresses these challenges by providing a digital appointment management solution that simplifies doctor discovery, appointment requests, and healthcare administration.

💡 Proposed Solution

The application introduces:

A centralized doctor discovery and appointment booking platform.
Secure authentication and role-based authorization.
Doctor registration and administrator approval workflows.
Appointment creation and status management.
Medical document uploading and management.
Notification management for appointment updates.
Administrative dashboards for monitoring platform activities.
🎯 Project Objectives
Develop a responsive and user-friendly healthcare appointment platform.
Implement secure user authentication using JWT.
Provide separate functionalities for patients, doctors, and administrators.
Simplify doctor discovery through specialization and location-based filtering.
Enable patients to request and track appointments.
Allow doctors to manage professional profiles and appointment requests.
Provide administrators with doctor approval and platform management capabilities.
Maintain healthcare-related documents with access restrictions.
✨ Key Features
👤 Patient Module
Patient registration and secure login.
Browse approved doctor profiles.
Search doctors by name, specialization, and location.
View doctor information and professional qualifications.
Request appointments with selected doctors.
Track appointment status.
Upload and manage medical documents.
Receive appointment notifications.
View personal appointment information.
👨‍⚕️ Doctor Module
Doctor registration and profile creation.
Administrator-based profile approval.
Manage professional information.
Update specialization, qualifications, experience, and consultation fees.
Maintain availability information.
View appointment information.
Manage appointment statuses.
Access associated medical documents.
Receive appointment-related notifications.
🛡️ Administrator Module
Secure administrator authentication.
View registered users.
View registered doctor profiles.
Approve or reject doctor registrations.
Manage doctor information.
View all platform appointments.
Monitor appointment statuses.
View platform statistics and dashboard counts.
Monitor pending doctor approval requests.
📅 Appointment Management
Create appointment requests.
Associate patients with doctors.
Maintain appointment dates and times.
Track appointment status.
Prevent certain duplicate pending or confirmed time-slot requests.
Generate notifications when appointment statuses change.

Supported appointment statuses:

Status	Description
Pending	Appointment request submitted
Confirmed	Appointment accepted
Rejected	Appointment request declined
Cancelled	Appointment cancelled
Completed	Appointment marked as completed
📁 Medical Document Management
Upload medical documents.
Support PDF, JPG, JPEG, PNG, DOC, and DOCX formats.
Maximum upload size: 10 MB.
Associate documents with doctors and appointments.
Download uploaded documents.
Delete document records and associated local files.
Apply role-based document access checks.
🔔 Notification Management
Generate appointment-related notifications.
Notify patients about appointment status changes.
Notify relevant users about doctor approval decisions.
View notification history.
Mark individual notifications as read.
Mark all notifications as read.
👥 User Roles and Permissions

The application implements three primary user roles.

Feature	Patient	Doctor	Admin
Register and Login	✅	✅	Backend-supported
Browse Doctors	✅	✅	✅
View Doctor Profiles	✅	✅	✅
Manage Own Profile	—	✅	—
Request Appointments	✅	—	—
Manage Appointment Status	—	✅	Admin API access
Upload Medical Documents	✅	Protected access	Protected access
View Notifications	✅	✅	According to ownership
Approve Doctors	❌	❌	✅
View All Users	❌	❌	✅
View Platform Statistics	❌	❌	✅
Manage Doctor Records	❌	Own profile	✅

Note: The table describes the intended role-based application workflows. Actual endpoint permissions are enforced by the backend middleware and controllers.

🛠️ Technology Stack

The project uses modern JavaScript technologies to implement a scalable full-stack web application.

Technology	Purpose
MongoDB	NoSQL database
Express.js	Backend REST API framework
React.js	Frontend user interface
Node.js	Server-side JavaScript runtime
Mongoose	MongoDB object modeling
Vite	Frontend development and build tool
React Router	Frontend navigation and routing
React Bootstrap	Responsive UI components
Bootstrap 5	Styling and responsive layouts
Axios	HTTP requests and API integration
JWT	Authentication and authorization
bcryptjs	Password hashing
Multer	File upload management
dotenv	Environment configuration
Nodemon	Backend development server reload
ESLint	Frontend code quality checks
🏗️ System Architecture

Book a Doctor follows a client-server architecture using the MERN technology stack.

The React frontend communicates with the Express backend through RESTful APIs. The backend handles authentication, authorization, business logic, database operations, and document uploads.

Architecture Diagram
mermaid
flowchart TD
    A["Users"] --> B["React Frontend"]
    B --> C["React Router"]
    C --> D["Axios API Client"]
    D --> E["Express.js REST API"]

    E --> F["Authentication Middleware"]
    F --> G["Role Authorization"]

    G --> H["Controllers"]

    H --> I["Mongoose Models"]
    I --> J[("MongoDB Database")]

    H --> K["Multer Upload Middleware"]
    K --> L[("Local File Storage")]

    H --> M["JSON API Responses"]
    M --> D
    D --> B

Architecture Components

1. Presentation Layer

React.js
React Router
React Bootstrap
Bootstrap

2. Communication Layer

Axios
REST API
JSON requests and responses
Multipart form-data requests

3. Backend Layer

Node.js
Express.js
Authentication middleware
Role authorization middleware
Controllers

4. Data Layer

MongoDB
Mongoose models
Local document storage
Request Processing Flow
The user interacts with the React application.
The frontend sends requests using Axios.
Express receives and processes the API request.
Authentication middleware verifies the JWT when required.
Role middleware checks the user's permissions.
Controllers execute application business logic.
Mongoose communicates with MongoDB.
The backend returns the appropriate JSON response.
🔄 Application Workflow

The application provides separate workflows for patients, doctors, and administrators.

Patient Appointment Workflow
mermaid
flowchart TD
    A["Patient Registration / Login"] --> B["Patient Dashboard"]
    B --> C["Browse Approved Doctors"]
    C --> D["Search and Filter Doctors"]
    D --> E["View Doctor Profile"]
    E --> F["Select Appointment Date and Time"]
    F --> G["Submit Appointment Request"]
    G --> H["Appointment Status: Pending"]
    H --> I["Doctor Reviews Request"]
    I --> J{"Doctor Decision"}
    J -->|Accept| K["Confirmed"]
    J -->|Reject| L["Rejected"]
    K --> M["Patient Receives Notification"]
    L --> M
    M --> N["Track Appointment"]

Doctor Approval Workflow
mermaid
flowchart TD
    A["Doctor Registration"] --> B["Create User Account"]
    B --> C["Create Doctor Profile"]
    C --> D["Approval Status: Pending"]
    D --> E["Administrator Reviews Profile"]
    E --> F{"Approval Decision"}
    F -->|Approve| G["Approved Doctor"]
    F -->|Reject| H["Rejected Doctor"]
    G --> I["Eligible for Public Listing"]
    H --> J["Registration Rejected"]
    G --> K["Notification"]
    H --> K

Appointment Sequence Diagram
mermaid
sequenceDiagram
    actor Patient
    participant UI as React Frontend
    participant API as Express API
    participant Auth as JWT Middleware
    participant DB as MongoDB

    Patient->>UI: Login
    UI->>API: POST /api/auth/login
    API->>DB: Verify user credentials
    DB-->>API: User information
    API-->>UI: JWT + User details

    Patient->>UI: Browse doctors
    UI->>API: GET /api/doctors
    API->>DB: Find approved doctors
    DB-->>API: Doctor profiles
    API-->>UI: Doctor list

    Patient->>UI: Request appointment
    UI->>API: POST /api/appointments
    API->>Auth: Verify JWT
    Auth-->>API: Authenticated user
    API->>DB: Validate and create appointment
    API->>DB: Create notifications
    API-->>UI: Appointment response
    UI-->>Patient: Display appointment status

🗄️ Database Architecture

The application uses MongoDB as its primary database and Mongoose for schema definitions and database interactions.

The project contains five main database models.

Database Collections
Collection	Description
Users	Stores patient, doctor, and administrator account information
Doctors	Stores professional doctor profile information
Appointments	Stores patient appointment requests and status
Documents	Stores medical document metadata and file references
Notifications	Stores user notifications and read status
Entity Relationship Diagram
mermaid
erDiagram
    USER ||--o| DOCTOR : "has"
    USER ||--o{ APPOINTMENT : "requests"
    DOCTOR ||--o{ APPOINTMENT : "receives"
    USER ||--o{ DOCUMENT : "uploads"
    DOCTOR ||--o{ DOCUMENT : "associated"
    APPOINTMENT ||--o{ DOCUMENT : "contains"
    USER ||--o{ NOTIFICATION : "receives"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string phone
        string role
        string profileImage
    }

    DOCTOR {
        ObjectId _id PK
        ObjectId userId FK
        string specialization
        string qualification
        string experience
        number consultationFee
        string location
        string about
        string availability
        string approvalStatus
    }

    APPOINTMENT {
        ObjectId _id PK
        ObjectId patientId FK
        ObjectId doctorId FK
        string appointmentDate
        string appointmentTime
        string reason
        string status
    }

    DOCUMENT {
        ObjectId _id PK
        ObjectId patientId FK
        ObjectId doctorId FK
        ObjectId appointmentId FK
        string fileName
        string filePath
        string fileType
        number fileSize
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId userId FK
        string message
        string type
        boolean readStatus
    }

Database Relationships
A user can have one associated doctor profile.
A patient can request multiple appointments.
A doctor can receive multiple appointment requests.
A patient can upload multiple medical documents.
Documents can optionally be associated with doctors and appointments.
A user can receive multiple notifications.
Important Validation Rules
User email addresses must be unique.
Passwords are hashed before storage.
User roles are restricted to patient, doctor, and admin.
Doctor approval values are pending, approved, and rejected.
Consultation fees cannot be negative.
Appointment statuses use predefined values.
Notification types use predefined values.
🔌 API Documentation

The backend exposes RESTful APIs for authentication, doctors, appointments, documents, notifications, and administration.

Base URL
text
http://localhost:5000


The frontend normally accesses the backend through /api.

Authentication APIs
Method	Endpoint	Access	Description
POST	/api/auth/register	Public	Register a new user
POST	/api/auth/login	Public	Authenticate user
GET	/api/auth/me	Protected	Retrieve current user information
Doctor APIs
Method	Endpoint	Access	Description
GET	/api/doctors	Public	Retrieve doctor listings
GET	/api/doctors/:id	Public	Retrieve doctor profile
POST	/api/doctors	Doctor/Admin	Create doctor profile
PUT	/api/doctors/:id	Doctor/Admin	Update doctor profile
DELETE	/api/doctors/:id	Admin	Delete doctor profile

Supported search parameters:

text
GET /api/doctors?name=John
GET /api/doctors?specialization=Cardiology
GET /api/doctors?location=Chennai
GET /api/doctors?status=approved

Appointment APIs
Method	Endpoint	Access	Description
POST	/api/appointments	Protected	Create appointment
GET	/api/appointments	Protected	Retrieve appointments
GET	/api/appointments/:id	Protected	Retrieve appointment details
PUT	/api/appointments/:id	Protected	Update appointment status
DELETE	/api/appointments/:id	Protected	Delete appointment (Admin)

Example appointment request:

json
{
  "doctorId": "DOCTOR_OBJECT_ID",
  "appointmentDate": "2026-11-05",
  "appointmentTime": "10:30 AM",
  "reason": "General health consultation"
}

Document APIs
Method	Endpoint	Access	Description
POST	/api/documents/upload	Protected	Upload medical document
GET	/api/documents	Protected	Retrieve documents
GET	/api/documents/:id/download	Protected	Download document
DELETE	/api/documents/:id	Protected	Delete document

Upload configuration:

Multipart field: document
Maximum file size: 10 MB
Supported formats: PDF, JPG, JPEG, PNG, DOC, DOCX.
Notification APIs
Method	Endpoint	Access	Description
GET	/api/notifications	Protected	Retrieve notifications
PUT	/api/notifications/:id/read	Protected	Mark notification as read
PUT	/api/notifications/read-all	Protected	Mark all notifications as read
Administrator APIs
Method	Endpoint	Access	Description
GET	/api/admin/users	Admin	Retrieve all users
GET	/api/admin/doctors	Admin	Retrieve all doctors
GET	/api/admin/appointments	Admin	Retrieve all appointments
GET	/api/admin/stats	Admin	Retrieve platform statistics
PUT	/api/admin/doctors/:id/approve	Admin	Approve doctor
PUT	/api/admin/doctors/:id/reject	Admin	Reject doctor
Authentication Header

Protected API requests require a valid JWT.

http
Authorization: Bearer YOUR_JWT_TOKEN

📂 Project Structure
text
book-a-doctor/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── documentController.js
│   │   └── notificationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Doctor.js
│   │   ├── Document.js
│   │   ├── Notification.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── documentRoutes.js
│   │   └── notificationRoutes.js
│   │
│   ├── uploads/
│   │   └── .gitkeep
│   │
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

Important Directories
Directory	Responsibility
backend/config/	Database connection configuration
backend/controllers/	Application business logic
backend/middleware/	Authentication, authorization, uploads, and error handling
backend/models/	MongoDB schemas and relationships
backend/routes/	REST API route definitions
backend/uploads/	Locally stored uploaded documents
frontend/src/components/	Reusable UI components
frontend/src/context/	Authentication and global application state
frontend/src/layouts/	Shared application layouts
frontend/src/pages/	Application pages and dashboards
frontend/src/services/	Axios API configuration and services
💻 Installation and Setup

Follow these instructions to run the application locally.

Prerequisites

Install the following software before starting:

Node.js 18 or later.
npm.
MongoDB Community Server or a MongoDB Atlas database.
Git.
A code editor such as Visual Studio Code.
Step 1: Clone the Repository
bash
git clone https://github.com/navendhiran007/book-a-doctor.git


Navigate to the project:

bash
cd book-a-doctor

Step 2: Install Backend Dependencies
bash
cd backend
npm install

Step 3: Install Frontend Dependencies

Open another terminal:

bash
cd book-a-doctor/frontend
npm install

Step 4: Configure Environment Variables

Navigate to the backend directory.

Windows PowerShell:

powershell
Copy-Item .env.example .env


macOS/Linux:

bash
cp .env.example .env


Update the .env file with your configuration.

Step 5: Start MongoDB

Make sure your MongoDB server is running.

Default development connection:

text
mongodb://localhost:27017/book_a_doctor


Alternatively, configure a MongoDB Atlas connection string using MONGO_URI.

Step 6: Start the Backend Server

From the backend directory:

bash
npm run dev


Default backend address:

text
http://localhost:5000

Step 7: Start the Frontend Application

From the frontend directory:

bash
npm run dev


Vite will display the frontend development URL in the terminal, commonly:

text
http://localhost:5173

Step 8: Access the Application

Open the frontend URL displayed by Vite in your browser.

The React frontend will communicate with the Express backend through the configured API URL.

⚙️ Environment Configuration
Backend Environment Variables

Create a .env file inside the backend/ directory.

env
PORT=5000

MONGO_URI=mongodb://localhost:27017/book_a_doctor

JWT_SECRET=your_unique_secure_jwt_secret

NODE_ENV=development

Variable	Description
PORT	Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret used for JWT signing and verification
NODE_ENV	Application environment
Frontend Environment Variables

Optionally create a .env file inside the frontend/ directory.

env
VITE_API_URL=http://localhost:5000/api


If this variable is not configured, the frontend API client defaults to /api.

Important: Never commit .env files or expose sensitive credentials in the repository.

🔐 Security and Authorization

The application implements several security mechanisms.

Authentication
JWT-based authentication.
Password hashing using bcryptjs.
Bearer-token verification.
Protected API endpoints.
Authentication state restoration through /api/auth/me.
Authorization
Role-based access control.
Administrator-only operations.
Doctor profile ownership checks.
Appointment access validation.
Document access validation.
Notification ownership validation.
File Upload Security
Multer-based file handling.
File extension restrictions.
Maximum upload size of 10 MB.
Access checks before document downloads.
Additional Production Recommendations

Before deploying the application in a production environment, consider implementing:

Strict CORS origin restrictions.
Rate limiting.
Security headers using Helmet.
Strong request validation.
Malware scanning for uploaded documents.
Secure private cloud storage.
Improved session and token management.
Audit logging and monitoring.
Regular database backups.

Healthcare data warning: Medical documents and personal information require appropriate privacy, security, and regulatory controls. The current repository should not be treated as a certified healthcare-compliance solution.

🧪 Testing and Deployment
Current Testing Status

The repository does not currently include an automated backend or frontend test suite.

The frontend provides the following available quality checks:

bash
cd frontend

npm run lint
npm run build


Backend development commands:

bash
cd backend

npm run dev
npm start

Deployment Preparation

Deployment configuration is not currently included in the repository.

Before deployment, configure:

Production MongoDB database.
Secure JWT secret.
Backend hosting environment.
Frontend hosting environment.
Production API URL.
HTTPS.
Restricted CORS settings.
Persistent private document storage.
Database backups and monitoring.
⚠️ Known Limitations

The following issues have been identified in the current implementation and should be addressed before production use.

Doctor detail endpoint: The getDoctorById controller references doctorId instead of req.params.id, which affects doctor profile retrieval.
Appointment relationships: Appointment creation and listing use different assumptions about doctor profile IDs and doctor user IDs. These relationships should be standardized.
Approval status consistency: Some controller logic uses capitalized approval values, while the Mongoose schema defines lowercase values. The implementation should use consistent status values.
Automated testing: No automated test suite is currently configured.
Deployment: No production deployment configuration or verified hosting URL is included.
Documentation assets: Actual application screenshots are not currently committed to the repository.
License: A root-level LICENSE file is not currently present.

These limitations are documented to distinguish implemented functionality from work that remains necessary.

🚀 Future Enhancements

The following features are potential improvements for future versions.

Online appointment payments and billing.
Email notifications and appointment reminders.
Video consultation functionality.
Doctor availability calendar.
Appointment cancellation and rescheduling improvements.
Password reset and account recovery.
Advanced doctor search and filtering.
Pagination and optimized database indexes.
Cloud-based medical document storage.
Automated unit and integration testing.
CI/CD pipeline integration.
Analytics and reporting dashboards.
Improved accessibility and responsive design.
Comprehensive audit logs and security monitoring.
📖 Project Documentation

Complete project documentation and supporting materials are available through the following links.

Resource	Link
GitHub Repository	View Source Code
Project Documentation	View Documentation
Project Video	Watch Project Video
Backend Source	Backend Directory
Frontend Source	Frontend Directory
🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

Fork this repository.
Create a new feature branch.
Implement your changes.
Test the application.
Commit your changes with a meaningful message.
Push your branch.
Submit a pull request.

Example:

bash
git checkout -b feature/new-feature

git add .

git commit -m "Add new feature"

git push origin feature/new-feature


Please avoid committing environment files, credentials, private medical documents, or generated dependencies.

📄 License

No root-level LICENSE file is currently included in this repository.

The backend package declares the ISC license, while the frontend package is marked private. Add an appropriate root license before distributing the complete project as an open-source application.

👨‍💻 Project Repository

Book a Doctor – Healthcare Appointment Management System

GitHub: navendhiran007/book-a-doctor

<p align="center">
<strong>Built with ❤️ using the MERN Stack</strong>
<br/>
<sub>Simplifying Healthcare Appointments Through Technology</sub>
</p>

Project Status: Development implementation documented. Production readiness and deployment have not been verified.
