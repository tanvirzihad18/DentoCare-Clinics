import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleFormPayload,
  buildWhatsAppAppointmentUrl,
  isGoogleFormsConfigured,
  isValidGoogleFormEndpoint,
  normalizeSaudiPhone,
  sanitizeWhatsappNumber,
  validateAppointmentForm,
  validateContactForm,
  validateEmail,
  validateSaudiPhone,
} from './booking';
import type { AppointmentFormData, IntegrationConfig } from '../types/clinic';

test('validateSaudiPhone accepts valid Saudi mobile, landline, and 9200 numbers', () => {
  assert.equal(validateSaudiPhone('+966 50 123 4567'), true);
  assert.equal(validateSaudiPhone('0551234567'), true);
  assert.equal(validateSaudiPhone('966501234567'), true);
  assert.equal(validateSaudiPhone('00966501234567'), true);
  assert.equal(validateSaudiPhone('+966 9200 17821'), true);
  assert.equal(validateSaudiPhone('0112345678'), true);
});

test('validateSaudiPhone rejects invalid or non-Saudi numbers', () => {
  assert.equal(validateSaudiPhone(''), false);
  assert.equal(validateSaudiPhone('12345'), false);
  assert.equal(validateSaudiPhone('+1 555 234 5678'), false);
  assert.equal(validateSaudiPhone('0612345678'), false);
  assert.equal(validateSaudiPhone('abc1234567'), false);
});

test('normalizeSaudiPhone converts local 05 numbers to +966', () => {
  assert.equal(normalizeSaudiPhone('050 123 4567'), '+966501234567');
  assert.equal(normalizeSaudiPhone('00966501234567'), '+966501234567');
  assert.equal(normalizeSaudiPhone('+966 55 987 6543'), '+966559876543');
});

test('validateEmail accepts standard emails and rejects malformed ones', () => {
  assert.equal(validateEmail('patient@example.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('user@domain'), false);
});

test('validateAppointmentForm blocks empty and invalid submissions and accepts valid ones', () => {
  const emptyForm: AppointmentFormData = {
    fullName: '',
    phone: '',
    email: '',
    serviceId: '',
    doctorId: '',
    date: '',
    time: '',
    message: '',
  };
  const emptyErrors = validateAppointmentForm(emptyForm, '2026-11-14');
  assert.equal(emptyErrors.fullName, 'required');
  assert.equal(emptyErrors.phone, 'required');
  assert.equal(emptyErrors.email, 'required');
  assert.equal(emptyErrors.serviceId, 'required');
  assert.equal(emptyErrors.date, 'required');
  assert.equal(emptyErrors.time, 'required');

  const pastDateForm: AppointmentFormData = {
    fullName: 'Sara Al-Mansour',
    phone: '0501234567',
    email: 'sara@example.com',
    serviceId: 'general-dentistry',
    doctorId: '',
    date: '2026-11-10',
    time: '04:00 PM',
    message: '',
  };
  const pastErrors = validateAppointmentForm(pastDateForm, '2026-11-14');
  assert.equal(pastErrors.date, 'past_date');

  const validForm: AppointmentFormData = {
    ...pastDateForm,
    date: '2026-11-20',
  };
  assert.deepEqual(validateAppointmentForm(validForm, '2026-11-14'), {});
});

test('validateContactForm validates name, contact (phone or email), and message', () => {
  assert.deepEqual(
    validateContactForm({
      name: 'Ahmed',
      contact: '+966 55 111 2222',
      message: 'Need evening dental checkup.',
    }),
    {}
  );
  assert.deepEqual(
    validateContactForm({
      name: 'Ahmed',
      contact: 'ahmed@example.com',
      message: 'Question about veneers.',
    }),
    {}
  );
  const errs = validateContactForm({ name: '', contact: '123', message: 'hi' });
  assert.equal(errs.name, 'required');
  assert.equal(errs.contact, 'invalid_phone');
  assert.equal(errs.message, 'min_length');
});

test('Google Forms configuration and payload mapping work accurately', () => {
  const unconfigured: IntegrationConfig = {
    googleFormUrl: '',
    formResponseEndpoint: '',
    entryIds: {
      fullName: '',
      phone: '',
      email: '',
      service: '',
      doctor: '',
      date: '',
      time: '',
      message: '',
    },
    whatsappNumber: '966920017821',
  };
  assert.equal(isGoogleFormsConfigured(unconfigured), false);

  const validEndpoint = 'https://docs.google.com/forms/d/e/1FAIpQLSfExample/formResponse';
  assert.equal(isValidGoogleFormEndpoint(validEndpoint), true);
  assert.equal(isValidGoogleFormEndpoint('https://example.com/formResponse'), false);

  const configured: IntegrationConfig = {
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfExample/viewform',
    formResponseEndpoint: validEndpoint,
    entryIds: {
      fullName: 'entry.101',
      phone: 'entry.102',
      email: 'entry.103',
      service: 'entry.104',
      doctor: 'entry.105',
      date: 'entry.106',
      time: 'entry.107',
      message: 'entry.108',
    },
    whatsappNumber: '0501234567',
  };
  assert.equal(isGoogleFormsConfigured(configured), true);
  assert.equal(sanitizeWhatsappNumber(configured.whatsappNumber), '966501234567');

  const payload = buildGoogleFormPayload(
    {
      fullName: 'Layla',
      phone: '0501234567',
      email: 'layla@example.com',
      serviceId: 'teeth-whitening',
      doctorId: '',
      date: '2026-11-22',
      time: '05:30 PM',
      message: 'Evening slot',
    },
    configured,
    'Teeth Whitening',
    'No Preference'
  );
  assert.equal(payload.get('entry.101'), 'Layla');
  assert.equal(payload.get('entry.102'), '+966501234567');
  assert.equal(payload.get('entry.104'), 'Teeth Whitening');

  const waUrl = buildWhatsAppAppointmentUrl(
    {
      fullName: 'Layla',
      phone: '0501234567',
      email: 'layla@example.com',
      serviceId: 'teeth-whitening',
      doctorId: '',
      date: '2026-11-22',
      time: '05:30 PM',
      message: '',
    },
    configured.whatsappNumber,
    'en',
    'Teeth Whitening',
    'No Preference'
  );
  assert.equal(waUrl.startsWith('https://wa.me/966501234567?text='), true);
});
