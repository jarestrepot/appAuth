import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {

  private authService = inject( AuthService );

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email:string = control.value;

    return this.authService.checkEmail( email )
      .pipe(
        map(response => {
          return (response)
            ? { emailTaken: true }
            : null
        })
      );
  }

}
