import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { DoctorsSection } from './components/DoctorsSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { DEFAULT_INTEGRATION_CONFIG } from './data/clinicContent';
import { TRANSLATIONS } from './data/translations';
import type { IntegrationConfig, Language } from './types/clinic';

const CONFIG_STORAGE_KEY = 'dentocare_integration_config_v1';

function loadIntegrationConfig(): IntegrationConfig {
  try {
    const raw = window.localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_INTEGRATION_CONFIG;
    const parsed = JSON.parse(raw) as Partial<IntegrationConfig>;
    return {
      googleFormUrl: parsed.googleFormUrl ?? '',
      formResponseEndpoint: parsed.formResponseEndpoint ?? '',
      whatsappNumber:
        parsed.whatsappNumber ?? DEFAULT_INTEGRATION_CONFIG.whatsappNumber,
      entryIds: {
        ...DEFAULT_INTEGRATION_CONFIG.entryIds,
        ...(parsed.entryIds ?? {}),
      },
    };
  } catch {
    return DEFAULT_INTEGRATION_CONFIG;
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [integrationConfig, setIntegrationConfig] = useState<IntegrationConfig>(
    () => loadIntegrationConfig()
  );
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
    };
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleBookService = useCallback(
    (serviceId: string) => {
      setSelectedServiceId(serviceId);
      navigateToSection('appointment');
    },
    [navigateToSection]
  );

  const handleBookDoctor = useCallback(
    (doctorId: string) => {
      setSelectedDoctorId(doctorId);
      navigateToSection('appointment');
    },
    [navigateToSection]
  );

  const handleSaveConfig = useCallback((config: IntegrationConfig) => {
    setIntegrationConfig(config);
    try {
      window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, []);

  const handleResetConfig = useCallback(() => {
    setIntegrationConfig(DEFAULT_INTEGRATION_CONFIG);
    try {
      window.localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen flex flex-col bg-white text-[#0F2942]"
      >
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        lang={lang}
        t={t.nav}
        onToggleLanguage={() => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
        onNavigate={navigateToSection}
      />

      <main className="flex-1">
        <HeroSection t={t.hero} onNavigate={navigateToSection} />
        <AboutSection t={t.about} />
        <ServicesSection
          lang={lang}
          t={t.services}
          onBookService={handleBookService}
        />
        <WhyChooseSection
          lang={lang}
          t={t.whyChoose}
          onNavigate={navigateToSection}
        />
        <DoctorsSection
          lang={lang}
          t={t.doctors}
          closeLabel={t.services.modalClose}
          onBookDoctor={handleBookDoctor}
        />
        <ReviewsSection
          lang={lang}
          t={t.reviews}
          closeLabel={t.services.modalClose}
        />
        <AppointmentSection
          lang={lang}
          t={t.booking}
          selectedServiceId={selectedServiceId}
          selectedDoctorId={selectedDoctorId}
          integrationConfig={integrationConfig}
          onSaveConfig={handleSaveConfig}
          onResetConfig={handleResetConfig}
        />
        <ContactSection
          lang={lang}
          t={t.contact}
          bookingErrors={t.booking.errors}
          whatsappNumber={integrationConfig.whatsappNumber}
        />
      </main>

      <Footer
        lang={lang}
        t={t.footer}
        nav={t.nav}
        onNavigate={navigateToSection}
        onSelectService={handleBookService}
      />
      </div>
    </MotionConfig>
  );
}
