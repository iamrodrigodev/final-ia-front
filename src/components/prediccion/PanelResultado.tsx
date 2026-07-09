import { AlertCircle, BarChart3, CheckCircle2, Info } from "lucide-react";
import { Insignia } from "@/components/ui/insignia";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import type { PerfilPrediccion, ResultadoPrediccion } from "@/types/prediccion";
import { concatenarClases } from "@/lib/utiles";

type NivelRiesgo = {
  etiqueta: string;
  recomendacion: string;
  clases: string;
};

type PropiedadesPanelResultado = {
  resultado: ResultadoPrediccion | null;
  perfilEvaluado: PerfilPrediccion | null;
  error: string;
  estado: "idle" | "cargando" | "exito" | "error";
};

function obtenerNivelRiesgo(probabilidad: number): NivelRiesgo {
  if (probabilidad >= 0.67) {
    return {
      etiqueta: "Alto riesgo",
      recomendacion: "Priorizar acompanamiento academico y revisar factores administrativos o economicos.",
      clases: "border-black bg-black text-white",
    };
  }
  if (probabilidad >= 0.34) {
    return {
      etiqueta: "Riesgo medio",
      recomendacion: "Mantener monitoreo y revisar rendimiento del primer semestre.",
      clases: "border-[#666] bg-[#666] text-white",
    };
  }
  return {
    etiqueta: "Bajo riesgo",
    recomendacion: "Mantener seguimiento regular y actualizar la informacion si cambia el rendimiento.",
    clases: "border-border bg-muted text-foreground",
  };
}

export function PanelResultado({ resultado, perfilEvaluado, error, estado }: PropiedadesPanelResultado) {
  const riesgo = resultado ? Math.round(resultado.probabilidad * 100) : 0;
  const nivel = resultado ? obtenerNivelRiesgo(resultado.probabilidad) : null;

  return (
    <Tarjeta className="rounded-lg" tabIndex={-1}>
      <EncabezadoTarjeta>
        <TituloTarjeta className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" aria-hidden="true" />
          Resultado
        </TituloTarjeta>
        <DescripcionTarjeta>Lectura del modelo y recomendacion para la demo.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta className="space-y-4">
        {estado === "cargando" ? (
          <div className="rounded-md border border-border bg-muted p-4 text-sm text-foreground">
            Procesando el perfil con el modelo entrenado...
          </div>
        ) : null}

        {estado === "error" ? (
          <div className="rounded-md border border-border bg-muted p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              No se pudo completar la prediccion
            </div>
            <p className="mt-2">{error}</p>
            <p className="mt-2">Verifica que el backend este corriendo y vuelve a intentarlo.</p>
          </div>
        ) : null}

        {resultado && nivel ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">¿Cual es la prediccion?</p>
                  <h2 className="mt-1 text-2xl font-semibold text-foreground">{resultado.prediccion}</h2>
                </div>
                <Insignia className={concatenarClases("border px-3 py-1 text-xs font-semibold", nivel.clases)}>
                  {nivel.etiqueta}
                </Insignia>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-foreground">¿Que tan probable es la desercion?</span>
                  <span className="font-semibold text-foreground">{riesgo}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(riesgo, 100)}%` }} />
                </div>
              </div>

              <div className="mt-5 rounded-md bg-muted p-3">
                <p className="text-sm font-medium text-foreground">¿Que significa en terminos practicos?</p>
                <p className="mt-1 text-sm">{nivel.recomendacion}</p>
              </div>
            </div>

            {perfilEvaluado ? (
              <div className="rounded-md border border-border p-3 text-sm">
                <p className="font-medium text-foreground">Resumen evaluado</p>
                <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground">Nota de admision</dt>
                    <dd className="font-medium text-foreground">{perfilEvaluado.nota_admision}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Nota 1er semestre</dt>
                    <dd className="font-medium text-foreground">{perfilEvaluado.unidades_curriculares_1er_sem_nota}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Unidades aprobadas</dt>
                    <dd className="font-medium text-foreground">{perfilEvaluado.unidades_curriculares_1er_sem_aprobadas}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Mensualidades al dia</dt>
                    <dd className="font-medium text-foreground">{perfilEvaluado.mensualidades_al_dia === 1 ? "Si" : "No"}</dd>
                  </div>
                </dl>
              </div>
            ) : null}

            <div className="flex items-start gap-2 rounded-md border border-border p-3 text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>Esta prediccion es una herramienta de apoyo. No debe usarse como decision automatica final sobre el estudiante.</p>
            </div>
          </div>
        ) : null}

        {estado === "idle" && !resultado ? (
          <div className="rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
            Completa el formulario o carga el ejemplo para ejecutar una prediccion.
          </div>
        ) : null}

        {estado === "exito" && resultado ? (
          <div className="sr-only" role="status" aria-live="polite">
            Prediccion completada: {resultado.prediccion}, probabilidad de desercion {riesgo} por ciento.
          </div>
        ) : null}

        {resultado ? <CheckCircle2 className="sr-only" aria-hidden="true" /> : null}
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
