import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from '../ventas/ventas.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ErrorComponent } from '../../error/error.component';
import { DashboardComponent } from './dashboard.component';
import { VehiculosComponent } from '../vehiculos/vehiculos.component';
import { ConductoresComponent } from '../Conductores/conductores.component';
import { ViajesComponent } from '../viajes/viajes.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
      {path:'',component:ViajesComponent},
      {path:'ventas',component:VentasComponent},
      {path:'reportes',component:ReportesComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'viajes',component:ViajesComponent},
      {path:'conductores',component:ConductoresComponent},
      {path:'vehiculos',component:VehiculosComponent},
      {path:'**',component:ErrorComponent}
      ]
},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
