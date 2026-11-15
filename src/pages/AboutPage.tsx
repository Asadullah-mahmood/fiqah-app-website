import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { PageRoute } from '../types/fiqah';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenDownload: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenDownload,
}) => {
  return (
    <main className="mx-auto max-w-[1376px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
              About Us · Rust Innovations IT Department
            </p>
            <h1
              className="font-display mt-3 font-bold text-[#1A1A1A] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)', lineHeight: 1.1 }}
            >
              Crafted for Sacred Legibility and Everyday Utility
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4A554C]">
              Fiqah was founded by the Rust Innovations IT Department to solve a
              simple problem: Muslims deserve a dignified, reliable, and visually
              calm mobile application for their daily worship—free of intrusive
              advertisements and disjointed tools.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[8px] border border-[#1B5E20]/20 bg-[#F7FAF7] p-6 lg:col-span-4">
            <img
              src="/assets/aistudio/Fiqha_app_logo_9e45ea1f.jpg"
              alt="Fiqah Emblem"
              referrerPolicy="no-referrer"
              className="h-24 w-24 rounded-[8px] border border-[#1B5E20]/25 object-cover"
            />
            <p className="font-display mt-3 text-xl font-bold text-[#1B5E20]">
              Fiqah Emblem
            </p>
            <p className="mt-1 text-center text-xs text-[#4A554C]">
              Archway of Knowledge &amp; Illuminated Guidance
            </p>
          </div>
        </div>
      </section>

      {/* Design System & Engineering Principles */}
      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
            01. Complete Multi-Script Companion
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
            Fiqah pairs pure readable backgrounds with deep emerald (#1B5E20)
            structural anchors and dedicated multi-script typography across
            Arabic, Urdu, and English for effortless daily recitation.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="rounded-[8px] border border-[#1B5E20]/15 bg-[#F7FAF7] p-3">
              <span className="block font-semibold text-[#1A1A2E]">Arabic</span>
              <span className="mt-0.5 block text-[11px] text-[#4A554C]">
                Uthmani Script
              </span>
            </div>
            <div className="rounded-[8px] border border-[#1B5E20]/15 bg-[#F7FAF7] p-3">
              <span className="block font-semibold text-[#2D1B69]">Urdu</span>
              <span className="mt-0.5 block text-[11px] text-[#4A554C]">
                Translation
              </span>
            </div>
            <div className="rounded-[8px] border border-[#1B5E20]/15 bg-[#F7FAF7] p-3">
              <span className="block font-semibold text-[#1B5E20]">English</span>
              <span className="mt-0.5 block text-[11px] text-[#4A554C]">
                Commentary
              </span>
            </div>
          </div>
        </article>

        <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
            02. Rust Innovations Engineering Standard
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
            Every release from the Rust Innovations IT Department undergoes
            strict verification for offline reliability, low battery usage during
            Adhan background scheduling, and scholarly review of all Fiqh Masail
            citations ahead of our 1 December 2026 release.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2E7D32]"
            >
              <Download className="h-4 w-4" />
              <span>Release Details</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 rounded-[8px] border border-[#1B5E20] px-5 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#F7FAF7]"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};
