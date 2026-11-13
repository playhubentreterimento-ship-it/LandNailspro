import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  overline?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const alignClasses = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClasses} ${className}`}>
      {overline && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.18em] font-bold text-magenta mb-3.5 inline-block"
        >
          {overline}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.12] tracking-tight font-medium ${
          dark ? 'text-white' : 'text-plum'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
            dark ? 'text-rose-light/80' : 'text-muted'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
