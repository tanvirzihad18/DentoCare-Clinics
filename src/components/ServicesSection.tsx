import React, { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DENTAL_SERVICES } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type { DentalService, Language, ServiceCategory } from '../types/clinic';
import {
  AnimatedButton,
  LUXURY_EASE,
  Reveal,
  RevealText,
  VIEWPORT_CONFIG,
} from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  lang: Language;
  t: Translations['services'];
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  t,
  onBookService,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [selectedService, setSelectedService] = useState<DentalService | null>(
    null
  );

  const filteredServices =
    activeCategory === 'all'
      ? DENTAL_SERVICES
      : DENTAL_SERVICES.filter((s) => s.category === activeCategory);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: t.filters.all },
    { id: 'preventive', label: t.filters.preventive },
    { id: 'cosmetic', label: t.filters.cosmetic },
    { id: 'restorative', label: t.filters.restorative },
  ];

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#F7FAFB] border-y border-[#E6EEF2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
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

          <Reveal delay={0.18} className="shrink-0">
            <div
              role="tablist"
              aria-label={t.kicker}
              className="inline-flex flex-wrap xl:flex-nowrap items-center gap-1 p-1.5 bg-white border border-[#E2E8EE] rounded-xl self-start"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.16, ease: LUXURY_EASE }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-3 py-2 text-xs sm:text-[13px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54] ${
                      isActive
                        ? 'text-white'
                        : 'text-[#486581] hover:text-[#0F2942] hover:bg-[#F1F5F7]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="services-active-tab"
                        transition={{ duration: 0.25, ease: LUXURY_EASE }}
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#0B4F54] rounded-lg"
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={VIEWPORT_CONFIG}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.04, 0.24),
                  ease: LUXURY_EASE,
                }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl border border-[#E2E8EE] overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EEF4F6]">
                  <ResilientImage
                    src={service.image}
                    alt={service.name[lang]}
                    fallbackTitle={service.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs font-medium text-[#627D98] tabular-nums mb-1.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-[#0F2942] leading-snug">
                    {service.name[lang]}
                  </h3>
                  <p className="mt-2 text-sm text-[#486581] leading-relaxed flex-1">
                    {service.shortDescription[lang]}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#F0F4F8]">
                    <AnimatedButton
                      type="button"
                      onClick={() => setSelectedService(service)}
                      aria-label={`${t.learnMore}: ${service.name[lang]}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B4F54] hover:text-[#083D41] transition-colors py-1.5 px-1 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54] rounded-lg"
                    >
                      <span>{t.learnMore}</span>
                      <ArrowRight
                        className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1"
                        aria-hidden="true"
                      />
                    </AnimatedButton>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2942]/60 backdrop-blur-xs"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2E8EE] max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 sm:h-64 bg-[#EEF4F6] shrink-0">
                <ResilientImage
                  src={selectedService.image}
                  alt={selectedService.name[lang]}
                  className="w-full h-full object-cover"
                />
                <AnimatedButton
                  type="button"
                  onClick={() => setSelectedService(null)}
                  aria-label={t.modalClose}
                  className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/95 text-[#0F2942] hover:bg-white flex items-center justify-center shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </AnimatedButton>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3
                  id="service-modal-title"
                  className="text-2xl font-bold text-[#0F2942]"
                >
                  {selectedService.name[lang]}
                </h3>
                <p className="mt-3 text-base text-[#486581] leading-relaxed">
                  {selectedService.fullDescription[lang]}
                </p>

                <div className="mt-6 pt-6 border-t border-[#E2E8EE]">
                  <h4 className="text-sm font-semibold text-[#0F2942] mb-3">
                    {t.whatToExpect}
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.highlights[lang].map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-[#334E68]"
                      >
                        <Check
                          className="w-4 h-4 text-[#0B4F54] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
                  <AnimatedButton
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2.5 text-sm font-medium text-[#486581] hover:text-[#0F2942] rounded-xl border border-[#D0DCE3] min-h-[44px] cursor-pointer"
                  >
                    {t.modalClose}
                  </AnimatedButton>
                  <AnimatedButton
                    type="button"
                    sheen
                    onClick={() => {
                      const id = selectedService.id;
                      setSelectedService(null);
                      onBookService(id);
                    }}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px] cursor-pointer"
                  >
                    {t.modalBookBtn}
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
