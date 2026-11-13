import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { VIDEO_CONTENT, APP_LINKS } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export const VideoShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      className="py-24 sm:py-32 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Vídeo de demonstração do sistema"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          overline={VIDEO_CONTENT.overline}
          title={VIDEO_CONTENT.title}
          subtitle={VIDEO_CONTENT.subtitle}
        />

        {/* Moldura Arredondada do Vídeo 16:9 com Lazy Load */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video max-w-4xl mx-auto rounded-[32px] overflow-hidden border-2 border-magenta/20 shadow-rose-card bg-plum/5"
        >
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${APP_LINKS.youtubeVideoId}?autoplay=1&rel=0`}
              title="Demonstração do NailGestão PRO"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Capa Personalizada em Rosé de Luxo com Botão Play Dourado */
            <div
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full bg-gradient-to-br from-blush via-rose-light to-[#E8BAC8] flex flex-col items-center justify-center cursor-pointer group select-none transition-all duration-300"
            >
              {/* Formas abstratas na capa */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-magenta/15 rounded-full blur-3xl pointer-events-none" />

              {/* Botão Play em Pílula Dourada com Efeito Pulsante */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-gradient text-plum flex items-center justify-center shadow-gold-glow group-hover:scale-110 active:scale-95 transition-transform duration-300">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-plum ml-1" />
                </div>

                <div className="mt-5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-magenta/20 shadow-rose-soft flex items-center gap-2 group-hover:bg-white transition-colors">
                  <Sparkles className="w-4 h-4 text-gold-dark" />
                  <span className="text-xs sm:text-sm font-bold text-plum">
                    Assistir demonstração rápida (2 min)
                  </span>
                </div>
              </div>

              {/* Tag discreta no canto */}
              <div className="absolute bottom-4 left-6 text-left">
                <span className="text-[11px] font-bold text-plum/70 uppercase tracking-wider">
                  Tour Completo pelo Sistema
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
