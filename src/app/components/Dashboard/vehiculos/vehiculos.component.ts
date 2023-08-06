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
    veI_CodigoVehiculo:['',Validators.required],
    veI_PlacaVehiculo:['',Validators.required],
    veI_Descripcion:[null,[Validators.maxLength(50)] ],
    veI_Modelo:['', Validators.required],
    veI_PesoLimite: ['',Validators.required],
    veI_KmInicial: [ '',  Validators.required],
    veI_FechaIngreso: [this.value, Validators.required]
  });
}
onSubmit(){
  debugger;
  console.log(this.formulario);
  if (this.formulario.valid){
    const Vehiculo :IVehiculo={
      veI_Id: 0,
      veI_CodigoVehiculo: this.formulario.value.veI_CodigoVehiculo,
      veI_PlacaVehiculo:this.formulario.value.veI_PlacaVehiculo,
      veI_Habilitado:true,
      veI_Descripcion:this.formulario.value.veI_Descripcion,
      veI_Modelo:this.formulario.value.veI_Modelo,
      veI_PesoLimite:this.formulario.value.veI_PesoLimite,
      veI_KmInicial:this.formulario.value.veI_KmInicial,
      veI_FechaIngreso:this.formulario.value.veI_FechaIngreso.toISOString(),
      veI_TimeStand:new Date(Date.now())

    };
    this._peticiones.AgregarVehiculo(Vehiculo).subscribe(data => {
      this._peticiones.SetToast('Se agrego el vehiculo correctamente', 1);
      this.LimpiarFomurlario();
    }, err => {
      console.log(err)
      this._peticiones.SetToast(err.Message, 3);
    });
    
  }

  
}
LimpiarFomurlario() {
  this.formulario.reset();


}

}
