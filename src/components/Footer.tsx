import React from 'react';
import { ExternalLink, Instagram, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_INFO, DENTAL_SERVICES } from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type { Language } from '../types/clinic';
import { DentoCareLogo } from './DentoCareLogo';
import {
  AnimatedAnchor,
  LUXURY_EASE,
  StaggerContainer,
  StaggerItem,
} from './MotionPrimitives';

interface FooterProps {
  lang: Language;
  t: Translations['footer'];
  nav: Translations['nav'];
  onNavigate: (sectionId: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  t,
  nav,
  onNavigate,
  onSelectService,
}) => {
  const quickLinks = [
    { id: 'home', label: nav.home },
    { id: 'about', label: nav.about },
    { id: 'services', label: nav.services },
    { id: 'doctors', label: nav.doctors },
    { id: 'reviews', label: nav.reviews },
    { id: 'appointment', label: nav.bookCta },
    { id: 'contact', label: nav.contact },
  ];

  return (
    <footer className="bg-[#0F2942] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          staggerDelay={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15"
        >
          <StaggerItem className="lg:col-span-4 space-y-4">
            <DentoCareLogo lang={lang} variant="light" showDualName />
            <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-sm">
              {t.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <AnimatedAnchor
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#8AE1EB] hover:text-white transition-colors py-1"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>{t.instagramLink}</span>
              </AnimatedAnchor>
              <AnimatedAnchor
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#8AE1EB] hover:text-white transition-colors py-1"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>{t.directionsLink}</span>
              </AnimatedAnchor>
            </div>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.quickNav}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <motion.a
                    href={`#${link.id}`}
                    whileHover={{ x: lang === 'ar' ? -3 : 3 }}
                    transition={{ duration: 0.15, ease: LUXURY_EASE }}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="inline-block hover:text-white transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.servicesTitle}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#CBD5E1]">
              {DENTAL_SERVICES.map((svc) => (
                <li key={svc.id}>
                  <motion.button
                    type="button"
                    whileHover={{ x: lang === 'ar' ? -2 : 2 }}
                    transition={{ duration: 0.15, ease: LUXURY_EASE }}
                    onClick={() => onSelectService(svc.id)}
                    className="text-start hover:text-white transition-colors cursor-pointer"
                  >
                    {svc.name[lang]}
                  </motion.button>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.contactTitle}
            </h3>
            <div className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
              <MapPin
                className="w-4 h-4 text-[#8AE1EB] shrink-0 mt-1"
                aria-hidden="true"
              />
              <span>{CLINIC_INFO.address[lang]}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-[#CBD5E1]">
              <Phone
                className="w-4 h-4 text-[#8AE1EB] shrink-0"
                aria-hidden="true"
              />
              <a
                href={CLINIC_INFO.phoneHref}
                dir="ltr"
                className="hover:text-white font-semibold tabular-nums transition-colors"
              >
                {CLINIC_INFO.phoneDisplay}
              </a>
            </div>
            <p className="text-xs text-[#9FB3C8] pt-1">
              {CLINIC_INFO.hours[lang]}
            </p>
          </StaggerItem>
        </StaggerContainer>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9FB3C8]">
          <p>{t.copyright}</p>
          <p>{t.mapsNotice}</p>
        </div>
      </div>
    </footer>
  );
};
