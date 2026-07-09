import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";

export function ResumenMetodologia() {
  return (
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
  );
}
