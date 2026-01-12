import crypto from 'crypto';

/**
 * Generates a secure numeric OTP for Node.js
 * @param {number} length - The number of digits
 * @returns {string}
 */
export const generateOtpCode = (length = 6) => {
  const digits = '0123456789';
  let otp = '';

  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    otp += digits[randomBytes[i] % 10];
  }

  return otp;
}