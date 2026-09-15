import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private http:AuthService,private router:Router){

    this.buildForm();

  }

  buildForm(){
    this.loginForm= this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const payload=this.loginForm.value;
    this.http.login(payload).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token)

        alert("login Successful")
        this.router.navigate(['/dashboard'])
      },
      error:(error)=>{
        console.log(error||"Something went wrong");
        alert(error.message.message||"Login Failed");
      }
    })
    console.log(this.loginForm.value)
  }
}
