# medall
International Healthcare Hackathon 2025

# MedApp Project

MedApp is a comprehensive medical application that provides features such as user registration with OTP verification, medicine reminders, appointments scheduling, document management, a chatbot for medical inquiries, and family/doctor-patient connections. The project comprises a Django backend with RESTful APIs, Celery for scheduling and push notifications via mobile OS, and modern frontends (React for web and React Native/Expo for mobile).

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

MedApp aims to provide a seamless and secure healthcare management experience. Key features include:
- **User Registration & OTP Verification:** Users register with a unique username, mobile number, and password, verify their account via OTP.
- **Medicine Reminders:** Users can add medicine reminders with specified timings, take doses, refill when needed, and delete reminders.
- **Appointments:** Schedule and view upcoming appointments.
- **Profile & Document Management:** Upload and view medical documents.
- **Chatbot Integration:** A chatbot that leverages AI to answer medical queries.
- **Family & Connections:** Manage family members and doctor-patient connections.

## Technologies Used

- **Backend:** Django, Django REST Framework, JWT (SimpleJWT), Celery, Redis, PostgreSQL
- **Frontend (Web):** React, React Router
- **Mobile:** React Native with Expo, expo-notifications
- **Others:** boto3, requests

## Project Structure

A typical project structure looks like:

```
medapp/
├── medapp_backend/          # Django backend
│   ├── accounts/            # Custom user model, OTP, profile, etc.
│   ├── reminders/           # Reminders, appointments, and related tasks
│   ├── documents/           # Document management endpoints
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
└── medapp-mobile/           # Expo mobile app
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

### Environment Variables

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
  Make sure Redis, Celery worker, and Celery beat are running for scheduled tasks (like sending push notifications).

- **Web Frontend:**  
  The React app runs on [http://localhost:3000](http://localhost:3000).

- **Mobile App:**  
  Use Expo Go to test on your mobile device.

## Deployment Notes

- Configure production settings for Django (e.g., DEBUG=False, secure SECRET_KEY, proper ALLOWED_HOSTS).
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

---

This README provides detailed instructions and guidance, covering installation, setup, running the project, deployment, and collaboration tips.
