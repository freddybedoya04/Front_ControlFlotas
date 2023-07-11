import { Component, OnInit,ViewChild} from '@angular/core';
import { IConductor } from 'src/app/interfaces/conductor';
import { IFiltros } from 'src/app/interfaces/filtros';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { IViaje } from 'src/app/interfaces/viaje';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { SortEvent } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';




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
  detalleViajeSeleccionado: string='';
  @ViewChild('dt1') table: any;
  sortedById: boolean = false;
sortedByVehiculo: boolean = false;
display: boolean = false;
Detalle: string = '';


  showDialog(viaje: string) {
    this.Detalle = viaje;
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }
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
    this.CargarViajes();
  }
  sortData(event: SortEvent) {
    const field = event.field;
    const order = event.order;
  
    if (field === 'id') {
      this.Viajes.sort((a, b) => {
        return (order === -1 ? -1 : 1) * (a.viA_Id - b.viA_Id);
      });
    } else if (field === 'Vehiculo') {
      this.Viajes.sort((a, b) => {
        return (order === -1 ? -1 : 1) * a.veI_CodigoVehiculo.localeCompare(b.veI_CodigoVehiculo);
      });
    
    }}
  

 
  CargarViajes() {
    this._peticiones.getViajes().subscribe(res => {
      this.Viajes = res;
    }, err => {
      console.log(err);
    });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.Viajes);
  
    
      const headerRow = this.table.el.nativeElement.querySelector('thead > tr');
      const headerCells = Array.from(headerRow.children);
      const header = headerCells.map((cell: any) => cell.innerText.trim());
  
      
      const headerRowIndex = 0;
      header.forEach((title, columnIndex) => {
        const cellRef = xlsx.utils.encode_cell({ r: headerRowIndex, c: columnIndex });
        worksheet[cellRef] = { t: 's', v: title };
      });
  
      const workbook: xlsx.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'viajes');
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
  eliminarItem() {
    // Lógica para eliminar el elemento
  }
  
  buscarItems() {
    // Lógica para realizar la búsqueda
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



