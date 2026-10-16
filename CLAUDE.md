# CLAUDE.md

Este repositorio es la **base de inicio (plantilla) para cualquier proyecto** de escritorio con Tauri + SvelteKit. Al crear un proyecto nuevo a partir de esta base, se conservan la estructura, la configuración de ventana y las reglas de abajo; solo cambia el dominio y el nombre de la app.

## Stack

- Tauri 2 con backend **Rust** obligatorio (`src-tauri/`)
- SvelteKit con Svelte 5 (runes) + TypeScript, `adapter-static`, SPA (`ssr = false`)

## Comandos

- `npm install` – instalar dependencias
- `npm run tauri dev` – ejecutar la app en desarrollo
- En `tauri dev`: **Alt+X** (o el botón abajo a la derecha) activa el inspector de componentes; clic en un elemento abre su archivo y línea en VS Code (config en `svelte.config.js`, solo desarrollo; el botón necesita el parche `src/lib/infrastructure/dev/inspector-fix.ts` porque el inspector de Svelte lo desactiva en el mismo clic)
- `npm run check` – type-check del frontend (debe quedar en 0 errores)
- `cargo check` (en `src-tauri/`) – verificar el backend
- `npm run tauri build` – empaquetar

## Ventana (comportamiento base, no cambiar sin pedirlo)

- Inicia centrada, sin decoraciones nativas (`decorations: false`), redimensionable, con tamaño mínimo.
- Todo vive en la misma ventana: la barra de título es propia (`TitleBar.svelte`) y el contenido se adapta al tamaño de la ventana (`AppShell.svelte`).
- Configuración en `src-tauri/tauri.conf.json`; permisos de ventana en `src-tauri/capabilities/default.json`.

## Arquitectura por capas

**El backend es siempre Rust (obligatorio).** Toda la lógica de negocio, validaciones, persistencia y acceso al sistema viven en `src-tauri/`. El frontend (Svelte) es solo interfaz: no contiene reglas de negocio.

### Backend Rust (`src-tauri/src`)

Las dependencias apuntan hacia adentro: `presentation → application → domain`. `infrastructure` implementa los puertos (traits) definidos en `application`.

| Capa | Ruta | Contenido |
|------|------|-----------|
| Domain | `domain/` | Entidades y reglas de negocio puras, sin Tauri ni I/O |
| Application | `application/` | Casos de uso y puertos (traits) |
| Infrastructure | `infrastructure/` | Implementaciones de los puertos: base de datos, archivos, servicios externos |
| Presentation | `presentation/` | Comandos Tauri: reciben/devuelven DTOs, invocan casos de uso |

El ensamblado de dependencias (composition root) se hace en `lib.rs` al construir el `Builder`.

### Frontend (`src/lib`)

| Capa | Ruta | Contenido |
|------|------|-----------|
| Domain | `domain/` | Solo tipos/DTOs que reflejan lo que devuelve el backend |
| Application | `application/` | Servicios de UI y puertos (`ports/`, interfaces) |
| Infrastructure | `infrastructure/` | Adaptadores que llaman a Tauri (`invoke`, API de ventana) y `container.ts` (composition root) |
| Presentation | `presentation/`, `src/routes` | Componentes y páginas Svelte |

## Reglas de desarrollo

- **SOLID**: una responsabilidad por clase/componente; depender de abstracciones (puertos), no de implementaciones; las implementaciones concretas se enlazan solo en `container.ts`.
- Los componentes no llaman a Tauri directamente: pasan por un servicio de `application` y su puerto.
- No duplicar reglas de negocio en el frontend; si hace falta una regla nueva, va en el `domain`/`application` de Rust y se expone con un comando.
- En Rust, `domain` no depende de `tauri` ni de las demás capas.
- `domain` no importa nada de `application`, `infrastructure` ni `presentation`.
- **Ágil**: trabajar en incrementos pequeños (una historia de usuario a la vez), entregables y verificables. Antes de dar algo por terminado, `npm run check` y `cargo check` deben pasar.
- Comentarios solo cuando el porqué no es obvio. Textos de interfaz en español.
- **Procesos de prueba**: si para probar se inicia la app (`npm run tauri dev`, `vite dev`, navegadores headless, etc.), al terminar hay que cerrar todo lo que se inició (app, servidor de desarrollo en el puerto 1420, procesos de `node`/`cargo` y navegadores de prueba) para no dejar procesos corriendo. Verificar que el puerto 1420 quede libre. No cerrar procesos que el usuario haya abierto por su cuenta.

## Al iniciar un proyecto nuevo desde esta base

1. Cambiar nombre en `package.json`, `src-tauri/Cargo.toml` (incluido `[lib] name`, y su uso en `main.rs`), `tauri.conf.json` (`productName`, `identifier`, título de ventana) y `src/app.html`.
2. Reemplazar el contenido de `src/routes/+page.svelte` y el título de `TitleBar.svelte`.
3. Definir las primeras historias de usuario y modelar el dominio en `src/lib/domain`.
4. Actualizar este archivo con lo específico del proyecto, manteniendo las reglas base.
