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
2. El frontend valida rangos por campo y muestra ayudas de uso.
3. El formulario llama a `POST /api/prediccion/`.
4. La pantalla muestra prediccion, probabilidad de desercion, nivel de riesgo, resumen del perfil evaluado y recomendacion practica.

## Criterios de interpretacion del riesgo

La probabilidad devuelta por el modelo se muestra como una lectura humana:

| Probabilidad | Nivel | Interpretacion |
|---:|---|---|
| 0% - 33% | Bajo riesgo | Mantener seguimiento regular |
| 34% - 66% | Riesgo medio | Monitorear rendimiento y condiciones administrativas |
| 67% - 100% | Alto riesgo | Priorizar acompanamiento academico |

La prediccion es una herramienta de apoyo y no una decision automatica final sobre el estudiante.

## Mejoras de usabilidad aplicadas

- Formulario agrupado por datos de postulacion, socioeconomicos, academicos y administrativos.
- Ayudas cortas por campo para reducir memoria requerida.
- Mensajes de validacion especificos por campo.
- Estados claros de carga, exito y error.
- Resultado con nivel de riesgo y recomendacion practica.
- Acciones separadas: `Predecir`, `Cargar ejemplo` y `Limpiar`.
- Foco/scroll automatico al resultado despues de predecir.
- Controles con labels, ayudas y atributos `aria-describedby`.

## Arquitectura

- `src/pages`: pantallas completas.
- `src/components/prediccion`: componentes especificos del flujo de prediccion.
- `src/services`: cliente API.
- `src/types`: contratos TypeScript.
- `src/constants`: campos y payload de ejemplo.
- `src/components`: componentes reutilizables de UI y navegacion.
