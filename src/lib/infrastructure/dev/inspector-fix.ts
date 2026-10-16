const FLAG = '__svelteInspectorToggleFix';

/**
 * Solo desarrollo. El inspector de Svelte activa el modo en el clic del botón y ese mismo clic
 * llega a `window`, donde otro handler lo desactiva al instante. Cortamos la propagación
 * después de que el botón ya procesó el clic para que el botón sí funcione.
 */
export function fixInspectorToggleButton(): void {
  const w = window as unknown as Record<string, boolean>;
  if (w[FLAG]) return;
  w[FLAG] = true;

  document.documentElement.addEventListener('click', (e) => {
    if ((e.target as Element | null)?.closest('#svelte-inspector-toggle')) {
      e.stopPropagation();
    }
  });
}
