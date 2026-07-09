export type PerfilPrediccion = {
  estado_civil: number;
  modo_aplicacion: number;
  orden_aplicacion: number;
  curso: number;
  asistencia_diurna_nocturna: number;
  calificacion_previa: number;
  nota_admision: number;
  desplazado: number;
  necesidades_educativas_especiales: number;
  deudor: number;
  mensualidades_al_dia: number;
  genero: number;
  becario: number;
  edad_al_matricularse: number;
  unidades_curriculares_1er_sem_inscritas: number;
  unidades_curriculares_1er_sem_evaluaciones: number;
  unidades_curriculares_1er_sem_aprobadas: number;
  unidades_curriculares_1er_sem_nota: number;
};

export type ResultadoPrediccion = {
  prediccion: string;
  probabilidad: number;
  mensaje: string;
};

export type RespuestaApiPrediccion = {
  estado: number;
  mensaje: string;
  datos: ResultadoPrediccion;
};
