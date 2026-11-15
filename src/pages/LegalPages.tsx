import React from 'react';
import { PageRoute } from '../types/fiqah';

interface LegalPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <main className="mx-auto max-w-[960px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
          Legal &amp; Governance · Effective November 2026
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
          Fiqah is designed and maintained by the Rust Innovations IT Department
          with a strict privacy-first covenant. We believe personal worship,
          recitation bookmarks, and location data belong exclusively to you.
        </p>

        <div className="mt-8 space-y-6 divide-y divide-[#1B5E20]/15 text-sm leading-relaxed text-[#4A554C]">
          <section className="pt-4 first:pt-0">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              1. Zero Advertising &amp; Telemetry SDKs
            </h2>
            <p className="mt-2">
              The Fiqah mobile application contains zero third-party advertising
              networks, behavioral profiling SDKs, or cross-app tracking
              identifiers. We do not sell, rent, or monetize user activity.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              2. On-Device Location for Salah &amp; Qibla
            </h2>
            <p className="mt-2">
              When you grant location permission, coordinates are processed
              exclusively on your device to calculate accurate local prayer
              timings and true-north Qibla azimuth bearings. Coordinates are
              never transmitted to external marketing servers.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              3. Local Bookmarks &amp; Preferences
            </h2>
            <p className="mt-2">
              Your Surah bookmarks, last-read Ayah markers, Tasbeeh counts, and
              script preferences (Arabic, Urdu, English) are stored locally in
              encrypted app storage.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              4. Contact &amp; Inquiries
            </h2>
            <p className="mt-2">
              If you contact us via our web form or email, your message is used
              solely to respond to your technical or scholarly inquiry.{' '}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="font-semibold text-[#1B5E20] underline underline-offset-2"
              >
                Contact Support
              </button>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <main className="mx-auto max-w-[960px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
          Legal &amp; Governance · Effective November 2026
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Terms &amp; Services
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
          By accessing the Fiqah website or installing the Fiqah mobile
          application, you agree to the following Terms &amp; Conditions
          established by Fiqah and the Rust Innovations IT Department.
        </p>

        <div className="mt-8 space-y-6 divide-y divide-[#1B5E20]/15 text-sm leading-relaxed text-[#4A554C]">
          <section className="pt-4 first:pt-0">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              1. Educational &amp; Worship Purpose
            </h2>
            <p className="mt-2">
              Fiqah provides Quranic scripts, verified translations, Salah
              schedules, Qibla calibration, and foundational Fiqh references for
              personal worship and study. For complex personal legal rulings
              (Fatwa), users are encouraged to consult qualified local scholars.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              2. Intellectual Property &amp; Brand Marks
            </h2>
            <p className="mt-2">
              The Fiqah name, emblem, application interface, 3D visual assets,
              and original software architecture are protected works of Fiqah
              and the Rust Innovations IT Department. Classical sacred texts
              remain the shared heritage of the Ummah.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              3. Astronomical &amp; Sensor Accuracy
            </h2>
            <p className="mt-2">
              Qibla compass accuracy depends on device magnetometer calibration.
              Users should periodically verify compass alignment away from
              magnetic interference.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              4. Questions Regarding Terms
            </h2>
            <p className="mt-2">
              Questions regarding these Terms &amp; Services may be directed to
              our team via the{' '}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="font-semibold text-[#1B5E20] underline underline-offset-2"
              >
                Contact Page
              </button>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};
