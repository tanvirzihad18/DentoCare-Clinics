import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Language } from '../types/clinic';
import type { Translations } from '../data/translations';
import { DentoCareLogo } from './DentoCareLogo';
import { AnimatedAnchor, AnimatedButton, LUXURY_EASE } from './MotionPrimitives';

interface NavbarProps {
  lang: Language;
  t: Translations['nav'];
  onToggleLanguage: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  t,
  onToggleLanguage,
  onNavigate,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'doctors', label: t.doctors },
    { id: 'reviews', label: t.reviews },
    { id: 'contact', label: t.contact },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: LUXURY_EASE }}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8EE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        <motion.a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.16, ease: LUXURY_EASE }}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B4F54] rounded-lg"
        >
          <DentoCareLogo lang={lang} variant="dark" />
        </motion.a>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#334E68]"
        >
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15, ease: LUXURY_EASE }}
              className="relative whitespace-nowrap shrink-0 py-1.5 hover:text-[#0B4F54] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B4F54] group"
            >
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-[#3BB4C1] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <AnimatedButton
            type="button"
            onClick={onToggleLanguage}
            aria-label={t.switchLangLabel}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#0F2942] bg-[#F1F5F7] hover:bg-[#E2ECEF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F54]"
          >
            <Globe className="w-4 h-4 text-[#0B4F54] transition-transform duration-200 group-hover/btn:rotate-12" aria-hidden="true" />
            <span>{t.switchLang}</span>
          </AnimatedButton>

          <AnimatedAnchor
            href="#appointment"
            sheen
            onClick={(e) => handleLinkClick(e, 'appointment')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F54]"
          >
            {t.bookCta}
          </AnimatedAnchor>

          <AnimatedButton
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2E8EE] text-[#0F2942] hover:bg-[#F1F5F7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </AnimatedButton>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: LUXURY_EASE }}
            className="lg:hidden border-t border-[#E2E8EE] bg-white"
          >
            <nav
              aria-label="Mobile Navigation"
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  whileTap={{ scale: 0.99 }}
                  className="px-3 py-3 rounded-lg text-base font-medium text-[#0F2942] hover:bg-[#F1F5F7] hover:text-[#0B4F54] transition-colors min-h-[44px] flex items-center"
                >
                  {item.label}
                </motion.a>
              ))}
              <AnimatedAnchor
                href="#appointment"
                sheen
                onClick={(e) => handleLinkClick(e, 'appointment')}
                className="mt-2 px-4 py-3 rounded-lg text-base font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] text-center transition-colors min-h-[44px] flex items-center justify-center"
              >
                {t.bookCta}
              </AnimatedAnchor>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
