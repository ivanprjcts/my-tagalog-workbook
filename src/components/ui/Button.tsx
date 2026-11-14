import type { ButtonHTMLAttributes } from 'react';
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white border border-accent hover:bg-accent-strong hover:border-accent-strong shadow-sm',
  secondary:
    'bg-white text-ink border border-line hover:border-accent hover:text-accent-strong shadow-sm',
  ghost: 'bg-transparent text-ink border border-transparent hover:bg-paper-strong',
  danger: 'bg-rose text-white border border-rose hover:bg-red-800',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles(variant, size, className)} {...props} />;
}
