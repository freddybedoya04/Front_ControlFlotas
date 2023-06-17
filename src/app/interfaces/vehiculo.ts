export interface IVehiculo {
    VEI_Id: number;
    VEI_CodigoVehiculo: string;
    VEI_PlacaVehiculo: string;
    VEI_Habilitado: boolean;
    VEI_Descripcion?: string;
    VEI_Modelo?: string;
    VEI_PesoLimite?: number;
    VEI_KmInicial?: number;
    VEI_FechaIngreso?: Date;
    VEI_TimeStand?: Date;
  }