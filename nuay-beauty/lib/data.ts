export const BOOKING_URL = 'https://bookit.minibookit.com/v2/en/nuaybeauty';
export const WHATSAPP_NUMBER = '60123456789'; // placeholder
export const INSTAGRAM_URL = 'https://www.instagram.com/nuaybeauty_';
export const FACEBOOK_URL = 'https://www.facebook.com/nuaybeauty/';
export const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.5!2d101.5!3d3.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAlMTUnNDAuMiJOIDEwMcKwMzAnMDAuMCJF!5e0!3m2!1sen!2smy!4v1234567890';

export const content = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      gallery: 'Gallery',
      artists: 'Artists',
      about: 'About',
      contact: 'Contact',
      bookNow: 'Book Now',
    },
    hero: {
      tagline: 'Where Beauty Meets Sincerity',
      headline: 'Feel Beautiful,\nStay Pure.',
      sub: 'Specialist lash, brow & wellness treatments crafted for the modern Muslimah — every product wudhu-friendly.',
      cta: 'Reserve Your Appointment',
      ctaSub: 'View Our Services',
    },
    services: {
      title: 'Our Services',
      sub: 'Each treatment is performed with precision, using only wudhu-friendly products.',
    },
    artists: {
      title: 'Meet Your Artists',
      sub: 'Skilled specialists dedicated to bringing out your natural beauty.',
    },
    gallery: {
      title: 'Our Work',
      sub: 'Real results from real clients at Nuay Beauty Studio.',
    },
    about: {
      title: 'Our Story',
      sub: 'Nuay Beauty was born from a simple belief — that every woman deserves to feel confident and beautiful without compromising her faith.',
    },
    testimonials: {
      title: 'What Our Clients Say',
    },
    faq: {
      title: 'Common Questions',
    },
    footer: {
      tagline: 'Premium beauty, wudhu-friendly.',
      address: 'Shah Alam, Selangor',
      hours: 'Mon – Sat: 10am – 7pm',
    },
  },
  bm: {
    nav: {
      home: 'Utama',
      services: 'Servis',
      gallery: 'Galeri',
      artists: 'Artist',
      about: 'Tentang Kami',
      contact: 'Hubungi',
      bookNow: 'Tempah Sekarang',
    },
    hero: {
      tagline: 'Di Mana Kecantikan Bertemu Keikhlasan',
      headline: 'Rasa Cantik,\nKekal Suci.',
      sub: 'Rawatan lash, brow & wellness yang direka untuk Muslimah moden — setiap produk mesra wudhu.',
      cta: 'Tempah Temujanji',
      ctaSub: 'Lihat Servis Kami',
    },
    services: {
      title: 'Servis Kami',
      sub: 'Setiap rawatan dilakukan dengan teliti, menggunakan produk yang mesra wudhu.',
    },
    artists: {
      title: 'Kenali Artist Kami',
      sub: 'Pakar berkemahiran yang berdedikasi untuk menonjolkan kecantikan semula jadi anda.',
    },
    gallery: {
      title: 'Hasil Kerja Kami',
      sub: 'Keputusan sebenar dari pelanggan sebenar di Nuay Beauty Studio.',
    },
    about: {
      title: 'Kisah Kami',
      sub: 'Nuay Beauty lahir dari kepercayaan yang mudah — setiap wanita berhak berasa yakin dan cantik tanpa mengorbankan iman.',
    },
    testimonials: {
      title: 'Kata-Kata Pelanggan Kami',
    },
    faq: {
      title: 'Soalan Lazim',
    },
    footer: {
      tagline: 'Kecantikan premium, mesra wudhu.',
      address: 'Shah Alam, Selangor',
      hours: 'Isnin – Sabtu: 10pg – 7mlm',
    },
  },
};

export type ServiceCategory = 'lash' | 'brow' | 'lip' | 'facial' | 'hair';

export const services = [
  {
    id: 'korean-lash-lift',
    category: 'lash' as ServiceCategory,
    nameEn: 'Korean Lash Lift + Tint',
    nameBm: 'Korean Lash Lift + Tint',
    descEn: 'Lifted, curled lashes with a natural tint for wide-awake eyes. Lasts 6–8 weeks.',
    descBm: 'Bulu mata diangkat dan dilentur semula jadi. Tahan 6–8 minggu.',
    price: 100,
    duration: '75 min',
    badge: 'Most Popular',
  },
  {
    id: 'brow-lamination',
    category: 'brow' as ServiceCategory,
    nameEn: 'Brow Lamination',
    nameBm: 'Brow Lamination',
    descEn: 'Fluffy, defined brows set in place for up to 6 weeks.',
    descBm: 'Kening lebat dan teratur tahan sehingga 6 minggu.',
    price: 100,
    duration: '60 min',
    badge: null,
  },
  {
    id: 'brow-tint',
    category: 'brow' as ServiceCategory,
    nameEn: 'Brow Tint',
    nameBm: 'Brow Tint',
    descEn: 'Colour and define your brows for a polished, finished look.',
    descBm: 'Warnai dan perhalusi bentuk kening anda.',
    price: 100,
    duration: '30 min',
    badge: null,
  },
  {
    id: 'brow-wax',
    category: 'brow' as ServiceCategory,
    nameEn: 'Brow Wax',
    nameBm: 'Brow Wax',
    descEn: 'Clean, precise brow shaping using professional wax.',
    descBm: 'Bentuk kening yang kemas dan tepat menggunakan lilin profesional.',
    price: 100,
    duration: '30 min',
    badge: null,
  },
  {
    id: 'brow-bleach',
    category: 'brow' as ServiceCategory,
    nameEn: 'Brow Bleach',
    nameBm: 'Brow Bleach',
    descEn: 'Lighten brow hair for a soft, editorial look.',
    descBm: 'Cerahkan bulu kening untuk tampilan editorial yang lembut.',
    price: 100,
    duration: '45 min',
    badge: null,
  },
  {
    id: 'roma-pink-lips',
    category: 'lip' as ServiceCategory,
    nameEn: 'Roma Pink Lips',
    nameBm: 'Roma Pink Lips',
    descEn: 'A softening lip treatment that restores natural rosy colour and smoothness.',
    descBm: 'Rawatan bibir yang memulihkan warna merah jambu semula jadi dan kelembutan.',
    price: 100,
    duration: '45 min',
    badge: 'New',
  },
  {
    id: 'totok-wajah',
    category: 'facial' as ServiceCategory,
    nameEn: 'Totok Wajah',
    nameBm: 'Totok Wajah',
    descEn: 'Traditional facial acupressure massage to lift, tone, and rejuvenate the face.',
    descBm: 'Urutan akupresur wajah tradisional untuk mengangkat, mengencangkan dan meremajakan muka.',
    price: 100,
    duration: '60 min',
    badge: null,
  },
  {
    id: 'laser-diode',
    category: 'hair' as ServiceCategory,
    nameEn: 'Laser Diode Hair Removal',
    nameBm: 'Laser Diode Buang Bulu',
    descEn: 'Effective, long-lasting hair removal with advanced diode laser technology.',
    descBm: 'Penyingkiran bulu yang berkesan dan tahan lama dengan teknologi laser diode terkini.',
    price: 100,
    duration: '30–60 min',
    badge: null,
  },
];

export const artists = [
  {
    id: 'farah',
    name: 'Farah',
    roleEn: 'Lash & Brow Specialist',
    roleBm: 'Pakar Lash & Brow',
    bioEn: 'Farah brings precision and artistry to every lash lift and brow treatment. Her gentle technique and keen eye for detail have made her a client favourite.',
    bioBm: 'Farah membawa ketepatan dan kesenian pada setiap rawatan lash dan brow. Teknik lembutnya dan mata tajam untuk detail menjadikannya kegemaran pelanggan.',
    services: ['Korean Lash Lift + Tint', 'Brow Lamination', 'Brow Tint', 'Brow Wax', 'Brow Bleach'],
    image: '/images/nuay-artist.png',
    instagram: null,
    gallery: [
      '/images/nuay-studio-1.avif',
      '/images/nuay-studio-2.avif',
      '/images/nuay-studio-3.avif',
      '/images/nuay-hero.avif',
    ],
  },
  {
    id: 'zafirah',
    name: 'Zafirah',
    roleEn: 'Lash & Brow Specialist',
    roleBm: 'Pakar Lash & Brow',
    bioEn: 'Zafirah is known for her calm approach and consistent results. She specialises in creating natural-looking lash lifts that complement each client\'s unique features.',
    bioBm: 'Zafirah dikenali dengan pendekatan tenang dan keputusan yang konsisten. Beliau pakar dalam mencipta lash lift semula jadi yang melengkapi ciri unik setiap pelanggan.',
    services: ['Korean Lash Lift + Tint', 'Brow Lamination', 'Brow Tint', 'Brow Wax', 'Brow Bleach'],
    image: '/images/nuay-artist.png',
    instagram: null,
    gallery: [
      '/images/nuay-studio-4.avif',
      '/images/nuay-studio-1.avif',
      '/images/nuay-studio-3.avif',
      '/images/nuay-hero.avif',
    ],
  },
  {
    id: 'thila',
    name: 'Thila',
    roleEn: 'Facial & Wellness Specialist',
    roleBm: 'Pakar Rawatan Wajah & Wellness',
    bioEn: 'Thila\'s expertise in traditional facial techniques and brow artistry creates a holistic beauty experience. Her totok wajah treatments are deeply relaxing and visibly effective.',
    bioBm: 'Kepakaran Thila dalam teknik rawatan wajah tradisional dan seni brow mencipta pengalaman kecantikan yang holistik. Rawatan totok wajahnya sangat menenangkan dan berkesan.',
    services: ['Totok Wajah', 'Brow Tint', 'Brow Wax', 'Brow Bleach'],
    image: '/images/nuay-artist.png',
    instagram: null,
    gallery: [
      '/images/nuay-studio-2.avif',
      '/images/nuay-studio-4.avif',
      '/images/nuay-hero.avif',
      '/images/nuay-studio-1.avif',
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Nur Aisyah',
    location: 'Shah Alam',
    text: 'Best lash lift I\'ve ever had! Farah was so gentle and the results lasted almost 2 months. Love that the products are wudhu-friendly.',
    textBm: 'Lash lift terbaik yang pernah saya buat! Farah sangat lembut dan hasilnya tahan hampir 2 bulan. Suka sebab produk mesra wudhu.',
    rating: 5,
    service: 'Korean Lash Lift + Tint',
    image: 'https://picsum.photos/seed/review-1/100/100',
  },
  {
    id: 2,
    name: 'Syafiqah Hana',
    location: 'Petaling Jaya',
    text: 'The studio is so cozy and private. Zafirah did my brow lamination and it came out perfectly fluffy. Will definitely be coming back.',
    textBm: 'Studio sangat selesa dan peribadi. Zafirah buat brow lamination saya dan ia keluar dengan sangat cantik. Pasti akan datang lagi.',
    rating: 5,
    service: 'Brow Lamination',
    image: 'https://picsum.photos/seed/review-2/100/100',
  },
  {
    id: 3,
    name: 'Rabiatul Adawiyah',
    location: 'Klang',
    text: 'Thila\'s totok wajah was an incredible experience. My face felt so lifted after. The herbal drink they served was a lovely touch too.',
    textBm: 'Totok wajah Thila adalah pengalaman yang luar biasa. Muka saya terasa terangkat selepasnya. Minuman herba yang dihidang juga sangat menyentuh hati.',
    rating: 5,
    service: 'Totok Wajah',
    image: 'https://picsum.photos/seed/review-3/100/100',
  },
  {
    id: 4,
    name: 'Liyana Sofea',
    location: 'Shah Alam',
    text: 'Finally found a place I can trust for laser hair removal. The staff are professional and the environment is so clean and comfortable.',
    textBm: 'Akhirnya jumpa tempat yang boleh dipercayai untuk laser hair removal. Staf profesional dan persekitaran sangat bersih dan selesa.',
    rating: 5,
    service: 'Laser Diode Hair Removal',
    image: 'https://picsum.photos/seed/review-4/100/100',
  },
];

export const faqs = [
  {
    questionEn: 'Are all your products wudhu-friendly?',
    questionBm: 'Adakah semua produk anda mesra wudhu?',
    answerEn: 'Yes. Every product used at Nuay Beauty is water-permeable, meaning they will not invalidate your wudhu.',
    answerBm: 'Ya. Setiap produk yang digunakan di Nuay Beauty boleh ditembusi air, bermakna ia tidak akan membatalkan wudhu anda.',
  },
  {
    questionEn: 'How do I book an appointment?',
    questionBm: 'Bagaimana saya boleh membuat tempahan?',
    answerEn: 'You can book directly through our online booking system at the link provided. Select your service, preferred artist, and available time slot.',
    answerBm: 'Anda boleh menempah terus melalui sistem tempahan dalam talian kami di pautan yang disediakan. Pilih servis, artist pilihan, dan slot masa yang tersedia.',
  },
  {
    questionEn: 'How long do lash lift results last?',
    questionBm: 'Berapa lama keputusan lash lift bertahan?',
    answerEn: 'Korean Lash Lift results typically last 6–8 weeks, depending on your natural lash growth cycle and aftercare.',
    answerBm: 'Keputusan Korean Lash Lift biasanya bertahan 6–8 minggu, bergantung pada kitaran pertumbuhan bulu mata semula jadi dan penjagaan selepas rawatan.',
  },
  {
    questionEn: 'Is there parking available?',
    questionBm: 'Adakah tempat letak kereta tersedia?',
    answerEn: 'Yes, parking is available at the studio location. Please contact us for specific parking directions.',
    answerBm: 'Ya, tempat letak kereta tersedia di lokasi studio. Sila hubungi kami untuk arahan parkir yang spesifik.',
  },
  {
    questionEn: 'Can I bring my children?',
    questionBm: 'Bolehkah saya membawa anak-anak?',
    answerEn: 'We recommend coming alone to enjoy the full relaxation of your treatment. Our studio is a calm, private space.',
    answerBm: 'Kami mengesyorkan anda datang bersendirian untuk menikmati ketenangan penuh rawatan anda. Studio kami adalah ruang yang tenang dan peribadi.',
  },
];
