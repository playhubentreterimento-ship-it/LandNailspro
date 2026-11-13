import React from 'react';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { FeatureMarquee } from './components/sections/FeatureMarquee';
import { PainPoints } from './components/sections/PainPoints';
import { LossCalculator } from './components/sections/LossCalculator';
import { OneClickReminder } from './components/sections/OneClickReminder';
import { PublicBooking } from './components/sections/PublicBooking';
import { PackageBuilder } from './components/sections/PackageBuilder';
import { ClientBentoGrid } from './components/sections/ClientBentoGrid';
import { FinancesTeam } from './components/sections/FinancesTeam';
import { HowItWorks } from './components/sections/HowItWorks';
import { RoutineComparison } from './components/sections/RoutineComparison';
import { SocialProof } from './components/sections/SocialProof';
import { VideoShowcase } from './components/sections/VideoShowcase';
import { PricingSection } from './components/sections/PricingSection';
import { FaqSection } from './components/sections/FaqSection';
import { FinalCta } from './components/sections/FinalCta';
import { Footer } from './components/sections/Footer';
import { MobileStickyCta } from './components/sections/MobileStickyCta';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-ivory text-plum selection:bg-rose selection:text-plum">
      {/* Barra de progresso de scroll 3px no topo */}
      <ScrollProgressBar />

      {/* Halo reativo de cursor para desktop */}
      <CustomCursor />

      {/* Navegação fixa em pílula de vidro fosco */}
      <Navbar />

      <main id="main-content">
        {/* 1. Dobra Principal de Impacto: Hero */}
        <Hero />

        {/* 2. Marquee Infinito de Recursos */}
        <FeatureMarquee />

        {/* 3. Narrativa da Dor Editorial */}
        <PainPoints />

        {/* 4. Calculadora Interativa de Perda Financeira */}
        <LossCalculator />

        {/* 5. Lembrete com 1 Clique (Momento "Uau" em Ameixa Escuro) */}
        <OneClickReminder />

        {/* 6. Agenda Pública 24h & Link Exclusivo */}
        <PublicBooking />

        {/* 7. Pacotes Personalizados com Construtor Interativo */}
        <PackageBuilder />

        {/* 8. Ficha Técnica e Clientes em Bento Grid */}
        <ClientBentoGrid />

        {/* 9. Financeiro e Gestão de Comissões de Equipe */}
        <FinancesTeam />

        {/* 10. Como Funciona em 3 Passos */}
        <HowItWorks />

        {/* 11. Comparativo Antes e Depois da Rotina */}
        <RoutineComparison />

        {/* 12. Prova Social Real (Print WhatsApp) */}
        <SocialProof />

        {/* 13. Vídeo Demonstração Guiada */}
        <VideoShowcase />

        {/* 14. Planos, Preços e Tabela Comparativa */}
        <PricingSection />

        {/* 15. FAQ em 2 Colunas com Accordion */}
        <FaqSection />

        {/* 16. Chamada Final de Conversão */}
        <FinalCta />
      </main>

      {/* 17. Rodapé Institucional em Ameixa Escuro */}
      <Footer />

      {/* 18. CTA Fixo Inferior para Mobile */}
      <MobileStickyCta />
    </div>
  );
};

export default App;
