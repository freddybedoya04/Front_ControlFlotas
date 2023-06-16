import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private route:Router){
    this.loginForm=this.fb.group({
     user:['',Validators.required] ,
     pass:['',Validators.required]
    })
  }

  Login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      for(const key in this.loginForm.controls){
        if(this.loginForm.controls[key].invalid)
          this.loginForm.controls[key].markAsDirty();
      }
      return
    }
    this.route.navigate(['main'])
    
  }
}
