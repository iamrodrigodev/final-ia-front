import type { CampoSeleccion as ConfiguracionCampoSeleccion } from "@/constants/prediccion";
import type { PerfilPrediccion } from "@/types/prediccion";

type PropiedadesCampoSeleccion = {
  campo: ConfiguracionCampoSeleccion;
  valor: number;
  onChange: (nombre: keyof PerfilPrediccion, valor: number) => void;
};

export function CampoSeleccion({ campo, valor, onChange }: PropiedadesCampoSeleccion) {
  const ayudaId = `${campo.nombre}-ayuda`;

  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {campo.etiqueta}
      <select
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        value={valor}
        onChange={(evento) => onChange(campo.nombre, Number(evento.target.value))}
        aria-describedby={ayudaId}
      >
        {campo.opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      <span id={ayudaId} className="text-xs font-normal text-muted-foreground">
        {campo.ayuda}
      </span>
    </label>
  );
}
