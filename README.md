# Client Feedback Dashboard

A modern, full-stack client feedback system built with Next.js, Supabase, and Tailwind CSS.  
This application allows businesses to collect customer feedback through a public form and manage it via a secure, authenticated dashboard.

---

## 🚀 Live Demo

- Live URL: *(https://sagentics-assessment.vercel.app/)*
- Test Credentials:
  - Email: *(tpmutekwe@gmail.com)*
  - Password: *(tptest12345)*

---

## 🧩 Features

### Public Feedback Form
- Accessible at `/feedback`
- Collects:
  - Name
  - Email
  - Rating (1–5 stars)
  - Comment
- Client-side validation
- Stores submissions in Supabase
- Responsive and mobile-friendly UI

### Authenticated Dashboard
- Protected via Supabase Authentication
- View all feedback entries (latest first)
- Summary analytics:
  - Total submissions
  - Average rating
  - Rating distribution
- Archive (soft-delete) functionality
- Clean card-based UI with smooth interactions

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Backend:** Supabase (Postgres + Auth + RLS)
- **Deployment:** Vercel

---

### Where AI Helped Most

- Rapid generation of UI components using Tailwind CSS  
- Structuring Next.js App Router layouts and pages  
- Implementing Supabase client integration  
- Creating reusable components (forms, rating UI, cards)  
- Speeding up development workflow and reducing repetitive coding  

---

### Where I Stepped In Manually

- Designing the overall architecture and folder structure  
- Implementing secure Supabase RLS policies correctly  
- Debugging integration issues between frontend and backend  
- Refining UI/UX for a polished, production-ready feel  
- Ensuring responsive design and smooth animations  
- Validating form logic and error handling  
- Making decisions on performance and code organization  

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
