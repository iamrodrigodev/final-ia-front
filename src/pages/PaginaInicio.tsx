import { FormEvent, useMemo, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { FormularioPrediccion } from "@/components/prediccion/FormularioPrediccion";
import { PanelResultado } from "@/components/prediccion/PanelResultado";
import { ResumenMetodologia } from "@/components/prediccion/ResumenMetodologia";
import { Insignia } from "@/components/ui/insignia";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { CAMPOS_NUMERICOS, PERFIL_PREDETERMINADO, PERFILES_PREDEFINIDOS, PERFIL_VACIO, SECCIONES_FORMULARIO } from "@/constants/prediccion";
import { predecirDesercion } from "@/services/prediccionApi";
import type { PerfilPredefinido, PerfilPrediccion, ResultadoPrediccion } from "@/types/prediccion";

type EstadoEnvio = "idle" | "cargando" | "exito" | "error";
type ErroresFormulario = Partial<Record<keyof PerfilPrediccion, string>>;

function validarPerfil(perfil: PerfilPrediccion): ErroresFormulario {
  return CAMPOS_NUMERICOS.reduce<ErroresFormulario>((errores, campo) => {
    const valor = perfil[campo.nombre];

    if (Number.isNaN(valor)) {
      errores[campo.nombre] = "Ingresa un numero valido.";
      return errores;
    }

    if (valor < campo.minimo || valor > campo.maximo) {
      errores[campo.nombre] = `Debe estar entre ${campo.minimo} y ${campo.maximo}.`;
    }

    return errores;
  }, {});
}

export function PaginaInicio() {
  const [perfil, setPerfil] = useState<PerfilPrediccion>(PERFIL_PREDETERMINADO.perfil);
  const [perfilSeleccionadoId, setPerfilSeleccionadoId] = useState<string | undefined>(PERFIL_PREDETERMINADO.id);
  const [perfilEvaluado, setPerfilEvaluado] = useState<PerfilPrediccion | null>(null);
  const [resultado, setResultado] = useState<ResultadoPrediccion | null>(null);
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [error, setError] = useState("");
  const resultadoRef = useRef<HTMLDivElement>(null);

  const errores = useMemo(() => validarPerfil(perfil), [perfil]);
  const formularioValido = Object.keys(errores).length === 0;

  function enfocarResultado() {
    window.setTimeout(() => {
      resultadoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultadoRef.current?.focus({ preventScroll: true });
    }, 80);
  }

  function actualizarCampo(nombre: keyof PerfilPrediccion, valor: number) {
    setPerfil((actual) => ({ ...actual, [nombre]: valor }));
    setPerfilSeleccionadoId(undefined);
  }

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!formularioValido || estado === "cargando") return;

    setEstado("cargando");
    setError("");
    enfocarResultado();

    try {
      const perfilEnviado = { ...perfil };
      const respuesta = await predecirDesercion(perfilEnviado);
      setPerfilEvaluado(perfilEnviado);
      setResultado(respuesta.datos);
      setEstado("exito");
      enfocarResultado();
    } catch (excepcion) {
      setResultado(null);
      setPerfilEvaluado(null);
      setEstado("error");
      setError(excepcion instanceof Error ? excepcion.message : "No se pudo conectar con el backend.");
      enfocarResultado();
    }
  }

  function seleccionarPerfil(perfilPredefinido: PerfilPredefinido) {
    setPerfil(perfilPredefinido.perfil);
    setPerfilSeleccionadoId(perfilPredefinido.id);
    setResultado(null);
    setPerfilEvaluado(null);
    setError("");
    setEstado("idle");
  }

  function limpiarFormulario() {
    setPerfil(PERFIL_VACIO);
    setPerfilSeleccionadoId(undefined);
    setResultado(null);
    setPerfilEvaluado(null);
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
                    <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />
                    Predictor de Desercion Estudiantil
                  </TituloTarjeta>
                  <DescripcionTarjeta className="max-w-3xl text-base">
                    Completa el perfil por secciones. La interfaz valida rangos y envia los datos al modelo entrenado con datos reales de UCI.
                  </DescripcionTarjeta>
                </div>
                <Insignia className="self-start border border-border px-3 py-1 text-xs font-medium">
                  Random Forest
                </Insignia>
              </div>
            </EncabezadoTarjeta>
            <ContenidoTarjeta>
              <FormularioPrediccion
                perfil={perfil}
                secciones={SECCIONES_FORMULARIO}
                errores={errores}
                cargando={estado === "cargando"}
                perfilesPredefinidos={PERFILES_PREDEFINIDOS}
                perfilSeleccionadoId={perfilSeleccionadoId}
                onChange={actualizarCampo}
                onSubmit={manejarEnvio}
                onSeleccionarPerfil={seleccionarPerfil}
                onLimpiar={limpiarFormulario}
              />
            </ContenidoTarjeta>
          </Tarjeta>
        </section>

        <aside className="space-y-6">
          <div ref={resultadoRef} tabIndex={-1} className="scroll-mt-20 focus:outline-none">
            <PanelResultado resultado={resultado} perfilEvaluado={perfilEvaluado} error={error} estado={estado} />
          </div>
          <ResumenMetodologia />
        </aside>
      </div>
    </div>
  );
}
