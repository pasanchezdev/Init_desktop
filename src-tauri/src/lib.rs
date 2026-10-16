// Backend en Rust (obligatorio): toda la lógica de negocio vive aquí.
// Dependencias: presentation -> application -> domain; infrastructure implementa los puertos de application.
mod application;
mod domain;
mod infrastructure;
mod presentation;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
