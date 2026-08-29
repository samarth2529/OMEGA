# OMEGA

Omnidirectional Multimodal Evolving General Autonomous Intelligence

## Architecture

- **Backend**: Python (FastAPI, WebSockets)
- **Frontend**: Vite + React
- **Database**: SQLite (upcoming)

## Setup

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Environment**:
   Copy `.env.example` to `.env` and fill in the required keys.
