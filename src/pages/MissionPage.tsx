import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { ThreeQuranCanvas } from '../components/ThreeQuranCanvas';
import { PageRoute } from '../types/fiqah';

interface MissionPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenDownload: () => void;
}

const MISSION_PILLARS = [
  {
    index: '01.',
    title: 'Authentic Scholarship Without Clutter',
    body: 'Islamic apps too often compromise reverence with banner advertisements, pop-up subscriptions, and unverified texts. Fiqah commits to presenting Quranic verses, Hadith references, and Fiqh Masail in an environment of complete serenity.',
  },
  {
    index: '02.',
    title: 'Multi-Script Clarity Across Generations',
    body: 'From elders reading classical Urdu commentary to youth studying English translations alongside Arabic Tajweed text, Fiqah’s structured typography makes parallel study effortless.',
  },
  {
    index: '03.',
    title: 'Privacy-First, Offline-Native Engineering',
    body: 'Your location for Salah timings and Qibla direction never leaves your device. Every Surah, Dua, and jurisprudence volume is structured for instant offline access—even inside mosques or while traveling.',
  },
];

export const MissionPage: React.FC<MissionPageProps> = ({
  onNavigate,
  onOpenDownload,
}) => {
  return (
    <main className="mx-auto max-w-[1376px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
            Our Mission · Fiqah Sanctuary
          </p>
          <h1
            className="font-display mt-3 font-bold text-[#1A1A1A] text-balance"
            style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)', lineHeight: 1.1 }}
          >
            Making Authentic Islamic Knowledge Accessible to Every Home
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4A554C]">
            Our mission is to replace fragmented, ad-heavy religious utilities
            with one cohesive digital companion—honoring classical Islamic
            craftsmanship through modern software engineering.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
            >
              <Download className="h-4 w-4" />
              <span>Download App</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 rounded-[8px] border border-[#1B5E20] bg-[#FFFFFF] px-5 py-3 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#F7FAF7]"
            >
              <span>About Rust Innovations</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <ThreeQuranCanvas
            variant="parchment"
            initialMode="geometry"
            compact
          />
        </div>
      </div>

      {/* Numbered Editorial Pillars */}
      <section className="mt-14 border-t border-[#1B5E20]/15 pt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MISSION_PILLARS.map((pillar) => (
            <article
              key={pillar.index}
              className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6"
            >
              <span className="font-display text-2xl font-bold text-[#1B5E20]">
                {pillar.index}
              </span>
              <h2 className="font-display mt-2 text-2xl font-bold text-[#1A1A1A]">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
