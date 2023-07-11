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
  vehiculoSeleccionado: IVehiculo;
  conductorSeleccionado: IConductor;
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
    this.vehiculoSeleccionado = {
      veI_Id: 0,
      veI_CodigoVehiculo: '',
      veI_PlacaVehiculo: '',
      veI_Habilitado: false,
      veI_Descripcion: '',
      veI_Modelo: '',
      veI_PesoLimite: 0,
      veI_KmInicial: 0,
      veI_FechaIngreso: undefined,
      veI_TimeStand: undefined
    };
    this.conductorSeleccionado = {
      coN_Id: 0,
      coN_CedulaConductor: 0,
      coN_NombresConductor: '',
      coN_ApellidosConductor: '',
      coN_Habilitado: false,
      coN_FechaNacimiento: undefined,
      coN_TipoLicencia: '',
      coN_FechaIngreso: undefined,
      coN_TimeStand: undefined
    };

  }

  ngOnInit(): void {
    this.TraerVehiculos();
    this.TraerConductores();

  }

  onSubmit() {
    debugger;
    console.log(this.formulario)
    if (this.formulario.valid) {
      const Viaje: IViaje = {
        viA_Id: 0,
        viA_FechaInicio: this.formulario.value.VIA_FechaInicio.toISOString(),
        viA_Empresa: this.formulario.value.VIA_Empresa,
        viA_Manifiesto: this.formulario.value.VIA_Manifiesto,
        coN_CedulaConductor: this.formulario.value.CON_CedulaConductor.coN_CedulaConductor,
        veI_CodigoVehiculo: this.formulario.value.VEI_CodigoVehiculo.veI_CodigoVehiculo,
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
        viA_Utilidades: 0,
        viA_Habilitado: true,
        viA_TimeStand: new Date(Date.now())
        
      };

      Viaje.viA_Utilidades = this.CalcularUtilidades(Viaje);

      // Enviar objeto Post al Back-end
      this._peticiones.AgregarViaje(Viaje).subscribe(data => {
        this._peticiones.SetToast('Se agrego el viaje correctamente', 1);
        this.LimpiarFomurlario();
      }, err => {
        console.log(err)
        this._peticiones.SetToast(err.Message, 3);
      });


      // Realiza la lógica para enviar los datos del formulario
    } else {
      // El formulario no es válido, muestra una alerta o mensaje de error
      // Object.keys(this.formulario.controls).forEach(key => {
      //   const control = this.formulario.get(key);
      //   if (control?.invalid) {
      //     control.markAsTouched();
      //   }
      // });

      // Verificar si algún campo del formulario está incompleto
        for (const control in this.formulario.controls) {
          if (this.formulario.controls[control].invalid) {

            this._peticiones.SetToast(`El campo ${control.split('_')[1]} está incompleto`, 2);
            break;
          }
        }


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
  CalcularUtilidades(Viaje: IViaje): number {
    let TotalPagos = (Viaje.viA_PagoCombustible ?? 0) + (Viaje.viA_PagoConductor ?? 0) + (Viaje.viA_PagoPeajes ?? 0) + (Viaje.viA_PagoOtros ?? 0);
    let Utilidades = (Viaje.viA_ValorViaje ?? 0) - TotalPagos;
    return Utilidades;
  }
  LimpiarFomurlario() {
    this.formulario.reset();

  }

}

