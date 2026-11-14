export type Language = 'en' | 'ar';

export type ServiceCategory = 'all' | 'preventive' | 'cosmetic' | 'restorative';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface DentalService {
  id: string;
  category: Exclude<ServiceCategory, 'all'>;
  name: BilingualText;
  shortDescription: BilingualText;
  fullDescription: BilingualText;
  highlights: {
    en: string[];
    ar: string[];
  };
  image: string;
}

export interface DoctorProfile {
  id: string;
  isPlaceholder: boolean;
  name: BilingualText;
  specialty: BilingualText;
  placeholderNote: BilingualText;
  bio: BilingualText;
  focusAreas: {
    en: string[];
    ar: string[];
  };
  image: string;
}

export interface ReviewItem {
  id: string;
  rating: number;
  source: BilingualText;
  quote: BilingualText;
}

export interface WhyChooseItem {
  id: string;
  index: string;
  title: BilingualText;
  description: BilingualText;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  contact: string;
  message: string;
}

export interface GoogleFormEntryIds {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  message: string;
}

export interface IntegrationConfig {
  googleFormUrl: string;
  formResponseEndpoint: string;
  entryIds: GoogleFormEntryIds;
  whatsappNumber: string;
}
