import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Smartphone,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CountdownTimer } from '../components/CountdownTimer';
import { ThreeQuranCanvas } from '../components/ThreeQuranCanvas';

interface HomePageProps {
  onOpenDownload: () => void;
}

interface ZigZagFeature {
  step: string;
  title: string;
  description: string;
  mockupSrc: string;
  mockupAlt: string;
  mockupSide: 'left' | 'right';
}

const ZIGZAG_FEATURES: ZigZagFeature[] = [
  {
    step: '01',
    title: 'Namaz Time',
    description:
      "Stay connected to your daily prayers with hyper-accurate, GPS-calibrated prayer timings tailored to your exact location. Supports multiple global calculation methods (Hanafi, Shafi'i, ISNA, MWL), customizable Adhan audio alerts, Suhoor/Iftar countdowns, and a real-time Qibla direction finder.",
    mockupSrc: '/assets/mockup/1.png',
    mockupAlt: 'Fiqah App Namaz Time screen displaying daily prayer schedule',
    mockupSide: 'right',
  },
  {
    step: '02',
    title: 'Quran',
    description:
      'Experience the complete Holy Quran in crisp, easy-to-read Uthmani and Indo-Pak scripts. Features smooth Surah and Juz navigation, smart verse bookmarking, last-read tracking, adjustable font sizing, and distraction-free reading modes designed for daily recitation and deep reflection.',
    mockupSrc: '/assets/mockup/2.png',
    mockupAlt: 'Fiqah App Al-Quran al-Kareem Surah directory screen',
    mockupSide: 'left',
  },
  {
    step: '03',
    title: 'Hadiths',
    description:
      "Explore authentic collections of Prophetic traditions including Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, and Jami' at-Tirmidhi. Every Hadith is presented with verified chains of narration, clear grading, topical categorization, and instant keyword search for reliable study.",
    mockupSrc: '/assets/mockup/3.png',
    mockupAlt: 'Fiqah App Hadith Collections screen featuring authentic compilations',
    mockupSide: 'right',
  },
  {
    step: '04',
    title: 'Multi-language Translation Support',
    description:
      'Deepen your comprehension of scripture with synchronized, side-by-side translations in Arabic, Urdu, and English. Switch effortlessly between single-language and multi-script views, allowing readers of all backgrounds to follow the original Arabic alongside accurate, scholar-reviewed translations.',
    mockupSrc: '/assets/mockup/4.png',
    mockupAlt: 'Fiqah App multi-language Quran verse translation view',
    mockupSide: 'left',
  },
  {
    step: '05',
    title: 'Calendar',
    description:
      'Plan your spiritual and daily schedule with a dual Hijri and Gregorian Islamic calendar. Automatically highlights significant Islamic dates, Ramadan, Eid al-Fitr, Eid al-Adha, fasting days (Ayyam al-Beed), and allows you to set personal religious reminders.',
    mockupSrc: '/assets/mockup/5.png',
    mockupAlt: 'Fiqah App Islamic Hijri calendar and upcoming events view',
    mockupSide: 'right',
  },
];

type MilestoneState = 'completed' | 'ongoing' | 'upcoming';

interface ProgressMilestone {
  stage: string;
  status: string;
  state: MilestoneState;
  summary: string;
  details: string[];
}

const PROGRESS_TIMELINE: ProgressMilestone[] = [
  {
    stage: 'Research',
    status: 'Completed',
    state: 'completed',
    summary:
      'Completed scholarly review, script verification, and prayer calculation benchmarking.',
    details: [
      'Validated Uthmani and Indo-Pak Mushaf text alongside Urdu and English translation datasets.',
      "Cross-checked Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, and Jami' at-Tirmidhi reference indexing.",
      "Benchmarked astronomical prayer calculation methods across Hanafi, Shafi'i, ISNA, and MWL standards.",
    ],
  },
  {
    stage: 'Development',
    status: 'Completed',
    state: 'completed',
    summary:
      'Built core offline-first mobile architecture with responsive typography and Adhan scheduling.',
    details: [
      'Implemented 114-Surah reader with Juz navigation, smart verse bookmarks, and last-read tracking.',
      'Engineered background Adhan notification triggers, real-time Qibla finder, and dual Hijri/Gregorian calendar sync.',
      'Packaged compact local databases so Quran, Hadiths, and translations load instantaneously offline.',
    ],
  },
  {
    stage: 'Testing',
    status: 'Completed',
    state: 'completed',
    summary:
      'Finished multi-device functional, RTL rendering, and battery efficiency verification.',
    details: [
      'Tested Arabic Uthmani and Indo-Pak glyph shaping across Android and iOS screen densities.',
      'Verified alarm precision and low-power scheduling across Doze and background restrictions.',
      'Completed accessibility, font-scaling, and offline navigation regression checks.',
    ],
  },
  {
    stage: 'Pre-release',
    status: 'On-going',
    state: 'ongoing',
    summary:
      'Finalizing store assets, closed QA sign-off, and Play Store release bundle checks.',
    details: [
      'Running final release-candidate builds with Rust Innovations QA and early testers.',
      'Polishing launch metadata, localization strings, and Play Console compliance artifacts.',
      'Preparing staged rollout telemetry and crash-free stability thresholds.',
    ],
  },
  {
    stage: 'Beta Version Play Store',
    status: 'Launching on 1 December 2026',
    state: 'upcoming',
    summary:
      'Public Beta release opening on Google Play Store on 1 December 2026.',
    details: [
      'Full access to Namaz Time, Holy Quran, Hadiths, Multi-language Translations, and Hijri Calendar.',
      'Completely ad-free public beta build with offline audio and scripture packs ready.',
      'Direct community feedback channel ahead of global v1.0 expansion.',
    ],
  },
];

interface FeatureMockupVisualProps {
  src: string;
  alt: string;
  title: string;
}

const FeatureMockupVisual: React.FC<FeatureMockupVisualProps> = ({
  src,
  alt,
  title,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="mx-auto flex h-[440px] w-full max-w-[440px] flex-col items-center justify-center rounded-[8px] bg-[#F7FAF7] p-8 text-center">
        <Smartphone className="h-10 w-10 text-[#1B5E20]" />
        <p className="mt-3 text-sm font-semibold text-[#1A1A1A]">{title}</p>
        <p className="mt-1 text-xs text-[#4A554C]">App Interface Preview</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="mx-auto block w-full max-w-[460px] object-contain sm:max-w-[500px] lg:max-w-[540px]"
      />
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onOpenDownload }) => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(
    'Pre-release'
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMilestone = (stage: string) => {
    setExpandedMilestone((prev) => (prev === stage ? null : stage));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#FFFFFF]">
      {/* Hero Launch Countdown + 3D Quran Visualization */}
      <section className="mx-auto max-w-[1376px] px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Left Column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Fiqha_app_logo_9e45ea1f.jpg"
                alt="Fiqah App Logo"
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-[8px] object-cover"
              />
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-[#1B5E20]">
                <span>Fiqah App</span>
                <span aria-hidden="true">·</span>
                <span>Release Date: 1 December 2026</span>
              </div>
            </div>

            <h1
              className="mt-5 font-bold tracking-tight text-[#1A1A1A] text-balance"
              style={{
                fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)',
                lineHeight: 1.12,
              }}
            >
              Fiqah — Complete Islamic Solution App
            </h1>

            {/* Animated Countdown Timer: Days : Hours : Minutes : Seconds */}
            <div id="countdown" className="mt-6">
              <h2 className="sr-only">Release Countdown for December 1, 2026</h2>
              <CountdownTimer />
            </div>

            {/* Complete Islamic Solution Content */}
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-[#4A554C] sm:text-base">
              <p>
                Fiqah brings every pillar of daily Islamic practice into one
                calm, ad-free mobile sanctuary. Built for clarity and offline
                reliability, the app unites Namaz Time, the Holy Quran, verified
                Hadiths, multi-language translations, and an integrated Hijri
                calendar in a single complete Islamic solution.
              </p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2E7D32] hover:shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>Download Info</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Quran Visualization */}
          <section
            id="showcase"
            aria-labelledby="showcase-heading"
            className="flex flex-col items-stretch lg:col-span-6"
          >
            <h2 id="showcase-heading" className="sr-only">
              Interactive 3D Showcase
            </h2>
            <ThreeQuranCanvas
              variant="parchment"
              initialMode="mushaf"
              className="w-full"
            />
          </section>
        </div>
      </section>

      {/* Borderless Zig-Zag Features Section (Tight Cohesive Pairing + Larger Static Mockups) */}
      <section
        id="features"
        aria-labelledby="features-heading"
        className="mx-auto max-w-[1160px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold tracking-widest text-[#1B5E20] uppercase">
            Complete Islamic Solution
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] text-balance sm:text-4xl"
          >
            Features
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A554C] sm:text-base">
            Thoughtfully crafted tools for daily worship, scripture study, and
            Islamic scheduling without clutter or distractions.
          </p>
        </motion.div>

        <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-16">
          {ZIGZAG_FEATURES.map((feature) => {
            const mockupFirstDesktop = feature.mockupSide === 'left';

            return (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8"
              >
                {/* Title & Description Column */}
                <div
                  className={`order-1 lg:col-span-5 ${
                    mockupFirstDesktop ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="font-clock text-sm font-bold tracking-wider text-[#1B5E20]">
                    {feature.step}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1A1A1A] text-balance sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3.5 text-base leading-relaxed text-[#4A554C]">
                    {feature.description}
                  </p>
                </div>

                {/* Larger Static Mockup Visual Column */}
                <div
                  className={`order-2 lg:col-span-7 ${
                    mockupFirstDesktop ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <FeatureMockupVisual
                    src={feature.mockupSrc}
                    alt={feature.mockupAlt}
                    title={feature.title}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="faq-heading"
            className="text-center text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            <details className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-5">
              <summary className="cursor-pointer font-semibold text-[#1B5E20]">
                When will the Fiqah app launch?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
                Fiqah is planned to launch on 1 December 2026. Official
                download links will be shared when the app is available.
              </p>
            </details>
            <details className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-5">
              <summary className="cursor-pointer font-semibold text-[#1B5E20]">
                Which features are included in Fiqah?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
                The planned feature set includes prayer times, Qibla direction,
                Quran reading, Hadith collections, Arabic, Urdu, and English
                translations, and a Hijri calendar.
              </p>
            </details>
            <details className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-5">
              <summary className="cursor-pointer font-semibold text-[#1B5E20]">
                Is this app totally free?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
                Yes, the Fiqah App is totally free to use. You can use all features of this app without any cost. There are no in-app purchases or subscriptions.
              </p>
            </details>
          
          </div>
        </div>
      </section>

      {/* Interactive Borderless Vertical Development Progress Timeline with Animated Dotted Track */}
      <section
        id="progress"
        aria-labelledby="progress-heading"
        className="mx-auto max-w-[1376px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-xs font-semibold tracking-widest text-[#1B5E20] uppercase">
              Release Roadmap
            </p>
            <h2
              id="progress-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] text-balance sm:text-4xl"
            >
              Development Progress
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4A554C] sm:text-base">
              Click any milestone below to inspect technical progress and release
              notes ahead of our 1 December 2026 Beta launch.
            </p>
          </motion.div>

          <ol className="relative mt-12">
            {PROGRESS_TIMELINE.map((item, index) => {
              const isCompleted = item.state === 'completed';
              const isOngoing = item.state === 'ongoing';
              const isUpcoming = item.state === 'upcoming';
              const isExpanded = expandedMilestone === item.stage;
              const isLast = index === PROGRESS_TIMELINE.length - 1;
              // Segments connecting Research -> Development -> Testing -> Pre-release animate in emerald green
              const isActiveTrackSegment = !isLast && !isOngoing && !isUpcoming;

              return (
                <li
                  key={item.stage}
                  className={`relative pl-12 sm:pl-14 ${isLast ? 'pb-0' : 'pb-6'}`}
                >
                  {/* Vertical Dotted Line Connector to the Next Milestone */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-12 bottom-0 left-[16px] w-[4px] sm:top-[52px] sm:left-[18px]"
                    >
                      {/* Muted Light Grey Base Dotted Track */}
                      <div
                        className="h-full w-full"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle, #D1D5DB 1.75px, transparent 1.75px)',
                          backgroundSize: '4px 10px',
                          backgroundRepeat: 'repeat-y',
                        }}
                      />

                      {/* Animated #1B5E20 Emerald Dotted Track Filling Top -> Pre-release */}
                      {isActiveTrackSegment && (
                        <motion.div
                          initial={{ clipPath: 'inset(0 0 100% 0)' }}
                          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.25,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 h-full w-full"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, #1B5E20 1.75px, transparent 1.75px)',
                            backgroundSize: '4px 10px',
                            backgroundRepeat: 'repeat-y',
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Milestone Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-2.5 left-0 flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                      isUpcoming
                        ? 'bg-[#F3F4F6] text-[#9CA3AF]'
                        : 'bg-[#1B5E20] text-white'
                    }`}
                  >
                    {isOngoing && (
                      <motion.span
                        animate={{
                          scale: [1, 1.45, 1],
                          opacity: [0.55, 0, 0.55],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full bg-[#1B5E20]/35"
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center">
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : isOngoing ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                    </span>
                  </span>

                  {/* Interactive Borderless Accordion Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleMilestone(item.stage)}
                    aria-expanded={isExpanded}
                    className={`w-full rounded-[8px] px-4 py-3 text-left transition-colors duration-200 ${
                      isUpcoming
                        ? isExpanded
                          ? 'bg-[#F9FAFB]'
                          : 'bg-transparent hover:bg-[#F9FAFB]'
                        : isExpanded
                        ? 'bg-[#F7FAF7]'
                        : 'bg-transparent hover:bg-[#F7FAF7]/75'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <h3
                          className={`text-lg font-semibold sm:text-xl ${
                            isUpcoming ? 'text-[#9CA3AF]' : 'text-[#1B5E20]'
                          }`}
                        >
                          {item.stage}
                        </h3>
                        <span
                          className={`text-sm font-semibold ${
                            isUpcoming ? 'text-[#9CA3AF]' : 'text-[#1B5E20]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isUpcoming ? 'text-[#9CA3AF]' : 'text-[#1B5E20]'
                        } ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`pt-3 text-sm ${
                              isUpcoming ? 'text-[#9CA3AF]' : 'text-[#4A554C]'
                            }`}
                          >
                            <p
                              className={`font-medium ${
                                isUpcoming ? 'text-[#6B7280]' : 'text-[#1A1A1A]'
                              }`}
                            >
                              {item.summary}
                            </p>
                            <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed sm:text-sm">
                              {item.details.map((detail) => (
                                <li
                                  key={detail}
                                  className="flex items-start gap-2"
                                >
                                  <span
                                    aria-hidden="true"
                                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                      isUpcoming
                                        ? 'bg-[#D1D5DB]'
                                        : 'bg-[#1B5E20]'
                                    }`}
                                  />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Smooth Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#1B5E20] text-white shadow-lg transition-colors hover:bg-[#2E7D32]"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
};
