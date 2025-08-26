"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { FieldValues, useFormContext, } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { FormField as FormFieldType, isNumberField } from '@/form/form-types';

interface Props<T extends FieldValues> {
	className?: string;
	id: string;
	fields: FormFieldType<T>[];
	onSubmit: (data: T) => void;
}

export function AppDialogForm<T extends FieldValues>({ className, id, fields, onSubmit }: Props<T>) {

	const { handleSubmit, control } = useFormContext<T>()

	return (
		<form className={cn("grid gap-3 2k:gap-4 4k:gap-6 8k:gap-12", className)} id={id} onSubmit={handleSubmit(onSubmit)}>
			{fields.map((field) => (
				<FormField key={field.name} name={field.name} control={control} render={({ field: rhfField }) => (
					<FormItem>
						<FormLabel>{field.label}</FormLabel>
						<FormControl>
							{isNumberField(field)
								? <Input placeholder={field.placeholder} type="number" min={field.min} max={field.max} step={field.step} {...rhfField} />
								: <Input placeholder={field.placeholder} type="text" maxLength={field.maxLength} {...rhfField} />
							}
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
				/>
			))}
		</form>
	)
}