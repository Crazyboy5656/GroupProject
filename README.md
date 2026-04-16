# Side Quest Life Prototype

A full-stack prototype built from the Stitch UI direction for **Side Quest Life**.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express (in-memory data)

## Features Included
- User sign in/up mock flow
- Quest creation and quest state transitions
- XP and level progression with attribute growth
- Camera-only proof capture with timestamp overlay
- Basic verification (timestamp freshness + image payload checks)
- Reward marketplace with XP redemption and stock updates

## Run Locally

### 1) Start backend
```bash
cd /home/runner/work/GroupProject/GroupProject/backend
npm install
npm start
```
Backend runs on `http://localhost:4000`.

### 2) Start frontend
```bash
cd /home/runner/work/GroupProject/GroupProject/frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

If needed, set `VITE_API_BASE_URL` to change API URL.
