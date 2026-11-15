import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-4 mt-12 mb-6 sm:mx-6 lg:mx-8">
      <div className="mx-auto max-w-[1376px] rounded-[8px] bg-[#F7FAF7] px-6 py-5 sm:px-8">
        <nav aria-label="Footer navigation" className="mb-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#1B5E20]">
            <li>
              <a href="#features" className="hover:underline">
                Core Features
              </a>
            </li>
            <li>
              <a href="#showcase" className="hover:underline">
                3D Showcase
              </a>
            </li>
            <li>
              <a href="#countdown" className="hover:underline">
                Release Countdown
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col items-start justify-between gap-2 text-xs text-[#4A554C] sm:flex-row sm:items-center">
          <p>All rights are reserved by Fiqah {currentYear}.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href="https://rustinnovations.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1B5E20] hover:underline"
            >
              Rust Innovations
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffiqah.rustinnovations.com%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1B5E20] hover:underline"
            >
              Share on Facebook
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffiqah.rustinnovations.com%2F&text=Fiqah%20%E2%80%94%20Complete%20Islamic%20Solution%20App"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1B5E20] hover:underline"
            >
              Share on X
            </a>
            <p className="font-medium text-[#1B5E20]">
              Designed &amp; developed by Rust Innovations IT Department.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
