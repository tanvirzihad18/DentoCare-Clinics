import React, { useState } from 'react';
import { ArrowRight, Check, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DOCTOR_PLACEHOLDERS } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type { DoctorProfile, Language } from '../types/clinic';
import {
  AnimatedButton,
  LUXURY_EASE,
  Reveal,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface DoctorsSectionProps {
  lang: Language;
  t: Translations['doctors'];
  closeLabel: string;
  onBookDoctor: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  lang,
  t,
  closeLabel,
  onBookDoctor,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(
    null
  );

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
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
            className="mt-4 text-base text-[#486581] leading-relaxed"
          >
            {t.subheading}
          </RevealText>
        </div>

        <Reveal delay={0.18} className="mb-10">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F9FA] border border-[#D8E7EA] text-sm text-[#334E68]">
            <Info
              className="w-5 h-5 text-[#0B4F54] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p>{t.placeholderBanner}</p>
          </div>
        </Reveal>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {DOCTOR_PLACEHOLDERS.map((doc) => (
            <StaggerItem key={doc.id}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22, ease: LUXURY_EASE }}
                className="group bg-white rounded-2xl border border-[#E2E8EE] overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#EEF4F6]">
                  <ResilientImage
                    src={doc.image}
                    alt={doc.name[lang]}
                    fallbackTitle={doc.name[lang]}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-medium text-[#0B4F54] mb-1">
                    {doc.specialty[lang]}
                  </p>
                  <h3 className="text-xl font-bold text-[#0F2942]">
                    {doc.name[lang]}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#486581] leading-relaxed flex-1">
                    {doc.bio[lang]}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#F0F4F8]">
                    <AnimatedButton
                      type="button"
                      onClick={() => setSelectedDoctor(doc)}
                      aria-label={`${t.viewProfile}: ${doc.name[lang]}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B4F54] hover:text-[#083D41] min-h-[40px] px-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54] rounded-lg"
                    >
                      <span>{t.viewProfile}</span>
                      <ArrowRight
                        className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1"
                        aria-hidden="true"
                      />
                    </AnimatedButton>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="doctor-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2942]/60 backdrop-blur-xs"
            onClick={() => setSelectedDoctor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E2E8EE] max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#EEF4F6] shrink-0 border border-[#E2E8EE]">
                      <ResilientImage
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name[lang]}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0B4F54]">
                        {selectedDoctor.specialty[lang]}
                      </p>
                      <h3
                        id="doctor-modal-title"
                        className="text-xl font-bold text-[#0F2942] mt-0.5"
                      >
                        {selectedDoctor.name[lang]}
                      </h3>
                    </div>
                  </div>
                  <AnimatedButton
                    type="button"
                    onClick={() => setSelectedDoctor(null)}
                    aria-label={closeLabel}
                    className="w-10 h-10 rounded-full hover:bg-[#F1F5F7] text-[#486581] flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </AnimatedButton>
                </div>

                <p className="mt-4 text-xs text-[#627D98] bg-[#F7FAFB] border border-[#E2E8EE] rounded-lg px-3 py-2">
                  {selectedDoctor.placeholderNote[lang]}
                </p>

                <p className="mt-4 text-base text-[#334E68] leading-relaxed">
                  {selectedDoctor.bio[lang]}
                </p>

                <div className="mt-6 pt-5 border-t border-[#E2E8EE]">
                  <h4 className="text-sm font-semibold text-[#0F2942] mb-3">
                    {t.focusHeading}
                  </h4>
                  <ul className="space-y-2">
                    {selectedDoctor.focusAreas[lang].map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-2.5 text-sm text-[#334E68]"
                      >
                        <Check
                          className="w-4 h-4 text-[#0B4F54] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap justify-end gap-3">
                  <AnimatedButton
                    type="button"
                    onClick={() => setSelectedDoctor(null)}
                    className="px-4 py-2.5 text-sm font-medium text-[#486581] border border-[#D0DCE3] rounded-xl min-h-[44px] cursor-pointer"
                  >
                    {closeLabel}
                  </AnimatedButton>
                  <AnimatedButton
                    type="button"
                    sheen
                    onClick={() => {
                      const id = selectedDoctor.id;
                      setSelectedDoctor(null);
                      onBookDoctor(id);
                    }}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px] cursor-pointer"
                  >
                    {t.bookWithDoctor}
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
