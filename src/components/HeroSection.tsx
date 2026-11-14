import React from 'react';
import { ArrowRight, Calendar, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_IMAGES } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import {
  AnimatedButton,
  AnimatedImageFrame,
  LUXURY_EASE,
  Reveal,
  RevealText,
} from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  t: Translations['hero'];
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ t, onNavigate }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F9FA] via-white to-white border-b border-[#E6EEF2]"
    >
      {/* Subtle GPU-composited ambient architectural glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -top-28 end-0 w-[520px] h-[520px] rounded-full bg-radial from-[#3BB4C1]/18 via-[#3BB4C1]/6 to-transparent blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <RevealText
              as="p"
              immediate
              delay={0.04}
              className="text-xs sm:text-sm font-medium text-[#0B4F54] tracking-wide mb-4"
            >
              {t.locationLine}
            </RevealText>

            <RevealText
              as="h1"
              immediate
              delay={0.1}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#0F2942] leading-[1.12] tracking-tight text-balance"
            >
              {t.headline}
            </RevealText>

            <RevealText
              as="p"
              immediate
              delay={0.18}
              className="mt-5 text-base sm:text-lg text-[#486581] leading-relaxed max-w-xl"
            >
              {t.subtitle}
            </RevealText>

            <Reveal
              immediate
              delay={0.26}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <AnimatedButton
                type="button"
                sheen
                onClick={() => onNavigate('appointment')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[48px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F54]"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>{t.bookBtn}</span>
              </AnimatedButton>

              <AnimatedButton
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0F2942] bg-white hover:bg-[#F1F5F7] border border-[#D0DCE3] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[48px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F54]"
              >
                <span>{t.exploreBtn}</span>
                <ArrowRight
                  className="w-4 h-4 rtl:rotate-180 text-[#0B4F54] transition-transform duration-200 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1"
                  aria-hidden="true"
                />
              </AnimatedButton>
            </Reveal>

            <Reveal
              immediate
              delay={0.34}
              className="mt-10 pt-6 border-t border-[#E2E8EE] flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#334E68]"
            >
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: LUXURY_EASE }}
                onClick={() => onNavigate('reviews')}
                className="inline-flex items-center gap-2 font-semibold text-[#0F2942] hover:text-[#0B4F54] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54] rounded"
              >
                <Star
                  className="w-4 h-4 text-[#D97706] fill-[#D97706] shrink-0"
                  aria-hidden="true"
                />
                <span className="tabular-nums">{t.ratingLabel}</span>
                <span aria-hidden="true" className="text-[#9FB3C8]">
                  |
                </span>
                <span className="tabular-nums font-medium text-[#486581]">
                  {t.reviewsLabel}
                </span>
              </motion.button>

              <span aria-hidden="true" className="hidden sm:inline text-[#CBD5E1]">
                ·
              </span>

              <span className="inline-flex items-center gap-1.5 text-[#486581]">
                <Clock className="w-4 h-4 text-[#0B4F54] shrink-0" aria-hidden="true" />
                <span>{t.hoursLabel}</span>
              </span>
            </Reveal>
          </div>

          <div className="lg:col-span-6 flex">
            <AnimatedImageFrame
              immediate
              delay={0.14}
              className="group relative w-full rounded-2xl overflow-hidden shadow-lg border border-[#E2E8EE] bg-[#F1F5F7] min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]"
            >
              <ResilientImage
                src={CLINIC_IMAGES.hero}
                alt="Dentist consulting warmly with a smiling patient in a bright modern treatment suite at DentoCare Clinics Riyadh"
                loading="eager"
                priority
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </AnimatedImageFrame>
          </div>
        </div>
      </div>
    </section>
  );
};
