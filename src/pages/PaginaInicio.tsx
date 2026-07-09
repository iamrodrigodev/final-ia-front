import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, BarChart3, CheckCircle2, GraduationCap, Loader2, RotateCcw, Send } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Entrada } from "@/components/ui/entrada";
import { Insignia } from "@/components/ui/insignia";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { CAMPOS_BINARIOS, CAMPOS_NUMERICOS, PERFIL_EJEMPLO } from "@/constants/prediccion";
import { predecirDesercion } from "@/services/prediccionApi";
import type { PerfilPrediccion, ResultadoPrediccion } from "@/types/prediccion";
import { concatenarClases } from "@/lib/utiles";

type EstadoEnvio = "idle" | "cargando" | "exito" | "error";

export function PaginaInicio() {
  const [perfil, setPerfil] = useState<PerfilPrediccion>(PERFIL_EJEMPLO);
  const [resultado, setResultado] = useState<ResultadoPrediccion | null>(null);
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [error, setError] = useState("");

  const camposInvalidos = useMemo(() => {
    return CAMPOS_NUMERICOS.filter((campo) => {
      const valor = perfil[campo.nombre];
      return valor < campo.minimo || valor > campo.maximo;
    });
  }, [perfil]);

  const formularioValido = camposInvalidos.length === 0;
  const riesgo = resultado ? Math.round(resultado.probabilidad * 100) : 0;
  const esRiesgoAlto = resultado?.prediccion.toLowerCase().includes("deser");

  function actualizarCampo(nombre: keyof PerfilPrediccion, valor: number) {
    setPerfil((actual) => ({ ...actual, [nombre]: valor }));
  }

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!formularioValido || estado === "cargando") return;

    setEstado("cargando");
    setError("");

    try {
      const respuesta = await predecirDesercion(perfil);
      setResultado(respuesta.datos);
      setEstado("exito");
    } catch (excepcion) {
      setResultado(null);
      setEstado("error");
      setError(excepcion instanceof Error ? excepcion.message : "No se pudo conectar con el backend.");
    }
  }

  function cargarEjemplo() {
    setPerfil(PERFIL_EJEMPLO);
    setResultado(null);
    setError("");
    setEstado("idle");
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-4 md:px-6 md:py-6">
      <div className="grid gap-6 2xl:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <Tarjeta className="rounded-lg">
            <EncabezadoTarjeta>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <TituloTarjeta className="flex items-center gap-2 text-2xl">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Predictor de Desercion Estudiantil
                  </TituloTarjeta>
                  <DescripcionTarjeta className="max-w-3xl text-base">
                    Ingresa el perfil academico del estudiante y consulta el modelo entrenado con datos reales de UCI.
                  </DescripcionTarjeta>
                </div>
                <Insignia className="self-start border border-border px-3 py-1 text-xs font-medium">
                  Random Forest
                </Insignia>
              </div>
            </EncabezadoTarjeta>
            <ContenidoTarjeta>
              <form className="space-y-6" onSubmit={manejarEnvio}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {CAMPOS_NUMERICOS.map((campo) => (
                    <label key={campo.nombre} className="grid gap-2 text-sm font-medium text-foreground">
                      {campo.etiqueta}
                      <Entrada
                        type="number"
                        min={campo.minimo}
                        max={campo.maximo}
                        step={campo.paso ?? 1}
                        value={perfil[campo.nombre]}
                        onChange={(evento) => actualizarCampo(campo.nombre, Number(evento.target.value))}
                        aria-invalid={perfil[campo.nombre] < campo.minimo || perfil[campo.nombre] > campo.maximo}
                      />
                      <span className="text-xs font-normal text-muted-foreground">
                        Rango: {campo.minimo} - {campo.maximo}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {CAMPOS_BINARIOS.map((campo) => (
                    <label key={campo.nombre} className="grid gap-2 text-sm font-medium text-foreground">
                      {campo.etiqueta}
                      <select
                        className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={perfil[campo.nombre]}
                        onChange={(evento) => actualizarCampo(campo.nombre, Number(evento.target.value))}
                      >
                        <option value={0}>No / 0</option>
                        <option value={1}>Si / 1</option>
                      </select>
                    </label>
                  ))}
                </div>

                {camposInvalidos.length > 0 ? (
                  <div className="flex items-start gap-2 rounded-md border border-border bg-muted p-3 text-sm text-foreground">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>Revisa los rangos de: {camposInvalidos.map((campo) => campo.etiqueta).join(", ")}.</span>
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Boton type="submit" icono={estado === "cargando" ? Loader2 : Send} disabled={!formularioValido || estado === "cargando"}>
                    {estado === "cargando" ? "Prediciendo..." : "Predecir"}
                  </Boton>
                  <Boton type="button" variante="contorno" icono={RotateCcw} onClick={cargarEjemplo}>
                    Cargar ejemplo
                  </Boton>
                </div>
              </form>
            </ContenidoTarjeta>
          </Tarjeta>
        </section>

        <aside className="space-y-6">
          <Tarjeta className="rounded-lg">
            <EncabezadoTarjeta>
              <TituloTarjeta className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Resultado
              </TituloTarjeta>
              <DescripcionTarjeta>Salida del endpoint de prediccion.</DescripcionTarjeta>
            </EncabezadoTarjeta>
            <ContenidoTarjeta className="space-y-4">
              {estado === "error" ? (
                <div className="rounded-md border border-border bg-muted p-4 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <AlertCircle className="h-4 w-4" />
                    Error
                  </div>
                  <p className="mt-2">{error}</p>
                </div>
              ) : null}

              {resultado ? (
                <div className="space-y-4">
                  <div className={concatenarClases("rounded-lg border p-4", esRiesgoAlto ? "bg-muted" : "bg-card")}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Prediccion</p>
                        <h2 className="mt-1 text-2xl font-semibold text-foreground">{resultado.prediccion}</h2>
                      </div>
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">Probabilidad de desercion</span>
                        <span className="font-semibold text-foreground">{riesgo}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(riesgo, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                  <p className="rounded-md border border-border p-3 text-sm">{resultado.mensaje}</p>
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
                  Ejecuta una prediccion para ver la salida del modelo.
                </div>
              )}
            </ContenidoTarjeta>
          </Tarjeta>

          <Tarjeta className="rounded-lg">
            <EncabezadoTarjeta>
              <TituloTarjeta className="text-lg">Metodologia</TituloTarjeta>
              <DescripcionTarjeta>Resumen usado para la demo.</DescripcionTarjeta>
            </EncabezadoTarjeta>
            <ContenidoTarjeta>
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="font-medium text-foreground">Dataset</dt>
                  <dd className="text-muted-foreground">UCI Student Dropout and Academic Success</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Modelos comparados</dt>
                  <dd className="text-muted-foreground">Regresion Logistica, Arbol de Decision y Random Forest</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Metricas</dt>
                  <dd className="text-muted-foreground">Accuracy, precision, recall, F1 y ROC-AUC</dd>
                </div>
              </dl>
            </ContenidoTarjeta>
          </Tarjeta>
        </aside>
      </div>
    </div>
  );
}
