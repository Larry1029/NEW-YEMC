"use client";

import { useEffect, useState } from "react";

export function getRegistrationDeadline() {
  const now = new Date();
  return Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    12,
    0,
    0,
  );
}

export default function RegistrationCountdown() {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const deadline = getRegistrationDeadline();
      const remainingTime = Math.max(0, deadline - Date.now());
      setRemaining({
        hours: Math.floor(remainingTime / 3600000),
        minutes: Math.floor((remainingTime % 3600000) / 60000),
        seconds: Math.floor((remainingTime % 60000) / 1000),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!remaining) return null;

  const closed = remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0;
  if (closed) return null;

  return (
    <div className="sticky top-0 z-[100] bg-red-600 text-white shadow-md">
      <div className="mx-auto flex min-h-10 max-w-5xl items-center justify-center gap-4 px-3 py-1.5 md:gap-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-wide md:text-xs">
          In-person registration closes at 12:00 PM Ghana time
        </p>
        <div className="flex items-center gap-2" aria-label="Countdown to in-person registration closing">
          <div className="min-w-[44px] text-center md:min-w-[52px]">
            <strong className="block text-lg font-extrabold leading-none tabular-nums md:text-xl">TODAY</strong>
          </div>
          {[
            ["Hours", remaining.hours],
            ["Minutes", remaining.minutes],
            ["Seconds", remaining.seconds],
          ].map(([label, value]) => (
            <div key={label} className="min-w-[38px] text-center md:min-w-[44px]">
              <strong className="block text-lg font-extrabold leading-none tabular-nums md:text-xl">
                {String(value).padStart(2, "0")}
              </strong>
              <span className="text-[8px] uppercase tracking-wider text-red-100 md:text-[9px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
