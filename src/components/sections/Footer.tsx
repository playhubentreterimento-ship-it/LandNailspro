import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { APP_LINKS } from '../../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-plum-dark text-white/80 py-16 sm:py-20 border-t border-magenta/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Logo e Descrição */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-magenta via-rose to-gold flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                NailGestão PRO 1.1
              </span>
            </div>
            <p className="text-xs sm:text-sm text-rose-light/70 leading-relaxed max-w-sm mb-6">
              O sistema editorial de luxo para nail designers, manicures e salões de unhas. Pare de perder horários e dinheiro com faltas.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-light/50">
              <span>Feito com</span>
              <Heart className="w-3.5 h-3.5 text-magenta fill-magenta" />
              <span>para estúdios de alto padrão</span>
            </div>
          </div>

          {/* Navegação Rápida */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-light mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-rose-light/80">
              <li>
                <a href="#recursos" className="hover:text-white transition-colors">
                  Recursos do Sistema
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#pacotes" className="hover:text-white transition-colors">
                  Pacotes Personalizados
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-white transition-colors">
                  Planos & Preços
                </a>
              </li>
              <li>
                <a href="#duvidas" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Acesso Rápido ao Sistema */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-light mb-4">
              Acesso Rápido
            </h4>
            <ul className="space-y-2.5 text-xs text-rose-light/80">
              <li>
                <a
                  href={APP_LINKS.login}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Entrar no meu Studio</span>
                  <span>→</span>
                </a>
              </li>
              <li>
                <a
                  href={APP_LINKS.onboarding}
                  className="hover:text-white transition-colors text-magenta font-semibold flex items-center gap-1.5"
                >
                  <span>Criar Studio Grátis (7 dias)</span>
                  <span>→</span>
                </a>
              </li>
              <li>
                <a
                  href={APP_LINKS.publicBooking}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Ver demonstração da Agenda Online</span>
                  <span>→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Final de Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-light/50 gap-4">
          <p>© 2026 NailGestão. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Segurança dos Dados
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
