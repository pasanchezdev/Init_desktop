/** Puerto: lo que la aplicación necesita de la ventana, sin conocer Tauri. */
export interface WindowPort {
  minimize(): Promise<void>;
  toggleMaximize(): Promise<void>;
  close(): Promise<void>;
}
