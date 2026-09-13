import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: AuthService,
    private router: Router,
  ) {
    this.buildForm();
  }
  buildForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      return;
    }

    this.http.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        alert(response.message);

        // Redirect to login page
        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.error(error);

        alert(error.error?.message || 'Registration failed');
      },
    });
  }
}
