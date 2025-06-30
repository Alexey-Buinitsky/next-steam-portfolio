import { FieldValues, Path } from 'react-hook-form';
import { z } from 'zod';
import { assetSchema, portfolioSchema } from '@/form/form-schemas';

// Типы для схем валидации
export type PortfolioFormValues = z.infer<typeof portfolioSchema>
export type AssetFormValues = z.infer<typeof assetSchema>

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