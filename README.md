# FemTech 🌸
### **“Your Health. Your Pattern. Your FemTech.”**

**FemTech** is an AI-IoT based, full-stack women’s health and wellness platform designed with tailored experiences across distinct life stages—from childhood body awareness (Age 8) and puberty education (Age 12), to teenage wellness and comprehensive adult reproductive health.

---

## 📑 Table of Contents
1. [Key Features](#-key-features)
2. [Age-Based Personalization Engine](#-age-based-personalization-engine)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started & Installation](#-getting-started--installation)
6. [Environment Configuration (.env)](#-environment-configuration-env)
7. [API Endpoints Reference](#-api-endpoints-reference)
8. [Medical Safety & Disclaimers](#-medical-safety--disclaimers)
9. [Zero-Friction Offline / Demo Resilience](#-zero-friction-offline--demo-resilience)

---

## 🌟 Key Features

### 1. Animated Splash Screen
- Pulsing floral heart FemTech emblem and brand introduction before smooth transition to authentication.

### 2. Professional Authentication & Onboarding
- Full demographic registration: Name, Age, DOB, Email, Phone, Emergency SOS contact, and Preferred Language (**English, தமிழ், हिन्दी, తెలుగు**).
- Optional clinical onboarding: Blood group, medical conditions, allergies, current & past medications, surgical history, and physician details.
- Secure bcrypt password hashing and JWT persistence.

### 3. Multilingual AI Health Assistant
- **Languages**: Natural conversation in English, தமிழ் (Tamil), हिन्दी (Hindi), and తెలుగు (Telugu).
- **Multimodal Inputs**:
  - **Text**: Intuitive chat message bubbles.
  - **Voice**: In-browser speech recording with Start, Pause, Resume, Stop, Duration Timer, and Delete controls.
  - **Image / Photo Upload**: Medical prescription & report image preview before sending.
  - **Document Upload**: PDF lab report attachments.
- **Triage & Emergency Detection**: Immediate high-priority emergency card for severe bleeding, breathing difficulty, chest pain, or seizures, linking to national emergency ambulance (108 / 112) and designated emergency contacts.
- **Doctor Consultation Follow-ups**: Systematic questions on symptom duration, pain level (0-10), location, and cycle phase.

### 4. DigiLocker-Style "My Health Vault"
- Organized folders: *Medical Reports, Prescriptions, Lab Results, Blood Tests, Scan Reports, Ultrasound Reports, Thyroid Reports, PCOS/PCOD Reports, Pregnancy Records, Vaccination Records, Doctor Prescriptions, Previous Medical Records, Other Documents*.
- Actions: Upload (PDF, JPG, PNG), in-modal preview, download, rename, folder move, and secure deletion.
- Metadata: File size, medical date, treating doctor, clinic/hospital, and notes.

### 5. Period / Menstrual Cycle Tracker
- Monthly calendar with color-coded day states:
  - **Pink**: Period days
  - **Lavender**: Predicted next period days
  - **Light Red**: Logged symptoms (cramps, headaches)
  - **Blue/Purple**: Wellness logs
- Calculates current cycle day and days until estimated next period.

### 6. Interactive Clinical Wellness Questionnaires
- **Thyroid Wellness Check**: 8 guided questions (Yes/No/Sometimes), symptom summary, and medical consultation guidance.
- **PCOS / PCOD Awareness Check**: 8 hormonal and cycle indicators with non-diagnostic lifestyle recommendations.
- **Pregnancy Wellness & Pregnancy Mode**: Symptom screening plus gestational week calculator, due date tracker, and prenatal doctor appointment logger.

### 7. Daily Wellness Log
- **Mood**: 9 expressive emojis (Happy, Calm, Normal, Sad, Angry, Stressed, Anxious, Tired, Energetic).
- **Pain**: 0–10 severity slider with anatomical location tagging (Head, Back, Abdomen, Lower abdomen, Legs, Breast, Other).
- **Water**: 8-glass water tracker with `+` and `-` controls.
- **Sleep & Energy**: Bedtime, wake time, total sleep hours, and 5-tier energy scale.
- **Medication Adherence**: Daily "Did you take your medication?" confirmation.
- **Private Journal**: Personal reflections ("How are you feeling?", "What are you thinking?").

### 8. IoT Wearable & Web Bluetooth Telemetry
- Ready for the Web Bluetooth API with realistic animated demo telemetry fallback.
- Live animated ECG heart wave curve, Blood Pressure (mmHg), HRV (ms), Skin Temperature (°C), Step count, Calories, and Running/Jogging distances.

### 9. Wellness Trends
- Visual graphs for Hydration consistency, Pain patterns, Sleep duration, and Step activity across Daily, Weekly, and Monthly views.

### 10. Nearby Care Facilities
- GPS-assisted locator for nearby maternity & women’s hospitals and 24/7 pharmacies with contact numbers, addresses, distances, and 1-tap "Open in Maps" directions.

### 11. Privacy Centre & Settings
- HIPAA/GDPR-aligned data management: Inspect stored records, export summaries, clear AI conversation transcripts, change password, or permanently delete account.
- Theme customizer (*Soft Pink*, *Light Lavender*) and accessibility toggles (*Larger Text*, *High Contrast*).

---

## 👧 Age-Based Personalization Engine

The user experience automatically adapts based on the user's age:

| Age Bracket | Experience Name | Educational Curriculum |
| :--- | :--- | :--- |
| **Around Age 8** | **Growing Up & Body Basics** | Child-friendly biology, healthy hygiene habits, bodily privacy (swimsuit rule), safe vs. unsafe touch, trusted adults circle, how to ask for help, and "Watch & Learn" animated video cards. |
| **Around Age 12** | **Understanding Puberty & Periods** | What puberty is, physical changes, breast development, first period (menarche) guide, menstrual cycle basics, sanitary pad usage & change frequency (every 4–6 hours), period pain coping, and a **comprehensive guide to normal vs. medical-advice vaginal discharge**. |
| **Teens (13–19)** | **Teen Wellness Hub** | Menstrual regularity, PMS management, acne & hormone skincare, iron nutrition, sleep hygiene, digital stress, PCOS/thyroid awareness, and reproductive safety. |
| **Adults (20+)** | **Adult Health Hub** | Cycle optimization, fertility awareness, PCOS & thyroid management, pregnancy mode, cervical cancer screening (Pap smears), breast self-exams, contraception awareness, and mental resilience. |

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Design System**: Soft pink/rose glassmorphism (`#FFF0F5`, `#FFE4E1`, `#FB7185`, `#E11D48`), custom CSS variables, and responsive mobile bottom navigation.

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs password hashing
- **File Uploads**: Multer (PDF, JPG, PNG, Audio)
- **Zero-Config Resiliency**: Built-in fallback to `mongodb-memory-server` if local MongoDB is not running, ensuring immediate zero-setup evaluation.

---

## 📁 Project Structure

```text
FemTech/
│
├── frontend/                     # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AgePersonalization/ # Age 8, Age 12, Teen, Adult views
│   │   │   ├── AIAssistant/        # Multilingual chat with voice & doc upload
│   │   │   ├── Assessments/        # Thyroid, PCOS, and Pregnancy checks
│   │   │   ├── Auth/               # Login & Registration modal
│   │   │   ├── common/             # Navbar, Sidebar, MobileNav, EmergencyModal
│   │   │   ├── CycleTracker/       # Menstrual calendar & day calculator
│   │   │   ├── DailyLog/           # Mood, pain slider, water counter, journal
│   │   │   ├── Dashboard/          # Personalized greeting & summary tiles
│   │   │   ├── HealthVault/        # DigiLocker-style medical document storage
│   │   │   ├── MedicalProfile/     # Demographics, allergies & doctor info
│   │   │   ├── Medications/        # Current & history medication tracker
│   │   │   ├── NearbyCare/         # Hospitals, pharmacies & emergency helplines
│   │   │   ├── PrivacyCentre/      # Data transparency & account deletion
│   │   │   ├── Settings/           # Theme, accessibility & notifications
│   │   │   └── Splash/             # Animated brand splash screen
│   │   ├── context/                # Auth, Multilingual (EN, TA, HI, TE), Theme
│   │   ├── services/               # API client service
│   │   ├── App.jsx                 # View dispatcher & layout
│   │   ├── index.css               # Soft pink design system & variables
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express API server
│   ├── config/
│   │   └── db.js                 # MongoDB connection with in-memory fallback
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── upload.js             # Multer upload handler for PDFs and images
│   ├── models/                   # 11 Mongoose Schemas (User, Cycle, Vault, etc.)
│   ├── routes/                   # RESTful API route controllers
│   ├── uploads/                  # Secure file storage folder
│   ├── package.json
│   └── server.js                 # Server entrypoint
│
├── .env.example                  # Environment configuration template
├── package.json                  # Root orchestration package.json
└── README.md                     # Platform documentation
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- *(Optional)* MongoDB running locally or a MongoDB Atlas connection string. If MongoDB is not present, FemTech automatically switches to in-memory mode so you can test immediately.

### Step 1: Clone or Open the Project
Open the `FemTech` folder in your terminal or VS Code.

### Step 2: Install Dependencies
Run the root install script:
```bash
npm run install-all
```
*(Alternatively, navigate to `backend/` and run `npm install`, then navigate to `frontend/` and run `npm install`)*

### Step 3: Configure Environment
Copy `.env.example` to `.env` in the `FemTech/` directory:
```bash
cp .env.example .env
```

### Step 4: Run the Application
Start both the backend server and frontend client concurrently:
```bash
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)

---

## 🔒 Environment Configuration (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/femtech
JWT_SECRET=femtech_super_secret_jwt_key_2025_epics
CLIENT_URL=http://localhost:5173
AI_API_KEY=
MAPS_API_KEY=
```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register user with age & language preferences |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token |
| `GET` | `/api/auth/me` | Fetch active user profile |
| `PUT` | `/api/auth/update-profile` | Update medical and demographic data |
| `POST` | `/api/cycle/log` | Record menstrual cycle dates, flow, and symptoms |
| `GET` | `/api/cycle/latest` | Calculate current cycle day and next estimated period |
| `GET` | `/api/daily/today` | Fetch today's mood, water, pain, and sleep log |
| `POST` | `/api/daily/save` | Upsert daily wellness entry |
| `POST` | `/api/assessments/thyroid` | Submit Thyroid questionnaire |
| `POST` | `/api/assessments/pcos` | Submit PCOS/PCOD questionnaire |
| `POST` | `/api/assessments/pregnancy/mode` | Enable / update Pregnancy Mode |
| `POST` | `/api/ai/chat` | Multilingual AI chat with speech, image & document upload |
| `GET` | `/api/vault/folders` | Get DigiLocker folder counts |
| `POST` | `/api/vault/upload` | Upload medical document or lab scan (PDF/Image) |
| `GET` | `/api/wearable/data` | Fetch live IoT telemetry readings |
| `GET` | `/api/nearby/care` | Fetch nearby hospitals, 24/7 pharmacies, and helplines |

---

## ⚠️ Medical Safety & Disclaimers

> **Medical Disclaimer:**
> *“FemTech provides health education, wellness tracking, and personalized insights based on information supplied by the user. FemTech does not provide medical diagnosis and does not replace professional medical advice, clinical examination, laboratory testing, or emergency medical care.”*

- All questionnaires and educational modules (Thyroid, PCOS/PCOD, Pregnancy, Vaginal Discharge) strictly provide supportive wellness education and symptom summaries.
- They **never claim a clinical diagnosis** and encourage consultation with a licensed healthcare provider.
- Emergency triggers immediately direct users to emergency services (**108 / 112**).

---

## 💡 Zero-Friction Offline / Demo Resilience
FemTech is designed to work completely out-of-the-box for project evaluations, hackathons, and demonstrations:
- **No external paid API keys required**: If `AI_API_KEY` is not provided, the multilingual AI assistant utilizes its built-in conversational medical knowledge base in English, Tamil, Hindi, and Telugu.
- **No MongoDB daemon required**: Automatically starts an in-memory database instance if local MongoDB is not found.
- **No physical Bluetooth watch required**: Features realistic simulated telemetry feeds clearly marked with the *Demo Data* badge.
