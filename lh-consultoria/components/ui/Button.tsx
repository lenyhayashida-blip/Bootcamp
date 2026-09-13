import { cn } from '@/lib/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * Botão base do design system. Sóbrio, sem sombras pesadas, transição suave
 * (conceito Shibui — nada chamativo demais).
 */
export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-wider2 transition-colors duration-300 ease-japandi focus-visible:outline-gold',
        variant === 'primary' &&
          'bg-gold text-charcoal hover:bg-gold-light',
        variant === 'secondary' &&
          'border border-gold text-gold hover:bg-gold/10',
        variant === 'ghost' &&
          'text-offwhite hover:text-gold',
        className
      )}
      {...props}
    />
  );
}
