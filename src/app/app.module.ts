import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { VentasComponent } from './components/Dashboard/ventas/ventas.component';
import { ReportesComponent } from './components/Dashboard/reportes/reportes.component';
import { UsuariosComponent } from './components/Dashboard/usuarios/usuarios.component';
import { SharedModule } from './components/shared/shared.module';
import { ConductoresComponent } from './components/Dashboard/Conductores/conductores.component';
import { VehiculosComponent } from './components/Dashboard/vehiculos/vehiculos.component';
import { GastosComponent } from './components/Dashboard/gastos/gastos.component';
import { ViajesComponent } from './components/Dashboard/viajes/viajes.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    VentasComponent,
    ReportesComponent,
    UsuariosComponent,
    ConductoresComponent,
    VehiculosComponent,
    GastosComponent,
    ViajesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ToastModule,
    InputNumberModule
   
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
