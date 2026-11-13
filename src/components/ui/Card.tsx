import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'blush' | 'dark' | 'glass';
  tilt?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  tilt = false,
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 6;
    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setRotateX(0);
    setRotateY(0);
  };

  const variantClasses = {
    white: 'bg-white/95 text-plum border border-magenta/10 shadow-rose-card hover:shadow-rose-hover',
    blush: 'bg-blush/60 text-plum border border-magenta/15 shadow-rose-soft',
    dark: 'bg-plum text-white border border-magenta/30 shadow-2xl',
    glass: 'bg-white/70 backdrop-blur-xl text-plum border border-white/80 shadow-rose-soft',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
      className={`rounded-card p-6 md:p-8 transition-colors duration-300 relative overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
