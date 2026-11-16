import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage } from './pages/LegalPages';

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const isPrivacyPage =
    window.location.pathname === '/privacy' ||
    window.location.pathname === '/privacy/';

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1A1A1A]">
        <div className="flex-1">
          {isPrivacyPage ? (
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
