import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes do Tailwind com segurança, resolvendo conflitos
 * (ex: "p-2 p-4" -> "p-4"). Uso padrão em todos os componentes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
