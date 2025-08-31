//app/lib/api-error/is-email-verification-requiered-error.ts
import { ApiError } from "./api-error";

interface EmailVerificationRequiredError extends ApiError {
  code: 'EMAIL_VERIFICATION_REQUIRED';
  email: string;
  userId: number;
}

// Type Guard функция для проверки типа ошибки
export function isEmailVerificationRequiredError(error: ApiError): error is EmailVerificationRequiredError {
  return error.code === 'EMAIL_VERIFICATION_REQUIRED';
}