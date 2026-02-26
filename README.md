# 🔗 Linksy - Acortador de Enlaces Minimalista

Una aplicación web minimalista y elegante para acortar enlaces con alias personalizados.

## ✨ Características

- **Diseño Minimalista Oscuro**: Tema elegante con tonos grises y blancos
- **Alias Personalizado**: Elige el alias que prefieras para tus enlaces
- **Rápido y Responsivo**: Interfaz fluida en desktop y mobile
- **Validación Robusta**: Manejo completo de errores con mensajes claros
- **TypeScript**: Código type-safe en frontend y backend
- **Copiar al Portapapeles**: Copia rápida del enlace corto

## 🏗️ Estructura del Proyecto

```
Linksy/
├── apps/
│   ├── api/              # Backend Express + Prisma
│   │   ├── src/
│   │   ├── prisma/       # Configuración de BD
│   │   └── package.json
│   │
│   └── web/              # Frontend Astro
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── styles/
│       └── package.json
│
├── packages/
│   └── shared/           # Código compartido
│
├── CAMBIOS.md           # Registro de cambios
├── SETUP.md             # Guía de setup
└── package.json         # Workspace root

```

## 🚀 Inicio Rápido

### Requisitos

- **Node.js** 18+
- **pnpm** (gestor de paquetes)
- **PostgreSQL** (local o Supabase)

### Instalación

1. **Clona e instala dependencias**

```bash
pnpm install
```

2. **Configura la Base de Datos**

Copia las credenciales PostgreSQL en `apps/api/.env`:

```dotenv
BASE_URL=http://localhost:3000
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

3. **Ejecuta las migraciones Prisma**

```bash
cd apps/api
pnpm prisma migrate dev --name init
```

4. **Inicia ambos servidores** (en terminales separadas)

**Terminal 1 - API:**

```bash
cd apps/api
pnpm dev
```

**Terminal 2 - Web:**

```bash
cd apps/web
pnpm dev
```

5. **Accede a la aplicación**

- Abre `http://localhost:4321` (Astro)
- La API estará en `http://localhost:3000`

## ✅ Verificar Integración

Ejecuta el script de verificación:

```bash
node tools/verify.mjs
```

Esto comprobará:

- ✅ Disponibilidad de la API
- ✅ Configuración de CORS
- ✅ Creación de links

## 🎨 Diseño

### Paleta de Colores

| Elemento         | Color       | Hex       |
| ---------------- | ----------- | --------- |
| Fondo Principal  | Negro Puro  | `#0a0a0a` |
| Fondo Secundario | Gris Oscuro | `#1a1a1a` |
| Bordes           | Gris Medio  | `#333333` |
| Texto Principal  | Blanco      | `#ffffff` |
| Texto Secundario | Gris Claro  | `#b0b0b0` |

### Componentes

- **Inputs**: Bordes sutiles, focus states elegantes
- **Botones**: Transiciones suave, estados activos
- **Tarjetas**: Bordes minimalistas, sombras sutiles
- **Mensajes**: Errores contextualizados, éxito clara

## 📡 API Endpoints

### Crear Link

```http
POST /api/links
Content-Type: application/json

{
  "url": "https://ejemplo.com",
  "alias": "mi-enlace"
}

Response (200):
{
  "shortUrl": "http://localhost:3000/mi-enlace",
  "data": {
    "id": "uuid",
    "alias": "mi-enlace",
    "original_url": "https://ejemplo.com",
    "created_at": "2024-02-26T..."
  }
}
```

### Obtener Detalles

```http
GET /api/links/:alias
```

### Obtener Estadísticas

```http
GET /api/links/:alias/stats
```

### Redirigir

```http
GET /:alias
(Redirige a la URL original)
```

## 🛠️ Stack Tecnológico

### Frontend

- **Astro** - Framework estático
- **Tailwind CSS** - Estilos
- **TypeScript** - Type safety

### Backend

- **Express.js** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **Zod** - Validación de esquemas

## 📝 Variables de Entorno

### API (`apps/api/.env`)

```dotenv
BASE_URL=http://localhost:3000
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
PORT=3000
```

### Web (`apps/web/.env.local`)

```dotenv
PUBLIC_API_URL=http://localhost:3000
```

## 🤝 Integración

La integración API-Web incluye:

1. **Validación de Entrada**
   - Cliente: validación básica HTML + feedback
   - Servidor: Zod para validación robusta

2. **Manejo de Errores**
   - Errores de validación mostrados en campos
   - Errores de conexión en contenedor global
   - Mensajes claros y contextualizados

3. **Estados de Carga**
   - Botón deshabilitado durante envío
   - Texto del botón cambia a "Creando..."

4. **Feedback Visual**
   - Botón de copiar con feedback temporal
   - Enlaces clicables para probar
   - Animaciones suaves

## 🐛 Troubleshooting

### "API no disponible"

```bash
# Verifica que la API está corriendo
ps aux | grep node
# O inicia manualmente
cd apps/api && pnpm dev
```

### "Error de CORS"

- La configuración CORS ya está setup
- Si persiste, verifica que PUBLIC_API_URL es correcto

### "Error de BD"

```bash
# Verifica credenciales en .env
# Si está vacío, configura PostgreSQL
cd apps/api
pnpm prisma migrate dev
```

### "Puerto en uso"

```bash
# Cambia el puerto en apps/api/.env
PORT=3001
```

## 📄 Licencia

MIT - Siéntete libre de usar y modificar

---

**¡Hecho con ❤️!**
