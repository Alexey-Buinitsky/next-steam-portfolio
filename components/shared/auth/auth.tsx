'use client'

import React from 'react';
import { useState } from 'react';
import { PasswordStrengthIndicator, AuthEmailVerification, ForgotPassword, ResetPassword } from '@/components/shared';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { useAuthForm, type AuthMode} from '@/hooks/use-form/use-auth-form';
import { type AuthFormValues, type RegisterFormValues } from '@/lib';
import { SubmitHandler, Control } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { getFetchError } from '@/lib';

interface Props {
    onClose: () => void;
}

type ExtendedAuthMode = AuthMode | 'forgot-password' | 'reset-password'

export const Auth: React.FC<Props> = ({ onClose }) => {
    const [mode, setMode] = useState<ExtendedAuthMode>('login')
    
    const [serverError, setServerError] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [needsVerification, setNeedsVerification] = useState(false)
    const [verificationEmail, setVerificationEmail] = useState<string>('')
    const [verificationUserId, setVerificationUserId] = useState<number | null>(null)
    
    // Для восстановления пароля
    const [resetEmail, setResetEmail] = useState<string>('')
    const [resetUserId, setResetUserId] = useState<number | null>(null)

    const { form } = useAuthForm(mode as AuthMode)
    const { handleSubmit, formState, reset, control } = form

    const toggleMode = () => {
        const newMode = mode === 'login' ? 'register' : 'login'
        setMode(newMode)
        reset(newMode === 'login' 
            ? { email: '', password: '' }
            : { email: '', password: '', nickname: '' }
        )
        setServerError('')
    }

    const handleForgotPassword = () => {
        setMode('forgot-password')
        setServerError('')
    }

    const handleBackToLogin = () => {
        setMode('login')
        setServerError('')
    }

    const handleForgotPasswordSuccess = (email: string, userId: number) => {
        setResetEmail(email)
        setResetUserId(userId)
        setMode('reset-password')
    }
    
    const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
        setServerError('')

        try {
            const response = await fetch(`/api/auth/${mode}`, { // Используем mode вместо endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mode === 'register' ? data : { 
                    email: data.email, 
                    password: data.password 
                })
            })
            
            if (!response.ok) {
                const apiError = await getFetchError(response)
                
                // // Специфичная обработка ошибок
                // if (error.code === 'EMAIL_NOT_VERIFIED') {
                //     setNeedsVerification(true)
                //     setVerificationEmail(data.email)
                //     return
                // }
                
                throw new Error(apiError.error)
            }

            const responseData = await response.json()
            
            if (mode === 'login') {
                onClose()
                window.location.reload()
            }

            if (mode === 'register' && responseData.success) {
                setNeedsVerification(true)
                setVerificationEmail(responseData.email)
                setVerificationUserId(responseData.userId)
            }
            
        } catch (err) {
            setServerError(err instanceof Error ? err.message : 'Authentication failed')
        }
    }

    const searchParams = useSearchParams()

    if (needsVerification) {
        return (
            <AuthEmailVerification 
                email={verificationEmail} 
                userId={verificationUserId!} 
                onSuccess={() => {
                    const redirect = searchParams.get('redirect') || '/'
                    window.location.href = redirect
                }}
            />
        )
    }

    if (mode === 'forgot-password') {
        return (
            <ForgotPassword 
                onSuccess={handleForgotPasswordSuccess}
                onBackToLogin={handleBackToLogin}
            />
        )
    }

    if (mode === 'reset-password') {
        return (
            <ResetPassword 
                userId={resetUserId || undefined}
                email={resetEmail}
                onSuccess={() => {
                    onClose()
                    window.location.reload()
                }}
                onBackToForgot={handleForgotPassword}
            />
        )
    }

    return (
        <div>
            <h2 className="text-x font-bold mb-4">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
        
            {serverError && (
                <p className="text-destructive mb-4 text-center text-sm">
                    {serverError}
                </p>
            )}
        
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {mode === 'register' && (
                        <FormField
                            control={control as Control<RegisterFormValues>}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nickname</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your display name" 
                                            {...field} 
                                            autoComplete="username"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                
                    <FormField
                        control={control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        type='email'
                                        placeholder="your@example.com" 
                                        {...field} 
                                        autoComplete='email'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        {...field} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setPasswordValue(e.target.value);
                                        }}
                                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                    />
                                </FormControl>

                                {mode === 'register' && (
                                    <PasswordStrengthIndicator password={passwordValue} />
                                )}
                                <FormMessage />

                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-primary text-sm hover:underline focus-visible:underline outline-none cursor-pointer"
                        >
                            {mode === 'login' 
                            ? "Don't have an account? Register" 
                            : "Already have an account? Sign in"}
                        </button>

                        {mode === 'login' && (
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="block text-primary text-sm hover:underline focus-visible:underline outline-none cursor-pointer"
                            >
                                Forgot your password?
                            </button>
                        )}
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            type="button"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        
                        <Button
                            type="submit"
                            // disabled={!formState.isValid || formState.isSubmitting}
                            className="flex-1"
                        >
                            {formState.isSubmitting 
                                ? (<span>Processing...</span>) 
                                : mode === 'login' 
                                    ? ('Sign In') 
                                    : ('Register')
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}