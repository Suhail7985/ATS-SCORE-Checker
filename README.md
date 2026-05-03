# ATS Score Checker

## 📌 Project Overview
The **ATS Score Checker** is a MERN stack web application that allows users to upload resumes and compare them against job descriptions to determine 
how well their resume matches the job. The system analyzes key resume sections, extracts keywords, and provides an ATS (Applicant Tracking System) compatibility score.

---

## 🚀 Live Demo
Live Link**=  https://cvglass.onrender.com/
---

## 🛠️ Tech Stack
### **Frontend** (React)
- React.js
- React Router
- Axios
- Framer Motion (for animations)
- Lucide-react (icons)

### **Backend** (Node.js + Express)
- Express.js
- MongoDB Atlas
- Multer (for file uploads)
- pdf-parse (to extract text from PDFs)
- mammoth (to extract text from DOCX)
- Natural (for keyword extraction and stemming)
- CORS (Cross-Origin Resource Sharing)

### **Database**
- MongoDB Atlas (Cloud-based NoSQL database)

---

## 📂 Project Structure
### **Backend**
```
📦 backend/
├── 📄 server.js         # Main entry point
├── 📄 db.js             # Database connection
├── 📂 routes/
│   ├── resumeRoutes.js  # Resume processing API
│   ├── jobRoutes.js     # Job-related APIs (if needed)
├── 📂 middleware/
│   ├── authMiddleware.js  # (If authentication is needed)
├── 📂 models/
│   ├── Resume.js        # Resume schema
│   ├── User.js          # User schema (if needed)
├── 📂 uploads/          # Resume file storage
├── 📄 .env              # Environment variables
├── 📄 package.json      # Dependencies
```

### **Frontend**
```
📦 frontend/
├── 📂 src/
│   ├── 📂 components/   # Reusable UI components
│   ├── 📂 pages/        # UploadPage.js, ResultsPage.js
│   ├── 📂 services/     # API calls (api.js)
│   ├── 📄 App.js        # Main React component
│   ├── 📄 index.js      # React entry point
├── 📄 package.json      # Dependencies
```

---

## ⚙️ Setup Instructions
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Suhail7985/ATS-SCORE-Checker.git
cd ATS-SCORE-Checker
```

### 2️⃣ **Backend Setup**
```sh
cd backend
npm install   # Install dependencies
```

#### Create a `.env` file in the `backend` folder and add:
```sh
MONGO_URI=your-mongodb-uri
PORT=3000
```

#### Run the backend server:
```sh
npm start
```

### 3️⃣ **Frontend Setup**
```sh
cd frontend
npm install   # Install dependencies
npm start     # Start React frontend
```

---

## 🔥 Features
✅ **Resume Upload:** Supports PDF and DOCX formats.
✅ **Job Description Input:** Users can provide job descriptions for keyword matching.
✅ **ATS Score Calculation:** Analyzes and scores the resume based on keyword matches and formatting.
✅ **Detailed Results:** Displays missing and matched keywords, section-wise scores.
✅ **Mobile Responsive:** Works perfectly on desktops & mobile devices.

---

## 📜 API Endpoints
### **Backend API Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/resume/upload` | Upload resume and analyze ATS score |
| **GET** | `/` | Check if backend is running |

---

## 💡 Future Enhancements
🚀 **AI-based Resume Suggestions**  
🚀 **More ATS Simulation Features**  
🚀 **User Authentication & Dashboard (Optional)**

---



