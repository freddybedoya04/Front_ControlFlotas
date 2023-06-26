import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConductor } from '../../../interfaces/conductor';
import { IVehiculo } from '../../../interfaces/vehiculo';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { IViaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {
  formulario: FormGroup;
  value: Date | undefined;
  vehiculoSeleccionado!: IVehiculo ;
  conductorSeleccionado!: IConductor ;
  Conductores: IConductor[] = [];
  Vehiculos: IVehiculo[] = [];

  constructor(private formBuilder: FormBuilder, private _peticiones: PeticionesService) {
   
    this.value = new Date(Date.now());
    this.formulario = this.formBuilder.group({
      VIA_FechaInicio: [this.value, Validators.required],
      VIA_Empresa: ['', Validators.required],
      VIA_Manifiesto: ['', Validators.required],
      CON_CedulaConductor: ['', Validators.required],
      VEI_CodigoVehiculo: ['', Validators.required],
      VIA_Origen: ['', Validators.required],
      VIA_Destino: ['', Validators.required],
      VIA_KmRecorridos: ['', Validators.required],
      VIA_Peso: ['', Validators.required],
      VIA_PagoConductor: ['', Validators.required],
      VIA_PagoCombustible: ['', Validators.required],
      VIA_PagoPeajes: ['', Validators.required],
      VIA_PagoOtros: ['', Validators.required],
      VIA_DetallesViaje: ['', Validators.required],
      VIA_ValorViaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.TraerVehiculos();
    this.TraerConductores();
    
  }

  onSubmit() {

    console.log(this.formulario)
    if (this.formulario.valid) {
      const Viaje: IViaje = {
        viA_Id: this.formulario.value.viA_Id,
        viA_FechaInicio: this.formulario.value.VIA_FechaInicio,
        viA_Empresa: this.formulario.value.VIA_Empresa,
        viA_Manifiesto: this.formulario.value.VIA_Manifiesto,
        coN_CedulaConductor: this.conductorSeleccionado?.coN_CedulaConductor,
        veI_CodigoVehiculo: this.vehiculoSeleccionado?.veI_CodigoVehiculo,
        viA_Origen: this.formulario.value.VIA_Origen,
        viA_Destino: this.formulario.value.VIA_Destino,
        viA_KmRecorridos: this.formulario.value.VIA_KmRecorridos,
        viA_Peso: this.formulario.value.VIA_Peso,
        viA_PagoConductor: this.formulario.value.VIA_PagoConductor,
        viA_PagoCombustible: this.formulario.value.VIA_PagoCombustible,
        viA_PagoPeajes: this.formulario.value.VIA_PagoPeajes,
        viA_PagoOtros: this.formulario.value.VIA_PagoOtros,
        viA_DetallesViaje: this.formulario.value.VIA_DetallesViaje,
        viA_ValorViaje: this.formulario.value.VIA_ValorViaje,
        viA_Utilidades: this.formulario.value.viA_Utilidades,
        viA_Habilitado: this.formulario.value.viA_Habilitado,
        viA_TimeStand: this.formulario.value.viA_TimeStand,
        
      };
    

     // Enviar objeto Post al Back-end
      this._peticiones.AgregarViaje(Viaje).subscribe(data => {
        console.log(data);
      });

      // Realiza la lógica para enviar los datos del formulario
    } else {
      // El formulario no es válido, muestra una alerta o mensaje de error
      Object.keys(this.formulario.controls).forEach(key => {
        const control = this.formulario.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this._peticiones.SetToast('Por favor, complete todos los campos obligatorios.',2);
    }
  }

  TraerVehiculos() {
    this._peticiones.getVehiculos().subscribe(res => {
      this.Vehiculos = res;
    });
  }

  TraerConductores() {
    this._peticiones.getConductores().subscribe(res => {
      debugger;
      res.map(x => (x.coN_NombresConductor = x.coN_NombresConductor + ' ' + x.coN_ApellidosConductor));
      this.Conductores = res;
    });
  }
  
}

