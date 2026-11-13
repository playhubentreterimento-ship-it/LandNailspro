import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialX?: number;
  initialY?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 6,
  initialX = 0,
  initialY = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: initialX, y: initialY + 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: initialX,
        y: [initialY, initialY - 10, initialY],
      }}
      transition={{
        opacity: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: delay + 0.3,
        },
      }}
      className={`glass-card p-4 rounded-card-sm backdrop-blur-xl shadow-rose-hover z-20 border border-white/80 ${className}`}
    >
      {children}
    </motion.div>
  );
};
