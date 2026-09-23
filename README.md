# SprintPulse SaaS Full-Stack Lab (`bitelevate-fullstack-lab`)

> Client Project Management SaaS built with Next.js, React, TypeScript, FastAPI, PostgreSQL, and Docker Compose.

---

## 1. What the Project Is

**SprintPulse SaaS** is a full-stack client project management SaaS application enabling organizations to organize client projects, track tasks across sprint Kanban boards, and monitor real-time project status.

---

## 2. Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python 3.11+), SQLAlchemy 2.0, PostgreSQL / SQLite
- **Orchestration**: Docker & Docker Compose

---

## 3. How to Run Locally

### Option A: Local Development Mode

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Option B: Docker Compose Mode

```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`

---

## 4. Environment Variables

Copy `.env.example` to `.env`:

```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
DATABASE_URL="sqlite:///./sprintpulse.db"
```

---

## 5. Project Structure

```
bitelevate-fullstack-lab/
├── backend/            # FastAPI app, SQLAlchemy models, API router, Pytest
├── frontend/           # Next.js 15 app, components, Kanban dashboard
├── docker-compose.yml  # Container orchestration
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── SECURITY.md
```

---

## 6. How to Run Tests

```bash
cd backend
python -m pytest -v
```

---

## 7. How to Contribute

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution guidelines.
# bitelevate-fullstack-lab
