# 👨‍💻 Guía de Desarrollo - Linksy

Información técnica detallada para desarrolladores que quieren trabajar en el proyecto.

## 📦 Estructura del Workspace

Linksy usa **pnpm workspaces** para manejar múltiples paquetes en un monorepo.

```
Linksy/
├── apps/
│   ├── api/                    # Backend (Express + Prisma)
│   │   ├── src/
│   │   │   ├── server.ts       # Punto de entrada
│   │   │   ├── config/         # Configuración
│   │   │   ├── controllers/    # Lógica de requests
│   │   │   ├── services/       # Lógica de negocio
│   │   │   ├── repositories/   # Acceso a BD
│   │   │   ├── middlewares/    # Middleware Express
│   │   │   ├── routes/         # Definición de rutas
│   │   │   ├── models/         # Tipos de datos
│   │   │   └── utils/          # Utilidades
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Esquema de BD
│   │   │   └── migrations/     # Historial de cambios
│   │   └── package.json
│   │
│   └── web/                    # Frontend (Astro)
│       ├── src/
│       │   ├── components/     # Componentes reutilizables
│       │   ├── layouts/        # Layouts de páginas
│       │   ├── pages/          # Páginas (rutas)
│       │   ├── lib/            # Funciones utilitarias
│       │   └── styles/         # Global styles
│       ├── public/             # Archivos estáticos
│       └── package.json
│
├── packages/
│   └── shared/                 # Código compartido
│
├── tools/
│   └── verify.mjs              # Script de verificación
│
└── .github/
    ├── ISSUE_TEMPLATE/         # Plantillas de issues
    └── pull_request_template.md # Plantilla de PRs
```

## 🏗️ Arquitectura

### Backend

**Patrón:** MVC + Repository Pattern

```
Request → Route → Controller → Service → Repository → Database
                       ↓
                   Response
```

**Flujo de creación de link:**

1. **Route** (`link.routes.ts`)
   - Define endpoint `POST /api/links`
   - Llama al controller

2. **Controller** (`link.controller.ts`)
   - Recibe request
   - Valida entrada con Zod
   - Llama al service
   - Retorna respuesta

3. **Service** (`link.service.ts`)
   - Lógica de negocio
   - Valida reglas de negocio
   - Llama al repository

4. **Repository** (`link.repository.ts`)
   - Acceso a datos
   - Métodos CRUD con Prisma
   - Retorna datos

### Frontend

**Patrón:** Component-based con Astro

```
Pages (rutas)
├── Layouts (estructura)
│   └── Components (reutilizables)
│       └── Scripts (lógica)
└── Styles (global + component)
```

**Validación:**

- HTML5 forms (client-side básico)
- TypeScript types
- API error handling

## 🗄️ Base de Datos

### Schema Principal

```prisma
model Link {
  id               String    @id @default(uuid())
  alias            String    @unique
  original_url     String
  clicks           Int       @default(0)
  created_at       DateTime  @default(now())
  updated_at       DateTime  @updatedAt
  last_accessed_at DateTime?
}
```

### Migraciones

```bash
# Crear Nueva Migración
cd apps/api
pnpm prisma migrate dev --name nombre_migracion

# Ejemplo: agregar campo
# pnpm prisma migrate dev --name add_description_to_links
```

## 🔑 Variables de Entorno

### API (`apps/api/.env`)

```dotenv
# Base URL para generar links cortos
BASE_URL=http://localhost:3000

# PostgreSQL
DATABASE_URL="postgresql://user:pass@host:6543/db"
DIRECT_URL="postgresql://user:pass@host:5432/db"

# Server
PORT=3000
NODE_ENV=development
```

### Web (`apps/web/.env.local`)

```dotenv
# URL de la API
PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Un archivo específico
pnpm test src/services/__tests__/link.service.test.ts
```

### Estructura de Tests

```
apps/api/src/
├── services/
│   ├── link.service.ts
│   └── __tests__/
│       └── link.service.test.ts
```

### Ejemplo de Test

```typescript
import { describe, it, expect } from 'vitest';
import { createShortLink } from '../link.service';

describe('Link Service', () => {
  it('should create a short link', async () => {
    const link = await createShortLink('test', 'https://example.com');

    expect(link).toHaveProperty('id');
    expect(link.alias).toBe('test');
    expect(link.original_url).toBe('https://example.com');
  });
});
```

## 📊 API Endpoints

### Links

| Método | Endpoint                  | Descripción          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/links`              | Crear link corto     |
| GET    | `/api/links/:alias`       | Obtener detalles     |
| GET    | `/api/links/:alias/stats` | Obtener estadísticas |
| GET    | `/:alias`                 | Redirigir            |

### Ejemplos cURL

```bash
# Crear link
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    "alias": "gh"
  }'

# Obtener detalles
curl http://localhost:3000/api/links/gh

# Obtener estadísticas
curl http://localhost:3000/api/links/gh/stats

# Redirigir
curl -L http://localhost:3000/gh
```

## 🎨 Frontend - Convenciones

### Nombres de Componentes

```
✅ CORRECTO
- LinkForm.astro
- SuccessMessage.astro
- LoadingSpinner.astro

❌ INCORRECTO
- link-form.astro
- success_message.astro
- loading.astro
```

### Estructura de Componente

```astro
---
// 1. Imports
import type { Props } from '../types';

// 2. Props interface
interface Props {
  title: string;
  loading?: boolean;
}

// 3. Obtener props
const { title, loading = false } = Astro.props;

// 4. Lógica
const formattedTitle = title.toUpperCase();
---

<!-- HTML -->
<div class="container">
  <h1>{formattedTitle}</h1>
  {loading && <p>Cargando...</p>}
</div>

<!-- CSS (scoped) -->
<style>
  .container {
    @apply p-4 rounded-lg;
  }
</style>

<!-- Scripts (aislados) -->
<script>
  // Solo se ejecuta en las páginas donde se use el componente
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Component mounted');
  });
</script>
```

## 🔒 Seguridad

### CORS

Configurado en `server.ts` con origins específicos:

```typescript
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4321'],
  credentials: true,
};
```

### Validación

Con Zod:

```typescript
const createLinkSchema = z.object({
  url: z.string().url(),
  alias: z.string().min(1).max(50),
});
```


## 🚀 Performance

### Optimizaciones Implementadas

1. **Frontend**
   - Astro genera HTML estático
   - Lazy loading de scripts
   - Minificación automática

2. **Backend**
   - Índices en BD (alias, created_at)
   - Query optimization con Prisma
   - Caching headers

### Monitoreo

```bash
# Analizar bundle
pnpm web analyze

# Ver tamaño de dependencias
pnpm size
```

## 🔗 Integración Continua

Proyectado para GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
```

