import { FormEvent } from "react";
import { AlertCircle, Check, Loader2, Send, Trash2 } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { CampoNumerico } from "@/components/prediccion/CampoNumerico";
import { CampoSeleccion } from "@/components/prediccion/CampoSeleccion";
import type { SeccionFormulario } from "@/constants/prediccion";
import { concatenarClases } from "@/lib/utiles";
import type { PerfilPredefinido, PerfilPrediccion } from "@/types/prediccion";

type PropiedadesFormularioPrediccion = {
  perfil: PerfilPrediccion;
  secciones: SeccionFormulario[];
  errores: Partial<Record<keyof PerfilPrediccion, string>>;
  cargando: boolean;
  perfilesPredefinidos: PerfilPredefinido[];
  perfilSeleccionadoId?: string;
  onChange: (nombre: keyof PerfilPrediccion, valor: number) => void;
  onSubmit: (evento: FormEvent<HTMLFormElement>) => void;
  onSeleccionarPerfil: (perfil: PerfilPredefinido) => void;
  onLimpiar: () => void;
};

export function FormularioPrediccion({
  perfil,
  secciones,
  errores,
  cargando,
  perfilesPredefinidos,
  perfilSeleccionadoId,
  onChange,
  onSubmit,
  onSeleccionarPerfil,
  onLimpiar,
}: PropiedadesFormularioPrediccion) {
  const totalErrores = Object.keys(errores).length;
  const formularioValido = totalErrores === 0;

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <fieldset className="rounded-lg border border-border p-4">
        <legend className="text-base font-semibold text-foreground">Perfiles de prueba</legend>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">
          Carga todos los datos de un escenario y editalos si lo necesitas antes de predecir.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {perfilesPredefinidos.map((perfilPredefinido) => {
            const seleccionado = perfilPredefinido.id === perfilSeleccionadoId;

            return (
              <button
                key={perfilPredefinido.id}
                type="button"
                onClick={() => onSeleccionarPerfil(perfilPredefinido)}
                className={concatenarClases(
                  "relative rounded-md border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  seleccionado
                    ? "border-primary bg-primary/10"
                    : "border-input bg-background hover:bg-accent hover:text-accent-foreground",
                )}
                aria-pressed={seleccionado}
              >
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
                  {perfilPredefinido.nombre}
                  {seleccionado ? <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> : null}
                </span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">{perfilPredefinido.descripcion}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {secciones.map((seccion) => (
        <fieldset key={seccion.titulo} className="rounded-lg border border-border p-4">
          <legend className="text-base font-semibold text-foreground">{seccion.titulo}</legend>
          <p className="mt-1 mb-4 text-sm text-muted-foreground">{seccion.descripcion}</p>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {seccion.camposSeleccion?.map((campo) => (
              <CampoSeleccion key={campo.nombre} campo={campo} valor={perfil[campo.nombre]} onChange={onChange} />
            ))}
            {seccion.camposNumericos?.map((campo) => (
              <CampoNumerico
                key={campo.nombre}
                campo={campo}
                valor={perfil[campo.nombre]}
                error={errores[campo.nombre]}
                onChange={onChange}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {totalErrores > 0 ? (
        <div className="flex items-start gap-2 rounded-md border border-border bg-muted p-3 text-sm text-foreground" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Corrige {totalErrores === 1 ? "el campo marcado" : "los campos marcados"} antes de predecir.</span>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Boton type="submit" icono={cargando ? Loader2 : Send} disabled={!formularioValido || cargando}>
          {cargando ? "Procesando prediccion..." : "Predecir"}
        </Boton>
        <Boton type="button" variante="fantasma" icono={Trash2} onClick={onLimpiar}>
          Limpiar
        </Boton>
      </div>
    </form>
  );
}
