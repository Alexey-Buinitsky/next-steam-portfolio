'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Input } from '@/components/ui/'

const COOLDOWN_SECONDS = 60; // 1 минута
const MAX_ATTEMPTS = 5

export const AuthEmailVerification = ({ userId, email, onSuccess }: { userId: number, email: string, onSuccess: () => void }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [resendCooldown, setResendCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (resendCooldown <= 0) return
    
    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [resendCooldown])


  const handleApiRequest = async ( url: string, body: object ) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        // Обработка rate limit с сервера
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After') || COOLDOWN_SECONDS
          setResendCooldown(Number(retryAfter))
        }
        throw new Error(data.error || 'Request failed')
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
      throw err; // Пробрасываем ошибку для дополнительной обработки
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (attempts >= MAX_ATTEMPTS) {
      setError('Too many attempts. Please request a new code.')
      return
    }

    try {
      await handleApiRequest('/api/auth/verify', { userId, code })
      onSuccess()
    } catch {
      setAttempts(prev => prev + 1)
    }
  }

  const handleResendCode = async () => {
    try {
      await handleApiRequest('/api/auth/resend-code', { userId, email });
      setResendCooldown(COOLDOWN_SECONDS);
      setAttempts(0)
    } catch {
      // Ошибка уже обработана
    }
  };

  return (
     <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
        </p>
      </div>

      <Input
        value={code}
        onChange={(e) => {
          setCode(e.target.value.toUpperCase())
          setError('')
        }}
        placeholder="Enter 6-digit code"
        maxLength={6}
        disabled={isLoading || attempts >= MAX_ATTEMPTS}
        className="text-center font-mono tracking-widest text-lg"
      />

      {error && (
        <p className="text-sm font-medium text-destructive text-center">{error}</p>
      )}

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleVerify}
          disabled={isLoading || code.length !== 6 || attempts >= MAX_ATTEMPTS}
          size="lg"
        >
          {isLoading ? 'Verifying...' : 'Verify Account'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Didn't receive code?
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleResendCode}
          disabled={isLoading || resendCooldown > 0}
          size="lg"
        >
          {resendCooldown > 0 
            ? `Resend code in ${resendCooldown}s` 
            : 'Resend verification code'}
        </Button>
      </div>
    </div>
  );
};