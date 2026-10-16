import { getCurrentWindow } from '@tauri-apps/api/window';
import type { WindowPort } from '../application/ports/window.port';

/** Adaptador: implementa el puerto usando la API de ventanas de Tauri. */
export class TauriWindowAdapter implements WindowPort {
  private get win() {
    return getCurrentWindow();
  }

  minimize = () => this.win.minimize();
  toggleMaximize = () => this.win.toggleMaximize();
  close = () => this.win.close();
}
