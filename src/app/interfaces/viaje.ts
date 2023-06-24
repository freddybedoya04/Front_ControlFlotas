export interface IViaje {
  viA_Id: number;
  viA_FechaInicio: Date;
  viA_Empresa: string;
  viA_Manifiesto: string;
  coN_CedulaConductor: number;
  veI_CodigoVehiculo: string;
  viA_Origen?: string;
  viA_Destino?: string;
  viA_KmRecorridos: number;
  viA_PagoConductor?: number;
  viA_PagoCombustible?: number;
  viA_PagoPeajes?: number;
  viA_PagoOtros?: number;
  viA_DetallesViaje?: string;
  viA_ValorViaje?: number;
  viA_Utilidades?: number;
  viA_Habilitado?: boolean;
  viA_TimeStand?: Date;
  viA_Peso?: number;
}
