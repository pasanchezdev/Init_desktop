import type { WindowPort } from './ports/window.port';

/** Caso de uso: controles de la ventana. Depende de la abstracción (DIP). */
export class WindowService {
  constructor(private readonly window: WindowPort) {}

  minimize = () => this.window.minimize();
  toggleMaximize = () => this.window.toggleMaximize();
  close = () => this.window.close();
}
