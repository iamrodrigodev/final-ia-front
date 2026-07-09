/**
 * Configuración de variables de entorno de la aplicación.
 * Vite inyecta las variables que comienzan con VITE_ a través de import.meta.env
 */

export const env = {
  // La URL base del backend.
  // En local toma VITE_API_URL de .env (http://localhost:8000)
  // En producción toma VITE_API_URL de .env.production (https://final-ia-back.vercel.app)
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Indica si la aplicación está corriendo en modo desarrollo
  ES_DESARROLLO: import.meta.env.DEV,
};
