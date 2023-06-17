export interface IConductor {
        coN_Id: number;
        coN_CedulaConductor: number;
        coN_NombresConductor: string;
        coN_ApellidosConductor: string;
        coN_Habilitado: boolean;
        coN_FechaNacimiento?: Date;
        coN_TipoLicencia?: string;
        coN_FechaIngreso?: Date;
        coN_TimeStand?: Date;
}
