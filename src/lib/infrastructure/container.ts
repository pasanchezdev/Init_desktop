import { WindowService } from '../application/window.service';
import { TauriWindowAdapter } from './tauri-window.adapter';

/** Composition root: único lugar donde se enlazan implementaciones concretas. */
export const windowService = new WindowService(new TauriWindowAdapter());
