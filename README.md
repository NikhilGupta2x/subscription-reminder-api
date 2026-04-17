# Subscription Reminder API

A REST API that sends automated email reminders before 
subscription renewal dates.

## Tech Stack
- Node.js + Express
- MongoDB Atlas
- BullMQ + Upstash Redis
- Nodemailer
- JWT Authentication

## Live URL
https://subscription-reminder-api.onrender.com

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/sign-up | Register a new user |
| POST | /api/v1/auth/sign-in | Login and get JWT token |
| POST | /api/v1/auth/sign-out | Logout user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/users | Get all users |
| GET | /api/v1/users/:id | Get user by ID |
| PUT | /api/v1/users/:id | Update user |
| DELETE | /api/v1/users/:id | Delete user |

### Subscriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/subscriptions | Get all subscriptions |
| GET | /api/v1/subscriptions/:id | Get subscription by ID |
| POST | /api/v1/subscriptions | Create subscription |
| PUT | /api/v1/subscriptions/:id/cancel | Cancel subscription |
| DELETE | /api/v1/subscriptions/:id | Delete subscription |
| GET | /api/v1/subscriptions/user/:id | Get user's subscriptions |
| GET | /api/v1/subscriptions/upcoming-renewals | Get upcoming renewals |