import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import Swal from 'sweetalert2';

import { User } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';
import { emailPattern } from 'src/app/shared/validators/validators';
import { Router } from '@angular/router';
import { FORMS_ERRORRS } from '@helpers/errors/formErrors';
import { ValidatorsService } from '@shared/service/validators.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public currentUser?: User;
  private router = inject( Router );
  private validatorsService = inject(ValidatorsService);


  public myFormAuth: FormGroup = this.fb.group({
    email: ['javier@gmail.com', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
  });


  login(): void {
    if (this.myFormAuth.invalid) {
      this.myFormAuth.markAllAsTouched();
      return;
    }

    const { email, password } = this.myFormAuth.value;

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => Swal.fire('Error', message, 'error'),
    });

    this.myFormAuth.reset();

  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField( field, this.myFormAuth );
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError( field, this.myFormAuth );
  }


}
