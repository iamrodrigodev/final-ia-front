import type { PerfilPredefinido, PerfilPrediccion } from "@/types/prediccion";

type BaseCampo = {
  nombre: keyof PerfilPrediccion;
  etiqueta: string;
  ayuda: string;
};

export type CampoNumerico = BaseCampo & {
  minimo: number;
  maximo: number;
  paso?: number;
};

export type CampoSeleccion = BaseCampo & {
  opciones: Array<{ etiqueta: string; valor: number }>;
};

export type SeccionFormulario = {
  titulo: string;
  descripcion: string;
  camposNumericos?: CampoNumerico[];
  camposSeleccion?: CampoSeleccion[];
};

export const PERFIL_EJEMPLO: PerfilPrediccion = {
  estado_civil: 1,
  modo_aplicacion: 1,
  orden_aplicacion: 1,
  curso: 1,
  asistencia_diurna_nocturna: 1,
  calificacion_previa: 1,
  nota_admision: 120,
  desplazado: 0,
  necesidades_educativas_especiales: 0,
  deudor: 0,
  mensualidades_al_dia: 1,
  genero: 0,
  becario: 0,
  edad_al_matricularse: 20,
  unidades_curriculares_1er_sem_inscritas: 5,
  unidades_curriculares_1er_sem_evaluaciones: 5,
  unidades_curriculares_1er_sem_aprobadas: 5,
  unidades_curriculares_1er_sem_nota: 13,
};

export const PERFILES_PREDEFINIDOS: PerfilPredefinido[] = [
  {
    id: "rendimiento-solido",
    nombre: "Rendimiento solido",
    descripcion: "Becario, con pagos al dia y buen desempeno academico.",
    perfil: {
      ...PERFIL_EJEMPLO,
      nota_admision: 150,
      becario: 1,
      edad_al_matricularse: 19,
      unidades_curriculares_1er_sem_inscritas: 6,
      unidades_curriculares_1er_sem_evaluaciones: 6,
      unidades_curriculares_1er_sem_aprobadas: 6,
      unidades_curriculares_1er_sem_nota: 16,
    },
  },
  {
    id: "seguimiento-preventivo",
    nombre: "Seguimiento preventivo",
    descripcion: "Condiciones estables con rendimiento academico intermedio.",
    perfil: {
      ...PERFIL_EJEMPLO,
      edad_al_matricularse: 22,
      unidades_curriculares_1er_sem_evaluaciones: 4,
      unidades_curriculares_1er_sem_aprobadas: 3,
      unidades_curriculares_1er_sem_nota: 11.5,
    },
  },
  {
    id: "riesgo-elevado",
    nombre: "Riesgo elevado",
    descripcion: "Pagos pendientes, deuda activa y bajo rendimiento en el semestre.",
    perfil: {
      ...PERFIL_EJEMPLO,
      asistencia_diurna_nocturna: 0,
      nota_admision: 110,
      deudor: 1,
      mensualidades_al_dia: 0,
      edad_al_matricularse: 27,
      unidades_curriculares_1er_sem_inscritas: 6,
      unidades_curriculares_1er_sem_evaluaciones: 2,
      unidades_curriculares_1er_sem_aprobadas: 0,
      unidades_curriculares_1er_sem_nota: 5,
    },
  },
];

export const PERFIL_PREDETERMINADO = PERFILES_PREDEFINIDOS[1];

export const PERFIL_VACIO: PerfilPrediccion = {
  ...PERFIL_EJEMPLO,
  nota_admision: 0,
  edad_al_matricularse: 15,
  unidades_curriculares_1er_sem_inscritas: 0,
  unidades_curriculares_1er_sem_evaluaciones: 0,
  unidades_curriculares_1er_sem_aprobadas: 0,
  unidades_curriculares_1er_sem_nota: 0,
};

export const OPCIONES_BOOLEANAS = [
  { etiqueta: "No", valor: 0 },
  { etiqueta: "Si", valor: 1 },
];

export const OPCIONES_GENERO = [
  { etiqueta: "Femenino / 0", valor: 0 },
  { etiqueta: "Masculino / 1", valor: 1 },
];

export const OPCIONES_ESTADO_CIVIL = [
  { etiqueta: "Soltero/a", valor: 1 },
  { etiqueta: "Casado/a", valor: 2 },
  { etiqueta: "Viudo/a", valor: 3 },
  { etiqueta: "Divorciado/a", valor: 4 },
  { etiqueta: "Union de hecho", valor: 5 },
  { etiqueta: "Separado/a", valor: 6 },
];

export const SECCIONES_FORMULARIO: SeccionFormulario[] = [
  {
    titulo: "Datos de postulacion",
    descripcion: "Informacion de ingreso y admision usada por el modelo.",
    camposSeleccion: [
      {
        nombre: "estado_civil",
        etiqueta: "Estado civil",
        ayuda: "Selecciona la condicion civil registrada al postular.",
        opciones: OPCIONES_ESTADO_CIVIL,
      },
    ],
    camposNumericos: [
      {
        nombre: "modo_aplicacion",
        etiqueta: "Modo de aplicacion",
        ayuda: "Codigo del canal o modalidad de postulacion en el dataset.",
        minimo: 1,
        maximo: 50,
      },
      {
        nombre: "orden_aplicacion",
        etiqueta: "Orden de aplicacion",
        ayuda: "Prioridad elegida por el estudiante al postular.",
        minimo: 0,
        maximo: 9,
      },
      {
        nombre: "curso",
        etiqueta: "Curso",
        ayuda: "Codigo del programa o curso inscrito.",
        minimo: 1,
        maximo: 10000,
      },
      {
        nombre: "calificacion_previa",
        etiqueta: "Calificacion previa",
        ayuda: "Codigo del tipo de formacion previa.",
        minimo: 1,
        maximo: 50,
      },
      {
        nombre: "nota_admision",
        etiqueta: "Nota de admision",
        ayuda: "Puntaje obtenido en admision.",
        minimo: 0,
        maximo: 200,
        paso: 0.1,
      },
    ],
  },
  {
    titulo: "Datos socioeconomicos",
    descripcion: "Condiciones personales o economicas que pueden influir en el riesgo.",
    camposSeleccion: [
      {
        nombre: "desplazado",
        etiqueta: "Estudiante desplazado",
        ayuda: "Indica si el estudiante esta registrado como desplazado.",
        opciones: OPCIONES_BOOLEANAS,
      },
      {
        nombre: "necesidades_educativas_especiales",
        etiqueta: "Necesidades educativas especiales",
        ayuda: "Indica si requiere apoyos educativos registrados.",
        opciones: OPCIONES_BOOLEANAS,
      },
      {
        nombre: "genero",
        etiqueta: "Genero",
        ayuda: "Codificacion original del dataset usada por el modelo.",
        opciones: OPCIONES_GENERO,
      },
      {
        nombre: "becario",
        etiqueta: "Becario",
        ayuda: "Indica si cuenta con beca.",
        opciones: OPCIONES_BOOLEANAS,
      },
    ],
    camposNumericos: [
      {
        nombre: "edad_al_matricularse",
        etiqueta: "Edad al matricularse",
        ayuda: "Edad del estudiante al momento de matricula.",
        minimo: 15,
        maximo: 100,
      },
    ],
  },
  {
    titulo: "Datos academicos del primer semestre",
    descripcion: "Rendimiento temprano del estudiante durante el primer semestre.",
    camposSeleccion: [
      {
        nombre: "asistencia_diurna_nocturna",
        etiqueta: "Asistencia diurna",
        ayuda: "Indica si el estudiante pertenece al turno diurno.",
        opciones: OPCIONES_BOOLEANAS,
      },
    ],
    camposNumericos: [
      {
        nombre: "unidades_curriculares_1er_sem_inscritas",
        etiqueta: "Unidades inscritas",
        ayuda: "Cantidad de unidades curriculares matriculadas.",
        minimo: 0,
        maximo: 50,
      },
      {
        nombre: "unidades_curriculares_1er_sem_evaluaciones",
        etiqueta: "Evaluaciones",
        ayuda: "Cantidad de evaluaciones rendidas en el semestre.",
        minimo: 0,
        maximo: 50,
      },
      {
        nombre: "unidades_curriculares_1er_sem_aprobadas",
        etiqueta: "Unidades aprobadas",
        ayuda: "Cantidad de unidades curriculares aprobadas.",
        minimo: 0,
        maximo: 50,
      },
      {
        nombre: "unidades_curriculares_1er_sem_nota",
        etiqueta: "Nota promedio",
        ayuda: "Promedio academico del primer semestre.",
        minimo: 0,
        maximo: 20,
        paso: 0.1,
      },
    ],
  },
  {
    titulo: "Condiciones administrativas",
    descripcion: "Situacion de pagos y deuda registrada.",
    camposSeleccion: [
      {
        nombre: "deudor",
        etiqueta: "Deudor",
        ayuda: "Indica si tiene deuda activa.",
        opciones: OPCIONES_BOOLEANAS,
      },
      {
        nombre: "mensualidades_al_dia",
        etiqueta: "Mensualidades al dia",
        ayuda: "Indica si mantiene pagos al dia.",
        opciones: OPCIONES_BOOLEANAS,
      },
    ],
  },
];

export const CAMPOS_NUMERICOS = SECCIONES_FORMULARIO.flatMap((seccion) => seccion.camposNumericos ?? []);
