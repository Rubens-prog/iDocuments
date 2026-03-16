# iDocuments Application

A full-stack application built with React and Laravel to report a document inconsistency.

### Project Structure

```
├── frontend/          # React frontend application
├── backend/          # Laravel backend API
├── docker-compose.yml
└── README.md
```

### API Endpoints

```
GET /api/categories                              # Lista as categorias
GET /api/inconsistencies                         # Lista as inconsistências
POST /api/inconsistencies/show/{id}              # Cria uma inconsistências
GET /api/inconsistencies/{id}/file               # Download de arquivo vinculado
POST /auth/login                                 # Login
POST /auth/logout                                # Logout
```

### Services

- **backend** (Laravel server) - Port 8000
- **frontend** (React app) - Port 5173

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Local Development with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd versa-challenge
   ```

2. **Run the application**

   ```bash
   docker compose up --build

   docker compose exec backend php artisan migrate

   docker compose exec backend php artisan db:seed
   ```

   This single command will:
   - Build and start the Laravel server on `http://localhost:8000`
   - Build and start the React client on `http://localhost:5173`

## 🧪 Testing

```bash
# Run PHP tests
docker compose exec backend php artisan test
```
