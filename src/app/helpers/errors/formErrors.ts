import { ValidationErrors } from "@angular/forms";

export const FORMS_ERRORRS = {
  pattern: ( field:string )  => `Invalid ${ field }`,
  required: 'This is field is requied',
  minLength: (errors: ValidationErrors) => `This field requires a minimum of ${errors['minlength'].requiredLength} letters, actually ${errors['minlength'].actualLength}`,
  notEqual: ( field: string ) => `${ field } does not match`,
  emailTaken: `the email has an assigned account`
}
Object.freeze(FORMS_ERRORRS);
