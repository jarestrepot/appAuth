import { Component, inject } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, MinValidator, Validators } from '@angular/forms';
import { User } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';
import { emailPattern } from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public currentUser?: User;


  public myFormAuth: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  login(): void {

    if (this.myFormAuth.invalid) {
      this.myFormAuth.markAllAsTouched();
      return;
    }

    const { email, password } = this.myFormAuth.value;

    this.authService.login(email, password).subscribe({
      next: ( sucess ) => console.log( sucess ),
      error: ( err ) => console.log( err ),
    });

    this.myFormAuth.reset();

  }

  isValidField(field: string): boolean | null {
    return this.myFormAuth.controls[field].errors && this.myFormAuth.controls[field].touched;
  }

  getFieldError(field: string) {

    if (!this.myFormAuth.controls[field] && !this.myFormAuth.controls[field].errors) {
      return null;
    }


    const errors = this.myFormAuth.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'This is field is requied'
          break
        case 'minlength':
          return `This field requires a minimum of ${errors['minlength'].requiredLength} letters, actually ${errors['minlength'].actualLength}`
          break
        case 'pattern': return 'Inavlid email'
          break;
        default: return ''
          break
      }
    }
    return ''
  }


}
