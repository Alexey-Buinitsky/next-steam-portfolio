export class VerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VerificationError';
  }
}

export const EMAIL_VERIFICATION_ERRORS = {
  INVALID_CODE: new VerificationError('Invalid verification code'),
  EXPIRED_CODE: new VerificationError('Verification code has expired'),
  USER_NOT_FOUND: new VerificationError('User not found'),
};