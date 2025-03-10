import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationData } from '../../models/registration-data';
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatepickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm: FormGroup;
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  serverErrors: any = {};//This will be the container of error responses from server/API


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  // Capture date from DatepickerComponent
  onDateChange(date: string) {
    this.registerForm.patchValue({ birthday: date });
    console.log(this.registerForm.value);
  }

  onSubmit() {
    if (this.registerForm.valid) 
    {
      const userData: RegistrationData = this.prepareData();
      this.authService.register(userData).subscribe({
        next: (res) => this.showSuccess(res.message),
        error: (err) => {
          this.showError(err.message)
        
          if (err.error?.errors) 
          {
            this.serverErrors = err.error.errors; // Store API errors
          }
        
        },
      });
    }
  }

  // Format data before sending (e.g., Date to ISO string)
  private prepareData(): RegistrationData
  {
    const formValue = this.registerForm.value;
    const datePipe = new DatePipe('en-US');//handles date format

    return {
      ...formValue,
      birthday: datePipe.transform(formValue.birthday, 'yyyy-MM-dd')
    };
  }


  private showError(message: string) 
  {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }


  private showSuccess(message: string) 
  {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }


  hasError(controlName: string) {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
  }


}




