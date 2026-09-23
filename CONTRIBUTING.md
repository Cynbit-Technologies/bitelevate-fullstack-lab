# Contributing to bitelevate-fullstack-lab

Guidelines for contributing to the SprintPulse Full-Stack Client Project SaaS application.

## Development Setup

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

3. **Docker Mode**:
   ```bash
   docker-compose up --build
   ```
