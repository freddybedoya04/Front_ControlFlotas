import { Component, OnInit } from '@angular/core';
import { IConductor } from 'src/app/interfaces/conductor';
import { IFiltros } from 'src/app/interfaces/filtros';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { IViaje } from 'src/app/interfaces/viaje';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  Vehiculos: IVehiculo[] = [];
  Viajes: IViaje[] = [];
  conductoresSeleccionados: IConductor []=[];
  Filtro: IFiltros;
  FechaInicio: Date;
  FechaFin: Date;
  vehiculoSeleccionado: IVehiculo | undefined;
  Indicadores;
  loading: boolean = false;
  Conductores:IConductor[] = [];

  public searchKeyword: string = '';

  constructor(
    private _peticiones: PeticionesService,

  ) {
    this.FechaInicio = new Date();
    this.FechaFin = new Date();
    this.Filtro = {
      FechaInicio: "",
      FechaFin: "",
      CodigoVehiculo: "",
      Conductor: ""
    }
    this.Indicadores = {
      Ingresos: 0,
      Egresos: 0,
      Utilidades: 0,
      Kms: 0,
      Pagos: 0
    }
  }

  ngOnInit(): void {
    this.CargarVehiculos();
    this.CalcularFechas();
    this.CargarConductores();

  }

  CargarVehiculos() {
    this._peticiones.getVehiculos().subscribe(res => {
      this.Vehiculos = res;
    }, err => {
      console.log(err)
    })
  }
  CargarConductores() {
    this._peticiones.getConductores().subscribe(res => {
      debugger;
      res.map(x => (x.coN_NombresConductor = x.coN_NombresConductor + ' ' + x.coN_ApellidosConductor));
      this.Conductores = res;
    });
  }
  CalcularFechas() {
    this.FechaFin = new Date(); // Fecha actual

    this.FechaInicio = new Date(this.FechaFin.getTime());
    this.FechaInicio.setDate(this.FechaInicio.getDate() - 7); // Restar 7 días
  }

  ValidarFormulario() {
    if (this.FechaInicio.getTime() >= this.FechaFin.getTime()) {
      this._peticiones.SetToast("La fecha inicio no puede ser mayor a la fecha fin.", 2);
    } else {
      if (this.vehiculoSeleccionado != null) {
        this.BuscarViajesPorVehiculo();
      } else if (this.conductoresSeleccionados.length > 0) {
        this.BuscarViajesPorConductor();
      } else {
        this.BuscarViajesPorFecha();
      }
    }
  }
  BuscarViajesPorConductor() {
    this.ConstruirFiltro();
    this.Filtro.Conductor = this.conductoresSeleccionados.join(',');
    this.loading = true;
    this._peticiones.postListarViajesPorConductor(this.Filtro).subscribe(res => {
      this.loading = false;
      this._peticiones.SetToast("Se encontraron " + res.length + " viajes.", 1);
      this.Viajes = res;
      this.CalcularIndicadores();
    }, err => {
      this.loading = false;
      this._peticiones.SetToast(err.Message, 3);
      console.log(err);
    });
  }
  
  BuscarViajesPorVehiculo() {
    this.ConstruirFiltro();
    this.loading = true;
    this._peticiones.postListarViajesVehiculo(this.Filtro).subscribe(res => {
      this.loading = false;
      this._peticiones.SetToast("Se encontraron " + res.length + " viajes.", 1)
      this.Viajes = res;
      this.CalcularIndicadores();
    }, err => {
      this.loading = false;
      this._peticiones.SetToast(err.Message, 3)
      console.log(err)
    })
  }

  BuscarViajesPorFecha() {
    debugger;
    this.ConstruirFiltro();
    this.loading = true;
    this._peticiones.postListarViajesPorFecha(this.Filtro).subscribe(res => {
      debugger
      this.loading = false;
      this._peticiones.SetToast("Se encontraron " + res.length + " viajes.", 1)
      this.Viajes = res;
      this.CalcularIndicadores();
    }, err => {
      this.loading = false;
      this._peticiones.SetToast(err.Message, 3)
      console.log(err)
    });

  }
  ConstruirFiltro() {
    this.Filtro.FechaInicio = this.FechaInicio.toISOString();
    this.Filtro.FechaFin = this.FechaFin.toISOString();
    this.Filtro.CodigoVehiculo = this.vehiculoSeleccionado?.veI_CodigoVehiculo ?? "";
    this.Filtro.Conductor ="";
  }

  CalcularIndicadores() {
    this.Indicadores.Ingresos = this.Viajes.reduce((suma, viaje) => {
      const pago = viaje.viA_ValorViaje ?? 0; // Utiliza el pago de conductor o 0 si es nulo o indefinido
      return suma + pago;
    }, 0);
    this.Indicadores.Egresos = this.Viajes.reduce((suma, viaje) => {
      let pago = viaje.viA_PagoCombustible ?? 0; 
      pago=pago+(viaje.viA_PagoConductor ?? 0);
      pago=pago+ (viaje.viA_PagoPeajes ?? 0);
      pago=pago+(viaje.viA_PagoOtros ?? 0);
      return suma + pago;
    }, 0);
    this.Indicadores.Utilidades  = this.Viajes.reduce((suma, viaje) => {
      const pago = viaje.viA_Utilidades ?? 0 ; 
      return suma + pago;
    }, 0);
    this.Indicadores.Kms  = this.Viajes.reduce((suma, viaje) => {
      const pago = viaje.viA_KmRecorridos ?? 0 ; 
      return suma + pago;
    }, 0);
    this.Indicadores.Pagos  = this.Viajes.reduce((suma, viaje) => {
      const pago = viaje.viA_PagoConductor ?? 0 ; 
      return suma + pago;
    }, 0);
  }
}
