import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  AlertTriangle,
  History,
  Calendar,
  Sparkles,
  Heart,
  Sliders,
  CheckCircle,
} from 'lucide-react';
import { BENTO_CONTENT } from '../../data/content';
import { MOCK_CLIENT_PROFILE } from '../../data/mockData';
import { SectionHeading } from '../ui/SectionHeading';

export const ClientBentoGrid: React.FC = () => {
  // Slider interativo do Antes e Depois
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <section
      id="ficha-tecnica"
      className="py-24 sm:py-32 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Ficha técnica de clientes e prontuário estético"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={BENTO_CONTENT.overline}
          title={BENTO_CONTENT.title}
          subtitle={BENTO_CONTENT.subtitle}
        />

        {/* Bento Grid Assimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Célula 1: Ficha Técnica Detalhada (col-span-12 md:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 bg-white rounded-card p-6 sm:p-8 border border-magenta/15 shadow-rose-card hover:shadow-rose-hover transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-magenta/10 text-magenta flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-plum">
                      Ficha de Atendimento
                    </h3>
                    <p className="text-xs text-muted">
                      Cliente: {MOCK_CLIENT_PROFILE.name} · Desde {MOCK_CLIENT_PROFILE.since}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-amber-50 px-2.5 py-1 rounded-full border border-gold/30">
                  Prontuário Ativo
                </span>
              </div>

              {/* Linhas da Ficha Técnica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-ivory/80 rounded-xl border border-magenta/5">
                  <span className="text-muted block text-[10px] uppercase font-semibold">
                    Formato de Preferência
                  </span>
                  <span className="font-serif text-sm font-bold text-plum">
                    {MOCK_CLIENT_PROFILE.technicalSheet.format}
                  </span>
                </div>
                <div className="p-3 bg-ivory/80 rounded-xl border border-magenta/5">
                  <span className="text-muted block text-[10px] uppercase font-semibold">
                    Técnica / Estrutura
                  </span>
                  <span className="font-serif text-sm font-bold text-plum">
                    {MOCK_CLIENT_PROFILE.technicalSheet.technique}
                  </span>
                </div>
                <div className="p-3 bg-ivory/80 rounded-xl border border-magenta/5">
                  <span className="text-muted block text-[10px] uppercase font-semibold">
                    Marcas e Géis Compatíveis
                  </span>
                  <span className="font-semibold text-plum">
                    {MOCK_CLIENT_PROFILE.technicalSheet.brand}
                  </span>
                </div>
                <div className="p-3 bg-ivory/80 rounded-xl border border-magenta/5">
                  <span className="text-muted block text-[10px] uppercase font-semibold">
                    Decoração / Estilo Favorito
                  </span>
                  <span className="font-semibold text-plum">
                    {MOCK_CLIENT_PROFILE.technicalSheet.decoration}
                  </span>
                </div>
              </div>

              {/* Observações da técnica */}
              <div className="mt-3 p-3 bg-blush/40 rounded-xl border border-magenta/10 text-xs">
                <span className="text-muted block text-[10px] uppercase font-semibold">
                  Observações da Nail Designer
                </span>
                <p className="text-plum/90 font-medium mt-0.5">
                  "{MOCK_CLIENT_PROFILE.technicalSheet.observations}"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-magenta/10 flex justify-between items-center text-[10px] text-muted">
              <span>Atualizado a cada visita</span>
              <span className="italic">{BENTO_CONTENT.disclaimer}</span>
            </div>
          </motion.div>

          {/* Célula 2: Histórico e Total Gasto (col-span-12 md:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 bg-gradient-to-br from-white via-white to-blush/40 rounded-card p-6 sm:p-8 border border-magenta/15 shadow-rose-card hover:shadow-rose-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-plum">
                    Histórico & LTV
                  </h3>
                  <p className="text-xs text-muted">Fidelidade acumulada</p>
                </div>
              </div>

              <div className="space-y-4 my-4">
                <div className="p-4 bg-white rounded-2xl border border-magenta/10 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted block">Total investido no studio</span>
                    <span className="font-serif text-2xl font-bold text-plum">
                      {MOCK_CLIENT_PROFILE.totalSpent}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {MOCK_CLIENT_PROFILE.visitsCount} visitas
                  </span>
                </div>

                <div className="p-3.5 bg-ivory rounded-xl border border-magenta/10 flex items-center gap-3">
                  <Heart className="w-5 h-5 text-magenta flex-shrink-0" />
                  <p className="text-xs text-plum/90">
                    Cliente assídua que sempre repõe no ciclo de 21 dias.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-muted text-right italic">
              {BENTO_CONTENT.disclaimer}
            </div>
          </motion.div>

          {/* Célula 3: Galeria Antes e Depois com Slider Interativo (col-span-12 md:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 bg-white rounded-card p-6 sm:p-8 border border-magenta/15 shadow-rose-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-lg font-bold text-plum">
                    Galeria Antes & Depois
                  </h3>
                </div>
                <span className="text-[10px] text-muted italic">
                  Arraste a linha para comparar
                </span>
              </div>
              <p className="text-xs text-muted mb-4">
                Guarde fotos de cada manutenção para comprovar a evolução da lâmina natural da cliente.
              </p>

              {/* Slider de Comparação Antes / Depois com Placeholders Gráficos Rosé */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-magenta/20 select-none">
                {/* Lado "Depois" (Fundo completo) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-light via-blush to-white flex flex-col justify-center items-center text-center p-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-magenta bg-white/80 px-3 py-1 rounded-full border border-magenta/20 shadow-xs mb-2">
                    Depois (Resultado Final)
                  </span>
                  <div className="w-16 h-16 rounded-full bg-white/70 border-2 border-magenta/30 flex items-center justify-center text-magenta">
                    <Sparkles className="w-8 h-8 text-gold" />
                  </div>
                  <span className="text-xs font-serif font-bold text-plum mt-2">
                    Estrutura Perfeita & Ponto de Tensão
                  </span>
                </div>

                {/* Lado "Antes" (Cortado pela posição do slider) */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#E6D5D8] via-[#DAC1C6] to-[#CFB2B8] flex flex-col justify-center items-center text-center p-4 overflow-hidden border-r-2 border-white shadow-xl"
                  style={{ width: `${sliderPos}%` }}
                >
                  <span className="text-xs uppercase tracking-widest font-bold text-muted bg-white/80 px-3 py-1 rounded-full shadow-xs mb-2 whitespace-nowrap">
                    Antes (Chegada)
                  </span>
                  <div className="w-16 h-16 rounded-full bg-white/40 flex items-center justify-center text-muted">
                    <History className="w-8 h-8 opacity-70" />
                  </div>
                  <span className="text-xs font-serif font-bold text-plum/70 mt-2 whitespace-nowrap">
                    Crescimento de 28 dias
                  </span>
                </div>

                {/* Linha e Alça Arrastável */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white z-10 cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-magenta shadow-lg flex items-center justify-center border border-magenta/20">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                {/* Input de Range Transparente por cima para facilitar arraste no mobile */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(parseInt(e.target.value, 10))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  aria-label="Arrastar comparação antes e depois"
                />
              </div>
            </div>

            <div className="mt-3 text-[10px] text-muted/70 italic text-center">
              {BENTO_CONTENT.disclaimer}
            </div>
          </motion.div>

          {/* Célula 4: Alertas e Alergias (col-span-12 sm:col-span-6 md:col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-3 bg-amber-50/70 rounded-card p-6 border border-amber-200/80 shadow-rose-soft flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-serif text-base font-bold text-amber-950 mb-1">
                Alergias & Cuidados
              </h3>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {MOCK_CLIENT_PROFILE.technicalSheet.allergies}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/60 text-[10px] text-amber-800 font-semibold">
              ✓ Destacado na abertura da comanda
            </div>
          </motion.div>

          {/* Célula 5: Próximo Atendimento (col-span-12 sm:col-span-6 md:col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 bg-white rounded-card p-6 border border-magenta/15 shadow-rose-soft flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-magenta/10 text-magenta flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-plum mb-1">
                Próxima Visita
              </h3>
              <p className="text-xs font-bold text-magenta">
                {MOCK_CLIENT_PROFILE.nextAppointment.date}
              </p>
              <p className="text-xs text-muted mt-0.5">
                às {MOCK_CLIENT_PROFILE.nextAppointment.time}
              </p>
              <span className="inline-block mt-2 text-[10px] bg-ivory border border-magenta/10 px-2 py-0.5 rounded font-medium text-plum">
                {MOCK_CLIENT_PROFILE.nextAppointment.service}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-magenta/10 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Lembrete programado</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
