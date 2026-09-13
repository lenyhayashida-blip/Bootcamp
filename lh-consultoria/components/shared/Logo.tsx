import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Monograma "LH" minimalista — linhas retas com traço vertical central
 * compartilhado entre o L e o H, conforme identidade visual do CLAUDE.md.
 */
export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={cn('text-gold', className)}
      role="img"
      aria-label="LH Consultoria"
    >
      {/* Traço vertical esquerdo do L */}
      <line x1="8" y1="8" x2="8" y2="32" stroke="currentColor" strokeWidth="1.5" />
      {/* Base do L */}
      <line x1="8" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" />
      {/* Traço vertical central compartilhado (perna direita do H) */}
      <line x1="22" y1="8" x2="22" y2="32" stroke="currentColor" strokeWidth="1.5" />
      {/* Traço vertical direito do H */}
      <line x1="32" y1="8" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" />
      {/* Travessão do H */}
      <line x1="22" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
