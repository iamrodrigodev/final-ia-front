import { Entrada } from "@/components/ui/entrada";
import type { CampoNumerico as ConfiguracionCampoNumerico } from "@/constants/prediccion";
import type { PerfilPrediccion } from "@/types/prediccion";

type PropiedadesCampoNumerico = {
  campo: ConfiguracionCampoNumerico;
  valor: number;
  error?: string;
  onChange: (nombre: keyof PerfilPrediccion, valor: number) => void;
};

export function CampoNumerico({ campo, valor, error, onChange }: PropiedadesCampoNumerico) {
  const ayudaId = `${campo.nombre}-ayuda`;
  const errorId = `${campo.nombre}-error`;

  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {campo.etiqueta}
      <Entrada
        type="number"
        min={campo.minimo}
        max={campo.maximo}
        step={campo.paso ?? 1}
        value={Number.isNaN(valor) ? "" : valor}
        onChange={(evento) => onChange(campo.nombre, Number(evento.target.value))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${ayudaId} ${errorId}` : ayudaId}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
      />
      <span id={ayudaId} className="text-xs font-normal text-muted-foreground">
        {campo.ayuda} Rango permitido: {campo.minimo} - {campo.maximo}.
      </span>
      {error ? (
        <span id={errorId} className="text-xs font-medium text-destructive" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
