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
        days: Math.floor(remainingTime / 86400000),
        hours: Math.floor((remainingTime % 86400000) / 3600000),
        minutes: Math.floor((remainingTime % 3600000) / 60000),
        seconds: Math.floor((remainingTime % 60000) / 1000),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!remaining) return null;

  const closed =
    remaining.days === 0 &&
    remaining.hours === 0 &&
    remaining.minutes === 0 &&
    remaining.seconds === 0;
  if (closed) return null;

  return (
    <div className="sticky top-0 z-[100] bg-red-600 text-white shadow-md">
      <div className="mx-auto flex min-h-8 max-w-6xl items-center justify-center gap-3 px-3 py-1 text-center md:gap-8">
        <p className="hidden text-xs font-bold md:block">
          In-person registration closes at 12:00 PM Ghana time
        </p>
        <div className="flex items-center whitespace-nowrap text-xs font-bold md:text-sm" aria-label="Countdown to in-person registration closing">
          <span className="mr-1 md:mr-2">Ends in:</span>
          <span className="tabular-nums">{String(remaining.days).padStart(1, "0")}D</span>
          <span className="mx-1 text-red-100">:</span>
          <span className="tabular-nums">{String(remaining.hours).padStart(1, "0")}H</span>
          <span className="mx-1 text-red-100">:</span>
          <span className="tabular-nums">{String(remaining.minutes).padStart(2, "0")}M</span>
        </div>
      </div>
    </div>
  );
}
