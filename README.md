# medall
International Healthcare Hackathon 2025

# MedApp Project

MedApp is a comprehensive medical application that provides features such as user registration with OTP verification, medicine reminders, appointment scheduling, document management, an AI-powered chatbot for medical inquiries, and family/doctor-patient connections. The project comprises a Django backend with RESTful APIs (using JWT for authentication, Celery for background tasks, and Redis as a message broker), a modern React web frontend, and a React Native/Expo mobile app.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migrations](#database-migrations)
  - [Celery and Redis Setup](#celery-and-redis-setup)
- [Frontend Setup](#frontend-setup)
  - [Web Frontend (React)](#web-frontend-react)
  - [Mobile App (Expo)](#mobile-app-expo)
- [Running the Application](#running-the-application)
- [Deployment Notes](#deployment-notes)
- [Collaboration Guidelines](#collaboration-guidelines)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

MedApp aims to provide a seamless, secure, and user-friendly healthcare management experience. Key features include:

- **User Registration & OTP Verification:**  
  Users register with a unique username, mobile number, and password. They verify their account via an OTP sent to their phone.
  
- **Medicine Reminders:**  
  Users can add medicine reminders with specified timings, mark doses as taken, refill tablets when needed, and delete reminders. Data is stored persistently in the backend.
  
- **Appointments:**  
  Users can schedule and view upcoming appointments.
  
- **Profile & Document Management:**  
  Users can set up and update their profile, upload/view medical documents, and manage their medical records.
  
- **Chatbot Integration:**  
  An AI-powered chatbot (integrated with a locally running LLM via Ollama) answers medical inquiries.
  
- **Family & Connections:**  
  Manage family members and doctor-patient connections, enabling secure sharing of medical documents and information.

## Technologies Used

- **Backend:**  
  Django, Django REST Framework, SimpleJWT, Celery, Redis, PostgreSQL, Requests
- **Frontend (Web):**  
  React, React Router
- **Mobile:**  
  React Native with Expo, expo-notifications
- **Others:**  
  boto3, axios

## Project Structure

A typical project structure is as follows:

```
medapp/
├── medapp_backend/          # Django backend
│   ├── accounts/            # Custom user model, OTP verification, profile, family & connection endpoints
│   ├── reminders/           # Medicine reminders & appointments endpoints
│   ├── documents/           # Document management endpoints
│   ├── chatbot/             # Chatbot endpoints (LLM integration via Ollama)
│   ├── medapp_backend/      # Django settings, urls, wsgi/asgi, celery.py, etc.
│   ├── manage.py
│   └── requirements.txt
├── medapp-frontend/         # React web frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── RegistrationPage.js
│   │   │   ├── OTPVerificationPage.js
│   │   │   ├── ProfileSetupPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── RemindersPage.js
│   │   │   ├── AppointmentsPage.js
│   │   │   ├── DocumentManagementPage.js
│   │   │   ├── ChatbotScreen.js
│   │   │   ├── FamilyPage.js
│   │   │   └── ConnectionsPage.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── medapp-mobile/           # Expo mobile app #currently incomplete
    ├── App.js
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── RegistrationScreen.js
    │   ├── OTPScreen.js
    │   ├── ProfileSetupScreen.js
    │   ├── LoginScreen.js
    │   ├── HomeScreen.js
    │   ├── RemindersPage.js
    │   ├── AppointmentsPage.js
    │   ├── DocumentManagementPage.js
    │   ├── ChatbotScreen.js
    │   ├── FamilyPage.js
    │   └── ConnectionsPage.js
    ├── package.json
    └── app.json
```

## Prerequisites

- **Python 3.8+** (preferably 3.10 or later)
- **Node.js 14+** (for frontend development)
- **Redis** (for Celery message broker)
- **PostgreSQL** (or another supported database)
- **Git** (for version control)

## Backend Setup

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/medapp.git
   cd medapp/medapp_backend
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Environment Variables(commented out in development right noow no need to configure)

Create a `.env` file (or configure your environment) with necessary variables. For example:

```ini
DEBUG=True
SECRET_KEY=your_secret_key_here
DATABASE_URL=postgres://medalluser:asdfghjkl@localhost:5432/medalldb
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

Ensure your Django settings load these variables (using packages like `django-environ` is recommended).

### Database Migrations

Run the following commands:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Celery and Redis Setup

1. **Ensure Redis is installed and running.**  
   On Ubuntu/WSL:
   ```bash
   sudo apt update && sudo apt install redis-server
   sudo systemctl start redis-server
   sudo systemctl enable redis-server
   ```

2. **Start Celery Worker:**
   ```bash
   celery -A medapp_backend worker --loglevel=info
   ```

3. **Start Celery Beat:**
   ```bash
   celery -A medapp_backend beat --loglevel=info
   ```

## Frontend Setup

### Web Frontend (React)

1. **Navigate to the frontend folder:**
   ```bash
   cd ../medapp-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

### Mobile App (Expo)

1. **Navigate to the mobile folder:**
   ```bash
   cd ../medapp-mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo app:**
   ```bash
   npx expo start
   ```
   Use the Expo Go app on your mobile device to scan the QR code.

## Running the Application

- **Backend:**  
  Start the Django server:
  ```bash
  python manage.py runserver
  ```
  Ensure Redis, Celery worker, and Celery beat are running for scheduled tasks(code currently commented out for development).

- **Web Frontend:**  
  The React app runs on [http://localhost:3000](http://localhost:3000).

- **Mobile App:**  
  Use Expo Go to test on your mobile device.(incomplete)

## Deployment Notes

- Configure production settings for Django (e.g., `DEBUG=False`, secure `SECRET_KEY`, proper `ALLOWED_HOSTS`).
- Set up a production message broker (Redis) and configure Celery appropriately.
- Use a CI/CD pipeline for automated testing and deployment.
- For mobile, build and publish via Expo to the Apple App Store and Google Play Store.

## Collaboration Guidelines

- **Git Workflow:**  
  Use feature branches and pull requests for collaboration.
- **Code Style:**  
  Follow PEP 8 for Python and a consistent style for JavaScript/React.
- **Documentation:**  
  Update this README and inline comments as features evolve.
- **Issue Tracking:**  
  Use GitHub Issues/Projects to manage tasks and bugs.

## Troubleshooting

- **Migrations Fail:**  
  Double-check your environment variables and database settings.
- **Celery/Redis Issues:**  
  Verify that Redis is running and check logs for errors.
- **Push Notifications:**  
  Ensure your mobile device is a physical device (push notifications do not work on simulators/emulators for iOS) and check Expo documentation.
- **Chatbot Issues:**  
  - Ensure your locally running LLM (Ollama) is accessible on the correct port.
  - Verify that the payloads match the API requirements.
  - Use browser developer tools (Network tab) to debug API requests.
- **Profile/Document/Reminder Endpoints:**  
  Ensure that your frontend is sending the correct field names and that your backend models and serializers match those names.


This README provides an in-depth guide covering installation, environment setup, project structure, running the application, deployment notes, collaboration guidelines, and troubleshooting. Let me know if you need further modifications or additional sections!
