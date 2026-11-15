import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-4 mt-12 mb-6 sm:mx-6 lg:mx-8">
      <div className="mx-auto max-w-[1376px] rounded-[8px] bg-[#F7FAF7] px-6 py-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-2 text-xs text-[#4A554C] sm:flex-row sm:items-center">
          <p>All rights are reserved by Fiqah {currentYear}.</p>
          <p className="font-medium text-[#1B5E20]">
            Designed &amp; developed by Rust Innovations IT Department.
          </p>
        </div>
      </div>
    </footer>
  );
};
