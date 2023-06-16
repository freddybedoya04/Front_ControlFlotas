import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  exports:[
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
