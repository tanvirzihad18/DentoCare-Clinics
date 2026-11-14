import type { Language } from '../types/clinic';

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    doctors: string;
    reviews: string;
    contact: string;
    bookCta: string;
    switchLang: string;
    switchLangLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    locationLine: string;
    headline: string;
    subtitle: string;
    bookBtn: string;
    exploreBtn: string;
    ratingLabel: string;
    reviewsLabel: string;
    hoursLabel: string;
  };
  about: {
    kicker: string;
    heading: string;
    description: string;
    pillars: {
      title: string;
      text: string;
    }[];
    facilityCaption: string;
  };
  services: {
    kicker: string;
    heading: string;
    subheading: string;
    filters: {
      all: string;
      preventive: string;
      cosmetic: string;
      restorative: string;
    };
    learnMore: string;
    modalBookBtn: string;
    modalClose: string;
    whatToExpect: string;
  };
  whyChoose: {
    kicker: string;
    heading: string;
    subheading: string;
    bookCta: string;
  };
  doctors: {
    kicker: string;
    heading: string;
    subheading: string;
    viewProfile: string;
    bookWithDoctor: string;
    focusHeading: string;
    placeholderBanner: string;
  };
  reviews: {
    kicker: string;
    heading: string;
    ratingSuffix: string;
    totalReviewsSuffix: string;
    readMoreBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    openGoogleMaps: string;
  };
  booking: {
    kicker: string;
    heading: string;
    subheading: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      phoneHint: string;
      email: string;
      emailPlaceholder: string;
      service: string;
      servicePlaceholder: string;
      doctor: string;
      doctorNoPreference: string;
      date: string;
      time: string;
      timePlaceholder: string;
      message: string;
      messagePlaceholder: string;
    };
    submitBtn: string;
    submittingBtn: string;
    errors: {
      required: string;
      invalid_phone: string;
      invalid_email: string;
      past_date: string;
      min_length: string;
      summary: string;
    };
    status: {
      submittedGoogleTitle: string;
      submittedGoogleBody: string;
      notConfiguredTitle: string;
      notConfiguredBody: string;
      sendWhatsappBtn: string;
      callClinicBtn: string;
      configureLink: string;
      resetBtn: string;
      connectedBadge: string;
      localOnlyBadge: string;
    };
    configPanel: {
      toggleBtn: string;
      title: string;
      description: string;
      googleFormUrl: string;
      formResponseEndpoint: string;
      whatsappNumber: string;
      entryIdsHeading: string;
      saveBtn: string;
      clearBtn: string;
      savedNotice: string;
      invalidEndpointNotice: string;
    };
  };
  contact: {
    kicker: string;
    heading: string;
    addressLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    hoursValue: string;
    hoursNote: string;
    callNow: string;
    whatsappNow: string;
    instagramBtn: string;
    directionsBtn: string;
    mapTitle: string;
    mapFallbackNote: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendInquiry: string;
    inquiryValidatedTitle: string;
    inquiryValidatedBody: string;
    inquiryWhatsappBtn: string;
    newInquiryBtn: string;
  };
  footer: {
    description: string;
    quickNav: string;
    servicesTitle: string;
    contactTitle: string;
    directionsLink: string;
    instagramLink: string;
    copyright: string;
    mapsNotice: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      doctors: 'Our Doctors',
      reviews: 'Reviews',
      contact: 'Contact',
      bookCta: 'Book Appointment',
      switchLang: 'العربية',
      switchLangLabel: 'Switch language to Arabic',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    hero: {
      locationLine: 'Al Aarid, Riyadh · King Abdulaziz Rd',
      headline: 'Your Smile Deserves Exceptional Care.',
      subtitle:
        'Discover modern dental care, experienced professionals, and a comfortable experience for you and your family.',
      bookBtn: 'Book an Appointment',
      exploreBtn: 'Explore Our Services',
      ratingLabel: '4.8/5 Google Rating',
      reviewsLabel: '762 Patient Reviews',
      hoursLabel: 'Open until 10:00 PM',
    },
    about: {
      kicker: 'About DentoCare',
      heading: 'Where Healthy Smiles Begin.',
      description:
        'At DentoCare Clinics, we are committed to providing professional dental care in a welcoming and comfortable environment. Our goal is to make every patient feel valued through attentive service and a patient-first approach.',
      pillars: [
        {
          title: 'Patient-Centered Care',
          text: 'Every appointment starts with clear dialogue, gentle pacing, and respect for your comfort.',
        },
        {
          title: 'Clean & Calming Environment',
          text: 'Modern clinical suites in Al Aarid crafted for strict hygiene and peaceful visits.',
        },
        {
          title: 'Professional Dental Services',
          text: 'Comprehensive general, cosmetic, restorative, and pediatric dentistry for the whole family.',
        },
        {
          title: 'Attentive Hospitality',
          text: 'Warm coordination from arrival to follow-up, open evenings until 10:00 PM.',
        },
      ],
      facilityCaption: 'Patient Reception & Lounge · Al Aarid, Riyadh',
    },
    services: {
      kicker: 'Our Dental Services',
      heading: 'Comprehensive Care for Every Smile',
      subheading:
        'From preventive family checkups to tailored cosmetic dentistry and restorative implants, explore our ten core clinical services.',
      filters: {
        all: 'All Services (10)',
        preventive: 'Preventive & Family',
        cosmetic: 'Cosmetic & Whitening',
        restorative: 'Implants & Orthodontics',
      },
      learnMore: 'Learn More',
      modalBookBtn: 'Book This Service',
      modalClose: 'Close dialog',
      whatToExpect: 'What This Visit Includes',
    },
    whyChoose: {
      kicker: 'Why Choose DentoCare',
      heading: 'Designed Around Patient Comfort & Trust',
      subheading:
        'Families across Riyadh trust DentoCare Clinics for unhurried appointments, sincere care, and an immaculate clinical setting.',
      bookCta: 'Schedule Your Visit',
    },
    doctors: {
      kicker: 'Our Doctors',
      heading: 'Dedicated Dental Professionals',
      subheading:
        'Meet our care team template below. Profiles are structured as editable placeholders ready to be updated with verified practitioner details.',
      viewProfile: 'View Profile',
      bookWithDoctor: 'Request This Specialist',
      focusHeading: 'Clinical Focus Areas',
      placeholderBanner:
        'Placeholder directory notice: Doctor names and biographies below are editable templates pending verified clinic roster details.',
    },
    reviews: {
      kicker: 'Patient Testimonials',
      heading: 'Trusted by Families Across Riyadh',
      ratingSuffix: 'Google Rating',
      totalReviewsSuffix: 'Total Reviews',
      readMoreBtn: 'Read More Reviews',
      modalTitle: 'Patient Feedback Summary',
      modalSubtitle:
        'Showing verified patient excerpts provided for DentoCare Clinics in Riyadh.',
      openGoogleMaps: 'View Clinic on Google Maps',
    },
    booking: {
      kicker: 'Appointment Booking',
      heading: 'Reserve Your Visit in Riyadh',
      subheading:
        'Select your preferred dental service, date, and evening or daytime slot. Our reception confirms exact availability promptly.',
      fields: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        phone: 'Phone Number (Saudi Arabia)',
        phonePlaceholder: '+966 50 123 4567 or 0501234567',
        phoneHint: 'Supports +966 mobile or local 05XXXXXXXX numbers',
        email: 'Email Address',
        emailPlaceholder: 'you@example.com',
        service: 'Select Dental Service',
        servicePlaceholder: 'Choose a dental service',
        doctor: 'Preferred Doctor (Optional)',
        doctorNoPreference: 'No Preference — First Available Specialist',
        date: 'Preferred Appointment Date',
        time: 'Preferred Time',
        timePlaceholder: 'Select a time slot',
        message: 'Additional Message (Optional)',
        messagePlaceholder: 'Share symptoms, family visit details, or scheduling notes...',
      },
      submitBtn: 'Book My Appointment',
      submittingBtn: 'Submitting Request...',
      errors: {
        required: 'This field is required.',
        invalid_phone: 'Enter a valid Saudi phone number (e.g., +966 50 123 4567 or 0501234567).',
        invalid_email: 'Enter a valid email address.',
        past_date: 'Please select today or a future date.',
        min_length: 'Please provide a few more characters.',
        summary: 'Please review the highlighted fields before submitting.',
      },
      status: {
        submittedGoogleTitle: 'Appointment Request Transmitted',
        submittedGoogleBody:
          'Your validated appointment request has been sent to the clinic’s configured Google Forms endpoint. Our team will confirm your exact time shortly.',
        notConfiguredTitle: 'Form Validated — Backend Integration Required',
        notConfiguredBody:
          'Your appointment details passed validation, however no Google Forms response endpoint or backend is configured yet, so this request has not been saved online. Complete your booking immediately via WhatsApp or phone below, or configure Google Forms in Integration Settings.',
        sendWhatsappBtn: 'Send Booking via WhatsApp',
        callClinicBtn: 'Call +966 9200 17821',
        configureLink: 'Configure Google Forms Integration',
        resetBtn: 'Edit or Submit Another Request',
        connectedBadge: 'Google Forms Endpoint Active',
        localOnlyBadge: 'Google Forms Not Configured Yet',
      },
      configPanel: {
        toggleBtn: 'Integration Settings (Google Forms & WhatsApp)',
        title: 'Configurable Google Forms & WhatsApp Integration',
        description:
          'Connect a live Google Form by adding your Form URL, formResponse endpoint, and Google Form entry IDs. Without a valid endpoint, submissions will never claim to be saved.',
        googleFormUrl: 'Google Form Public URL',
        formResponseEndpoint: 'Form Response Endpoint (https://docs.google.com/forms/.../formResponse)',
        whatsappNumber: 'Clinic WhatsApp Number (International format)',
        entryIdsHeading: 'Google Form Field Entry IDs (e.g., entry.123456789)',
        saveBtn: 'Save Integration Settings',
        clearBtn: 'Reset to Default',
        savedNotice: 'Integration settings saved to this browser.',
        invalidEndpointNotice:
          'Endpoint must be a valid https://docs.google.com/forms/.../formResponse URL with Full Name and Phone entry IDs.',
      },
    },
    contact: {
      kicker: 'Contact & Location',
      heading: 'Visit DentoCare Clinics in Al Aarid',
      addressLabel: 'Clinic Address',
      phoneLabel: 'Unified Phone',
      hoursLabel: 'Opening Hours',
      hoursValue: 'Open until 10:00 PM',
      hoursNote:
        'Open until 10:00 PM — please call +966 9200 17821 to verify exact weekly and Friday hours.',
      callNow: 'Call +966 9200 17821',
      whatsappNow: 'WhatsApp Us',
      instagramBtn: 'Instagram',
      directionsBtn: 'Google Maps Directions',
      mapTitle: 'Interactive Map · King Abdulaziz Rd, Al Aarid, Riyadh',
      mapFallbackNote: 'King Abdulaziz Rd, Al Aarid, Riyadh 13337',
      formTitle: 'Send a Quick Inquiry',
      formSubtitle:
        'Questions about treatments or evening hours? Validate your message and connect directly with reception.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Full name',
      contactLabel: 'Saudi Phone or Email',
      contactPlaceholder: '+966 5X XXX XXXX or email@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can our reception team help you?',
      sendInquiry: 'Prepare Inquiry',
      inquiryValidatedTitle: 'Inquiry Ready to Send',
      inquiryValidatedBody:
        'No server inbox is attached to this static contact form, so your message is not stored automatically. Send it directly to our reception via WhatsApp or call us now.',
      inquiryWhatsappBtn: 'Send Inquiry on WhatsApp',
      newInquiryBtn: 'Send Another Inquiry',
    },
    footer: {
      description:
        'Modern luxury dental care in Al Aarid, Riyadh, committed to attentive service, pristine comfort, and a patient-first approach for the entire family.',
      quickNav: 'Quick Navigation',
      servicesTitle: 'Dental Services',
      contactTitle: 'Clinic Contact',
      directionsLink: 'Get Directions on Google Maps',
      instagramLink: 'Follow on Instagram',
      copyright: '© 2026 DentoCare Clinics – عيادات دنتوكير. All rights reserved.',
      mapsNotice: 'Location map powered by Google Maps Platform.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      doctors: 'أطباؤنا',
      reviews: 'آراء المرضى',
      contact: 'تواصل معنا',
      bookCta: 'احجز موعدك',
      switchLang: 'English',
      switchLangLabel: 'تغيير اللغة إلى الإنجليزية',
      openMenu: 'فتح قائمة التنقل',
      closeMenu: 'إغلاق قائمة التنقل',
    },
    hero: {
      locationLine: 'حي العارض، الرياض · طريق الملك عبدالعزيز',
      headline: 'ابتسامتك تستحق عناية استثنائية.',
      subtitle:
        'اكتشف رعاية أسنان حديثة، وفريقاً متخصصاً، وتجربة مريحة لك ولعائلتك.',
      bookBtn: 'احجز موعداً الآن',
      exploreBtn: 'استكشف خدماتنا',
      ratingLabel: 'تقييم 4.8/5 على جوجل',
      reviewsLabel: '762 تقييماً للمرضى',
      hoursLabel: 'مفتوح حتى 10:00 مساءً',
    },
    about: {
      kicker: 'عن عيادات دنتوكير',
      heading: 'حيث تبدأ الابتسامات الصحية.',
      description:
        'في عيادات دنتوكير، نلتزم بتقديم رعاية أسنان احترافية في بيئة مرحّبة ومريحة. هدفنا هو أن يشعر كل مريض بالتقدير من خلال خدمة متفانية ونهج يضع المريض أولاً.',
      pillars: [
        {
          title: 'رعاية تتمحور حول المريض',
          text: 'يبدأ كل موعد بالاستماع الجيد، والوتيرة الهادئة، واحترام راحتك التامة.',
        },
        {
          title: 'بيئة نظيفة ومريحة',
          text: 'غرف علاج حديثة في حي العارض مصممة وفق أعلى معايير النظافة والهدوء.',
        },
        {
          title: 'خدمات أسنان متكاملة',
          text: 'رعاية شاملة في طب الأسنان العام والتجميلي والترميمي وطب أسنان الأطفال.',
        },
        {
          title: 'ضيافة ومتابعة دقيقة',
          text: 'تنسيق مريح منذ لحظة وصولك وحتى المتابعة، مع دوام مسائي حتى 10:00 مساءً.',
        },
      ],
      facilityCaption: 'الاستقبال وصالة المرضى · حي العارض، الرياض',
    },
    services: {
      kicker: 'خدماتنا الطبية',
      heading: 'رعاية شاملة لكل ابتسامة',
      subheading:
        'من الفحوصات الوقائية للعائلة إلى تجميل الأسنان وزراعة الأسنان، تعرّف على خدماتنا العشر المتخصصة.',
      filters: {
        all: 'جميع الخدمات (10)',
        preventive: 'الوقاية والأسرة',
        cosmetic: 'التجميل والتبييض',
        restorative: 'الزراعة والتقويم',
      },
      learnMore: 'اعرف المزيد',
      modalBookBtn: 'احجز هذه الخدمة',
      modalClose: 'إغلاق النافذة',
      whatToExpect: 'ماذا تشمل الزيارة',
    },
    whyChoose: {
      kicker: 'لماذا تختار دنتوكير',
      heading: 'تجربة مصممة لراحتك وثقتك',
      subheading:
        'تثق العائلات في الرياض بعيادات دنتوكير لمواعيدها الهادئة وعنايتها الصادقة وبيئتها النظيفة.',
      bookCta: 'احجز زيارتك الآن',
    },
    doctors: {
      kicker: 'أطباؤنا',
      heading: 'فريق طبي متخصص',
      subheading:
        'تعرف على نموذج ملفات الأطباء أدناه. هذه الملفات مهيأة كنماذج تجريبية قابلة للتعديل ريثما يتم تزويدها بالبيانات المعتمدة.',
      viewProfile: 'عرض الملف',
      bookWithDoctor: 'اختر هذا التخصص',
      focusHeading: 'مجالات التركيز الطبي',
      placeholderBanner:
        'ملاحظة: أسماء الأطباء وتفاصيلهم أدناه هي ملفات تعريفية تجريبية قابلة للتعديل حتى يتم إدخال بيانات الفريق المعتمدة.',
    },
    reviews: {
      kicker: 'آراء المرضى',
      heading: 'ثقة العائلات في الرياض',
      ratingSuffix: 'تقييم جوجل',
      totalReviewsSuffix: 'إجمالي التقييمات',
      readMoreBtn: 'قراءة المزيد من التقييمات',
      modalTitle: 'ملخص تقييمات المرضى',
      modalSubtitle: 'عرض مقتطفات تقييمات المرضى الموثقة لعيادات دنتوكير في الرياض.',
      openGoogleMaps: 'عرض العيادة على خرائط جوجل',
    },
    booking: {
      kicker: 'حجز المواعيد',
      heading: 'احجز موعدك في الرياض',
      subheading:
        'اختر الخدمة المطلوبة والتاريخ والوقت المناسب لك، وسيتواصل معك فريق الاستقبال لتأكيد الموعد.',
      fields: {
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'أدخل اسمك الكامل',
        phone: 'رقم الجوال (المملكة العربية السعودية)',
        phonePlaceholder: '0501234567 أو +966 50 123 4567',
        phoneHint: 'يدعم أرقام الجوال السعودية +966 أو 05XXXXXXXX',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'you@example.com',
        service: 'اختر خدمة الأسنان',
        servicePlaceholder: 'اختر الخدمة المطلوبة',
        doctor: 'الطبيب المفضل (اختياري)',
        doctorNoPreference: 'بدون تفضيل — أقرب طبيب متاح',
        date: 'تاريخ الموعد المفضل',
        time: 'الوقت المفضل',
        timePlaceholder: 'اختر الوقت المناسب',
        message: 'ملاحظات إضافية (اختياري)',
        messagePlaceholder: 'اذكر أي أعراض أو ملاحظات حول الموعد...',
      },
      submitBtn: 'احجز موعدي',
      submittingBtn: 'جاري إرسال الطلب...',
      errors: {
        required: 'هذا الحقل مطلوب.',
        invalid_phone: 'يرجى إدخال رقم سعودي صحيح (مثال: 0501234567 أو +966 50 123 4567).',
        invalid_email: 'يرجى إدخال بريد إلكتروني صحيح.',
        past_date: 'يرجى اختيار تاريخ اليوم أو تاريخ قادم.',
        min_length: 'يرجى كتابة تفاصيل أكثر.',
        summary: 'يرجى مراجعة الحقول المحددة قبل الإرسال.',
      },
      status: {
        submittedGoogleTitle: 'تم إرسال طلب الموعد',
        submittedGoogleBody:
          'تم إرسال بيانات حجزك بنجاح إلى نموذج جوجل المرتبط بالعيادة، وسيتواصل معك فريقنا لتأكيد الموعد.',
        notConfiguredTitle: 'تم التحقق من البيانات — يلزم ربط الإرسال',
        notConfiguredBody:
          'جميع بياناتك صحيحة، ولكن لم يتم ربط رابط نموذج جوجل أو خادم حفظ الطلبات بعد، لذلك لم يتم حفظ الطلب إلكترونياً. يمكنك إرسال الطلب فوراً عبر واتساب أو الاتصال بالعيادة أدناه.',
        sendWhatsappBtn: 'إرسال الحجز عبر واتساب',
        callClinicBtn: 'اتصل على 17821 9200 966+',
        configureLink: 'إعداد ربط نماذج جوجل (للمسؤول)',
        resetBtn: 'تعديل أو إرسال طلب جديد',
        connectedBadge: 'ربط نماذج جوجل مفعّل',
        localOnlyBadge: 'نموذج جوجل غير مربوط بعد',
      },
      configPanel: {
        toggleBtn: 'إعدادات الربط (نماذج جوجل وواتساب)',
        title: 'إعداد ربط نماذج جوجل وواتساب',
        description:
          'اربط نموذج جوجل عبر إدخال رابط النموذج ورابط formResponse ومعرفات الحقول (entry IDs). بدون رابط صحيح لن يدّعي الموقع حفظ الطلب.',
        googleFormUrl: 'رابط نموذج جوجل العام',
        formResponseEndpoint: 'رابط استلام الردود (https://docs.google.com/forms/.../formResponse)',
        whatsappNumber: 'رقم واتساب العيادة (بالصيغة الدولية)',
        entryIdsHeading: 'معرفات حقول نموذج جوجل (مثال: entry.123456789)',
        saveBtn: 'حفظ إعدادات الربط',
        clearBtn: 'استعادة الافتراضي',
        savedNotice: 'تم حفظ إعدادات الربط في هذا المتصفح.',
        invalidEndpointNotice:
          'يجب أن يكون الرابط بصيغة https://docs.google.com/forms/.../formResponse مع معرف الاسم ورقم الجوال.',
      },
    },
    contact: {
      kicker: 'التواصل والموقع',
      heading: 'تفضل بزيارة عيادات دنتوكير في حي العارض',
      addressLabel: 'عنوان العيادة',
      phoneLabel: 'الرقم الموحد',
      hoursLabel: 'ساعات العمل',
      hoursValue: 'مفتوح حتى الساعة 10:00 مساءً',
      hoursNote:
        'مفتوح حتى الساعة 10:00 مساءً — يرجى الاتصال على 17821 9200 966+ لتأكيد ساعات العمل الأسبوعية ويوم الجمعة.',
      callNow: 'اتصل الآن 17821 9200 966+',
      whatsappNow: 'تواصل عبر واتساب',
      instagramBtn: 'إنستغرام',
      directionsBtn: 'الاتجاهات عبر خرائط جوجل',
      mapTitle: 'خريطة تفاعلية · طريق الملك عبدالعزيز، حي العارض، الرياض',
      mapFallbackNote: 'طريق الملك عبدالعزيز، حي العارض، الرياض 13337',
      formTitle: 'أرسل استفساراً سريعاً',
      formSubtitle: 'هل لديك استفسار عن الخدمات أو المواعيد المسائية؟ تحقق من بياناتك وتواصل مباشرة.',
      nameLabel: 'الاسم',
      namePlaceholder: 'الاسم الكامل',
      contactLabel: 'رقم الجوال السعودي أو البريد الإلكتروني',
      contactPlaceholder: '05XXXXXXXX أو email@example.com',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'كيف يمكن لفريق الاستقبال مساعدتك؟',
      sendInquiry: 'تجهيز الاستفسار',
      inquiryValidatedTitle: 'الاستفسار جاهز للإرسال',
      inquiryValidatedBody:
        'لا يوجد خادم بريد مرتبط بهذه الصفحة الثابتة، لذا لا يتم حفظ رسالتك تلقائياً. يمكنك إرسالها فوراً عبر واتساب أو الاتصال بنا.',
      inquiryWhatsappBtn: 'إرسال الاستفسار عبر واتساب',
      newInquiryBtn: 'إرسال استفسار آخر',
    },
    footer: {
      description:
        'رعاية أسنان حديثة وفاخرة في حي العارض بالرياض، نلتزم بالاهتمام الشخصي والراحة التامة ونهج يضع المريض أولاً لجميع أفراد العائلة.',
      quickNav: 'روابط سريعة',
      servicesTitle: 'خدمات الأسنان',
      contactTitle: 'معلومات التواصل',
      directionsLink: 'احصل على الاتجاهات في خرائط جوجل',
      instagramLink: 'تابعنا على إنستغرام',
      copyright: '© 2026 DentoCare Clinics – عيادات دنتوكير. جميع الحقوق محفوظة.',
      mapsNotice: 'الخريطة التفاعلية مدعومة بمنصة خرائط جوجل.',
    },
  },
};
