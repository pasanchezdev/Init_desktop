<script lang="ts">
  import type { Snippet } from 'svelte';
  import TitleBar from './TitleBar.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="shell">
  <TitleBar />
  <main class="content">
    {@render children()}
  </main>
</div>

<style>
  .shell {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .content {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
</style>
