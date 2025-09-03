import { hash, compare } from 'bcryptjs';

const SALT_ROUNDS = 12 // Оптимально для баланса безопасности и производительности

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}