import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const RELEASE_TIMESTAMP = new Date('2026-12-01T00:00:00').getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  launched: boolean;
}

function calculateRemaining(): TimeRemaining {
  const diff = RELEASE_TIMESTAMP - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, launched: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, launched: false };
}

interface AnimatedUnitProps {
  value: number;
  label: string;
}

const AnimatedUnit: React.FC<AnimatedUnitProps> = ({ value, label }) => {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center rounded-[8px] bg-[#F7FAF7] px-3 py-4 transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:py-5">
      <div
        className="relative flex h-12 w-full items-center justify-center overflow-hidden sm:h-14"
        style={{ perspective: '600px' }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 20, rotateX: -55, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            exit={{ y: -20, rotateX: 55, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center center' }}
            className="font-clock block text-3xl font-bold tracking-tight text-[#1B5E20] tabular-nums sm:text-5xl"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 text-[11px] font-semibold tracking-wider text-[#4A554C] uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
};

export const CountdownTimer: React.FC = () => {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining()
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (remaining.launched) {
    return (
      <div className="rounded-[8px] bg-[#F7FAF7] px-6 py-5 text-center">
        <p className="font-clock text-2xl font-bold text-[#1B5E20]">
          Fiqah App is Now Live
        </p>
        <p className="mt-1 text-sm text-[#4A554C]">
          Released on 1 December 2026 for Android and iOS devices.
        </p>
      </div>
    );
  }

  return (
    <div aria-label="Countdown to 1 December 2026 release">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1.5 sm:gap-3">
        <AnimatedUnit value={remaining.days} label="Days" />
        <span
          aria-hidden="true"
          className="font-clock text-2xl font-bold text-[#1B5E20]/50 sm:text-4xl"
        >
          :
        </span>
        <AnimatedUnit value={remaining.hours} label="Hours" />
        <span
          aria-hidden="true"
          className="font-clock text-2xl font-bold text-[#1B5E20]/50 sm:text-4xl"
        >
          :
        </span>
        <AnimatedUnit value={remaining.minutes} label="Minutes" />
        <span
          aria-hidden="true"
          className="font-clock text-2xl font-bold text-[#1B5E20]/50 sm:text-4xl"
        >
          :
        </span>
        <AnimatedUnit value={remaining.seconds} label="Seconds" />
      </div>
    </div>
  );
};
