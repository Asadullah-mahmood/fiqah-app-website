import React, { useState } from 'react';
import { ChevronDown, Download, Menu, X } from 'lucide-react';
import { PageRoute } from '../types/fiqah';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenDownload: () => void;
}

const NAV_ITEMS: { label: string; page: PageRoute }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Our Mission', page: 'mission' },
  { label: 'About Us', page: 'about' },
  { label: 'Updates', page: 'updates' },
  { label: 'Contact', page: 'contact' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenDownload,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileOpen(false);
    setExploreOpen(false);
  };

  return (
    <header className="sticky top-3 z-40 mx-4 sm:mx-6 lg:mx-8">
      <div className="mx-auto max-w-[1376px] rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] px-4 py-2.5 shadow-xs sm:px-6">
        <div className="flex items-center justify-between gap-4 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Zone: Navigation Links (Desktop) / Menu Toggle (Mobile) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#1B5E20]/20 text-[#1B5E20] transition-colors hover:bg-[#F7FAF7] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-5 lg:flex"
            >
              {NAV_ITEMS.map((item) => {
                const active = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => handleNav(item.page)}
                    className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'text-[#1B5E20] font-semibold'
                        : 'text-[#4A554C] hover:text-[#1B5E20]'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#1B5E20]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center Zone: Centred Logo */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="inline-flex items-center gap-2.5 rounded-[8px] px-2 py-1 text-left transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
            >
              <img
                src="/assets/aistudio/Fiqha_app_logo_9e45ea1f.jpg"
                alt="Fiqah App Logo"
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-[8px] border border-[#1B5E20]/25 object-cover"
              />
              <span className="font-display text-2xl font-bold tracking-tight text-[#1B5E20]">
                Fiqah
              </span>
            </button>
          </div>

          {/* Right Zone: Explore Us + Download App */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setExploreOpen((prev) => !prev)}
                aria-expanded={exploreOpen}
                className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-sm font-medium text-[#1B5E20] whitespace-nowrap shrink-0 transition-colors hover:bg-[#F7FAF7]"
              >
                <span>Explore Us</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    exploreOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {exploreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-52 rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-1.5 shadow-lg"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNav('mission')}
                    className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-sm text-[#1A1A1A] hover:bg-[#F7FAF7] hover:text-[#1B5E20]"
                  >
                    <span>Our Mission</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNav('about')}
                    className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-sm text-[#1A1A1A] hover:bg-[#F7FAF7] hover:text-[#1B5E20]"
                  >
                    <span>About Us</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNav('updates')}
                    className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-sm text-[#1A1A1A] hover:bg-[#F7FAF7] hover:text-[#1B5E20]"
                  >
                    <span>App Updates</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNav('contact')}
                    className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-sm text-[#1A1A1A] hover:bg-[#F7FAF7] hover:text-[#1B5E20]"
                  >
                    <span>Contact Support</span>
                  </button>
                  <div className="my-1 border-t border-[#1B5E20]/15" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNav('privacy')}
                    className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-xs text-[#4A554C] hover:bg-[#F7FAF7] hover:text-[#1B5E20]"
                  >
                    <span>Privacy Policy</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNav('terms')}
                    className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-xs text-[#4A554C] hover:bg-[#F7FAF7] hover:text-[#1B5E20]"
                  >
                    <span>Terms &amp; Services</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-4 py-2 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2E7D32]"
            >
              <Download className="h-4 w-4" />
              <span>Download App</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            className="mt-3 border-t border-[#1B5E20]/15 pt-3 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {[
                ...NAV_ITEMS,
                { label: 'Privacy Policy', page: 'privacy' as PageRoute },
                { label: 'Terms & Services', page: 'terms' as PageRoute },
              ].map((item) => {
                const active = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => handleNav(item.page)}
                    className={`rounded-[8px] px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#1B5E20] text-white'
                        : 'bg-[#F7FAF7] text-[#1A1A1A] hover:bg-[#EEF4EE]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
