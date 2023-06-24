import { Component, OnInit } from '@angular/core';
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
  Filtro: IFiltros;
  FechaInicio: Date;
  FechaFin: Date;
  vehiculoSeleccionado: IVehiculo | undefined;
  loading: boolean = false;

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
  }

  ngOnInit(): void {
    this.CargarVehiculos();
    this.CalcularFechas();

  }

  CargarVehiculos() {
    this._peticiones.getVehiculos().subscribe(res => {
      this.Vehiculos = res;
    }, err => {
      console.log(err)
    })
  }

  CalcularFechas() {
    this.FechaFin = new Date(); // Fecha actual

    this.FechaInicio = new Date(this.FechaFin.getTime());
    this.FechaInicio.setDate(this.FechaInicio.getDate() - 7); // Restar 7 días
  }

  ValidarFormulario() {
    if (this.FechaInicio.getTime() >= this.FechaFin.getTime()) {
      this._peticiones.SetToast("La fecha inicio no puede ser mayo a la fecha fin.", 2);
    } else {
      if (this.vehiculoSeleccionado != null) {
        this.BuscarViajesPorVehiculo();
      }
      else {
        this.BuscarViajesPorFecha();
      }
    }
  }
  BuscarViajesPorVehiculo() {
    this.ConstruirFiltro();
    this.loading=true;
    this._peticiones.postListarViajesVehiculo(this.Filtro).subscribe(res => {
      this.loading=false;
      this._peticiones.SetToast("Se encontraron "+res.length+" viajes.", 1)
      this.Viajes = res;
    }, err => {
      this.loading=false;
      this._peticiones.SetToast(err.Message, 3)
      console.log(err)
    })
  }

  BuscarViajesPorFecha() {
    debugger;
    this.ConstruirFiltro();
    this.loading=true;
    this._peticiones.postListarViajesPorFecha(this.Filtro).subscribe(res => {
      debugger
      this.loading=false;
      this._peticiones.SetToast("Se encontraron "+res.length+" viajes.", 1)
      this.Viajes = res;
    }, err => {
      this.loading=false;
      this._peticiones.SetToast(err.Message, 3)
      console.log(err)
    });

  }
  ConstruirFiltro() {
    this.Filtro.FechaInicio = this.FechaInicio.toISOString();
    this.Filtro.FechaFin = this.FechaFin.toISOString();
    this.Filtro.CodigoVehiculo = this.vehiculoSeleccionado?.veI_CodigoVehiculo ?? "";
  }
}
