# Lapizlazuli — Frontend

Tienda construida con Next.js 15. Este repo dejó de ser un monorepo: antes vivía junto al backend (Strapi) en `apps/landing-page`, ahora es un proyecto standalone en la raíz. El backend (Strapi) pasó a un repo aparte.

## Requisitos

- Node.js **v22.x**
- pnpm **10.13.1** (definido en `packageManager` de `package.json`)

En Windows, si `node`/`pnpm` no se reconocen en la terminal (nvm-windows a veces no arma bien el symlink), verifica primero:

```bash
node -v
pnpm -v
```

Si fallan, agrega manualmente al PATH la carpeta de la versión instalada, por ejemplo:

```powershell
$env:Path = "C:\Users\<usuario>\AppData\Local\nvm\v22.23.1;C:\Users\<usuario>\AppData\Roaming\npm;" + $env:Path
```

## Instalación

```bash
pnpm install
```

## Levantar el frontend

```bash
pnpm run dev
```

- App: http://localhost:3000
- Si el puerto 3000 está ocupado, Next.js sube automáticamente al 3001 (revisa la terminal para ver en qué puerto quedó).

## Variables de entorno

El archivo `.env` en la raíz ya trae lo necesario:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:1337
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_WHATSAPP_NUMBER=...
```

`NEXT_PUBLIC_BACKEND_URL` apunta al backend Strapi (repo separado). Sin ese backend corriendo en `:1337` con los permisos públicos habilitados (`find`/`findOne` en `Product` y `Category`), las secciones que dependen de datos remotos (productos, categorías) no van a cargar — el resto de la tienda funciona igual.

## Troubleshooting rápido

| Síntoma | Causa probable |
|---|---|
| `port already used` al iniciar Next | Ya hay una instancia corriendo; revisa con `netstat -ano \| findstr :3000` y ciérrala antes de levantar otra |
| `pnpm`/`node` no reconocido en la terminal | Ver sección de Requisitos arriba (PATH) |
| No cargan productos/categorías | El backend Strapi (repo aparte) no está corriendo, o falta habilitar permisos públicos en su admin |
