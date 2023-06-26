import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IVehiculo } from '../interfaces/vehiculo';
import { IConductor } from '../interfaces/conductor';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { IViaje } from '../interfaces/viaje';
import { IFiltros } from '../interfaces/filtros';
@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  apiUrl = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private _message: MessageService) {


  }
  SetToast(texto: string, tipo: 1 | 2 | 3) {

    let asunto;
    let titulo;
    switch (tipo) {
      case 1:
        asunto = 'success'; titulo = 'Exito'
        break;
      case 2:
        asunto = 'warn'; titulo = 'Aviso'
        break;
      case 3:
        asunto = 'error'; titulo = 'Error'
        break;
    }
    const toast: Message = {
      severity: asunto,
      summary: titulo,
      detail: texto
    };
    this._message.add(toast);
  }
  //****************************************************vehiculos**************************************************************
  getVehiculos(): Observable<IVehiculo[]> {
    return this.http.get<IVehiculo[]>(this.apiUrl + '/Vehiculo/ListarVehiculos', { headers: this.headers })
  }
 //****************************************************Conductores**************************************************************
  getConductores(): Observable<IConductor[]> {
    return this.http.get<IConductor[]>(this.apiUrl + '/Conductor/ListarConductores', { headers: this.headers })
  }
   //****************************************************Viajes**************************************************************
  postListarViajesPorFecha(filtro:IFiltros): Observable<IViaje[]> {
    return this.http.post<IViaje[]>(this.apiUrl + '/Viajes/ListarViajesPorFecha', filtro)
  }
  postListarViajesVehiculo(filtro:IFiltros): Observable<IViaje[]> {
    return this.http.post<IViaje[]>(this.apiUrl + '/Viajes/ListarViajesPorVehiculo', filtro)
  }
  AgregarViaje(viaje:IViaje):Observable<IViaje>{
    return this.http.post<IViaje>(this.apiUrl + '/Viajes/AgregarViaje', viaje);
  }
}
