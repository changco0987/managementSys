import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
  }

  onLogin() {
    
    if (this.loginForm.invalid) 
    {
      alert('Please fill in all required fields.');
      return;
    }
    
   // Explicitly cast to expected type to avoid type issues
   const credentials = this.loginForm.getRawValue() as { email: string; password: string };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.data.token) 
        {
          this.router.navigate(['home']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid credentials');
      }
    });
  }
  

  goToRegister()
  {
    this.router.navigate(['/register']);
  }
}
