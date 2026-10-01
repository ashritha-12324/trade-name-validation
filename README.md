# UAQ Trade License – DED Smart Services

AI-powered trade license application portal for the Department of Economic Development (UAQ).

## Quick Start

### Backend (FastAPI)

```powershell
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure .env
copy .env.example .env
# Edit .env — set LLM_PROVIDER and relevant API keys

# Start server
uvicorn main:app --reload --port 8000
```

### Frontend (React + Vite)

```powershell
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**

---

## LLM Provider Configuration

Edit `backend/.env`:

| Provider | Key to set |
|---|---|
| Ollama (local) | `LLM_PROVIDER=ollama`, `OLLAMA_MODEL=qwen2.5vl:7b` |
| Groq | `LLM_PROVIDER=groq`, `GROQ_API_KEY=gsk_...` |
| Gemini | `LLM_PROVIDER=gemini`, `GEMINI_API_KEY=AIza...` |
| OpenAI | `LLM_PROVIDER=openai`, `OPENAI_API_KEY=sk-...` |
| OpenAI-compatible | `LLM_PROVIDER=openai_compatible`, `OPENAI_BASE_URL=http://...` |

Restart the backend after changing `.env`.

---

## Application Flow

1. **`/services`** — Service catalogue
2. **`/services/ibdaa-license`** — Upload documents + "Analyze with AI"
3. **`/services/ibdaa-license/review`** — Review AI-extracted fields + map
4. **`/services/ibdaa-license/validate`** — Trade name validation + fees + submit
5. **`/services/ibdaa-license/success`** — Confirmation + reference number
6. **`/settings`** — LLM provider configuration

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/documents/analyze` | Upload docs + run AI extraction |
| POST | `/api/license/submit` | Submit final application |
| GET | `/api/llm/providers` | List providers + current config |
| GET | `/api/llm/health` | Test LLM provider connection |
| GET | `/api/health` | Backend health check |
