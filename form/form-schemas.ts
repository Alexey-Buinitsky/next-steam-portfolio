import { z } from 'zod';
import { emailCommonSchema, passwordCommonSchema, codeCommonSchema, userIdCommonSchema, portfolioIdCommonSchema, buyPriceCommonSchema, quantityCommonSchema, nicknameCommonSchema, portfolioNameCommonSchema } from './form-common-schemas';

// Схемы для конкретных эндпоинтов и форм
export const portfolioSchema = z.object({
	portfolioName: portfolioNameCommonSchema,
})

export const portfolioAssetSchema = z.object({
	quantity: quantityCommonSchema,
	buyPrice: buyPriceCommonSchema,
})

export const addToPortfolioSchema = z.object({
	portfolioId: portfolioIdCommonSchema,
	buyPrice: buyPriceCommonSchema,
	quantity: quantityCommonSchema,
})

export const authSchema = z.object({
	email: emailCommonSchema,
	password: passwordCommonSchema,
})

export const registerSchema = authSchema.extend({
	nickname: nicknameCommonSchema,
	// password: z.string()                                                            
	// .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
	// .regex(/[a-z]/, 'Must contain at least one lowercase letter')
	// .regex(/[0-9]/, 'Must contain at least one number')
	// .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
	// если нужна строгая система сложности пароля 
})

export const createPortfolioSchema = z.object({
  	name: portfolioNameCommonSchema,
})

export const forgotPasswordSchema = z.object({
  	email: emailCommonSchema,
})

export const resetPasswordSchema = z.object({
	code: codeCommonSchema,
	password: passwordCommonSchema,
	confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

export const verifyEmailSchema = z.object({
	userId: userIdCommonSchema,
	code: codeCommonSchema,
})

export const resendCodeSchema = z.object({
	userId: userIdCommonSchema,
	email: emailCommonSchema,
})