import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function trimValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value != value.trim()) {
      return {
        notTrimmedError: {
          message: errorMessage,
        },
      };
    }
    return null;
  };
}
