import type {
  DentalService,
  DoctorProfile,
  IntegrationConfig,
  ReviewItem,
  WhyChooseItem,
} from '../types/clinic';

export const CLINIC_INFO = {
  brandEn: 'DentoCare Clinics',
  brandAr: 'عيادات دنتوكير',
  phoneDisplay: '+966 9200 17821',
  phoneHref: 'tel:+966920017821',
  defaultWhatsappNumber: '966920017821',
  instagramUrl: 'https://www.instagram.com/',
  rating: '4.8',
  totalReviews: '762',
  coordinates: {
    lat: 24.8768,
    lng: 46.6186,
  },
  address: {
    en: 'Dist, 4720 King Abdulaziz Rd, Al Aarid, 8260, Riyadh 13337, Saudi Arabia.',
    ar: '4720 طريق الملك عبدالعزيز، حي العارض، 8260، الرياض 13337، المملكة العربية السعودية.',
  },
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=24.8768,46.6186',
  googleMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=4720+King+Abdulaziz+Rd+Al+Aarid+Riyadh+13337+Saudi+Arabia',
  hours: {
    en: 'Open until 10:00 PM',
    ar: 'مفتوح حتى الساعة 10:00 مساءً',
    verifyNoteEn:
      'Open until 10:00 PM — please call +966 9200 17821 to verify exact daily and Friday hours.',
    verifyNoteAr:
      'مفتوح حتى الساعة 10:00 مساءً — يرجى الاتصال على 17821 9200 966+ للتحقق من ساعات العمل الأسبوعية ويوم الجمعة.',
  },
};

export const DEFAULT_INTEGRATION_CONFIG: IntegrationConfig = {
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
  whatsappNumber: CLINIC_INFO.defaultWhatsappNumber,
};

export const CLINIC_IMAGES = {
  hero: '/src/assets/images/hero_dental_clinic_1794670202831.jpg',
  about: '/src/assets/images/about_clinic_interior_1794670202311.jpg',
  general: '/src/assets/images/service_general_cleaning_1794670203755.jpg',
  cosmetic: '/src/assets/images/service_cosmetic_veneers_1794670203549.jpg',
  implants: '/src/assets/images/service_dental_implants_1794670204847.jpg',
  ortho: '/src/assets/images/service_orthodontics_aligners_1794670204253.jpg',
  whitening: '/src/assets/images/service_whitening_smile_1794670204963.jpg',
  pediatric: '/src/assets/images/service_pediatric_care_1794670204569.jpg',
  endodontic: '/src/assets/images/service_endodontic_precision_1794670205459.jpg',
  doctor1: '/src/assets/images/doctor_portrait_one_1794670205367.jpg',
  doctor2: '/src/assets/images/doctor_portrait_two_1794670206123.jpg',
  doctor3: '/src/assets/images/doctor_portrait_three_1794670206804.jpg',
};

export const DENTAL_SERVICES: DentalService[] = [
  {
    id: 'general-dentistry',
    category: 'preventive',
    name: { en: 'General Dentistry', ar: 'طب الأسنان العام' },
    shortDescription: {
      en: 'Comprehensive oral examinations, diagnostics, and everyday restorative care for lifelong dental health.',
      ar: 'فحوصات شاملة للفم والأسنان، وتشخيص دقيق، وعلاجات ترميمية يومية للحفاظ على صحة أسنانك.',
    },
    fullDescription: {
      en: 'Our General Dentistry consultations focus on thorough prevention, early detection, and gentle restorative treatments tailored to each family member.',
      ar: 'تركز استشارات طب الأسنان العام لدينا على الوقاية الشاملة والاكتشاف المبكر وتقديم علاجات ترميمية لطيفة تناسب جميع أفراد العائلة.',
    },
    highlights: {
      en: [
        'Digital oral examination and treatment planning',
        'Tooth-colored fillings and preventive checkups',
        'Clear guidance for long-term oral hygiene',
      ],
      ar: [
        'فحص رقمي شامل وخطة علاج واضحة',
        'حشوات تجميلية بلون الأسنان وفحوصات وقائية',
        'إرشادات دقيقة للعناية اليومية بصحة الفم',
      ],
    },
    image: CLINIC_IMAGES.general,
  },
  {
    id: 'cosmetic-dentistry',
    category: 'cosmetic',
    name: { en: 'Cosmetic Dentistry', ar: 'تجميل الأسنان' },
    shortDescription: {
      en: 'Natural-looking aesthetic refinements designed to harmonize tooth shape, shade, and facial balance.',
      ar: 'لمسات تجميلية طبيعية مصممة لتحقيق التناغم بين شكل الأسنان ولونها وتفاصيل الابتسامة.',
    },
    fullDescription: {
      en: 'Every cosmetic consultation at DentoCare Clinics begins by listening to your goals and crafting a personalized aesthetic plan that looks natural and feels comfortable.',
      ar: 'تبدأ كل استشارة لتجميل الأسنان في عيادات دنتوكير بالاستماع إلى تطلعاتك وتصميم خطة شخصية تمنحك مظهراً طبيعياً ومريحاً.',
    },
    highlights: {
      en: [
        'Individualized shade and contour matching',
        'Conservative enamel-preserving techniques',
        'Aesthetic bonding and subtle smile harmony',
      ],
      ar: [
        'مطابقة دقيقة للون وشكل الأسنان الطبيعي',
        'تقنيات تحفظية تحافظ على طبقة المينا',
        'ترميم تجميلي لطيف لتناسق الابتسامة',
      ],
    },
    image: CLINIC_IMAGES.cosmetic,
  },
  {
    id: 'dental-implants',
    category: 'restorative',
    name: { en: 'Dental Implants', ar: 'زراعة الأسنان' },
    shortDescription: {
      en: 'Stable, natural-feeling tooth replacement planned with precision digital imaging for lasting comfort.',
      ar: 'تعويض ثابت وطبيعي للأسنان المفقودة باستخدام التخطيط الرقمي الدقيق لراحة تدوم طويلاً.',
    },
    fullDescription: {
      en: 'Dental implants restore chewing function and natural aesthetics seamlessly. We guide you through digital assessment, placement planning, and custom crown restoration.',
      ar: 'تستعيد زراعة الأسنان وظيفة المضغ والمظهر الطبيعي بسلاسة، حيث نرافقك بدءاً من التقييم الرقمي وحتى تركيب التاج النهائي المخصص.',
    },
    highlights: {
      en: [
        'Detailed 3D assessment prior to placement',
        'Custom crowns matched to surrounding teeth',
        'Attentive follow-up throughout healing',
      ],
      ar: [
        'تقييم ثلاثي الأبعاد دقيق قبل الزراعة',
        'تيجان مخصصة مطابقة للأسنان المجاورة',
        'متابعة مستمرة وعناية دقيقة طوال فترة التعافي',
      ],
    },
    image: CLINIC_IMAGES.implants,
  },
  {
    id: 'orthodontics',
    category: 'restorative',
    name: { en: 'Orthodontics', ar: 'تقويم الأسنان' },
    shortDescription: {
      en: 'Clear aligners and modern orthodontic options to gently align teeth and balance your bite.',
      ar: 'تقويم شفاف وخيارات تقويم حديثة لتصحيح اصطفاف الأسنان وتوازن الإطباق بلطف.',
    },
    fullDescription: {
      en: 'Whether for teens or adults, our orthodontic care offers discreet clear aligners and structured alignment plans built around comfort and predictable progress.',
      ar: 'سواء للمراهقين أو البالغين، نوفر خيارات التقويم الشفاف وخطط علاجية منظمة تركز على الراحة والنتائج المتدرجة الواضحة.',
    },
    highlights: {
      en: [
        'Discreet clear aligner and bracket pathways',
        'Digital bite and alignment evaluation',
        'Scheduled progress check-ins with your specialist',
      ],
      ar: [
        'خيارات التقويم الشفاف والمعدني الحديث',
        'تقييم رقمي لحالة الأسنان والإطباق',
        'متابعة دورية منتظمة مع الطبيب المختص',
      ],
    },
    image: CLINIC_IMAGES.ortho,
  },
  {
    id: 'teeth-whitening',
    category: 'cosmetic',
    name: { en: 'Teeth Whitening', ar: 'تبييض الأسنان' },
    shortDescription: {
      en: 'Safe, comfortable in-clinic brightening designed to lift surface stains with minimal sensitivity.',
      ar: 'تبييض آمن ومريح داخل العيادة لإزالة التصبغات وتفتيح لون الأسنان بأقل حساسية ممكنة.',
    },
    fullDescription: {
      en: 'Our supervised teeth whitening sessions gently brighten your smile in a calm clinical setting while protecting gums and enamel comfort.',
      ar: 'تساعد جلسات التبييض تحت إشراف الطبيب على تفتيح ابتسامتك بأمان داخل أجواء مريحة مع حماية اللثة ومينا الأسنان.',
    },
    highlights: {
      en: [
        'Pre-treatment enamel and gum check',
        'Gentle desensitizing care protocol',
        'Noticeably brighter, natural shade results',
      ],
      ar: [
        'فحص مسبق لمينا الأسنان وسلامة اللثة',
        'بروتوكول لطيف لتقليل حساسية الأسنان',
        'نتائج تفتيح طبيعية ومشرقة',
      ],
    },
    image: CLINIC_IMAGES.whitening,
  },
  {
    id: 'dental-veneers',
    category: 'cosmetic',
    name: { en: 'Dental Veneers', ar: 'عدسات الأسنان (الفينير)' },
    shortDescription: {
      en: 'Custom ultra-thin porcelain veneers crafted for refined brightness, symmetry, and durability.',
      ar: 'عدسات خزفية فائقة الدقة مصممة خصيصاً لمنحك تناسقاً وإشراقاً طبيعياً يدوم.',
    },
    fullDescription: {
      en: 'Tailored porcelain veneers refine discoloration, minor spacing, and worn edges with lifelike translucency crafted in close collaboration with you.',
      ar: 'تساعد عدسات الفينير المخصصة على تحسين لون الأسنان وتناسق المسافات والحواف بمظهر طبيعي شفاف يناسب ملامح وجهك.',
    },
    highlights: {
      en: [
        'Custom shade selection and smile preview',
        'Precision ceramic craftsmanship',
        'Balanced, natural facial harmony',
      ],
      ar: [
        'اختيار دقيق للدرجة اللونية ومعاينة الابتسامة',
        'تصميم خزفي دقيق ومتقن',
        'نتيجة متوازنة تنسجم مع ملامح الوجه',
      ],
    },
    image: CLINIC_IMAGES.cosmetic,
  },
  {
    id: 'root-canal-treatment',
    category: 'restorative',
    name: { en: 'Root Canal Treatment', ar: 'علاج الجذور والأعصاب' },
    shortDescription: {
      en: 'Gentle, precision endodontic therapy focused on relieving discomfort and preserving natural teeth.',
      ar: 'علاج دقيق ولطيف لقنوات الجذور يهدف إلى تخفيف الألم والحفاظ على أسنانك الطبيعية.',
    },
    fullDescription: {
      en: 'We prioritize your comfort during root canal procedures using careful anesthesia, calm communication, and precise cleaning to save natural teeth.',
      ar: 'نضع راحتك في المقام الأول أثناء علاج العصب عبر التخدير اللطيف والتواصل الواضح والتنظيف الدقيق للحفاظ على السن الطبيعي.',
    },
    highlights: {
      en: [
        'Focused pain relief and calm clinical pace',
        'Digital diagnostic imaging for accuracy',
        'Protective restoration following treatment',
      ],
      ar: [
        'تخفيف فعال للألم في أجواء هادئة ومريحة',
        'تصوير رقمي دقيق لقنوات الجذر',
        'ترميم واقٍ للسن بعد إتمام العلاج',
      ],
    },
    image: CLINIC_IMAGES.endodontic,
  },
  {
    id: 'pediatric-dentistry',
    category: 'preventive',
    name: { en: 'Pediatric Dentistry', ar: 'طب أسنان الأطفال' },
    shortDescription: {
      en: 'Warm, patient-paced dental visits that help children feel safe, relaxed, and confident.',
      ar: 'زيارات لطيفة وهادئة تساعد الأطفال على الشعور بالأمان والراحة والثقة في العيادة.',
    },
    fullDescription: {
      en: 'Designed for young smiles and peace of mind for parents, our pediatric care builds positive lifelong dental habits without rush or stress.',
      ar: 'رعاية مخصصة لابتسامات الصغار وراحة بال الوالدين، لبناء عادات صحية إيجابية مدى الحياة دون قلق أو استعجال.',
    },
    highlights: {
      en: [
        'Gentle, child-friendly communication',
        'Preventive checkups and fluoride care',
        'Supportive guidance for parents and kids',
      ],
      ar: [
        'تواصل لطيف ومناسب للأطفال',
        'فحوصات وقائية وعناية بالأسنان اللبنية',
        'توجيه داعم ومبسط للأهل والأطفال',
      ],
    },
    image: CLINIC_IMAGES.pediatric,
  },
  {
    id: 'dental-cleaning',
    category: 'preventive',
    name: { en: 'Dental Cleaning', ar: 'تنظيف الأسنان' },
    shortDescription: {
      en: 'Thorough plaque and tartar removal paired with gentle polishing for fresh breath and healthy gums.',
      ar: 'إزالة دقيقة للبلاك والجير مع تلميع لطيف لانتعاش الفم وصحة اللثة.',
    },
    fullDescription: {
      en: 'Routine professional dental cleanings keep gums healthy, remove everyday staining, and refresh your smile in one comfortable visit.',
      ar: 'يحافظ التنظيف الاحترافي المنتظم على صحة اللثة ويزيل التصبغات السطحية ويمنحك ابتسامة منتعشة في زيارة مريحة واحدة.',
    },
    highlights: {
      en: [
        'Ultrasonic scaling and gentle gum care',
        'Stain-lifting polishing treatment',
        'Personalized home care recommendations',
      ],
      ar: [
        'إزالة الجير بالموجات فوق الصوتية وعناية لطيفة باللثة',
        'تلميع الأسنان لإزالة التصبغات السطحية',
        'نصائح مخصصة للعناية المنزلية',
      ],
    },
    image: CLINIC_IMAGES.general,
  },
  {
    id: 'smile-makeover',
    category: 'cosmetic',
    name: { en: 'Smile Makeover', ar: 'تصميم وتجديد الابتسامة' },
    shortDescription: {
      en: 'A coordinated aesthetic plan combining whitening, alignment, or veneers tailored to your vision.',
      ar: 'خطة تجميلية متكاملة تجمع بين التبييض أو التقويم أو الفينير وفق رؤيتك الخاصة.',
    },
    fullDescription: {
      en: 'A Smile Makeover brings together multiple disciplines in a clear, step-by-step plan designed around your facial proportions, comfort, and schedule.',
      ar: 'يجمع تصميم الابتسامة بين عدة تخصصات في خطة واضحة ومتدرجة تراعي تناسق ملامحك وراحتك وجدولك الزمني.',
    },
    highlights: {
      en: [
        'Comprehensive aesthetic and functional consultation',
        'Coordinated timeline across treatments',
        'Natural results crafted for your features',
      ],
      ar: [
        'استشارة شاملة تجمع بين الجانب التجميلي والوظيفي',
        'جدول علاجي منسق وواضح الخطوات',
        'نتائج طبيعية مصممة خصيصاً لملامحك',
      ],
    },
    image: CLINIC_IMAGES.whitening,
  },
];

export const DOCTOR_PLACEHOLDERS: DoctorProfile[] = [
  {
    id: 'doctor-placeholder-1',
    isPlaceholder: true,
    name: {
      en: 'Dental Specialist — Profile 01',
      ar: 'طبيب أسنان مختص — ملف تعريفي ٠١',
    },
    specialty: {
      en: 'General & Restorative Dentistry (Placeholder)',
      ar: 'طب الأسنان العام والترميمي (بيانات تجريبية)',
    },
    placeholderNote: {
      en: 'Editable placeholder profile — replace with verified doctor name and credentials.',
      ar: 'ملف تعريفي قابل للتعديل — يُستبدل باسم الطبيب ومؤهلاته المعتمدة.',
    },
    bio: {
      en: 'Dedicated to calm, attentive dental consultations, clear treatment communication, and comfortable restorative care for individuals and families in Riyadh.',
      ar: 'يركز على تقديم استشارات هادئة وعناية ترميمية مريحة مع شرح واضح لخطط العلاج للأفراد والعائلات في الرياض.',
    },
    focusAreas: {
      en: ['Preventive Exams', 'Restorative Care', 'Patient Consultation'],
      ar: ['الفحوصات الوقائية', 'العلاجات الترميمية', 'استشارات المرضى'],
    },
    image: CLINIC_IMAGES.doctor1,
  },
  {
    id: 'doctor-placeholder-2',
    isPlaceholder: true,
    name: {
      en: 'Dental Specialist — Profile 02',
      ar: 'طبيبة أسنان مختصة — ملف تعريفي ٠٢',
    },
    specialty: {
      en: 'Cosmetic & Family Dentistry (Placeholder)',
      ar: 'تجميل الأسنان ورعاية الأسرة (بيانات تجريبية)',
    },
    placeholderNote: {
      en: 'Editable placeholder profile — replace with verified doctor name and credentials.',
      ar: 'ملف تعريفي قابل للتعديل — يُستبدل باسم الطبيبة ومؤهلاتها المعتمدة.',
    },
    bio: {
      en: 'Focused on natural aesthetic outcomes, gentle pediatric visits, and an unhurried, reassuring experience for patients of every age.',
      ar: 'تهتم بالنتائج التجميلية الطبيعية وزيارات الأطفال اللطيفة وتوفير تجربة مريحة ومطمئنة لجميع الأعمار.',
    },
    focusAreas: {
      en: ['Smile Aesthetics', 'Veneers & Whitening', 'Pediatric Visits'],
      ar: ['تجميل الابتسامة', 'الفينير والتبييض', 'رعاية الأطفال'],
    },
    image: CLINIC_IMAGES.doctor2,
  },
  {
    id: 'doctor-placeholder-3',
    isPlaceholder: true,
    name: {
      en: 'Dental Specialist — Profile 03',
      ar: 'طبيب أسنان مختص — ملف تعريفي ٠٣',
    },
    specialty: {
      en: 'Implants & Orthodontics (Placeholder)',
      ar: 'زراعة وتقويم الأسنان (بيانات تجريبية)',
    },
    placeholderNote: {
      en: 'Editable placeholder profile — replace with verified doctor name and credentials.',
      ar: 'ملف تعريفي قابل للتعديل — يُستبدل باسم الطبيب ومؤهلاته المعتمدة.',
    },
    bio: {
      en: 'Committed to structured treatment planning, digital diagnostics, and attentive follow-up care for restorative and alignment procedures.',
      ar: 'يلتزم بالتخطيط العلاجي المنظم والتشخيص الرقمي والمتابعة الدقيقة لعلاجات الزراعة وتقويم الأسنان.',
    },
    focusAreas: {
      en: ['Dental Implants', 'Clear Aligners', 'Bite Harmony'],
      ar: ['زراعة الأسنان', 'التقويم الشفاف', 'توازن الإطباق'],
    },
    image: CLINIC_IMAGES.doctor3,
  },
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    rating: 5,
    source: {
      en: 'Patient Review · Google Maps',
      ar: 'تقييم مريض · خرائط جوجل',
    },
    quote: {
      en: 'My family has been going to this clinic for many years and it is simply the best we have come across in Riyadh.',
      ar: 'تزور عائلتي هذه العيادة منذ سنوات عديدة، وهي بكل بساطة الأفضل التي تعاملنا معها في الرياض.',
    },
  },
  {
    id: 'review-2',
    rating: 5,
    source: {
      en: 'Patient Review · Google Maps',
      ar: 'تقييم مريض · خرائط جوجل',
    },
    quote: {
      en: 'Amazing service and such a friendly team! You can tell they really care about their patients. The experience was smooth, comfortable, and professional.',
      ar: 'خدمة رائعة وفريق عمل ودود للغاية! تشعر حقاً باهتمامهم بالمرضى. كانت التجربة سلسة ومريحة واحترافية.',
    },
  },
  {
    id: 'review-3',
    rating: 5,
    source: {
      en: 'Patient Review · Google Maps',
      ar: 'تقييم مريض · خرائط جوجل',
    },
    quote: {
      en: 'It is the most beautiful and cleanest hospital in Riyadh, and the doctors are very humane and sincere to the patients.',
      ar: 'إنها من أجمل وأنظف العيادات في الرياض، والأطباء يتميزون بالإنسانية والإخلاص تجاه المرضى.',
    },
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'patient-first',
    index: '01',
    title: { en: 'Patient-First Approach', ar: 'المريض أولاً دائماً' },
    description: {
      en: 'Every consultation begins with attentive listening, honest guidance, and treatment paced around your comfort.',
      ar: 'تبدأ كل استشارة بالاستماع الكامل وتقديم نصيحة صادقة وخطة علاج تراعي راحتك.',
    },
  },
  {
    id: 'modern-environment',
    index: '02',
    title: { en: 'Modern Clinic Environment', ar: 'بيئة عيادة حديثة' },
    description: {
      en: 'Thoughtfully designed treatment suites and pristine clinical hygiene create calm from the moment you arrive.',
      ar: 'غرف علاج مصممة بعناية وأعلى معايير النظافة والتعقيم تمنحك الهدوء منذ لحظة وصولك.',
    },
  },
  {
    id: 'family-friendly',
    index: '03',
    title: { en: 'Family-Friendly Care', ar: 'رعاية مناسبة للعائلة' },
    description: {
      en: 'Welcoming care tailored for children, parents, and seniors under one reassuring roof in Riyadh.',
      ar: 'رعاية دافئة ومخصصة للأطفال والآباء وكبار السن تحت سقف واحد مريح في الرياض.',
    },
  },
  {
    id: 'comfortable-experience',
    index: '04',
    title: { en: 'Comfortable Patient Experience', ar: 'تجربة مريحة وهادئة' },
    description: {
      en: 'Unhurried appointments, warm hospitality, and gentle techniques help take the anxiety out of dental visits.',
      ar: 'مواعيد دون استعجال وضيافة راقية وتقنيات لطيفة تزيل القلق من زيارة طبيب الأسنان.',
    },
  },
  {
    id: 'professional-team',
    index: '05',
    title: { en: 'Professional Team', ar: 'فريق طبي محترف' },
    description: {
      en: 'Attentive dental specialists and coordinators dedicated to clear communication and respectful care.',
      ar: 'طاقم طبي وإداري متخصص يلتزم بالتواصل الواضح والاهتمام الشخصي بكل مريض.',
    },
  },
  {
    id: 'convenient-location',
    index: '06',
    title: { en: 'Convenient Location', ar: 'موقع يسهل الوصول إليه' },
    description: {
      en: 'Accessible on King Abdulaziz Road in Al Aarid, Riyadh, with evening availability open until 10:00 PM.',
      ar: 'موقع مميز على طريق الملك عبدالعزيز في حي العارض بالرياض مع توفر المواعيد المسائية حتى 10:00 مساءً.',
    },
  },
];

export const APPOINTMENT_TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM',
  '08:30 PM',
  '09:15 PM',
];
