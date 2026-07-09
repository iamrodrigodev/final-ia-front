import type { PerfilPrediccion } from "@/types/prediccion";

export type CampoNumerico = {
  nombre: keyof PerfilPrediccion;
  etiqueta: string;
  minimo: number;
  maximo: number;
  paso?: number;
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

export const CAMPOS_NUMERICOS: CampoNumerico[] = [
  { nombre: "estado_civil", etiqueta: "Estado civil", minimo: 1, maximo: 6 },
  { nombre: "modo_aplicacion", etiqueta: "Modo de aplicacion", minimo: 1, maximo: 50 },
  { nombre: "orden_aplicacion", etiqueta: "Orden de aplicacion", minimo: 0, maximo: 9 },
  { nombre: "curso", etiqueta: "Curso", minimo: 1, maximo: 10000 },
  { nombre: "calificacion_previa", etiqueta: "Calificacion previa", minimo: 1, maximo: 50 },
  { nombre: "nota_admision", etiqueta: "Nota de admision", minimo: 0, maximo: 200, paso: 0.1 },
  { nombre: "edad_al_matricularse", etiqueta: "Edad al matricularse", minimo: 15, maximo: 100 },
  { nombre: "unidades_curriculares_1er_sem_inscritas", etiqueta: "Unidades inscritas 1er sem.", minimo: 0, maximo: 50 },
  { nombre: "unidades_curriculares_1er_sem_evaluaciones", etiqueta: "Evaluaciones 1er sem.", minimo: 0, maximo: 50 },
  { nombre: "unidades_curriculares_1er_sem_aprobadas", etiqueta: "Unidades aprobadas 1er sem.", minimo: 0, maximo: 50 },
  { nombre: "unidades_curriculares_1er_sem_nota", etiqueta: "Nota promedio 1er sem.", minimo: 0, maximo: 20, paso: 0.1 },
];

export const CAMPOS_BINARIOS: Array<{ nombre: keyof PerfilPrediccion; etiqueta: string }> = [
  { nombre: "asistencia_diurna_nocturna", etiqueta: "Asistencia diurna" },
  { nombre: "desplazado", etiqueta: "Desplazado" },
  { nombre: "necesidades_educativas_especiales", etiqueta: "Necesidades educativas especiales" },
  { nombre: "deudor", etiqueta: "Deudor" },
  { nombre: "mensualidades_al_dia", etiqueta: "Mensualidades al dia" },
  { nombre: "genero", etiqueta: "Genero codificado" },
  { nombre: "becario", etiqueta: "Becario" },
];
