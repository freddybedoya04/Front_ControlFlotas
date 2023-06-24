export interface IVehiculo {
    veI_Id: number;
    veI_CodigoVehiculo: string;
    veI_PlacaVehiculo: string;
    veI_Habilitado: boolean;
    veI_Descripcion?: string;
    veI_Modelo?: string;
    veI_PesoLimite?: number;
    veI_KmInicial?: number;
    veI_FechaIngreso?: Date;
    veI_TimeStand?: Date;
  }