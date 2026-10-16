# APP

Tauri 2 + SvelteKit (Svelte 5, TypeScript).

## Desarrollo

```
npm install
npm run tauri dev
```

## Ventana

Definida en `src-tauri/tauri.conf.json`: centrada, sin decoraciones nativas (`decorations: false`),
redimensionable. La barra de título es propia (`TitleBar.svelte`) y vive dentro de la misma ventana;
el contenido se ajusta al tamaño de la ventana (`AppShell.svelte`).

## Arquitectura por capas (SOLID)

El backend es siempre Rust y concentra la lógica de negocio; el frontend Svelte es solo interfaz.
Las dependencias apuntan hacia adentro: `presentation → application → domain`;
`infrastructure` implementa los puertos de `application`.

| Capa | Backend (`src-tauri/src`) | Frontend (`src/lib`) |
|------|---------------------------|----------------------|
| Domain | `domain/` entidades y reglas | `domain/` DTOs/tipos |
| Application | `application/` casos de uso y traits | `application/` servicios de UI y puertos |
| Infrastructure | `infrastructure/` persistencia y servicios | `infrastructure/` adaptadores Tauri y `container.ts` |
| Presentation | `presentation/` comandos Tauri | `presentation/` y `routes/` componentes Svelte |

## Flujo ágil

Iteraciones cortas, historias de usuario pequeñas, cada una entregable y verificable
(`npm run check` y `cargo check` en verde antes de cerrar).
