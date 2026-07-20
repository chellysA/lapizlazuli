# Lapizlazuli

Monorepo (pnpm workspaces) con dos apps que se comunican por HTTP:

- **`apps/landing-page`** — Frontend Next.js 15 (la tienda). Corre en `http://localhost:3000`.
- **`apps/headless-cmd`** — Backend Strapi 5 (CMS headless, productos/categorías). Corre en `http://localhost:1337`.

## Requisitos

- Node.js **v22.x**
- pnpm **10.13.1** (definido en `packageManager` del `package.json` raíz)

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

Desde la raíz del repo:

```bash
pnpm install
```

## Levantar Strapi (backend)

```bash
cd apps/headless-cmd
pnpm run dev
```

- Panel admin: http://localhost:1337/admin (si no tienes cuenta, la primera vez te pide crearla).
- Usa SQLite local (`.tmp/data.db`), no requiere levantar ninguna base de datos aparte.
- El `.env` de esta app ya trae las variables necesarias (`DATABASE_CLIENT=sqlite`, secrets, `STRIPE_KEY`, `CLIENT_URL`).

### ⚠️ Paso obligatorio la primera vez: permisos públicos

Por defecto la API rechaza las peticiones del frontend con `403 Forbidden`. Hay que habilitar el acceso público a los content-types que consume la tienda:

`Settings` → `Users & Permissions plugin` → `Roles` → `Public` → habilita `find` y `findOne` en **Product** y **Category** → `Save`.

Sin esto, aunque Strapi esté corriendo y tengas datos cargados, `apps/landing-page` no podrá leerlos.

## Levantar el frontend (Next.js)

En otra terminal:

```bash
cd apps/landing-page
pnpm run dev
```

- App: http://localhost:3000
- Si el puerto 3000 está ocupado, Next.js sube automáticamente al 3001 (no es un error, solo revisa la terminal para ver en qué puerto quedó).
- El `.env` ya apunta al backend correcto vía `NEXT_PUBLIC_BACKEND_URL=http://localhost:1337`.

## Orden recomendado

1. Levanta Strapi primero y confirma los permisos públicos (arriba).
2. Levanta el frontend.
3. Carga/edita contenido desde el admin de Strapi (`Content Manager` → `Product` / `Category`) — recuerda darle **Publish**, no solo `Save`, o no aparecerá en la tienda.

## Troubleshooting rápido

| Síntoma | Causa probable |
|---|---|
| `403 Forbidden` al pedir `/api/products` o `/api/categories` | Falta habilitar `find`/`findOne` para el rol Public (ver arriba) |
| El producto/categoría no aparece en la tienda | Se guardó como borrador, falta `Publish` en el admin |
| `port already used` al iniciar Strapi o Next | Ya hay una instancia corriendo; revisa con `netstat -ano \| findstr :1337` (o `:3000`) y ciérrala antes de levantar otra |
| `pnpm`/`node` no reconocido en la terminal | Ver sección de Requisitos arriba (PATH) |
