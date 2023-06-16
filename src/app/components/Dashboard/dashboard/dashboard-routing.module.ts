import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from '../ventas/ventas.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ErrorComponent } from '../../error/error.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
      {path:'',component:VentasComponent},
      {path:'ventas',component:VentasComponent},
      {path:'reportes',component:ReportesComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'**',component:ErrorComponent}
      ]
},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
