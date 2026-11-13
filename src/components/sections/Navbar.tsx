import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { APP_LINKS } from '../../data/content';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { MagneticButton } from '../ui/MagneticButton';

export const Navbar: React.FC = () => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Recursos', href: '#recursos' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Pacotes', href: '#pacotes' },
    { label: 'Planos', href: '#planos' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 px-4 transition-all duration-300 ${
          scrollDirection === 'down' && !isAtTop && !mobileMenuOpen
            ? '-translate-y-28 opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between glass-pill px-5 py-3 rounded-pill">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="NailGestão PRO Início"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-magenta via-rose to-gold flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline">
              <span className="font-serif text-lg font-bold tracking-tight text-plum">
                NailGestão
              </span>
              <span className="font-sans text-xs font-bold tracking-widest text-gold uppercase ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-50 border border-gold/30">
                PRO 1.1
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-magenta transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={APP_LINKS.login}
              className="text-xs font-semibold text-plum hover:text-magenta px-3 py-2 transition-colors"
            >
              Entrar
            </a>
            <MagneticButton
              size="sm"
              variant="primary"
              href={APP_LINKS.onboarding}
            >
              Começar grátis
            </MagneticButton>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={APP_LINKS.login}
              className="text-xs font-semibold text-plum px-2.5 py-1.5"
            >
              Entrar
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-plum hover:text-magenta border border-magenta/15 bg-white/70 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-ivory/95 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-10 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-magenta/70">
                Menu de Navegação
              </span>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="font-serif text-2xl font-medium text-plum hover:text-magenta transition-colors flex items-center justify-between border-b border-magenta/10 pb-3"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-5 h-5 text-magenta/60" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-magenta/10">
              <MagneticButton
                size="lg"
                variant="primary"
                href={APP_LINKS.onboarding}
                className="w-full text-center"
              >
                Começar 7 dias grátis
              </MagneticButton>
              <a
                href={APP_LINKS.login}
                className="text-center py-3 text-sm font-semibold text-plum hover:text-magenta"
              >
                Já tenho uma conta (Fazer login)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
