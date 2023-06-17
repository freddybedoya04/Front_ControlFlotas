import { Component,OnInit } from '@angular/core';
import{IConductor}from '../../../interfaces/conductor';
import{IVehiculo}from '../../../interfaces/vehiculo';
import { PeticionesService } from 'src/app/services/peticiones.service';
@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})

export class ViajesComponent implements OnInit{
  value:Date | undefined
  vehiculoSeleccionado:IVehiculo | undefined;
  conductorSeleccionado:IConductor | undefined;
  Conductores:IConductor[]=[];
  Vehiculos:IVehiculo[]=[];
  constructor(private _peticones:PeticionesService){
    this.value=new Date(Date.now())
  }

  ngOnInit(): void {
    this.TraerVehiculos();
    this.TraerConductores();
  }

  TraerVehiculos(){
    this._peticones.getVehiculos().subscribe(res=>{
      this.Vehiculos=res;
    })
  }
  TraerConductores(){
    this._peticones.getConductores().subscribe(res=>{
      debugger
      res.map(x=>x.coN_NombresConductor=x.coN_NombresConductor + ' '+ x.coN_ApellidosConductor);
      this.Conductores=res;
    })
  }
  
}
