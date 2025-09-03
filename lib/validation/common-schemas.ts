// lib/validation/common-schemas.ts
import { z } from 'zod';

// Базовые схемы для переиспользования
export const emailCommonSchema = z.string().email('Please enter a valid email address')
export const passwordCommonSchema = z.string().min(8, 'Password must contain at least 8 characters')
export const codeCommonSchema = z.string().length(6, 'Code must be 6 characters')
export const userIdCommonSchema = z.number().int().positive('Invalid user ID')
export const portfolioIdCommonSchema = z.string().min(1, "Select the portfolio you want to add to")
export const buyPriceCommonSchema = z.number().min(0.01, "Price must be at least $0.01")
export const quantityCommonSchema = z.number().min(1, "Quantity must be at least 1")
export const nicknameCommonSchema = z.string().max(32, 'Nickname must be less than 32 characters').optional()
// export const nicknameSchema = z.string().max(32, 'Nickname must be less than 32 characters').optional()