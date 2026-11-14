import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type { ContactFormData, Language } from '../types/clinic';
import {
  buildWhatsAppDirectUrl,
  validateContactForm,
  type FieldErrors,
} from '../utils/booking';
import { ClinicMap } from './ClinicMap';
import {
  AnimatedAnchor,
  AnimatedButton,
  LUXURY_EASE,
  Reveal,
  RevealText,
} from './MotionPrimitives';

interface ContactSectionProps {
  lang: Language;
  t: Translations['contact'];
  bookingErrors: Translations['booking']['errors'];
  whatsappNumber: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  t,
  bookingErrors,
  whatsappNumber,
}) => {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    contact: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateContactForm(contactForm);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const whatsappDirectUrl = buildWhatsAppDirectUrl(
    whatsappNumber,
    lang === 'ar'
      ? 'مرحباً عيادات دنتوكير، أود الاستفسار عن المواعيد.'
      : 'Hello DentoCare Clinics, I have an inquiry regarding dental care.'
  );

  const whatsappInquiryUrl = buildWhatsAppDirectUrl(
    whatsappNumber,
    lang === 'ar'
      ? `مرحباً عيادات دنتوكير،\nالاسم: ${contactForm.name}\nالتواصل: ${contactForm.contact}\nالرسالة: ${contactForm.message}`
      : `Hello DentoCare Clinics,\nName: ${contactForm.name}\nContact: ${contactForm.contact}\nMessage: ${contactForm.message}`
  );

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#F7FAFB] border-t border-[#E6EEF2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <Reveal
            delay={0.08}
            className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8EE] p-6 sm:p-8 flex flex-col justify-between gap-6"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0F2942]">
                  {CLINIC_INFO.brandEn} – {CLINIC_INFO.brandAr}
                </h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-[#0B4F54] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#627D98]">
                      {t.addressLabel}
                    </p>
                    <p className="text-[#0F2942] mt-0.5 leading-relaxed">
                      {CLINIC_INFO.address[lang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="w-5 h-5 text-[#0B4F54] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#627D98]">
                      {t.phoneLabel}
                    </p>
                    <a
                      href={CLINIC_INFO.phoneHref}
                      dir="ltr"
                      className="inline-block text-[#0F2942] font-semibold hover:text-[#0B4F54] mt-0.5 tabular-nums transition-colors"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="w-5 h-5 text-[#0B4F54] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#627D98]">
                      {t.hoursLabel}
                    </p>
                    <p className="text-[#0F2942] font-semibold mt-0.5">
                      {t.hoursValue}
                    </p>
                    <p className="text-xs text-[#627D98] mt-1">{t.hoursNote}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#E2E8EE] flex flex-wrap gap-3">
              <AnimatedAnchor
                href={CLINIC_INFO.phoneHref}
                sheen
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px]"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>{t.callNow}</span>
              </AnimatedAnchor>

              <AnimatedAnchor
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0F2942] bg-[#E6F4F5] hover:bg-[#D5ECEE] rounded-xl min-h-[44px]"
              >
                <MessageCircle
                  className="w-4 h-4 text-[#0B4F54]"
                  aria-hidden="true"
                />
                <span>{t.whatsappNow}</span>
              </AnimatedAnchor>

              <AnimatedAnchor
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0F2942] bg-white hover:bg-[#F1F5F7] border border-[#D0DCE3] rounded-xl min-h-[44px]"
              >
                <Instagram
                  className="w-4 h-4 text-[#0B4F54]"
                  aria-hidden="true"
                />
                <span>{t.instagramBtn}</span>
              </AnimatedAnchor>

              <AnimatedAnchor
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0F2942] bg-white hover:bg-[#F1F5F7] border border-[#D0DCE3] rounded-xl min-h-[44px]"
              >
                <ExternalLink
                  className="w-4 h-4 text-[#0B4F54]"
                  aria-hidden="true"
                />
                <span>{t.directionsBtn}</span>
              </AnimatedAnchor>
            </div>
          </Reveal>

          <Reveal
            delay={0.14}
            className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8EE] p-6 sm:p-8 flex flex-col"
          >
            <h3 className="text-xl font-bold text-[#0F2942]">{t.formTitle}</h3>
            <p className="mt-2 text-sm text-[#486581] leading-relaxed">
              {t.formSubtitle}
            </p>

            {submitted ? (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                className="mt-6 p-6 rounded-xl bg-[#F7FAFB] border border-[#D8E7EA] flex-1 flex flex-col justify-center"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#0B4F54] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-bold text-[#0F2942]">
                      {t.inquiryValidatedTitle}
                    </h4>
                    <p className="mt-1.5 text-sm text-[#486581] leading-relaxed">
                      {t.inquiryValidatedBody}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <AnimatedAnchor
                        href={whatsappInquiryUrl}
                        sheen
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px]"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>{t.inquiryWhatsappBtn}</span>
                      </AnimatedAnchor>
                      <AnimatedButton
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setContactForm({ name: '', contact: '', message: '' });
                        }}
                        className="px-4 py-2.5 text-sm font-medium text-[#486581] border border-[#D0DCE3] rounded-xl min-h-[44px] cursor-pointer"
                      >
                        {t.newInquiryBtn}
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="mt-6 space-y-5 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-[#0F2942] mb-2"
                    >
                      {t.nameLabel} <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => {
                        setContactForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined! }));
                      }}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 text-base bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] transition-colors focus:outline-none focus:border-[#0B4F54] min-h-[48px]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1">
                        <AlertCircle
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                        <span>{bookingErrors[errors.name]}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-info"
                      className="block text-sm font-semibold text-[#0F2942] mb-2"
                    >
                      {t.contactLabel} <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-info"
                      type="text"
                      dir="ltr"
                      required
                      value={contactForm.contact}
                      onChange={(e) => {
                        setContactForm((prev) => ({
                          ...prev,
                          contact: e.target.value,
                        }));
                        if (errors.contact)
                          setErrors((prev) => ({
                            ...prev,
                            contact: undefined!,
                          }));
                      }}
                      placeholder={t.contactPlaceholder}
                      className="w-full px-4 py-3 text-base bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] transition-colors focus:outline-none focus:border-[#0B4F54] min-h-[48px]"
                    />
                    {errors.contact && (
                      <p className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1">
                        <AlertCircle
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                        <span>{bookingErrors[errors.contact]}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#0F2942] mb-2"
                    >
                      {t.messageLabel} <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={(e) => {
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                        if (errors.message)
                          setErrors((prev) => ({
                            ...prev,
                            message: undefined!,
                          }));
                      }}
                      placeholder={t.messagePlaceholder}
                      className="w-full px-4 py-3 text-base bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] transition-colors focus:outline-none focus:border-[#0B4F54]"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1">
                        <AlertCircle
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                        <span>{bookingErrors[errors.message]}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <AnimatedButton
                    type="submit"
                    sheen
                    className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl transition-colors min-h-[48px] cursor-pointer"
                  >
                    {t.sendInquiry}
                  </AnimatedButton>
                </div>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-8">
          <ClinicMap
            lang={lang}
            mapTitle={t.mapTitle}
            directionsLabel={t.directionsBtn}
            fallbackNote={t.mapFallbackNote}
          />
        </Reveal>
      </div>
    </section>
  );
};
