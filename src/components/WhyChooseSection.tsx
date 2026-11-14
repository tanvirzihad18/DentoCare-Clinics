import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_ITEMS } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type { Language } from '../types/clinic';
import {
  AnimatedButton,
  LUXURY_EASE,
  Reveal,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from './MotionPrimitives';

interface WhyChooseSectionProps {
  lang: Language;
  t: Translations['whyChoose'];
  onNavigate: (sectionId: string) => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  lang,
  t,
  onNavigate,
}) => {
  return (
    <section
      id="why-choose"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#0B4F54] text-white"
    >
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -bottom-32 -start-24 w-[460px] h-[460px] rounded-full bg-radial from-[#3BB4C1]/25 via-[#3BB4C1]/5 to-transparent blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <RevealText
              as="p"
              delay={0.04}
              className="text-sm font-semibold text-[#8AE1EB] tracking-wide mb-3"
            >
              {t.kicker}
            </RevealText>
            <RevealText
              as="h2"
              delay={0.1}
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance"
            >
              {t.heading}
            </RevealText>
            <RevealText
              as="p"
              delay={0.16}
              className="mt-4 text-base text-[#D9ECEE] leading-relaxed"
            >
              {t.subheading}
            </RevealText>

            <Reveal delay={0.22}>
              <AnimatedButton
                type="button"
                sheen
                onClick={() => onNavigate('appointment')}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0F2942] bg-white hover:bg-[#E6F4F5] rounded-xl transition-colors duration-150 min-h-[48px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Calendar className="w-4 h-4 text-[#0B4F54]" aria-hidden="true" />
                <span>{t.bookCta}</span>
              </AnimatedButton>
            </Reveal>
          </div>

          <StaggerContainer
            staggerDelay={0.07}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10"
          >
            {WHY_CHOOSE_ITEMS.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: LUXURY_EASE }}
                  className="pt-6 border-t border-white/20 flex flex-col"
                >
                  <span className="text-xs font-semibold text-[#8AE1EB] tabular-nums tracking-wider mb-2">
                    {item.index}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title[lang]}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#D9ECEE] leading-relaxed">
                    {item.description[lang]}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
