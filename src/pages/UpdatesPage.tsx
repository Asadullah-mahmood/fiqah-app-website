import React, { useState } from 'react';
import { Check, Download } from 'lucide-react';
import { APP_UPDATES } from '../data/fiqahContent';

interface UpdatesPageProps {
  onOpenDownload: () => void;
}

export const UpdatesPage: React.FC<UpdatesPageProps> = ({ onOpenDownload }) => {
  const [filter, setFilter] = useState<
    'All' | 'Design' | 'Worship Tools' | 'Quran Engine'
  >('All');

  const visibleUpdates =
    filter === 'All'
      ? APP_UPDATES
      : APP_UPDATES.filter((u) => u.category === filter);

  return (
    <main className="mx-auto max-w-[1376px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-[#1B5E20]/15 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
            Release Changelog · Launching 1 December 2026
          </p>
          <h1
            className="font-display mt-2 font-bold text-[#1A1A1A] text-balance"
            style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.35rem)', lineHeight: 1.1 }}
          >
            App Updates &amp; Milestones
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4A554C] sm:text-base">
            Track continuous improvements across our QuranHomeScreen interface,
            astronomical prayer engine, and offline Fiqh reference index.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenDownload}
          className="inline-flex items-center gap-2 self-start rounded-[8px] bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#2E7D32]"
        >
          <Download className="h-4 w-4" />
          <span>Release Schedule</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="mt-6 flex flex-wrap gap-1.5 rounded-[8px] border border-[#1B5E20]/15 bg-[#F7FAF7] p-1.5 w-fit">
        {(['All', 'Design', 'Worship Tools', 'Quran Engine'] as const).map(
          (cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-[6px] px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === cat
                  ? 'bg-[#1B5E20] text-white'
                  : 'text-[#4A554C] hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Updates List */}
      <div className="mt-8 space-y-6">
        {visibleUpdates.map((entry) => (
          <article
            key={entry.id}
            className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A554C]">
              <span className="font-semibold text-[#1B5E20]">{entry.version}</span>
              <span aria-hidden="true">·</span>
              <span>{entry.date}</span>
              <span aria-hidden="true">·</span>
              <span>{entry.category}</span>
            </div>

            <h2 className="font-display mt-2 text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              {entry.title}
            </h2>
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[#4A554C]">
              {entry.summary}
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 border-t border-[#1B5E20]/15 pt-4 md:grid-cols-3">
              {entry.highlights.map((hl, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-[8px] border border-[#1B5E20]/10 bg-[#F7FAF7] p-3 text-xs leading-relaxed text-[#1A1A1A]"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1B5E20]" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
};
