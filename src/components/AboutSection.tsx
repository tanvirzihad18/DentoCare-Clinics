import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import {
  AnimatedImageFrame,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  t: Translations['about'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <AnimatedImageFrame className="group relative flex-1 rounded-2xl overflow-hidden border border-[#E2E8EE] bg-[#F1F5F7] min-h-[300px] sm:min-h-[380px]">
              <ResilientImage
                src={CLINIC_IMAGES.about}
                alt="DentoCare Clinics modern patient reception and calm lounge in Al Aarid, Riyadh"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </AnimatedImageFrame>
            <RevealText as="p" delay={0.12} className="mt-3 text-xs text-[#627D98]">
              {t.facilityCaption}
            </RevealText>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <RevealText
              as="p"
              delay={0.04}
              className="text-sm font-semibold text-[#0B4F54] mb-3"
            >
              {t.kicker}
            </RevealText>
            <RevealText
              as="h2"
              delay={0.1}
              className="text-3xl sm:text-4xl font-bold text-[#0F2942] tracking-tight text-balance"
            >
              {t.heading}
            </RevealText>
            <RevealText
              as="p"
              delay={0.16}
              className="mt-5 text-base sm:text-lg text-[#486581] leading-relaxed"
            >
              {t.description}
            </RevealText>

            <StaggerContainer
              staggerDelay={0.07}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[#E2E8EE]"
            >
              {t.pillars.map((pillar) => (
                <StaggerItem key={pillar.title} className="space-y-1.5">
                  <h3 className="text-base font-semibold text-[#0F2942]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#486581] leading-relaxed">
                    {pillar.text}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
