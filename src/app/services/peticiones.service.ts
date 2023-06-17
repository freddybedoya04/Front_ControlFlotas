import { Injectable } from '@angular/core';
import {HttpClient, HttpParameterCodec,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IVehiculo } from '../interfaces/vehiculo';
import { IConductor } from '../interfaces/conductor';
@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  apiUrl=environment.apiUrl;
  headers=new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) {


   }

   getVehiculos():Observable<IVehiculo[]>{
    return this.http.get<IVehiculo[]>(this.apiUrl + '/Vehiculo/ListarVehiculos',{headers:this.headers})
   }

   getConductores():Observable<IConductor[]>{
    return this.http.get<IConductor[]>(this.apiUrl + '/Conductor/ListarConductores',{headers:this.headers})
   }
}
