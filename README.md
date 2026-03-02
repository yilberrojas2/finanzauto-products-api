# 🚗 Finanzauto – Products API & Frontend

**Prueba Técnica Full Stack**

Este repositorio contiene la solución completa a la prueba técnica, compuesta por:

- **Backend**: API REST desarrollada en **.NET 7**
- **Frontend**: SPA desarrollada en **React + TypeScript + Vite**
- **Base de datos**: **PostgreSQL**
- **Autenticación**: JWT
- **Despliegue local**: Docker + Docker Compose

El proyecto fue diseñado con un enfoque **realista y profesional**, priorizando **arquitectura limpia, escalabilidad, mantenibilidad y buenas prácticas**, más allá de simplemente cumplir endpoints.

---

## 🎯 Objetivo del proyecto

Exponer y gestionar información de **productos y categorías** mediante una API segura y escalable, consumida por una **SPA moderna**, permitiendo:

- Autenticación con JWT
- Gestión completa de productos (CRUD)
- Paginación eficiente
- Validaciones de negocio
- Separación clara de responsabilidades

El foco principal fue **el diseño de la solución**, no solo la funcionalidad.

---

## 🧱 Arquitectura General

La solución sigue principios de **Clean Architecture / DDD ligero**, separando responsabilidades para facilitar:

- Evolución del sistema
- Pruebas automatizadas
- Cambios de infraestructura sin impacto en negocio
- Escalabilidad futura

### Estructura del proyecto

# 🚗 Finanzauto – Products API & Frontend

**Prueba Técnica Full Stack**

Este repositorio contiene la solución completa a la prueba técnica, compuesta por:

- **Backend**: API REST desarrollada en **.NET 7**
- **Frontend**: SPA desarrollada en **React + TypeScript + Vite**
- **Base de datos**: **PostgreSQL**
- **Autenticación**: JWT
- **Despliegue local**: Docker + Docker Compose

El proyecto fue diseñado con un enfoque **realista y profesional**, priorizando **arquitectura limpia, escalabilidad, mantenibilidad y buenas prácticas**, más allá de simplemente cumplir endpoints.

---

## 🎯 Objetivo del proyecto

Exponer y gestionar información de **productos y categorías** mediante una API segura y escalable, consumida por una **SPA moderna**, permitiendo:

- Autenticación con JWT
- Gestión completa de productos (CRUD)
- Paginación eficiente
- Validaciones de negocio
- Separación clara de responsabilidades

El foco principal fue **el diseño de la solución**, no solo la funcionalidad.

---

## 🧱 Arquitectura General

La solución sigue principios de **Clean Architecture / DDD ligero**, separando responsabilidades para facilitar:

- Evolución del sistema
- Pruebas automatizadas
- Cambios de infraestructura sin impacto en negocio
- Escalabilidad futura

### Estructura del proyecto

finanzauto-products-api/
│
├── backend/
│ ├── Finanzauto.Api
│ ├── Finanzauto.Application
│ ├── Finanzauto.Domain
│ ├── Finanzauto.Infrastructure
│ ├── Finanzauto.Tests
│ ├── docker-compose.yml
│ └── Dockerfile
│
├── frontend/
│ └── finanzauto-frontend/
│ ├── src/
│ ├── package.json
│ ├── vite.config.ts
│ └── Dockerfile
│
└── README.md

---

## 🧠 Responsabilidad por capa (Backend)

### Domain

- Entidades del dominio (`Product`, `Category`)
- Reglas de negocio
- No depende de frameworks ni infraestructura

### Application

- Casos de uso
- DTOs
- Interfaces de repositorios
- Orquestación de la lógica

### Infrastructure

- Implementación de repositorios
- Entity Framework Core
- Persistencia en PostgreSQL

### API

- Endpoints REST
- Autenticación y autorización
- Swagger
- Validaciones HTTP

---

## 📦 Persistencia y Base de Datos

- **PostgreSQL**
- **Entity Framework Core**
- Migraciones automáticas
- Totalmente dockerizado

### Carga masiva

Se soporta carga de hasta **100.000 productos** de forma eficiente mediante:

- Inserción por lotes
- Procesamiento en memoria
- Un solo `SaveChanges`

---

## 🔐 Seguridad – JWT

- Autenticación basada en JWT
- API stateless
- Protección con `[Authorize]`
- Roles para operaciones sensibles

Header requerido:

## Authorization: Bearer {token}

---

## 🚀 Endpoints principales

### Categorías

- `POST /api/Category`

### Productos

- `POST /api/Product`
- `POST /api/Product/bulk`
- `GET /api/Product` (paginado)
- `GET /api/Product/{id}`
- `PUT /api/Product/{id}`
- `DELETE /api/Product/{id}`

---

## 🖥 Frontend – React + TypeScript + Vite

El frontend es una **SPA moderna**, desarrollada con:

- React
- TypeScript
- Vite
- Axios
- React Router
- Validaciones de formularios
- Rutas protegidas (AuthGuard)

### Funcionalidades

- Login con JWT
- Listado de productos
- Crear producto
- Editar producto
- Eliminar producto
- Paginación
- Protección de rutas

---

## 🐳 Ejecución Local con Docker (Recomendado)

### Requisitos previos

- Docker
- Docker Compose
- Node.js (solo para frontend)

---

## ▶️ Instrucciones para Clonar, Construir y Ejecutar el Proyecto

### 1️⃣ Clonar el repositorio

git clone https://github.com/USUARIO/finanzauto-products-api.git

cd finanzauto-products-api

---

### 2️⃣ Ejecutar Backend + Base de Datos

Desde la carpeta `backend`:

cd backend
docker compose up --build

Esto levantará automáticamente:

- API en .NET 7
- PostgreSQL
- Migraciones
- Swagger

📍 Backend disponible en:

- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger

---

### 3️⃣ Ejecutar Frontend

En otra terminal:

cd frontend/finanzauto-frontend
npm install
npm run dev

📍 Frontend disponible en:

- http://localhost:5173

---

## 🔑 Credenciales de prueba

Usuario: admin
Contraseña: admin123

---

## 🧪 Pruebas

El backend incluye pruebas unitarias:

dotnet test

Se utilizan mocks para aislar dependencias y validar lógica de negocio.

---

## 🔄 CI/CD

El repositorio incluye un pipeline básico con **GitHub Actions** que:

- Restaura dependencias
- Compila el proyecto
- Ejecuta pruebas unitarias

---

## 📈 Escalabilidad y mejoras futuras

El diseño permite fácilmente:

- Cache distribuido (Redis)
- Procesamiento asíncrono
- Mensajería (RabbitMQ / SQS)
- Escalado horizontal
- Microservicios

---

## 📝 Consideraciones finales

Este proyecto fue desarrollado priorizando:

- Arquitectura limpia
- Buenas prácticas reales
- Código mantenible
- Escalabilidad
- Claridad para el evaluador

No es solo una prueba funcional, sino una **base sólida de proyecto productivo**.

---

## ✅ Estado del proyecto

✔ Funcional  
✔ Probado  
✔ Dockerizado  
✔ Documentado  
✔ Listo para evaluación técnica

---

### 👤 Autor

**Yilber Rojas Garrido**  
Prueba Técnica – Full Stack Developer
