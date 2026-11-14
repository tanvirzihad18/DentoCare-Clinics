import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Phone,
  Settings2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  APPOINTMENT_TIME_SLOTS,
  CLINIC_INFO,
  DENTAL_SERVICES,
  DOCTOR_PLACEHOLDERS,
} from '../data/clinicContent';
import type { Translations } from '../data/translations';
import type {
  AppointmentFormData,
  IntegrationConfig,
  Language,
} from '../types/clinic';
import {
  buildGoogleFormPayload,
  buildWhatsAppAppointmentUrl,
  getTodayIsoDate,
  isGoogleFormsConfigured,
  isValidGoogleFormEndpoint,
  validateAppointmentForm,
  type FieldErrors,
} from '../utils/booking';
import {
  AnimatedAnchor,
  AnimatedButton,
  LUXURY_EASE,
  Reveal,
  RevealText,
} from './MotionPrimitives';

interface AppointmentSectionProps {
  lang: Language;
  t: Translations['booking'];
  selectedServiceId: string;
  selectedDoctorId: string;
  integrationConfig: IntegrationConfig;
  onSaveConfig: (config: IntegrationConfig) => void;
  onResetConfig: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  lang,
  t,
  selectedServiceId,
  selectedDoctorId,
  integrationConfig,
  onSaveConfig,
  onResetConfig,
}) => {
  const todayIso = getTodayIsoDate();

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: selectedServiceId,
    doctorId: selectedDoctorId,
    date: '',
    time: '',
    message: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMode, setSubmitMode] = useState<
    'idle' | 'google_forms_sent' | 'validated_unconfigured' | 'network_error'
  >('idle');

  const [configOpen, setConfigOpen] = useState(false);
  const [draftConfig, setDraftConfig] =
    useState<IntegrationConfig>(integrationConfig);
  const [configFeedback, setConfigFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: selectedServiceId }));
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: selectedDoctorId }));
    }
  }, [selectedDoctorId]);

  useEffect(() => {
    setDraftConfig(integrationConfig);
  }, [integrationConfig]);

  const googleConfigured = isGoogleFormsConfigured(integrationConfig);

  const selectedServiceObj = DENTAL_SERVICES.find(
    (s) => s.id === formData.serviceId
  );
  const selectedDoctorObj = DOCTOR_PLACEHOLDERS.find(
    (d) => d.id === formData.doctorId
  );
  const serviceLabel = selectedServiceObj
    ? selectedServiceObj.name[lang]
    : formData.serviceId;
  const doctorLabel = selectedDoctorObj
    ? selectedDoctorObj.name[lang]
    : t.fields.doctorNoPreference;

  const updateField = <K extends keyof AppointmentFormData>(
    field: K,
    value: AppointmentFormData[K]
  ) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (hasAttemptedSubmit) {
      setErrors(validateAppointmentForm(next, todayIso));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    const validationErrors = validateAppointmentForm(formData, todayIso);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!googleConfigured) {
      setSubmitMode('validated_unconfigured');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = buildGoogleFormPayload(
        formData,
        integrationConfig,
        serviceLabel,
        doctorLabel
      );
      await fetch(integrationConfig.formResponseEndpoint.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: payload.toString(),
      });
      setSubmitMode('google_forms_sent');
    } catch {
      setSubmitMode('network_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigFeedback(null);
    const hasAnyGoogleInput =
      draftConfig.formResponseEndpoint.trim() !== '' ||
      draftConfig.googleFormUrl.trim() !== '';

    if (
      hasAnyGoogleInput &&
      (!isValidGoogleFormEndpoint(draftConfig.formResponseEndpoint) ||
        !draftConfig.entryIds.fullName.trim().startsWith('entry.') ||
        !draftConfig.entryIds.phone.trim().startsWith('entry.'))
    ) {
      setConfigFeedback({
        type: 'error',
        text: t.configPanel.invalidEndpointNotice,
      });
      return;
    }

    onSaveConfig(draftConfig);
    setConfigFeedback({
      type: 'success',
      text: t.configPanel.savedNotice,
    });
  };

  const whatsappBookingUrl = buildWhatsAppAppointmentUrl(
    formData,
    integrationConfig.whatsappNumber,
    lang,
    serviceLabel,
    doctorLabel
  );

  const errorText = (field: string) => {
    const code = errors[field];
    return code ? t.errors[code] : null;
  };

  return (
    <section
      id="appointment"
      className="relative overflow-hidden py-16 sm:py-24 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
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
              className="mt-3 text-base text-[#486581] leading-relaxed"
            >
              {t.subheading}
            </RevealText>
          </div>

          <Reveal
            delay={0.18}
            className="flex flex-col items-start md:items-end gap-2"
          >
            <span className="text-xs font-medium text-[#486581]">
              {googleConfigured
                ? t.status.connectedBadge
                : t.status.localOnlyBadge}
            </span>
            <AnimatedButton
              type="button"
              onClick={() => setConfigOpen((prev) => !prev)}
              aria-expanded={configOpen}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0F2942] bg-[#F1F5F7] hover:bg-[#E2ECEF] rounded-lg transition-colors min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F54]"
            >
              <Settings2
                className="w-4 h-4 text-[#0B4F54] transition-transform duration-200 group-hover/btn:rotate-45"
                aria-hidden="true"
              />
              <span>{t.configPanel.toggleBtn}</span>
            </AnimatedButton>
          </Reveal>
        </div>

        <AnimatePresence>
          {configOpen && (
            <motion.form
              onSubmit={handleSaveConfig}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="mb-10 p-6 sm:p-8 rounded-2xl bg-[#F7FAFB] border border-[#D8E7EA]"
            >
              <h3 className="text-lg font-bold text-[#0F2942]">
                {t.configPanel.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#486581]">
                {t.configPanel.description}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="cfg-google-form-url"
                    className="block text-xs font-semibold text-[#0F2942] mb-1.5"
                  >
                    {t.configPanel.googleFormUrl}
                  </label>
                  <input
                    id="cfg-google-form-url"
                    type="url"
                    dir="ltr"
                    value={draftConfig.googleFormUrl}
                    onChange={(e) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        googleFormUrl: e.target.value,
                      }))
                    }
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] focus:outline-none focus:border-[#0B4F54]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cfg-form-endpoint"
                    className="block text-xs font-semibold text-[#0F2942] mb-1.5"
                  >
                    {t.configPanel.formResponseEndpoint}
                  </label>
                  <input
                    id="cfg-form-endpoint"
                    type="url"
                    dir="ltr"
                    value={draftConfig.formResponseEndpoint}
                    onChange={(e) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        formResponseEndpoint: e.target.value,
                      }))
                    }
                    placeholder="https://docs.google.com/forms/d/e/.../formResponse"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] focus:outline-none focus:border-[#0B4F54]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="cfg-whatsapp-number"
                    className="block text-xs font-semibold text-[#0F2942] mb-1.5"
                  >
                    {t.configPanel.whatsappNumber}
                  </label>
                  <input
                    id="cfg-whatsapp-number"
                    type="tel"
                    dir="ltr"
                    value={draftConfig.whatsappNumber}
                    onChange={(e) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        whatsappNumber: e.target.value,
                      }))
                    }
                    placeholder="966920017821"
                    className="w-full md:w-1/2 px-3.5 py-2.5 text-sm bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] focus:outline-none focus:border-[#0B4F54]"
                  />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2E8EE]">
                <p className="text-xs font-semibold text-[#0F2942] mb-3">
                  {t.configPanel.entryIdsHeading}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {(
                    [
                      ['fullName', t.fields.fullName],
                      ['phone', t.fields.phone],
                      ['email', t.fields.email],
                      ['service', t.fields.service],
                      ['doctor', t.fields.doctor],
                      ['date', t.fields.date],
                      ['time', t.fields.time],
                      ['message', t.fields.message],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label
                        htmlFor={`cfg-entry-${key}`}
                        className="block text-xs text-[#486581] mb-1 truncate"
                      >
                        {label}
                      </label>
                      <input
                        id={`cfg-entry-${key}`}
                        type="text"
                        dir="ltr"
                        value={draftConfig.entryIds[key]}
                        onChange={(e) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            entryIds: {
                              ...prev.entryIds,
                              [key]: e.target.value,
                            },
                          }))
                        }
                        placeholder="entry.123456"
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#D0DCE3] rounded-lg text-[#0F2942] focus:outline-none focus:border-[#0B4F54]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {configFeedback && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
                    configFeedback.type === 'success'
                      ? 'bg-[#E6F4F5] text-[#0B4F54]'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {configFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{configFeedback.text}</span>
                </motion.div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <AnimatedButton
                  type="submit"
                  sheen
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px] cursor-pointer"
                >
                  {t.configPanel.saveBtn}
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  onClick={() => {
                    onResetConfig();
                    setConfigFeedback(null);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-[#486581] bg-white border border-[#D0DCE3] rounded-xl min-h-[44px] cursor-pointer"
                >
                  {t.configPanel.clearBtn}
                </AnimatedButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <Reveal delay={0.12}>
          {submitMode === 'google_forms_sent' ||
          submitMode === 'validated_unconfigured' ||
          submitMode === 'network_error' ? (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="p-6 sm:p-10 rounded-2xl border border-[#D8E7EA] bg-[#F7FAFB]"
            >
              <div className="flex items-start gap-4">
                {submitMode === 'google_forms_sent' ? (
                  <CheckCircle2
                    className="w-7 h-7 text-[#0B4F54] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    className="w-7 h-7 text-[#B45309] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0F2942]">
                    {submitMode === 'google_forms_sent'
                      ? t.status.submittedGoogleTitle
                      : t.status.notConfiguredTitle}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#486581] leading-relaxed max-w-2xl">
                    {submitMode === 'google_forms_sent'
                      ? t.status.submittedGoogleBody
                      : t.status.notConfiguredBody}
                  </p>

                  <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-white border border-[#E2E8EE] text-sm">
                    <div>
                      <dt className="text-xs text-[#627D98]">{t.fields.fullName}</dt>
                      <dd className="font-semibold text-[#0F2942] mt-0.5">
                        {formData.fullName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#627D98]">{t.fields.phone}</dt>
                      <dd
                        dir="ltr"
                        className="font-semibold text-[#0F2942] mt-0.5 tabular-nums"
                      >
                        {formData.phone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#627D98]">{t.fields.service}</dt>
                      <dd className="font-semibold text-[#0F2942] mt-0.5">
                        {serviceLabel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#627D98]">{t.fields.doctor}</dt>
                      <dd className="font-semibold text-[#0F2942] mt-0.5">
                        {doctorLabel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#627D98]">{t.fields.date}</dt>
                      <dd className="font-semibold text-[#0F2942] mt-0.5 tabular-nums">
                        {formData.date}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#627D98]">{t.fields.time}</dt>
                      <dd className="font-semibold text-[#0F2942] mt-0.5 tabular-nums">
                        {formData.time}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <AnimatedAnchor
                      href={whatsappBookingUrl}
                      sheen
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{t.status.sendWhatsappBtn}</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </AnimatedAnchor>

                    <AnimatedAnchor
                      href={CLINIC_INFO.phoneHref}
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F2942] bg-white hover:bg-[#F1F5F7] border border-[#D0DCE3] rounded-xl min-h-[44px]"
                    >
                      <Phone className="w-4 h-4 text-[#0B4F54]" aria-hidden="true" />
                      <span>{t.status.callClinicBtn}</span>
                    </AnimatedAnchor>

                    {!googleConfigured && (
                      <AnimatedButton
                        type="button"
                        onClick={() => setConfigOpen(true)}
                        className="px-4 py-3 text-sm font-medium text-[#0B4F54] underline cursor-pointer min-h-[44px]"
                      >
                        {t.status.configureLink}
                      </AnimatedButton>
                    )}

                    <AnimatedButton
                      type="button"
                      onClick={() => setSubmitMode('idle')}
                      className="px-4 py-3 text-sm font-medium text-[#486581] hover:text-[#0F2942] cursor-pointer min-h-[44px]"
                    >
                      {t.status.resetBtn}
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-2xl bg-[#F7FAFB] border border-[#E2E8EE]"
            >
              {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-900 flex items-center gap-2.5"
                >
                  <AlertCircle
                    className="w-5 h-5 shrink-0 text-red-700"
                    aria-hidden="true"
                  />
                  <span>{t.errors.summary}</span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="apt-full-name"
                    className="block text-sm font-semibold text-[#0F2942] mb-2"
                  >
                    {t.fields.fullName} <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="apt-full-name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder={t.fields.fullNamePlaceholder}
                    aria-invalid={Boolean(errors.fullName)}
                    className={`w-full px-4 py-3 text-base bg-white border rounded-xl text-[#0F2942] transition-colors focus:outline-none min-h-[48px] ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#D0DCE3] focus:border-[#0B4F54]'
                    }`}
                  />
                  {errorText('fullName') && (
                    <p className="mt-1.5 text-xs font-medium text-red-700">
                      {errorText('fullName')}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apt-phone"
                    className="block text-sm font-semibold text-[#0F2942] mb-2"
                  >
                    {t.fields.phone} <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="apt-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t.fields.phonePlaceholder}
                    aria-invalid={Boolean(errors.phone)}
                    className={`w-full px-4 py-3 text-base bg-white border rounded-xl text-[#0F2942] transition-colors focus:outline-none min-h-[48px] ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#D0DCE3] focus:border-[#0B4F54]'
                    }`}
                  />
                  <p className="mt-1 text-xs text-[#627D98]">
                    {t.fields.phoneHint}
                  </p>
                  {errorText('phone') && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      {errorText('phone')}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apt-email"
                    className="block text-sm font-semibold text-[#0F2942] mb-2"
                  >
                    {t.fields.email} <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="apt-email"
                    name="email"
                    type="email"
                    dir="ltr"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t.fields.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full px-4 py-3 text-base bg-white border rounded-xl text-[#0F2942] transition-colors focus:outline-none min-h-[48px] ${
                      errors.email
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#D0DCE3] focus:border-[#0B4F54]'
                    }`}
                  />
                  {errorText('email') && (
                    <p className="mt-1.5 text-xs font-medium text-red-700">
                      {errorText('email')}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apt-service"
                    className="block text-sm font-semibold text-[#0F2942] mb-2"
                  >
                    {t.fields.service} <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="apt-service"
                    name="serviceId"
                    required
                    value={formData.serviceId}
                    onChange={(e) => updateField('serviceId', e.target.value)}
                    aria-invalid={Boolean(errors.serviceId)}
                    className={`w-full px-4 py-3 text-base bg-white border rounded-xl text-[#0F2942] transition-colors focus:outline-none min-h-[48px] ${
                      errors.serviceId
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#D0DCE3] focus:border-[#0B4F54]'
                    }`}
                  >
                    <option value="">{t.fields.servicePlaceholder}</option>
                    {DENTAL_SERVICES.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.name[lang]}
                      </option>
                    ))}
                  </select>
                  {errorText('serviceId') && (
                    <p className="mt-1.5 text-xs font-medium text-red-700">
                      {errorText('serviceId')}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apt-doctor"
                    className="block text-sm font-semibold text-[#0F2942] mb-2"
                  >
                    {t.fields.doctor}
                  </label>
                  <select
                    id="apt-doctor"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={(e) => updateField('doctorId', e.target.value)}
                    className="w-full px-4 py-3 text-base bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] transition-colors focus:outline-none focus:border-[#0B4F54] min-h-[48px]"
                  >
                    <option value="">{t.fields.doctorNoPreference}</option>
                    {DOCTOR_PLACEHOLDERS.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="apt-date"
                      className="block text-sm font-semibold text-[#0F2942] mb-2"
                    >
                      {t.fields.date} <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="apt-date"
                      name="date"
                      type="date"
                      min={todayIso}
                      required
                      value={formData.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      aria-invalid={Boolean(errors.date)}
                      className={`w-full px-4 py-3 text-base bg-white border rounded-xl text-[#0F2942] transition-colors focus:outline-none min-h-[48px] ${
                        errors.date
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-[#D0DCE3] focus:border-[#0B4F54]'
                      }`}
                    />
                    {errorText('date') && (
                      <p className="mt-1.5 text-xs font-medium text-red-700">
                        {errorText('date')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="apt-time"
                      className="block text-sm font-semibold text-[#0F2942] mb-2"
                    >
                      {t.fields.time} <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="apt-time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={(e) => updateField('time', e.target.value)}
                      aria-invalid={Boolean(errors.time)}
                      className={`w-full px-4 py-3 text-base bg-white border rounded-xl text-[#0F2942] transition-colors focus:outline-none min-h-[48px] ${
                        errors.time
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-[#D0DCE3] focus:border-[#0B4F54]'
                      }`}
                    >
                      <option value="">{t.fields.timePlaceholder}</option>
                      {APPOINTMENT_TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errorText('time') && (
                      <p className="mt-1.5 text-xs font-medium text-red-700">
                        {errorText('time')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="apt-message"
                    className="block text-sm font-semibold text-[#0F2942] mb-2"
                  >
                    {t.fields.message}
                  </label>
                  <textarea
                    id="apt-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={t.fields.messagePlaceholder}
                    className="w-full px-4 py-3 text-base bg-white border border-[#D0DCE3] rounded-xl text-[#0F2942] transition-colors focus:outline-none focus:border-[#0B4F54]"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <AnimatedButton
                  type="submit"
                  sheen
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] disabled:opacity-60 rounded-xl transition-colors min-h-[52px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F54]"
                >
                  <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                  <span>{isSubmitting ? t.submittingBtn : t.submitBtn}</span>
                </AnimatedButton>

                {integrationConfig.googleFormUrl.trim() && (
                  <AnimatedAnchor
                    href={integrationConfig.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B4F54] hover:underline"
                  >
                    <span>{t.configPanel.googleFormUrl}</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </AnimatedAnchor>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
