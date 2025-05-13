# 💼 Bankly – AI-Powered Banking API

**Bankly** is a modern, secure, and AI-integrated banking API that simulates real-world financial operations. It features user authentication, account management, transaction processing, and fraud detection using machine learning. Built with **TypeScript**, **Node.js**, and **PostgreSQL**, Bankly is designed for scalability, clarity, and portfolio demonstration.

> 🎯 This project is part of a professional backend development portfolio created for international internship applications in **tech**, **fintech**, and **AI research**.

---

## 🚀 Features

### ✅ Authentication & User Management
- User registration and login with **JWT** authentication
- Profile update and secure password reset flow

### 💳 Banking Operations
- Account creation and balance retrieval
- **Deposit**, **Withdraw**, and **Transfer** between accounts
- Filterable **Transaction history**

### 🤖 AI-Powered Fraud Detection
- Real-time fraud scoring on transactions
- Flags suspicious activity using **Hugging Face** models
- Logs stored in a `FraudLogs` table for monitoring

### 📄 API Documentation
- Full Swagger documentation available at `/api-docs`

---

## 🛠️ Tech Stack

| Layer         | Technology               |
|--------------|---------------------------|
| Language      | TypeScript (Node.js)      |
| Database      | PostgreSQL + Sequelize    |
| Auth          | JWT Tokens                |
| AI Integration| Hugging Face Transformers |
| Docs          | Swagger (OpenAPI)         |
| Testing       | Postman, Swagger UI       |

---

## 📌 API Endpoints Summary

### 🔐 Authentication
- `POST /signup` – Register a new user  
- `POST /login` – Login with email and password  
- `GET /me` – Fetch user profile  
- `PUT /update` – Update profile  
- `DELETE /delete` – Delete account  

### 💼 Transactions
- `POST /transactions/deposit/:accountId`  
- `POST /transactions/withdraw/:accountId`  
- `POST /transactions/transfer`  
- `GET /transactions` – View history  

### 🧠 Fraud Detection
- `GET /fraud-logs` – View flagged transactions (authenticated)

---

## 🧠 How AI Fraud Detection Works

Each transaction is sent to an AI model with custom fraud features such as:
- `userId`
- `amount`
- `accountAge`
- `transactionFrequency`

If flagged as suspicious, the transaction is logged for the user and admins to review.

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/debha-dev/Bankly.git
cd bankly
npm install
2️⃣ Set Up Environment Variables
Create a .env file:

env
Copy
Edit
PORT=5055
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_postgres_connection_string
HUGGING_FACE_API_KEY=your_api_key
3️⃣ Run the Server
bash
Copy
Edit
npm start
Visit http://localhost:5055/api-docs to view Swagger documentation.

🧪 Testing the API
Example: Register User
http
Copy
Edit
POST /signup
{
  "email": "jane@bankly.com",
  "password": "SecurePass123"
}
Example: Deposit Money
http
Copy
Edit
POST /transactions/deposit/:accountId
Headers:
  Authorization: Bearer <token>

Body:
{
  "amount": 5000,
  "description": "Monthly salary"
}
Example: Get Fraud Logs
http
Copy
Edit
GET /fraud-logs
Headers:
  Authorization: Bearer <token>
🌐 Deployment
The project will be deployed on Render to allow live testing without cloning.
🔗 A public link and demo credentials will be added here once deployed.

🤝 Contributing
Fork the repository

Create a new branch: git checkout -b feature-name

Commit your changes

Push and open a pull request

📄 License
This project is licensed under the MIT License.

📊 Project Status
✅ MVP Complete

⚙️ AI Fraud Detection Phase: In Progress

🌐 Render Deployment: Coming Soon