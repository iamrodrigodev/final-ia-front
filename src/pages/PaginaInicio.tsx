import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { GraduationCap } from "lucide-react";

export function PaginaInicio() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tarjeta>
        <EncabezadoTarjeta>
          <TituloTarjeta className="text-2xl flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Predictor de Deserción Estudiantil
          </TituloTarjeta>
          <DescripcionTarjeta className="text-base mt-2">
            Sistema impulsado por Inteligencia Artificial para predecir la probabilidad de abandono de los estudiantes.
          </DescripcionTarjeta>
        </EncabezadoTarjeta>
        <ContenidoTarjeta className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aquí construiremos el formulario y la interfaz para conectarnos con el backend de FastAPI.
          </p>
        </ContenidoTarjeta>
      </Tarjeta>
    </div>
  );
}