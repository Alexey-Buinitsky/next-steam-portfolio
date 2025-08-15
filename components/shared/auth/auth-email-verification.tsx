'use client'
import React from 'react';
import { useState } from 'react';
import { Button, Input } from '@/components/ui/'

export const AuthEmailVerification = ({ userId, email }: { userId: number, email: string }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ userId, code }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Verification failed');
      
      window.location.href = '/'; // Редирект после успеха
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

    // В AuthEmailVerification компоненте
  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        body: JSON.stringify({ userId, email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to resend code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
     <div className="space-y-4">
      <h2>Verify your email</h2>
      <p>Enter the 6-digit code sent to {email}</p>
      
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())} // Авто-апперкейс
        placeholder="ABCDEF"
        maxLength={6}
      />
      
      <Button 
        onClick={handleVerify}
        disabled={isLoading || code.length !== 6}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </Button>

      <Button 
        variant="outline"
        onClick={handleResendCode}
        disabled={isLoading}
        className="mt-2"
      >
        Resend verification code
      </Button>
      
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};