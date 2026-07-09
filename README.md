# Predictor de Desercion Estudiantil - Frontend

Frontend React/Vite para consumir la API FastAPI del predictor de desercion estudiantil.

## Requisitos

- Node.js
- Backend corriendo en `http://localhost:8000`

## Configuracion

Crear un archivo `.env` a partir de `.env.example`:

```bash
VITE_API_URL=http://localhost:8000
```

## Ejecucion local

Instalar dependencias:

```bash
npm install
```

Levantar frontend:

```bash
npm run dev
```

Abrir:

```txt
http://localhost:5173
```

## Validacion

Ejecutar build:

```bash
npm run build
```

Validar arquitectura de imports:

```bash
npm run lint:imports
```

## Flujo principal

1. El usuario ingresa datos academicos y administrativos del estudiante.
2. El frontend valida rangos basicos.
3. El formulario llama a `POST /api/prediccion/`.
4. La pantalla muestra prediccion, probabilidad de desercion y mensaje del modelo.

## Arquitectura

- `src/pages`: pantallas completas.
- `src/services`: cliente API.
- `src/types`: contratos TypeScript.
- `src/constants`: campos y payload de ejemplo.
- `src/components`: componentes reutilizables de UI y navegacion.
