# 🤝 Guía de Contribución - Linksy

¡Gracias por tu interés en contribuir a Linksy! Este documento te guiará a través del proceso para contribuir al proyecto.

## 📋 Índice

1. [Código de Conducta](#código-de-conducta)
2. [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
3. [Proceso de Desarrollo](#proceso-de-desarrollo)
4. [Guías de Estilo](#guías-de-estilo)
5. [Pull Requests](#pull-requests)
6. [Reportar Bugs](#reportar-bugs)
7. [Sugerir Mejoras](#sugerir-mejoras)
8. [Configuración del Ambiente](#configuración-del-ambiente)

---

## 💬 Código de Conducta

Este proyecto adhiere a un código de conducta respetuoso. Se espera que todos los contribuyentes:

- Usen lenguaje respetuoso e inclusivo
- Acepten críticas constructivas
- Se enfoquen en lo que es mejor para la comunidad
- Muestren empatía con otros miembros

**Cualquier comportamiento inapropiado puede resultar en la restricción del acceso al proyecto.**

---

## 🎯 ¿Cómo Puedo Contribuir?

### 1. **Reportando Bugs** 🐛
Ayuda a mejorar Linksy reportando bugs. Ver [Reportar Bugs](#reportar-bugs).

### 2. **Sugiriendo Mejoras** 💡
Tienes una idea genial? Queremos escucharla. Ver [Sugerir Mejoras](#sugerir-mejoras).

### 3. **Escribiendo Código** 💻
- Arreglando bugs abiertos
- Implementando nuevas features
- Mejorando documentación
- Optimizando performance

### 4. **Ayudando a Otros** 🤲
- Respondiendo preguntas en issues
- Ayudando a revisar pull requests
- Mejorando la documentación

---

## 🔧 Proceso de Desarrollo

### Estructura del Proyecto

```
Linksy/
├── apps/
│   ├── api/              # Backend (Express + Prisma)
│   │   ├── src/
│   │   ├── prisma/
│   │   └── package.json
│   └── web/              # Frontend (Astro)
│       ├── src/
│       └── package.json
├── packages/
│   └── shared/           # Código compartido
└── tools/                # Scripts de utilidad
```

### Branches

```
main           → Versión estable
├── develop     → Integración de features
└── feature/... → Nuevas características
```

### Ciclo de Desarrollo

1. **Fork** el repositorio
2. **Crea** una rama desde `develop`
3. **Implementa** tus cambios
4. **Prueba** localmente
5. **Haz commit** con mensajes claros
6. **Push** a tu fork
7. **Abre** un Pull Request

---

## 📝 Guías de Estilo

### TypeScript/JavaScript

```typescript
// ✅ Bueno
const handleFormSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  const { url, alias } = form.values;
  const result = await createLink(url, alias);
  
  if (result.ok) {
    showSuccess('Link creado');
  }
};

// ❌ Evitar
const handle = async (e) => {
  e.preventDefault()
  let url = form.values.url
  let alias = form.values.alias
  let result = await createLink(url, alias)
  if (result.ok) alert('done')
}
```

**Reglas:**
- Usa `const` por defecto, `let` si es necesario
- Añade tipos explícitos en funciones
- Usa nombres descriptivos
- Máximo 80 caracteres por línea
- Indentación: 2 espacios
- Semicolons obligatorios

### CSS

```css
/* ✅ Bueno */
.form-input {
  @apply w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3;
  @apply outline-none focus:border-zinc-600 transition-colors;
}

/* ❌ Evitar */
.form-input {
  width: 100%;
  background-color: #18181b;
  border: 1px solid #27272a;
  padding: 12px 16px;
}
```

**Reglas:**
- Usa Tailwind CSS cuando sea posible
- Variables CSS para temas y colores
- Mobile-first approach
- Clases BEM para CSS custom

### Astro/HTML

```astro
---
import Component from '../components/Component.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="container">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>
```

**Reglas:**
- Tipos explícitos en props
- Importaciones al inicio
- Camel case para variables
- Props descriptos con interfaces

### Commits

```bash
# ✅ Bueno
git commit -m "feat: agregar validación de alias duplicado"
git commit -m "fix: corregir error de CORS en desarrollo"
git commit -m "docs: actualizar guía de instalación"

# ❌ Evitar
git commit -m "update"
git commit -m "fix bug"
git commit -m "asdasd"
```

**Formato:**
```
<tipo>: <descripción corta>

<descripción detallada (opcional)>
<cuerpo (opcional)>
<pie de página (opcional)>
```

**Tipos recomendados:**
- `feat:` - Nueva característica
- `fix:` - Bug fix
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato/estilo
- `refactor:` - Refactorización sin cambio funcional
- `perf:` - Mejora de performance
- `test:` - Agregar/actualizar tests
- `chore:` - Cambios de build, deps, etc

---

## 📤 Pull Requests

### Antes de Enviar un PR

1. **Sincroniza** con `develop`:
```bash
git fetch origin
git rebase origin/develop
```

2. **Prueba** localmente:
```bash
pnpm install
pnpm dev
# Verifica manualmente
```

3. **Verifica errores de linting:**
```bash
pnpm lint
```

4. **Formatea código:**
```bash
pnpm format
```

### Template de PR

```markdown
## 📝 Descripción
Describe brevemente qué cambios hace este PR.

## 🔗 Relacionado con
- Cierra #123
- Relacionado con #456

## ✅ Checklist
- [ ] Código testeado localmente
- [ ] Cambios documentados
- [ ] Sin breaking changes
- [ ] Commits con mensaje claro

## 🖼️ Screenshots (si aplica)
Agrega screenshots de UI changes.

## 📋 Tipo de Cambio
- [ ] Bug fix (no breaking change)
- [ ] Nueva feature (no breaking change)
- [ ] Breaking change
- [ ] Cambio de documentación
```

### Proceso de Revisión

1. **Revisión de código** - Mínimo 1 aprobación
2. **CI/CD checks** - Deben pasar todos
3. **Merge** - Por los maintainers

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. ¿Ya existe un issue similar?
2. ¿Es una pregunta o realmente un bug?
3. ¿Puedes reproducirlo consistentemente?

### Cómo Reportar

**Título:** Describe el problema en 1 línea

```
[BUG] Alias duplicado genera error 500 en lugar de 400
```

**Descripción:**

```markdown
## 📍 Descripción
El sistema genera un error 500 cuando intento crear un link con un alias que ya existe,
en lugar de un error 400 Bad Request con mensaje claro.

## 🔄 Pasos para Reproducir
1. Crear un link con alias "test"
2. Intentar crear otro link con el mismo alias "test"
3. Observar error 500 en consola

## 🎯 Comportamiento Esperado
Debería mostrar un error 400 Bad Request con mensaje:
"Este alias ya existe, por favor elige otro"

## ❌ Comportamiento Actual
Error 500 Internal Server Error

## 💻 Información del Sistema
- OS: Windows 11
- Node.js: 18.14.0
- pnpm: 8.0.0
- Browser: Chrome 120

## 📎 Logs/Screenshots
```
Error: duplicate key value violates unique constraint
```

## 🔗 Contexto Adicional
Sucede en todas las creaciones con alias duplicado.
```

---

## 💡 Sugerir Mejoras

### Antes de Sugerir

1. ¿La feature ya existe?
2. ¿Es dentro del scope de Linksy?
3. ¿Podría implementarse de otra forma?

### Template de Mejora

**Título:** Descripción clara de la feature

```
[FEAT] Agregar autenticación de usuarios
```

**Descripción:**

```markdown
## 🎯 Descripción
Permitir a los usuarios crear cuentas y tener un dashboard personal
con todos sus links creados.

## 🤔 Motivación
Actualmente, cualquiera puede ver y eliminar links de otros usuarios.
Esto es un problema de privacidad y seguridad.

## 💡 Solución Propuesta
1. Sistema de authentication (OAuth o tradicional)
2. Tabla de usuarios en la BD
3. Dashboard personal protegido
4. Solo el creador puede ver/editar/eliminar sus links

## 📋 Alternativas Consideradas
- Hacer links privados con contraseña
- Solo usar IPs para las restricciones

## 📊 Impacto
- Casos de uso: Usuarios profesionales que usan Linksy productivamente
- Complejidad: Media (autenticación, nueva tabla, refactorización)

## ✅ Beneficios
- Mayor privacidad
- Tracking personal de links
- Base para monetización futura
```

---

## 🏗️ Configuración del Ambiente

### Requisitos

- Node.js 18+
- pnpm 8+
- PostgreSQL 12+

### Setup para Desarrollo

```bash
# 1. Fork el repositorio
# Click en "Fork" en GitHub

# 2. Clona tu fork
git clone https://github.com/TU_USUARIO/Linksy.git
cd Linksy

# 3. Agrega upstream
git remote add upstream https://github.com/USUARIO_ORIGINAL/Linksy.git

# 4. Instala dependencias
pnpm install

# 5. Configura el archivo .env
cp apps/api/.env.example apps/api/.env
# Edita con tus credenciales de BD

# 6. Ejecuta migraciones
cd apps/api
pnpm prisma migrate dev

# 7. Inicia desarrollo
cd ../..
pnpm dev

# Abre http://localhost:4321 en tu navegador
```

### Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Inicia API y Web

# Testing
pnpm test             # Ejecuta tests
pnpm test:watch       # Watch mode

# Linting
pnpm lint             # Chequea errores
pnpm lint:fix         # Arregla errores

# Formato
pnpm format           # Formatea código

# Builds
pnpm build            # Build para producción

# Limpieza
pnpm clean            # Limpia node_modules y builds
```

### Troubleshooting

**Error: `DATABASE_URL not set`**
```bash
# Asegúrate que apps/api/.env existe y tiene credenciales
cat apps/api/.env
```

**Error: `Port 3000 already in use`**
```bash
# Cambia el puerto en apps/api/.env
PORT=3001
```

**Error: `Module not found`**
```bash
# Reinstala dependencias
pnpm install
pnpm clean
```

---

## 📚 Recursos Útiles

### Documentación
- [README](./README.md)

### Tecnologías
- [Astro Docs](https://docs.astro.build)
- [Express Docs](https://expressjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Herramientas
- [Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ Preguntas?

- Abre un [Issue](https://github.com/scrivx/linksy-app/issues)
- Usa [Discussions](https://github.com/scrivx/linksy-app/discussions)
- Contacta a los maintainers

---

## 🙏 Gracias por Contribuir!

Tu contribución, sin importar cuán pequeña sea, es valiosa para el proyecto.

**¡Hecho con ❤️!**
