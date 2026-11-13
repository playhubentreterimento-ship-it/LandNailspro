import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pill' | 'gold' | 'magenta' | 'outline' | 'success';
  hasPulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pill',
  hasPulse = false,
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold rounded-pill tracking-wide transition-all';

  const variantClasses = {
    pill: 'bg-white/90 text-plum border border-magenta/15 shadow-sm',
    gold: 'bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/90 text-amber-950 border border-gold/40 shadow-sm',
    magenta: 'bg-magenta/10 text-magenta border border-magenta/20',
    outline: 'border border-magenta/25 text-magenta bg-transparent',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {hasPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta" />
        </span>
      )}
      {children}
    </span>
  );
};
