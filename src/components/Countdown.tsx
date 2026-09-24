import { useEffect, useState } from "react";

// 25 September 2026, 18:30 (SAST, UTC+2)
const TARGET = new Date("2026-09-25T18:30:00+02:00").getTime();

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    Days: Math.floor(total / 86400),
    Hours: Math.floor((total % 86400) / 3600),
    Minutes: Math.floor((total % 3600) / 60),
    Seconds: total % 60,
  };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = now === null ? TARGET - TARGET : TARGET - now;
  const started = now !== null && remaining <= 0;
  const values = parts(remaining);

  if (started) {
    return (
      <p className="font-display text-2xl tracking-[0.3em] text-gilded uppercase sm:text-3xl">
        The evening has begun
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {Object.entries(values).map(([label, value]) => (
        <div
          key={label}
          className="card-elegant rounded-lg px-2 py-4 text-center sm:px-5 sm:py-6"
        >
          <div className="font-display text-3xl leading-none text-gilded tabular-nums sm:text-5xl">
            {now === null ? "--" : String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase sm:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
