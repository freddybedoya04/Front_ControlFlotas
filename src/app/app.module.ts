import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { VentasComponent } from './components/Dashboard/ventas/ventas.component';
import { ReportesComponent } from './components/Dashboard/reportes/reportes.component';
import { UsuariosComponent } from './components/Dashboard/usuarios/usuarios.component';
import { SharedModule } from './components/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    VentasComponent,
    ReportesComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
