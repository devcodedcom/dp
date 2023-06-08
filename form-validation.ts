import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormGroup } from '@angular/forms';

interface CustomError {
  message: string;
  kind?: string;
  fields?: string[];
}

export function validateServerErrors(error: any, form: FormGroup) {
  if (error instanceof HttpErrorResponse && error.status === 422) {

    const validationErrors = error.error?.errors;
    const customError: CustomError = error.error?.customError;

    if (validationErrors) {
      Object.keys(validationErrors).forEach(property => {
        const formControl = form.get(property);

        if (formControl) {
          formControl.markAsDirty();
          formControl.setErrors({
            [validationErrors[property].kind + 'ServerError']: validationErrors[property]
          });
        }
      });
    } else if (customError) {
      if (customError.fields) {
        customError.fields.forEach((property: string) => {
          const formControl = form.get(property);

          if (formControl) {
            formControl.markAsDirty();
            formControl.setErrors({
              [customError.kind + 'CustomServerError']: customError
            });
          }
        })
      } else {
        alert(customError.message); // TODO change it to SNACK BAR ETC.
      }
    } else {
      /** While putting (update) collections
       *  Handling Cast errors which have different namings like:
       *  - ValidationError - kind: Number
       *  - CastError - kind: number (lowercase difference)
       */
      const formControl = form.get(error.error.path);

      if (formControl) {
        const serverErrorKind = error.error.kind.charAt(0).toUpperCase() + error.error.kind.slice(1);
        formControl.markAsDirty();
        formControl.setErrors({
          [serverErrorKind + 'ServerError']: error.error.message
        });
      }
    }
  }
}

export function validateFormFields(form: FormGroup) {
  Object.keys(form.controls).forEach((field, i) => {
    if (form.get(field) instanceof FormGroup || form.get(field) instanceof FormArray) {
      validateFormFields(form.get(field) as FormGroup);
    } else {
      form.get(field)?.markAsDirty();
    }
  });
}

export const validationMessage = {
  required: 'Pole wymagane.',
  incorrect: 'Pole nieprawidłowe.',
  incorrectLogin: 'Email lub hasło jest nieprawidłowe.',
  shortPassword: 'Hasło powinno posiadać min. 6 znaków.',
  matchPassword: 'Podane hasła się różnią.',

};
