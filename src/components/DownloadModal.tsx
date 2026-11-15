import React, { useState } from 'react';
import { Calendar, Check, Download, Smartphone, X } from 'lucide-react';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ open, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>('android');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!open) return null;

  const triggerInstallNotice = (label: string) => {
    setDownloadNotice(
      `${label} pre-registration noted. Official public release begins 1 December 2026.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[8px] bg-[#FFFFFF] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Fiqha_app_logo_9e45ea1f.jpg"
              alt="Fiqah App Icon"
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-[8px] object-cover"
            />
            <div>
              <h2
                id="download-modal-title"
                className="font-sans text-2xl font-bold text-[#1A1A1A]"
              >
                Fiqah App Release
              </h2>
              <p className="flex items-center gap-1.5 text-xs font-medium text-[#1B5E20]">
                <Calendar className="h-3.5 w-3.5" />
                <span>Launching 1 December 2026 · Ad-Free &amp; Offline-First</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close download modal"
            className="rounded-[8px] p-1.5 text-[#4A554C] transition-colors hover:bg-[#F7FAF7] hover:text-[#1A1A1A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Platform Switcher */}
        <div className="mt-4 flex gap-2 rounded-[8px] bg-[#F7FAF7] p-1">
          <button
            type="button"
            onClick={() => {
              setSelectedPlatform('android');
              setDownloadNotice(null);
            }}
            className={`flex-1 rounded-[6px] py-2 text-xs font-semibold transition-colors ${
              selectedPlatform === 'android'
                ? 'bg-[#1B5E20] text-white'
                : 'text-[#4A554C] hover:text-[#1A1A1A]'
            }`}
          >
            Android (Google Play / APK)
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedPlatform('ios');
              setDownloadNotice(null);
            }}
            className={`flex-1 rounded-[6px] py-2 text-xs font-semibold transition-colors ${
              selectedPlatform === 'ios'
                ? 'bg-[#1B5E20] text-white'
                : 'text-[#4A554C] hover:text-[#1A1A1A]'
            }`}
          >
            iOS (App Store)
          </button>
        </div>

        {/* Platform Details + Clean Geometric QR */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-center">
          <div className="sm:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]">
              <Smartphone className="h-4 w-4 text-[#1B5E20]" />
              <span>
                {selectedPlatform === 'android'
                  ? 'Android 8.0+ · Universal ARM64'
                  : 'iOS 15.0+ · iPhone & iPad'}
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#4A554C]">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#1B5E20]" />
                <span>Full 114 Surahs in Arabic, Urdu &amp; English</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#1B5E20]" />
                <span>Sensor-calibrated Qibla &amp; Adhan schedules</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#1B5E20]" />
                <span>Verified Fiqh Masail, Duas &amp; Tasbeeh</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-2">
              {selectedPlatform === 'android' ? (
                <>
                  <button
                    type="button"
                    onClick={() => triggerInstallNotice('Google Play Store')}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2E7D32]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Google Play</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerInstallNotice('Signed APK Release')}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-[#F7FAF7] px-4 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#ECF4EC]"
                  >
                    <span>Direct APK</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => triggerInstallNotice('Apple App Store')}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2E7D32]"
                >
                  <Download className="h-4 w-4" />
                  <span>App Store Release</span>
                </button>
              )}
            </div>
          </div>

          <div className="sm:col-span-5 flex flex-col items-center rounded-[8px] bg-[#F7FAF7] p-4">
            <svg
              viewBox="0 0 21 21"
              className="h-28 w-28 text-[#1B5E20]"
              aria-label="Fiqah App QR code"
            >
              <rect width="21" height="21" fill="#FFFFFF" />
              <path
                fill="currentColor"
                d="M0 0h7v7H0V0zm1 1v5h5V1H1zm1 1h3v3H2V2zm12-2h7v7h-7V0zm1 1v5h5V1h-5zm1 1h3v3h-3V2zM0 14h7v7H0v-7zm1 1v5h5v-5H1zm1 1h3v3H2v-3z"
              />
              <path
                fill="currentColor"
                d="M8 1h2v1H8V1zm3 0h1v2h-1V1zm-2 2h2v1H9V3zm4 1h1v2h-1V4zM8 5h2v2H8V5zm3 2h2v1h-2V7zM1 8h2v2H1V8zm4 0h3v1H5V8zm4 1h2v2H9V9zm4-1h2v2h-2V8zm4 0h3v1h-3V8zm-6 3h2v2h-2v-2zm4 0h2v1h-2v-1zm3 1h2v2h-2v-2zM8 12h1v3H8v-3zm2 2h3v1h-3v-1zm4 1h2v2h-2v-2zm3 0h3v1h-3v-1zM9 16h2v2H9v-2zm4 1h2v2h-2v-2zm4 0h3v3h-3v-3zm-6 2h2v2h-2v-2z"
              />
            </svg>
            <span className="mt-2 text-[11px] font-medium text-[#4A554C]">
              Available 1 Dec 2026
            </span>
          </div>
        </div>

        {downloadNotice && (
          <div className="mt-4 rounded-[8px] bg-[#F7FAF7] px-4 py-3 text-xs font-medium text-[#1B5E20]">
            {downloadNotice}
          </div>
        )}
      </div>
    </div>
  );
};
