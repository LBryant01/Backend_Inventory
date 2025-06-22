# Backend Inventory Manager

This is the backend for an inventory management application. It allows users to register, log in, and manage their personal inventory of items. The API is built using **Node.js**, **Express**, and **MongoDB**, with secure authentication handled via **JWT** and **bcrypt**.

---

## Features

- User registration and login with hashed passwords
- JWT-based authentication and authorization
- CRUD operations for inventory items
- Each user can manage their own items and view all items
- Input validation and error handling
- Environment-based configuration with `.env` support

---

## Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- CORS

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas or local)
- 
### Enviroment Variables
- PORT=5000
- No_No= Your MongoDB URI
- SUPRA_SECURE= Your JWT Signature
- CLIENT_URL=http://localhost:3000

### Installation

```bash
git clone https://github.com/LBryant01/Backend_Inventory.git
cd Backend_Inventory
npm install
```

### Running Server
```bash
- npm start
```
