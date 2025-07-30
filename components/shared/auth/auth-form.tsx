'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { useAuthForm, type AuthMode, type AuthFormValues, type RegisterFormValues } from '@/hooks/use-auth-form';
import { SubmitHandler, Control } from 'react-hook-form';

interface Props {
    onClose: () => void;
}

export const AuthForm: React.FC<Props> = ({ onClose }) => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [serverError, setServerError] = useState('');

    const router = useRouter();

    const { form } = useAuthForm(mode);
    const { handleSubmit, formState, reset, control } = form;

    const toggleMode = () => {
        const newMode = mode === 'login' ? 'register' : 'login';
        setMode(newMode);
        reset(newMode === 'login' 
            ? { login: '', password: '' }
            : { login: '', password: '', nickname: '' }
        );
        setServerError('');
    };

    const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
        setServerError('');

        try {
            const endpoint = mode === 'login' ? 'login' : 'register';
            const body = mode === 'register' 
                ? data 
                : { login: data.login, password: data.password };
            const response = await fetch(`/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Authentication error');
            }
            
            onClose();
            router.refresh();
        } catch (err) {
            setServerError(err instanceof Error ? err.message : 'Authentication failed');
        }
    };

    return (
        <div className="bg-background p-6 rounded-lg  w-full border shadow-lg">
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
                        name="login"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Login</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your login" 
                                        {...field} 
                                        autoComplete={mode === 'login' ? 'username' : 'off'}
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
                                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                
                    <div className="pt-1">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-primary text-sm hover:underline focus-visible:underline outline-none cursor-pointer"
                        >
                            {mode === 'login' 
                            ? "Don't have an account? Register" 
                            : "Already have an account? Sign in"}
                        </button>
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
                            disabled={!formState.isValid || formState.isSubmitting}
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
    );
};