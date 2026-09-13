import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

/**
 * Container de largura máxima com respiração lateral generosa (conceito Ma).
 */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16', className)}
      {...props}
    />
  );
}
