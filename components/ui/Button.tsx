import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
          {
            'bg-green-800 text-white hover:bg-green-700 shadow-lg hover:shadow-xl': variant === 'primary',
            'bg-stone-100 text-green-900 hover:bg-stone-200 border border-stone-200': variant === 'secondary',
            'text-green-800 hover:bg-green-50': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-base px-6 py-3': size === 'md',
            'text-lg px-8 py-4': size === 'lg',
            'text-xl px-10 py-5': size === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
