import React, { useState } from 'react';
import { ExternalLink, Quote, Star, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_INFO, GOOGLE_REVIEWS } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type { Language } from '../types/clinic';
import {
  AnimatedAnchor,
  AnimatedButton,
  LUXURY_EASE,
  Reveal,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from './MotionPrimitives';

interface ReviewsSectionProps {
  lang: Language;
  t: Translations['reviews'];
  closeLabel: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  lang,
  t,
  closeLabel,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-[#F7FAFB] border-y border-[#E6EEF2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
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
          </div>

          <Reveal delay={0.14}>
            <div className="flex flex-wrap items-center gap-6 bg-white px-6 py-4 rounded-2xl border border-[#E2E8EE]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#0F2942] tabular-nums">
                    {CLINIC_INFO.rating}/5
                  </span>
                  <div className="flex items-center gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-[#D97706] fill-[#D97706]"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-medium text-[#627D98] mt-1">
                  {t.ratingSuffix}
                </p>
              </div>

              <div className="h-10 w-px bg-[#E2E8EE]" aria-hidden="true" />

              <div>
                <div className="text-3xl font-bold text-[#0B4F54] tabular-nums">
                  {CLINIC_INFO.totalReviews}
                </div>
                <p className="text-xs font-medium text-[#627D98] mt-1">
                  {t.totalReviewsSuffix}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {GOOGLE_REVIEWS.map((review) => (
            <StaggerItem key={review.id}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: LUXURY_EASE }}
                className="bg-white rounded-2xl border border-[#E2E8EE] p-6 sm:p-7 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 text-[#D97706] fill-[#D97706]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <Quote
                      className="w-5 h-5 text-[#A6D8DE]"
                      aria-hidden="true"
                    />
                  </div>

                  <blockquote className="text-base text-[#0F2942] leading-relaxed">
                    “{review.quote[lang]}”
                  </blockquote>
                </div>

                <footer className="mt-6 pt-4 border-t border-[#F0F4F8] text-xs font-medium text-[#627D98]">
                  {review.source[lang]}
                </footer>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <AnimatedButton
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0F2942] bg-white hover:bg-[#F1F5F7] border border-[#D0DCE3] rounded-xl transition-colors min-h-[44px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54]"
          >
            <span>{t.readMoreBtn}</span>
            <ExternalLink className="w-4 h-4 text-[#0B4F54]" aria-hidden="true" />
          </AnimatedButton>
        </Reveal>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reviews-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2942]/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8EE]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="reviews-modal-title"
                    className="text-xl font-bold text-[#0F2942]"
                  >
                    {t.modalTitle}
                  </h3>
                  <p className="mt-1 text-sm text-[#486581]">{t.modalSubtitle}</p>
                </div>
                <AnimatedButton
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label={closeLabel}
                  className="w-10 h-10 rounded-full hover:bg-[#F1F5F7] text-[#486581] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </AnimatedButton>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#F7FAFB] border border-[#E2E8EE] flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#0F2942] tabular-nums">
                    {CLINIC_INFO.rating}/5
                  </p>
                  <p className="text-xs text-[#627D98]">{t.ratingSuffix}</p>
                </div>
                <div className="text-end">
                  <p className="text-2xl font-bold text-[#0B4F54] tabular-nums">
                    {CLINIC_INFO.totalReviews}
                  </p>
                  <p className="text-xs text-[#627D98]">{t.totalReviewsSuffix}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <AnimatedButton
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-[#486581] border border-[#D0DCE3] rounded-xl min-h-[44px] cursor-pointer"
                >
                  {closeLabel}
                </AnimatedButton>
                <AnimatedAnchor
                  href={CLINIC_INFO.googleMapsSearchUrl}
                  sheen
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px]"
                >
                  <span>{t.openGoogleMaps}</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </AnimatedAnchor>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
