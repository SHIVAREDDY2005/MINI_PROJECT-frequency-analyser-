# 📊 Frequency Analyzer – AI Powered Question Paper Generator

An AI-powered system that extracts text from multiple PDFs (including scanned documents), performs semantic frequency analysis using NLP models, and automatically generates a structured **Frequency-Based Question Paper (PDF Output)**.

---

## 🔗 Live Demo

- 🌐 Frontend (Vue + Vite – GitHub Pages)  
  https://shivareddy2005.github.io/MINI_PROJECT-frequency-analyser-/

- ⚙ Backend (FastAPI – Hugging Face Spaces)  
  https://shivareddy-03-frequency-analysis.hf.space

---

## 📊 Project Workflow Flowchart

```mermaid
flowchart TD

A[User Uploads Files<br>PDF / Images / Word / Text] --> B[Convert All Inputs to PDF Format]

B --> C[Frontend (Vue + Vite)<br>Deployed on GitHub Pages]

C --> D[Backend API (FastAPI)<br>Deployed on Hugging Face]

D --> E[Send PDFs to PaddleOCR-VL Model]

E --> F[Extracted Text + Images<br>Stored as HTML (vl_output folder)]

F --> G[Each HTML sent to LLM<br>Model: openai/gpt-oss-20b]

G --> H[Generate Structured JSON Files]

H --> I[Frequency Analysis<br>Model: all-mpnet-base-v2]

I --> J[Create Final Frequency JSON]

J --> K[Convert Final JSON to PDF]

K --> L[Output: Frequency-Based Question Paper PDF]

```
---

## 🚀 Tech Stack

### 🌐 Frontend
- Vue.js  
- Vite  
- GitHub Pages Deployment  

### ⚙ Backend
- FastAPI  
- Hugging Face Spaces Deployment  

### 🤖 AI / ML Models
- PaddleOCR-VL → OCR & text extraction  
- openai/gpt-oss-20b → Structured JSON generation  
- all-mpnet-base-v2 → Semantic similarity & frequency computation  

---

## ✨ Features

- ✅ Multi-PDF Upload Support  
- ✅ OCR for Scanned Documents  
- ✅ AI-Based Structured Data Extraction  
- ✅ Semantic Frequency Analysis  
- ✅ Automated Question Paper Generation  
- ✅ Fully Deployed Cloud Architecture  

---

## 📂 Folder Structure

frontend/ → Vue + Vite application
backend/ → FastAPI server
vl_output/ → OCR extracted HTML & images
models/ → NLP & embedding models


---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2️⃣ Backend Setup (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Backend runs at:

http://127.0.0.1:8000
3️⃣ Frontend Setup (Vue + Vite)
cd frontend
npm install
npm run dev
Frontend runs at:

http://localhost:5173
🧠 How It Works
Upload multiple PDFs.

Convert all files into standard PDF format.

Extract text using PaddleOCR-VL.

Convert HTML output into structured JSON using LLM.

Generate embeddings using all-mpnet-base-v2.

Compute semantic similarity and frequency.

Generate final Frequency-Based Question Paper (PDF).

📈 Use Cases
University Exam Analysis

Competitive Exam Preparation

Question Pattern Detection

Academic Research Automation

AI-Based Educational Tools

🏆 Highlights
End-to-End AI Pipeline

Multi-model NLP Integration

Fully Cloud Deployed (GitHub + Hugging Face)

Real-world Academic Application

📜 License
This project is built for educational and research purposes.


---

If you want, I can now:

- 🔥 Add GitHub badges (cool professional look)
- 💼 Optimize for recruiters
- 🏆 Make hackathon-winning version
- ✨ Make a super clean minimal README

Tell me which style you want 👌
