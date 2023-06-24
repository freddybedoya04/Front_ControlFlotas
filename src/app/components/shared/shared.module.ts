import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    CardModule,
    TableModule,
    ToastModule
  ],
  exports:[
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    CardModule,
    TableModule,
    ToastModule
  ]
})
export class SharedModule { }
