import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Sweetalert2 } from '@helpers/interfaces/sweetAlert.interface';
import { ValidatorsService } from '@shared/service/validators.service';
import { EmailValidatorService } from '@shared/validators/email-validator.service';
import { emailPattern } from '@shared/validators/validators';
import { showAlertError } from 'src/app/helpers/errors/sweetAlerFunctions';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);
  private emailValidatorService = inject(EmailValidatorService);


  public myFormRegister: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(emailPattern)],
      [ this.emailValidatorService ] // Validación asincrona
    ],
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
  },
  {
    validators: [
      this.validatorsService.mustBeEqual('password', 'passwordConfirm'),
    ]
  });


  register(): void {
    if (this.myFormRegister.invalid) return;
    this.authService.register(this.myFormRegister.value)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: async ({ message }) => {
          if (message) {

            const objectError: Sweetalert2 = {
              title: 'Error',
              text: message,
              showClass: true
            }
            await showAlertError(objectError);
            this.myFormRegister.markAllAsTouched();
            this.myFormRegister.reset();
          }
        }
      });
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(field, this.myFormRegister);
  }

  getErrorField(field: string): string | null {
    return this.validatorsService.getFieldError(field, this.myFormRegister);
  }



}
