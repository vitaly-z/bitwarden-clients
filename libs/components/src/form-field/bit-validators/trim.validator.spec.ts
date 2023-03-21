import { FormControl } from "@angular/forms";

import { trimValidator } from "./trim.validator";

describe("trimValidator", () => {
  it("should return no error when input is null", () => {
    const input = createControl(null);
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toBe(null);
  });

  it("should return no error when input is the empty string", () => {
    const input = createControl("");
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toBe(null);
  });

  it("should return no error when input has not beginning or trailing whitespace", () => {
    const input = createControl("test value");
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toBe(null);
  });

  it("should error when input has a beginning whitespace", () => {
    const input = createControl(" test value");
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toEqual({ trim: { message: "input is not trimmed" } });
  });

  it("should error when input has a trailing whitespace", () => {
    const input = createControl("test value ");
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toEqual({ trim: { message: "input is not trimmed" } });
  });

  it("should error when input has a beginning and trailing whitespace", () => {
    const input = createControl(" test value ");
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toEqual({ trim: { message: "input is not trimmed" } });
  });

  it("should error when input is just whitespace", () => {
    const input = createControl(" ");
    const validate = trimValidator();

    const errors = validate(input);

    expect(errors).toEqual({ trim: { message: "input is not trimmed" } });
  });
});

function createControl(input: string) {
  return new FormControl(input);
}
