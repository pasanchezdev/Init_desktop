<script lang="ts">
  import type { Snippet } from 'svelte';
  import AppShell from '$lib/presentation/components/AppShell.svelte';
  import { dev } from '$app/environment';
  import { fixInspectorToggleButton } from '$lib/infrastructure/dev/inspector-fix';
  import '../app.css';

  if (dev) fixInspectorToggleButton();

  let { children }: { children: Snippet } = $props();
</script>

<AppShell>
  {@render children()}
</AppShell>
