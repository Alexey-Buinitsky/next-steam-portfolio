// lib/auth/auth-notifications.ts
import { toast } from 'sonner';

export type NotificationOptions = {
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

// Централизованная функция для показа уведомлений
export const notify = {
  success: (message: string, options?: NotificationOptions) => {
    toast.success(message, options);
  },
  error: (message: string, options?: NotificationOptions) => {
    toast.error(message, options);
  },
  warning: (message: string, options?: NotificationOptions) => {
    toast.warning(message, options);
  },
  info: (message: string, options?: NotificationOptions) => {
    toast.info(message, options);
  },
};

// Вспомогательная функция для обработки API ошибок
export const handleApiError = (error: unknown, fallbackMessage?: string) => {
  const message = error instanceof Error ? error.message : fallbackMessage || 'An unexpected error occurred';
  
  notify.error(message, { duration: 5000 });
  
  console.error('API Error:', error);
};

// Функция для успешных действий
export const handleApiSuccess = (message: string) => {
  notify.success(message, { duration: 3000 });
};