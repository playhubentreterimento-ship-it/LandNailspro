import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gold' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  showShimmer?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  showShimmer = true,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) * 0.25;
    const distanceY = (clientY - centerY) * 0.25;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-pill tracking-wider',
    md: 'px-6 py-3.5 text-sm font-bold rounded-pill tracking-wide',
    lg: 'px-8 py-4 text-base font-bold rounded-pill tracking-wide min-h-[52px]',
  };

  const variantClasses = {
    primary:
      'bg-cta-gradient text-white shadow-rose-soft hover:shadow-magenta-glow border border-white/20 active:scale-[0.98]',
    secondary:
      'bg-white/90 text-plum hover:text-magenta border border-magenta/15 hover:border-magenta/40 shadow-rose-soft hover:bg-white active:scale-[0.98]',
    gold:
      'bg-gold-gradient text-plum font-bold shadow-gold-glow border border-amber-200/50 hover:brightness-105 active:scale-[0.98]',
    glass:
      'bg-white/60 backdrop-blur-md text-plum hover:text-magenta border border-white/80 hover:bg-white/90 shadow-rose-soft active:scale-[0.98]',
  };

  const content = (
    <motion.span
      className="relative z-10 flex items-center justify-center gap-2"
      animate={{ x: position.x * 0.4, y: position.y * 0.4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {children}
      {showShimmer && variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer pointer-events-none rounded-pill"
          aria-hidden="true"
        />
      )}
    </motion.span>
  );

  const sharedClasses = `relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 select-none cursor-pointer group ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={isTouchDevice ? {} : { x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={sharedClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isTouchDevice ? {} : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      onClick={onClick}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};
