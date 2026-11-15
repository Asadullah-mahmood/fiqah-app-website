import {
  AppUpdateEntry,
  CityPrayerSchedule,
  FiqhMasalah,
  QuranVerseSample,
} from '../types/fiqah';

export const QURAN_SAMPLES: QuranVerseSample[] = [
  {
    id: 1,
    surahName: 'Al-Fatihah',
    surahArabic: 'سُورَةُ الْفَاتِحَةِ',
    ayahNumber: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    urdu: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے',
    english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    revelationPlace: 'Makki',
  },
  {
    id: 2,
    surahName: 'Al-Fatihah',
    surahArabic: 'سُورَةُ الْفَاتِحَةِ',
    ayahNumber: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    urdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے',
    english: 'All praise is due to Allah, Lord of the worlds.',
    revelationPlace: 'Makki',
  },
  {
    id: 3,
    surahName: 'Al-Fatihah',
    surahArabic: 'سُورَةُ الْفَاتِحَةِ',
    ayahNumber: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    urdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں',
    english: 'It is You we worship and You we ask for help.',
    revelationPlace: 'Makki',
  },
  {
    id: 4,
    surahName: 'Al-Baqarah',
    surahArabic: 'سُورَةُ الْبَقَرَةِ',
    ayahNumber: 286,
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    urdu: 'اللہ کسی جان پر اس کی طاقت سے بڑھ کر بوجھ نہیں ڈالتا',
    english: 'Allah does not burden a soul beyond that it can bear.',
    revelationPlace: 'Madani',
  },
];

export const CITY_PRAYER_SCHEDULES: CityPrayerSchedule[] = [
  {
    city: 'Makkah',
    country: 'Saudi Arabia',
    qiblaBearing: '000° Center',
    hijriDate: '3 Jumada al-Thani 1448',
    prayers: [
      { name: 'Fajr', arabicName: 'الفجر', time: '05:12' },
      { name: 'Dhuhr', arabicName: 'الظهر', time: '12:14' },
      { name: 'Asr', arabicName: 'العصر', time: '15:31' },
      { name: 'Maghrib', arabicName: 'المغرب', time: '17:56' },
      { name: 'Isha', arabicName: 'العشاء', time: '19:26' },
    ],
  },
  {
    city: 'Lahore',
    country: 'Pakistan',
    qiblaBearing: '260° WSW',
    hijriDate: '3 Jumada al-Thani 1448',
    prayers: [
      { name: 'Fajr', arabicName: 'الفجر', time: '05:01' },
      { name: 'Dhuhr', arabicName: 'الظهر', time: '11:54' },
      { name: 'Asr', arabicName: 'العصر', time: '14:52' },
      { name: 'Maghrib', arabicName: 'المغرب', time: '17:13' },
      { name: 'Isha', arabicName: 'العشاء', time: '18:37' },
    ],
  },
  {
    city: 'London',
    country: 'United Kingdom',
    qiblaBearing: '119° ESE',
    hijriDate: '3 Jumada al-Thani 1448',
    prayers: [
      { name: 'Fajr', arabicName: 'الفجر', time: '05:34' },
      { name: 'Dhuhr', arabicName: 'الظهر', time: '11:48' },
      { name: 'Asr', arabicName: 'العصر', time: '14:04' },
      { name: 'Maghrib', arabicName: 'المغرب', time: '16:18' },
      { name: 'Isha', arabicName: 'العشاء', time: '17:58' },
    ],
  },
  {
    city: 'Istanbul',
    country: 'Turkey',
    qiblaBearing: '151° SSE',
    hijriDate: '3 Jumada al-Thani 1448',
    prayers: [
      { name: 'Fajr', arabicName: 'الفجر', time: '06:11' },
      { name: 'Dhuhr', arabicName: 'الظهر', time: '12:51' },
      { name: 'Asr', arabicName: 'العصر', time: '15:36' },
      { name: 'Maghrib', arabicName: 'المغرب', time: '17:59' },
      { name: 'Isha', arabicName: 'العشاء', time: '19:21' },
    ],
  },
];

export const FIQH_MASAIL: FiqhMasalah[] = [
  {
    id: 'm1',
    category: 'Purification',
    title: 'Wiping Over Leather Socks (Masah alal Khuffayn)',
    summary:
      'Permissible for 24 hours for a resident and 72 hours for a traveler, provided the socks were put on in a state of complete Wudu.',
    sourceReference: 'Al-Hidayah · Book of Purification',
  },
  {
    id: 'm2',
    category: 'Prayer',
    title: 'Shortening Prayers While Travelling (Qasr)',
    summary:
      'Four-rakat Fard prayers (Dhuhr, Asr, Isha) are shortened to two rakats upon crossing city boundaries for a journey exceeding 77.2 km.',
    sourceReference: 'Radd al-Muhtar · Chapter on Traveler Prayer',
  },
  {
    id: 'm3',
    category: 'Zakat',
    title: 'Annual Nisab Threshold on Savings & Gold',
    summary:
      'Zakat of 2.5% becomes obligatory once net zakatable wealth meets the silver or gold Nisab threshold and completes one lunar year (Hawl).',
    sourceReference: 'Fiqh al-Zakah · Classical Consensus',
  },
  {
    id: 'm4',
    category: 'Fasting',
    title: 'Unintentional Eating During a Fast',
    summary:
      'Eating or drinking out of genuine forgetfulness does not invalidate the fast; one should stop immediately upon remembering and complete the day.',
    sourceReference: 'Sahih al-Bukhari 1933 · Sahih Muslim 1155',
  },
];

export const APP_UPDATES: AppUpdateEntry[] = [
  {
    id: 'u1',
    version: 'Version 3.4',
    date: 'November 2026',
    category: 'Design',
    title: 'Redesigned QuranHomeScreen with Warm Parchment Hierarchy',
    summary:
      'Introduced subtle layered surface containers, refined Arabic-Urdu-English typographic spacing, and emerald verse medallions for effortless long-session reading.',
    highlights: [
      'Layered surface containers (#F1EEE6 and #EBE8E0) reduce visual glare during Fajr and night recitation.',
      'Dedicated semantic script colors (#1A1A2E Arabic, #2D1B69 Urdu, #1A3A1A English) improve cross-line scanning.',
      'Instant Surah & Juz bookmarking with zero network latency.',
    ],
  },
  {
    id: 'u2',
    version: 'Version 3.3',
    date: 'September 2026',
    category: 'Worship Tools',
    title: 'True-North Sensor Qibla Compass & Astronomical Prayer Engine',
    summary:
      'Rebuilt the Qibla bearing solver with magnetic declination compensation and offline support for Hanafi, Shafi’i, and Umm al-Qura calculation conventions.',
    highlights: [
      'Sub-degree Qibla alignment calibrated directly on-device without transmitting GPS coordinates.',
      'Custom Adhan reminder profiles per Salah with silent Masjid-aware scheduling.',
      'Hijri & Gregorian dual calendar synchronization.',
    ],
  },
  {
    id: 'u3',
    version: 'Version 3.2',
    date: 'July 2026',
    category: 'Quran Engine',
    title: 'Offline Multi-Qari Audio & Verified Fiqh Masail Index',
    summary:
      'Added gapless ayah-by-ayah audio caching alongside a structured library of everyday jurisprudence rulings curated with scholar citations.',
    highlights: [
      'Download individual Surahs or full Juz audio packs for airplane and travel use.',
      'Structured Masail explorer covering Purification, Prayer, Zakat, and Fasting.',
      'Zero advertisements, zero telemetry SDKs, and full Dark/Parchment comfort.',
    ],
  },
];
