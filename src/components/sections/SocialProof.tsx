import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { SOCIAL_PROOF_CONTENT } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { PhoneFrame } from '../ui/PhoneFrame';

export const SocialProof: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      className="py-24 sm:py-32 bg-blush/30 relative grain-overlay overflow-hidden"
      aria-label="Prova real de uso do sistema"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          overline={SOCIAL_PROOF_CONTENT.overline}
          title={SOCIAL_PROOF_CONTENT.title}
          subtitle={SOCIAL_PROOF_CONTENT.context}
        />

        {/* Mockup do Celular com Leve Rotação e Sombra Suave */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-8 max-w-[340px] transition-transform duration-500 hover:rotate-0"
        >
          {/* Brilho dourado/rosé por trás do celular */}
          <div className="absolute inset-0 bg-rose/30 rounded-[50px] blur-2xl -z-10" />

          <PhoneFrame currentTime="11:42">
            {/* Tenta renderizar o print real /public/prova-social-whatsapp.png */}
            {!imageError ? (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#ECE5DD]">
                <img
                  src="/prova-social-whatsapp.png"
                  alt="Print real de WhatsApp de cliente agendando pelo link"
                  onError={() => setImageError(true)}
                  className="w-full h-auto object-cover rounded-[24px]"
                  loading="lazy"
                />
              </div>
            ) : (
              /* Fallback elegante e realista com dados do agendamento real via link */
              /* NOTA PARA SUBSTITUIÇÃO: Salve o print real em /public/prova-social-whatsapp.png */
              <div className="p-4 flex flex-col h-full bg-[#EFEAE2] text-left">
                {/* Header WhatsApp */}
                <div className="bg-[#075E54] text-white -mx-4 -mt-4 p-3 flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                    C
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Cliente Studio</p>
                    <span className="text-[10px] text-emerald-200">online</span>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {/* Mensagem da cliente */}
                  <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs text-xs max-w-[85%] text-plum">
                    <p className="font-semibold text-magenta mb-1">
                      Oi Lu! Acabei de agendar pelo seu link!
                    </p>
                    <p className="text-[11px] text-muted">
                      Marquei manutenção de fibra pra sexta às 16h. Já tá confirmado certinho né? Amei como foi rápido! 😍💅
                    </p>
                    <span className="text-[9px] text-muted block text-right mt-1">11:40</span>
                  </div>

                  {/* Resposta do Studio */}
                  <div className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none shadow-xs text-xs max-w-[85%] ml-auto text-plum">
                    <p className="text-[11px]">
                      Oi flor! Já apareceu aqui na minha agenda certinho! Já te mandei o lembrete de confirmação. Te espero sexta! 💗✨
                    </p>
                    <span className="text-[9px] text-muted block text-right mt-1">11:42 ✓✓</span>
                  </div>
                </div>

                <div className="p-2 bg-white/70 rounded-lg text-center mt-auto border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Agendamento real via link
                  </span>
                </div>
              </div>
            )}

            {/* Legenda Obrigatória */}
            <div className="p-2.5 text-center bg-white border-t border-magenta/10">
              <span className="text-[11px] font-semibold text-plum">
                {SOCIAL_PROOF_CONTENT.caption}
              </span>
            </div>
          </PhoneFrame>
        </motion.div>

        {/* Array preparado para futuros depoimentos (vazio por padrão conforme especificado) */}
        {SOCIAL_PROOF_CONTENT.testimonials.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {SOCIAL_PROOF_CONTENT.testimonials.map((t: any, i: number) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-magenta/10">
                <p className="text-sm text-plum">{t.text}</p>
                <span className="text-xs font-bold text-magenta mt-2 block">{t.author}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
