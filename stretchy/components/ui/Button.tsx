'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'pink';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-transform active:scale-95 cursor-pointer border-none';

    const variants = {
      primary:   'bg-[#2C8FE0] text-[#F5EDE3]',
      secondary: 'bg-[#F5EDE3] text-[#1A1A1A]',
      ghost:     'bg-transparent text-[#F5EDE3] border border-[rgba(245,237,227,0.35)]',
      dark:      'bg-[#1A1A1A] text-[#F5EDE3]',
      pink:      'bg-[#B5DDE9] text-[#1A1A1A]',
    };

    const sizes = {
      sm: 'px-4 py-2.5 text-sm h-9',
      md: 'px-5 py-3.5 text-[15px] h-12',
      lg: 'px-7 py-5 text-[17px] h-[60px]',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
