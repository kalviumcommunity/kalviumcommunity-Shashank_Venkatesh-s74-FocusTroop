# FocusTroop

## Overview

**FocusTroop** is a modern, minimalistic Pomodoro-based productivity web app designed to help individuals and teams stay focused in today’s distraction-heavy world. It brings together the structure of the Pomodoro technique with real-time collaboration features.

The platform offers two focus modes:
- **Solo Mode**: A classic Pomodoro timer for individual deep work sessions.
- **Group Mode**: Enables real-time collaboration with teammates in a shared focus session. Users can create or join rooms, track tasks, and chat to stay coordinated.

FocusTroop is built to foster a distraction-free environment for both solo and group productivity.

---

## Key Features

-  **Universal Pomodoro Timer**: Synchronized timer for group sessions and standard timer for solo users.
-  **Customizable Timers**: Set your own focus, short break, and long break durations.
-  **Group Rooms**: Create or join rooms using unique codes to work together in real-time.
-  **Task Management**: Assign tasks and check off completed items during a session.
-  **Group Chat**: Stay connected and motivated with your team via integrated chat.
-  **White Noise Option**: Optional background sound for better concentration.
-  **Notifications & Alarms**: Stay on track with sound alerts and browser notifications.
-  **Clean UI**: Minimal, distraction-free interface for better focus.
-  **Authentication**: Login/Signup system for personalized productivity tracking.

---

## Tech Stack

| Tech                | Usage                        |
|---------------------|------------------------------|
| **Frontend**        | React.js                     |
| **Styling**         | Tailwind CSS                 |
| **Routing**         | React Router                 |
| **State Management**| Redux                        |
| **Backend**         | Node.js + Express.js         |
| **Database**        | MongoDB                      |
| **Authentication**  | JWT (JSON Web Tokens)        |
| **Hosting**         | Vercel (Frontend), Render (Backend) |

---

## Why This Project

After nearly 4 years of using the Pomodoro technique, I've seen both its strengths and its limits.

When I was younger, I had no phone—no distractions—just pure focus. But as I grew older, distractions crept in. Even while using Pomodoro, I'd open YouTube or lose track while trying to communicate with teammates.

That’s when the idea hit me:

> **Why not evolve the Pomodoro technique to fit today’s connected world?**

I’m building a solution with:

-  A universal Pomodoro timer that syncs across users  
-  A chat section to coordinate in real time  
-  A task section to assign and track team responsibilities  
-  A minimalistic, distraction-free design to keep the focus intact  

**Focus shouldn't be a solo act. Let’s make deep work collaborative and clean.**

---

## Milestone 1: Full Stack Development Environment Setup

This milestone establishes the baseline infrastructure for both the backend and frontend development environments, enabling rapid iteration and stable integration.

---

### Objectives
- Scaffold and configure backend (Express + MongoDB + Socket.IO).
- Bootstrap frontend (React) with essential dependencies.
- Enable cross-origin support and real-time communication setup.

---

## Milestone-2 - Completed Tasks

- Added **User Schema Model** for storing user details.
- Configured **dotenv** to manage environment variables (`.env`).
- Established connection with **MongoDB** using Mongoose.
- Created a **signup route** using Express **Router** in `routes/Auth.js`.
- Used **bcrypt** to hash passwords securely before storing in the database.
- Implemented **JWT (JSON Web Token)** for authentication.
- Successfully connected the signup route at `POST /api/auth/signup`.
- Tested route with Postman/Thunder Client using a sample JSON request:
  
---

## Milestone-3 - Authentication - Login Feature
# User Login Implemented

- Secure login using bcrypt for password verification.
- JWT token issued on successful authentication.
- Proper error handling and status codes.
- Response includes token and user data (excluding password).
