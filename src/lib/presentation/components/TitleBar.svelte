<script lang="ts">
  import { windowService } from '$lib/infrastructure/container';
</script>

<header class="titlebar" data-tauri-drag-region>
  <span class="title" data-tauri-drag-region>APP</span>
  <div class="controls">
    <button type="button" class="control" aria-label="Minimizar" title="Minimizar" onclick={windowService.minimize}>
      <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M0 5.5h10" /></svg>
    </button>
    <button type="button" class="control" aria-label="Maximizar" title="Maximizar" onclick={windowService.toggleMaximize}>
      <svg viewBox="0 0 10 10" aria-hidden="true"><rect x="0.5" y="0.5" width="9" height="9" rx="1.5" /></svg>
    </button>
    <button type="button" class="control close" aria-label="Cerrar" title="Cerrar" onclick={windowService.close}>
      <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M0.5 0.5l9 9M9.5 0.5l-9 9" /></svg>
    </button>
  </div>
</header>

<style>
  .titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    flex: none;
    padding-left: 14px;
    background: var(--bg);
    user-select: none;
  }
  .title {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--text-muted);
  }
  .controls {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 100%;
    padding-right: 8px;
  }
  .control {
    display: grid;
    place-items: center;
    width: 36px;
    height: 26px;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--text-muted);
    cursor: default;
    transition:
      background-color 0.12s ease,
      color 0.12s ease;
  }
  .control svg {
    width: 10px;
    height: 10px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
  .control:hover {
    background: var(--hover);
    color: var(--text);
  }
  .control:active {
    background: var(--hover);
    color: var(--text);
    opacity: 0.75;
  }
  .control:focus-visible {
    outline: 2px solid var(--text-muted);
    outline-offset: 1px;
  }
  .close:hover {
    background: #e81123;
    color: #fff;
  }
  .close:active {
    background: #c50f1f;
    color: #fff;
    opacity: 1;
  }
</style>
