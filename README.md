Bankly – AI-Powered Banking API
Overview
Bankly is a modern, secure, and AI-powered banking API that handles user authentication, account management, transactions, and fraud detection. Built with TypeScript, Node.js, and PostgreSQL, Bankly simulates core banking operations and integrates machine learning to flag suspicious activity using Hugging Face models.

This project is part of a professional backend portfolio, designed to showcase backend development skills for international internship applications in tech, fintech, and research.

Features
✅ Authentication & User Management
User Sign Up & Login with JWT authentication

Password Reset flow

💳 Banking Operations
Account Creation & Retrieval

Deposit, Withdraw, and Transfer between accounts

Transaction History with filtering

🤖 AI-Powered Fraud Detection
Real-time fraud risk analysis on transactions

Fraud logs stored for audit and monitoring

Uses Hugging Face models with custom fraud features

🧾 Documentation
Full Swagger documentation at /api-docs

Tech Stack
Layer	Tech
Language	TypeScript (Node.js)
Database	PostgreSQL (via Sequelize)
Auth	JWT Tokens
AI Integration	Hugging Face
Docs	Swagger (OpenAPI)
Testing	Postman, Swagger UI

API Endpoints Summary
🔐 Auth
POST /signup

POST /login

GET /me

PUT /update

DELETE /delete

💼 Transactions
POST /transactions/deposit/:accountId

POST /transactions/withdraw/:accountId

POST /transactions/transfer

GET /transactions

🧠 Fraud Detection
GET /fraud-logs (for authenticated users)

How AI Fraud Detection Works
Every transaction is checked against an AI model using features like:

userId

amount

accountAge

transactionFrequency

If a transaction is flagged, it's logged to the FraudLogs table and returned to the user as a warning.

Getting Started
📦 Clone and Setup
bash
Copy code
git clone https://github.com/debha-dev/Bankly.git
cd bankly
npm install
⚙️ Environment Variables
Create a .env file:

env
Copy code
PORT=5055
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_postgres_connection_string
HUGGING_FACE_API_KEY=your_api_key
🚀 Start the Server
bash
Copy code
npm start
Go to http://localhost:5055/api-docs to view Swagger documentation.

Testing the API
Example: Register a New User
http
Copy code
POST /signup
{
  "email": "jane@bankly.com",
  "password": "SecurePass123"
}
Example: Deposit Money
http
Copy code
POST /transactions/deposit/:accountId
Headers: Authorization: Bearer <token>
Body:
{
  "amount": 5000,
  "description": "Monthly salary"
}
Example: Get Fraud Logs
http
Copy code
GET /fraud-logs
Headers: Authorization: Bearer <token>
Deployment
The project will be deployed on Render soon so others can test the live API without needing to clone or run the server locally.

A public API link and demo credentials will be added here after deployment.

Contributing
Feel free to:

Fork the repo

Create a feature branch: git checkout -b feature-x

Commit and push your changes

Submit a pull request

License
Licensed under the MIT License.

Project Status
✅ MVP Complete
🚧 AI Fraud Detection Phase in Progress
🌐 Render Deployment Coming Soon

