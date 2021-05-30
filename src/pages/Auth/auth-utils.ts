import { EMAIL_ERROR, PASSWORD_ERROR, REQUIRED } from "./constants";
import { FormError } from "./auth-types";

export function checkField(name: string, value: string, setErrors: Function) {
  if (value === "") {
    setErrors((prev: FormError) => ({ ...prev, [name]: REQUIRED }));
    return true;
  }
  return false;
}

export function validateEmail(email: string): boolean {
  const pattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !!email.match(pattern);
}

export function validatePassword(password: string): boolean {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !!password.match(pattern);
}
export function validatePatterns(
  email: string,
  password: string,
  setErrors: Function
) {
  const isEmailValid = validateEmail(email);
  !isEmailValid &&
    setErrors((prev: FormError) =>
      prev.email !== "" ? prev : { ...prev, email: EMAIL_ERROR }
    );
  const isPasswordValid = validatePassword(password);
  !isPasswordValid &&
    setErrors((prev: FormError) =>
      prev.password !== ""
        ? prev
        : {
            ...prev,
            password: PASSWORD_ERROR,
          }
    );
  return isPasswordValid && isEmailValid;
}

export function checkPasswords(
  password: string,
  confirmPassword: string,
  setErrors: Function
) {
  if (confirmPassword && password !== confirmPassword) {
    setErrors((prev: FormError) => ({
      ...prev,
      confirmPassword: "passwords should match",
    }));
  } else {
    setErrors((prev: FormError) => ({
      ...prev,
      confirmPassword: "",
    }));
  }
}
