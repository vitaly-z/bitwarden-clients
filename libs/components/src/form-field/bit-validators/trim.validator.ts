import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export function trimValidator(control: AbstractControl): ValidationErrors | null {
  if (!(control instanceof FormControl)) {
    throw new Error("trimValidator only supports validating FormControls");
  }
  if (control.value === null || control.value === undefined) {
    return null;
  }
  const value = control.value;
  if (value != value.trim()) {
    return {
      trim: {
        message: "input is not trimmed",
      },
    };
  }
  return null;
}
