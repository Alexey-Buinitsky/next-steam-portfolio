// lib/validation/validate-data-with-schema.ts
import { ZodSchema } from 'zod';

export function validateDataWithSchema(schema: ZodSchema, data: unknown) {
  const validationResult = schema.safeParse(data);
  
  if (!validationResult.success) {
    // Форматируем ошибки в более удобный вид
    const errors = validationResult.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0]; // Берем первое сообщение об ошибке

    return {
      isValid: false as const,
      error: firstError || 'Invalid input data',
    };
  }
  
  return {
    isValid: true as const,
    data: validationResult.data
  };
}