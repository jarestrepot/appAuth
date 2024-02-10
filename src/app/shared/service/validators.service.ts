import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FORMS_ERRORRS } from '@helpers/errors/formErrors';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  /* FormControlName Equeals */
  public mustBeEqual(firtsField: string, secondField: string): ValidationErrors | null {
    return ( formGorup: FormGroup ):ValidationErrors | null => {

      const field1 = formGorup.get(firtsField)?.value;
      const field2 = formGorup.get(secondField)?.value;

      if ( field1 !== field2 ) {
        formGorup.get( secondField )?.setErrors( { notEqual: true } );
        return { notEqual: true };
      }

      formGorup.get( secondField )?.setErrors( null );
      return null
    }
  }


  isValidField(field: string, fb: FormGroup): boolean | null {
    return fb.controls[field].errors && fb.controls[field].touched
  }

  public getFieldError(field: string, fb: FormGroup): string | null {

    if (!fb.controls[field].errors && !fb.controls[field].touched) {
      return null;
    }

    const errors = fb.controls[field].errors || {};

    let errorMessage: string = '';
    for (let key in errors) {
      switch (key) {
        case 'required':
          errorMessage = FORMS_ERRORRS.required;
          break;
        case 'minlength':
          errorMessage = FORMS_ERRORRS.minLength(errors);
          break;
        case 'pattern':
          errorMessage = FORMS_ERRORRS.pattern('email');
          break;
        case 'emailTaken':
          errorMessage = FORMS_ERRORRS.emailTaken;
          break;
        case 'notEqual':
          errorMessage = FORMS_ERRORRS.notEqual('Password')
          break;
        default:
          errorMessage = '';
          break;
      }
    }
    return errorMessage;
  }



}

