import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {
formulario: FormGroup;
value :Date | undefined;
constructor(private formBuilder: FormBuilder, private _peticiones :PeticionesService){
  this.value= new Date (Date.now());
   
  this.formulario= this.formBuilder.group({
    VEI_CodigoVehiculo:['',Validators.required],
    VEI_PlacaVehiculo:['',Validators.required],
    VEI_Descripcion:[null,[Validators.maxLength(50)] ],
    VEI_Modelo:['', Validators.required],
    VEI_PesoLimite: ['',Validators.required],
    VEI_KmInicial: [ '',  Validators.required],
    VEI_FechaIngreso:[this.value, Validators.required]
    
  });
}
onSubmit(){
  debugger;
  console.log(this.formulario);
  if (this.formulario.valid){
    const Vehiculo :IVehiculo={
      veI_Id: 0,
      veI_CodigoVehiculo: this.formulario.value.VEI_CodigoVehiculo,
      veI_PlacaVehiculo:this.formulario.value.VEI_PlacaVehiculo,
      veI_Habilitado:true,
      veI_Descripcion:this.formulario.value.VEI_Descripcion,
      veI_Modelo:this.formulario.value.VEI_Modelo,
      veI_PesoLimite:this.formulario.value.VEI_PesoLimite,
      veI_KmInicial:this.formulario.value.VEI_KmInicial,
      veI_FechaIngreso:this.formulario.value.VEI_FechaIngreso.toISOString(),
      veI_TimeStand:new Date(Date.now())

    };
    this._peticiones.AgregarVehiculo(Vehiculo).subscribe(data => {
      this._peticiones.SetToast('Se agrego el vehiculo correctamente', 1);
      this.LimpiarFomurlario();
    }, err => {
      console.log(err)
      this._peticiones.SetToast(err.Message, 3);
    });
    
  } else{
    for (const control in this.formulario.controls) {
      if (this.formulario.controls[control].invalid) {

        this._peticiones.SetToast(`El campo ${control.split('_')[1]} está incompleto`, 2);
        break;
      }
    }
  }

  
}
LimpiarFomurlario() {
  this.formulario.reset();


}

}
