import type {
  AppointmentFormData,
  ContactFormData,
  IntegrationConfig,
  Language,
} from '../types/clinic';

export type ValidationErrorCode =
  | 'required'
  | 'invalid_phone'
  | 'invalid_email'
  | 'past_date'
  | 'min_length';

export type FieldErrors = Record<string, ValidationErrorCode>;

/**
 * Validates Saudi Arabia phone numbers:
 * Accepts +966 5X XXX XXXX, 9665XXXXXXXX, 05XXXXXXXX, +966 11 XXX XXXX, +966 9200 XXXXX, 9200XXXXX
 */
export function validateSaudiPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-()]/g, '');
  if (!cleaned) return false;

  // International +966 or 00966 or 966 mobile (5XXXXXXXX) or landline (1XXXXXXXX) or unified (9200XXXXX)
  if (/^(?:\+|00)?9665\d{8}$/.test(cleaned)) return true;
  if (/^05\d{8}$/.test(cleaned)) return true;
  if (/^(?:\+|00)?9661\d{8}$/.test(cleaned)) return true;
  if (/^01\d{8}$/.test(cleaned)) return true;
  if (/^(?:\+|00)?9669200\d{5}$/.test(cleaned)) return true;
  if (/^9200\d{5}$/.test(cleaned)) return true;

  return false;
}

/**
 * Normalizes a Saudi phone number into E.164-style +966 format when possible.
 */
export function normalizeSaudiPhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('00966')) {
    return `+${cleaned.slice(2)}`;
  }
  if (cleaned.startsWith('+966')) {
    return cleaned;
  }
  if (cleaned.startsWith('966')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('05') || cleaned.startsWith('01')) {
    return `+966${cleaned.slice(1)}`;
  }
  if (/^9200\d{5}$/.test(cleaned)) {
    return `+966${cleaned}`;
  }
  return cleaned;
}

export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateAppointmentForm(
  data: AppointmentFormData,
  todayIso: string = getTodayIsoDate()
): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'min_length';
  }

  if (!data.phone.trim()) {
    errors.phone = 'required';
  } else if (!validateSaudiPhone(data.phone)) {
    errors.phone = 'invalid_phone';
  }

  if (!data.email.trim()) {
    errors.email = 'required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'invalid_email';
  }

  if (!data.serviceId.trim()) {
    errors.serviceId = 'required';
  }

  if (!data.date.trim()) {
    errors.date = 'required';
  } else if (data.date < todayIso) {
    errors.date = 'past_date';
  }

  if (!data.time.trim()) {
    errors.time = 'required';
  }

  return errors;
}

export function validateContactForm(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = 'required';
  }

  const contactTrimmed = data.contact.trim();
  if (!contactTrimmed) {
    errors.contact = 'required';
  } else if (!validateEmail(contactTrimmed) && !validateSaudiPhone(contactTrimmed)) {
    errors.contact = 'invalid_phone';
  }

  if (!data.message.trim()) {
    errors.message = 'required';
  } else if (data.message.trim().length < 5) {
    errors.message = 'min_length';
  }

  return errors;
}

export function isValidGoogleFormEndpoint(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname === 'docs.google.com' &&
      parsed.pathname.includes('/forms/') &&
      parsed.pathname.endsWith('/formResponse')
    );
  } catch {
    return false;
  }
}

export function isGoogleFormsConfigured(config: IntegrationConfig): boolean {
  if (!isValidGoogleFormEndpoint(config.formResponseEndpoint)) {
    return false;
  }
  const hasCoreEntries =
    config.entryIds.fullName.trim().startsWith('entry.') &&
    config.entryIds.phone.trim().startsWith('entry.');
  return hasCoreEntries;
}

export function buildGoogleFormPayload(
  data: AppointmentFormData,
  config: IntegrationConfig,
  serviceLabel: string,
  doctorLabel: string
): URLSearchParams {
  const params = new URLSearchParams();
  const entries = config.entryIds;

  if (entries.fullName.trim()) {
    params.set(entries.fullName.trim(), data.fullName.trim());
  }
  if (entries.phone.trim()) {
    params.set(entries.phone.trim(), normalizeSaudiPhone(data.phone));
  }
  if (entries.email.trim()) {
    params.set(entries.email.trim(), data.email.trim());
  }
  if (entries.service.trim()) {
    params.set(entries.service.trim(), serviceLabel);
  }
  if (entries.doctor.trim()) {
    params.set(entries.doctor.trim(), doctorLabel);
  }
  if (entries.date.trim()) {
    params.set(entries.date.trim(), data.date);
  }
  if (entries.time.trim()) {
    params.set(entries.time.trim(), data.time);
  }
  if (entries.message.trim() && data.message.trim()) {
    params.set(entries.message.trim(), data.message.trim());
  }

  return params;
}

export function sanitizeWhatsappNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '966920017821';
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('05') && digits.length === 10) return `966${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppDirectUrl(whatsappNumber: string, text?: string): string {
  const phone = sanitizeWhatsappNumber(whatsappNumber);
  if (!text) return `https://wa.me/${phone}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppAppointmentUrl(
  data: AppointmentFormData,
  whatsappNumber: string,
  lang: Language,
  serviceLabel: string,
  doctorLabel: string
): string {
  const normalizedPhone = normalizeSaudiPhone(data.phone);
  const message =
    lang === 'ar'
      ? [
          'مرحباً عيادات دنتوكير، أرغب في حجز موعد:',
          `الاسم: ${data.fullName.trim()}`,
          `الجوال: ${normalizedPhone}`,
          `البريد الإلكتروني: ${data.email.trim()}`,
          `الخدمة: ${serviceLabel}`,
          `الطبيب المفضل: ${doctorLabel}`,
          `التاريخ: ${data.date}`,
          `الوقت: ${data.time}`,
          data.message.trim() ? `ملاحظات: ${data.message.trim()}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      : [
          'Hello DentoCare Clinics, I would like to request an appointment:',
          `Name: ${data.fullName.trim()}`,
          `Phone: ${normalizedPhone}`,
          `Email: ${data.email.trim()}`,
          `Service: ${serviceLabel}`,
          `Preferred Doctor: ${doctorLabel}`,
          `Date: ${data.date}`,
          `Time: ${data.time}`,
          data.message.trim() ? `Notes: ${data.message.trim()}` : '',
        ]
          .filter(Boolean)
          .join('\n');

  return buildWhatsAppDirectUrl(whatsappNumber, message);
}
