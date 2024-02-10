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
    email: ['javier@gmail.com', [Validators.required, Validators.pattern(emailPattern)],
      [ this.emailValidatorService ]
    ],
    name: ['javier', [Validators.required, Validators.minLength(3)]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['1234567', [Validators.required]],
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
