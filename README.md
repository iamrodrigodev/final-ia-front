<div align="center">
  <table>
    <thead>
      <tr>
        <th>
          <img src="https://github.com/RodrigoStranger/imagenes-la-salle/blob/main/logo_secundario_color.png?raw=true" width="150" />
        </th>
        <th>
          <span style="font-weight:bold;">UNIVERSIDAD LA SALLE DE AREQUIPA</span><br />
          <span style="font-weight:bold;">FACULTAD DE INGENIERÍAS Y ARQUITECTURA</span><br />
          <span style="font-weight:bold;">DEPARTAMENTO ACADEMICO DE INGENIERÍA Y MATEMÁTICAS</span><br />
          <span style="font-weight:bold;">CARRERA PROFESIONAL DE INGENIERÍA DE SOFTWARE</span>
        </th>
      </tr>
    </thead>
  </table>
</div>

<div align="center">
  <h2 style="font-weight:bold;">TRABAJO FINAL</h2>
</div>

# Predictor de Desercion Estudiantil - Frontend

Frontend React/Vite para consumir la API FastAPI del predictor de desercion estudiantil.

<div align="center">
  <table>
    <tbody>
      <tr>
        <td align="center"><strong>Semestre</strong></td>
        <td align="center"><strong>Docente</strong></td>
        <td align="center"><strong>Curso</strong></td>
      </tr>
      <tr>
        <td align="center">2026-I</td>
        <td align="center">Vicente Enrique Machaca Arceda</td>
        <td align="center">Inteligencia Artificial</td>
      </tr>
    </tbody>
  </table>
</div>

## Integrantes

1. Rodrigo Emerson Infanzon Acosta
2. Carlos Daniel Aguilar Chirinos
3. Piero Omar De La Cruz Mancilla
4. Iben Omar Flores Polanco

## Tecnologías utilizadas

[![React][React]][react-site]
[![TypeScript][TypeScript]][ts-site]
[![Vite][Vite]][vite-site]
[![React Router][ReactRouter]][rr-site]
[![Radix UI][RadixUI]][radix-site]
[![Framer Motion][FramerMotion]][framer-site]
[![Lucide][Lucide]][lucide-site]
[![Tailwind Merge][TailwindMerge]][twmerge-site]
[![CVA][CVA]][cva-site]
[![Sonner][Sonner]][sonner-site]
[![Git][Git]][git-site]
[![GitHub][GitHub]][github-site]

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-site]: https://react.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[ts-site]: https://www.typescriptlang.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-site]: https://vitejs.dev/
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white
[rr-site]: https://reactrouter.com/
[RadixUI]: https://img.shields.io/badge/Radix_UI-111827?style=for-the-badge
[radix-site]: https://www.radix-ui.com/
[FramerMotion]: https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white
[framer-site]: https://www.framer.com/motion/
[Lucide]: https://img.shields.io/badge/Lucide-111827?style=for-the-badge
[lucide-site]: https://lucide.dev/
[TailwindMerge]: https://img.shields.io/badge/tailwind--merge-0EA5E9?style=for-the-badge
[twmerge-site]: https://github.com/dcastil/tailwind-merge
[CVA]: https://img.shields.io/badge/class--variance--authority-111827?style=for-the-badge
[cva-site]: https://cva.style/docs
[Sonner]: https://img.shields.io/badge/Sonner-111827?style=for-the-badge
[sonner-site]: https://sonner.emilkowal.ski/
[Git]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[git-site]: https://git-scm.com/
[GitHub]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-site]: https://github.com/

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
