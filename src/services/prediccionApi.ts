import type { PerfilPrediccion, RespuestaApiPrediccion } from "@/types/prediccion";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function predecirDesercion(perfil: PerfilPrediccion): Promise<RespuestaApiPrediccion> {
  const respuesta = await fetch(`${API_URL}/api/prediccion/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(perfil),
  });

  const contenido = await respuesta.json();

  if (!respuesta.ok) {
    const mensaje = typeof contenido?.mensaje === "string" ? contenido.mensaje : "No se pudo obtener la prediccion.";
    throw new Error(mensaje);
  }

  return contenido as RespuestaApiPrediccion;
}
