import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import {
  DeleteAccountPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/LegalPages';

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const pathname =
    typeof window === 'undefined' ? '/' : window.location.pathname;
  const isPrivacyPage =
    pathname === '/privacy' ||
    pathname === '/privacy/';
  const isDeleteAccountPage =
    pathname === '/delete-account' ||
    pathname === '/delete-account/';
  const isTermsPage =
    pathname === '/terms' ||
    pathname === '/terms/';
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1A1A1A]">
        <div className="flex-1">
          {isDeleteAccountPage ? (
            <DeleteAccountPage />
          ) : isTermsPage ? (
            <TermsPage />
          ) : isPrivacyPage ? (
            <PrivacyPolicyPage />
          ) : (
            <HomePage onOpenDownload={() => setDownloadOpen(true)} />
          )}
        </div>

        <Footer />

        <DownloadModal
          open={downloadOpen}
          onClose={() => setDownloadOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
