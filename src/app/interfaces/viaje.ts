export interface IViaje {
  VIA_Id: number;
  VIA_FechaInicio: Date;
  VIA_Empresa: string;
  VIA_Manifiesto: string;
  CON_CedulaConductor: number;
  VEI_CodigoVehiculo: string;
  VIA_Origen?: string;
  VIA_Destino?: string;
  VIA_KmRecorridos: number;
  VIA_PagoConductor?: number;
  VIA_PagoCombustible?: number;
  VIA_PagoPeajes?: number;
  VIA_PagoOtros?: number;
  VIA_DetallesViaje?: string;
  VIA_ValorViaje?: number;
  VIA_Utilidades?: number;
  VIA_Habilitado?: boolean;
  VIA_TimeStand?: Date;
  VIA_Peso?: boolean;
}
