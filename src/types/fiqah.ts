export type PageRoute =
  | 'home'
  | 'mission'
  | 'about'
  | 'contact'
  | 'updates'
  | 'privacy'
  | 'terms';

export type SceneMode = 'mushaf' | 'astrolabe' | 'geometry';
export type CameraPreset = 'perspective' | 'front' | 'top';

export interface QuranVerseSample {
  id: number;
  surahName: string;
  surahArabic: string;
  ayahNumber: number;
  arabic: string;
  urdu: string;
  english: string;
  revelationPlace: string;
}

export interface CityPrayerSchedule {
  city: string;
  country: string;
  qiblaBearing: string;
  hijriDate: string;
  prayers: {
    name: string;
    time: string;
    arabicName: string;
  }[];
}

export interface FiqhMasalah {
  id: string;
  category: 'Purification' | 'Prayer' | 'Zakat' | 'Fasting';
  title: string;
  summary: string;
  sourceReference: string;
}

export interface AppUpdateEntry {
  id: string;
  version: string;
  date: string;
  category: 'Quran Engine' | 'Worship Tools' | 'Design';
  title: string;
  summary: string;
  highlights: string[];
}
