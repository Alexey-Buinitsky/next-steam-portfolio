import { z } from 'zod';
import { FieldValues, Path } from 'react-hook-form';
import { portfolioAssetSchema, portfolioSchema, addToPortfolioSchema, authSchema, registerSchema, createPortfolioSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema, resendCodeSchema } from '@/form';

// Типы для схем валидации
export type AddToPortfolioFormValues = z.infer<typeof addToPortfolioSchema>
export type AuthFormValues = z.infer<typeof authSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type AuthOrRegisterFormValues = AuthFormValues | RegisterFormValues
export type CreatePortfolioFormValues = z.infer<typeof createPortfolioSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>
export type ResendCodeFormValues = z.infer<typeof resendCodeSchema>
export type PortfolioFormValues = z.infer<typeof portfolioSchema>
export type PortfolioAssetFormValues = z.infer<typeof portfolioAssetSchema>

// Базовый тип для поля формы
export type BaseFormField<T extends FieldValues> = {
	name: Path<T>;
	label: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

// Типы для конкретных типов полей
export type TextFormField<T extends FieldValues> = BaseFormField<T> & {
	type: 'text';
	maxLength?: number;
}

export type NumberFormField<T extends FieldValues> = BaseFormField<T> & {
	type: 'number';
	min?: number;
	max?: number;
	step?: number;
}

// Объединенный тип для всех полей формы
export type FormField<T extends FieldValues> =
	| TextFormField<T>
	| NumberFormField<T>

// Помощник для определения типа поля
export function isNumberField<T extends FieldValues>(field: FormField<T>): field is NumberFormField<T> {
	return field.type === 'number';
}