import { ApiError } from "./api-error";

interface EmailVerificationRequiredError extends ApiError {
  code: 'EMAIL_VERIFICATION_REQUIRED';
  email: string;
  userId: number;
}

export function isEmailVerificationRequiredError(error: ApiError): error is EmailVerificationRequiredError {
  return error.code === 'EMAIL_VERIFICATION_REQUIRED'
}