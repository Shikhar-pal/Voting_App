# Voting App 🗳️

A full-stack online voting application built using **Node.js, Express.js, MongoDB Atlas, React, and JWT Authentication**. The platform enables secure user authentication, candidate management, and online voting through a responsive web interface.

## 🚀 Features

* User Registration and Login
* JWT-based Authentication & Authorization
* Role-Based Access Control (Admin & Voter)
* Candidate Management System
* Secure Voting Mechanism
* MongoDB Atlas Cloud Database Integration
* RESTful API Architecture
* Responsive User Interface
* Protected Routes and Token Verification

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* bcrypt.js
* CORS
* dotenv

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* CSS / Tailwind CSS

---

## 📂 Project Structure

```text
Voting_App/
│
├── frontend/
│
├── models/
│   ├── user.js
│   └── candidate.js
│
├── routes/
│   ├── userRoutes.js
│   └── candidateRoutes.js
│
├── middleware/
│
├── db.js
├── jwt.js
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Example:

```env
PORT=3000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/voting_app
JWT_SECRET=your_secret_key
```

---

## 📥 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Voting_App.git
cd Voting_App
```

### Install Dependencies

```bash
npm install
```

### Start the Backend Server

```bash
npm start
```

Server runs at:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### User Routes

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | /user/signup  | Register a new user |
| POST   | /user/login   | Login user          |
| GET    | /user/profile | Get user profile    |

### Candidate Routes

| Method | Endpoint                     | Description          |
| ------ | ---------------------------- | -------------------- |
| POST   | /candidate                   | Add candidate        |
| GET    | /candidate                   | Get all candidates   |
| POST   | /candidate/vote/:candidateId | Vote for a candidate |

---

## 🌐 Deployment

### Backend

* Render

### Database

* MongoDB Atlas

### Frontend

* Netlify
* Vercel

---

## 👨‍💻 Author

**Shikhar Pal**

Galgotias College of Engineering and Technology


---

## 📄 License

This project is developed for educational and learning purposes.
