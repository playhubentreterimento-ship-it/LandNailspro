import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Apenas ativa em telas desktop com mouse preciso
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')
      );
      setIsHovered(isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isPointerFine || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-multiply"
      animate={{
        x: position.x - (isHovered ? 24 : 12),
        y: position.y - (isHovered ? 24 : 12),
        width: isHovered ? 48 : 24,
        height: isHovered ? 48 : 24,
        backgroundColor: isHovered ? 'rgba(214, 36, 110, 0.15)' : 'rgba(232, 163, 181, 0.25)',
        borderColor: isHovered ? 'rgba(214, 36, 110, 0.5)' : 'rgba(214, 36, 110, 0.25)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      aria-hidden="true"
    />
  );
};
