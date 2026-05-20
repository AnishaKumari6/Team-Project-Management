# Team Project Management System (MERN + DevOps)

A production-ready full-stack Team Project Management System built with **MongoDB Atlas, Express, React, Node.js**, fully containerized with **Docker**, orchestrated on **Kubernetes (Minikube)**, with **CI/CD via GitHub Actions**, and deployed to **Vercel (frontend)** + **Render (backend)**.

## Features
- JWT Authentication (Register / Login)
- Role-Based Access Control (admin / manager / member)
- Projects CRUD
- Tasks CRUD with status tracking (todo / in_progress / done)
- Dashboard analytics
- Workflow management
- File upload (Multer)
- Dark mode (React)
- Monitoring: Prometheus + Grafana

---

## Folder Structure
```
team-project-management-system/
├── backend/                # Node.js + Express REST API
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # Express routers
│   │   ├── middleware/     # auth, error, roles
│   │   ├── utils/
│   │   ├── uploads/        # uploaded files (volume)
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React app (Vite)
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── k8s/                    # Kubernetes manifests
├── monitoring/             # Prometheus + Grafana
├── .github/workflows/      # GitHub Actions CI/CD
├── docker-compose.yml
└── README.md
```

---

## 1. Installation (Local Dev)

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose
- Minikube + kubectl (for K8s)
- MongoDB Atlas account (free tier)

### Backend
```bash
cd backend
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET
npm install
npm run dev            # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env  
npm install
npm run dev           
```

---

## 2. Docker

Build & run everything with one command:
```bash
docker-compose up --build
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB (optional local): mongodb://localhost:27017
- Volume `uploads_data` persists uploaded files.

Build images individually:
```bash
docker build -t <dockerhub-user>/tpms-backend ./backend
docker build -t <dockerhub-user>/tpms-frontend ./frontend
docker push <dockerhub-user>/tpms-backend
docker push <dockerhub-user>/tpms-frontend
```

---

## 3. Kubernetes (Minikube)

```bash
# Start cluster
minikube start --driver=docker

# Create secrets (MongoDB URI + JWT secret)
kubectl create secret generic tpms-secrets \
  --from-literal=MONGO_URI='your-atlas-uri' \
  --from-literal=JWT_SECRET='supersecret'

# Apply manifests
kubectl apply -f k8s/

# Watch pods
kubectl get pods -w

# Get service URLs
minikube service frontend-service --url
minikube service backend-service  --url

# Tear down
kubectl delete -f k8s/
```

---

## 4. CI/CD (GitHub Actions)

`.github/workflows/ci-cd.yml` runs on every push to `main`:
1. Install + test backend and frontend
2. Build & push Docker images to Docker Hub
3. Deploy frontend to **Vercel**
4. Deploy backend to **Render** (deploy hook)

### Required GitHub Secrets
| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel org id |
| `VERCEL_PROJECT_ID` | Vercel project id |
| `RENDER_DEPLOY_HOOK` | Render deploy hook URL |

---

## 5. Deployment (Production)

### Backend → Render (free tier)
1. New Web Service → connect GitHub repo → root `backend/`
2. Build: `npm install` | Start: `npm start`
3. Env vars: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`
4. Copy the **Deploy Hook URL** → GitHub secret `RENDER_DEPLOY_HOOK`

### Frontend → Vercel (free tier)
1. Import GitHub repo → root `frontend/`
2. Framework: Vite
3. Env: `VITE_API_URL=https://<your-backend>.onrender.com/api`

---

## 6. Monitoring (Prometheus + Grafana)

```bash
docker-compose -f monitoring/docker-compose.monitoring.yml up -d
# Prometheus: http://localhost:9090
# Grafana:    http://localhost:3001  (admin / admin)
```

Backend exposes `/metrics` via `prom-client`.

---

## API Endpoints (summary)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Register |
| POST | `/api/auth/login` | – | Login |
| GET | `/api/projects` | ✅ | List projects |
| POST | `/api/projects` | ✅ | Create project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | admin/manager | Delete project |
| GET | `/api/tasks` | ✅ | List tasks |
| POST | `/api/tasks` | ✅ | Create task |
| PUT | `/api/tasks/:id` | ✅ | Update task |
| DELETE | `/api/tasks/:id` | ✅ | Delete task |
| GET | `/api/dashboard/stats` | ✅ | Analytics |
| POST | `/api/upload` | ✅ | File upload |

---

Built with ❤️ for production use, free-tier friendly.
