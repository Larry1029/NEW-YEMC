import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import card1Src from "../public/632A81(464) - Copy.jpg";
import card2Src from "../public/632A81(323) - Copy.jpg";
import card3Src from "../public/632A81(198) - Copy.jpg";
import card4Src from "../public/632A81(415) - Copy.jpg";
import card5Src from "../public/632A81(260) - Copy.jpg";
import OptimizedImage from "./OptimizedImage";

const people = [
  { src: card1Src, alt: "Young executive learning", position: "object-center", zoom: "scale-[1.6]" },
  { src: card2Src, alt: "Young executive leader", position: "object-center" },
  { src: card3Src, alt: "YEMC executive speaker", position: "object-center", zoom: "scale-[1.3]" },
  { src: card4Src, alt: "YEMC community member", position: "object-center", zoom: "scale-[1.3]" },
  { src: card5Src, alt: "YEMC executive speaker", position: "object-center", zoom: "scale-[1.3]" },
];
const mobileCardPositions = [
  { left: "10%", top: "55%", width: "clamp(7.5rem, 38vw, 8.5rem)", height: "clamp(10rem, 44vw, 10.5rem)", rotation: -15, zIndex: 1, opacity: 0.48 },
  { left: "32%", top: "51%", width: "clamp(9.5rem, 48vw, 11rem)", height: "clamp(13rem, 58vw, 14rem)", rotation: -8, zIndex: 2, opacity: 0.86 },
  { left: "50%", top: "47%", width: "clamp(12rem, 62vw, 14rem)", height: "clamp(13rem, 61vw, 15rem)", rotation: 0, zIndex: 4, opacity: 1 },
  { left: "68%", top: "51%", width: "clamp(9.5rem, 48vw, 11rem)", height: "clamp(13rem, 58vw, 14rem)", rotation: 8, zIndex: 2, opacity: 0.86 },
  { left: "90%", top: "55%", width: "clamp(7.5rem, 38vw, 8.5rem)", height: "clamp(10rem, 44vw, 10.5rem)", rotation: 15, zIndex: 1, opacity: 0.48 },
];

function PortraitCard({ person, index, className = "", style, animated = true }) {
  return (
    <div
      className={`${animated ? "hero-card-slide hero-card-enter" : ""} relative aspect-[0.76] shrink-0 overflow-hidden rounded-[22px] border border-slate-700/80 bg-slate-900 shadow-2xl transition-transform duration-500 hover:-translate-y-3 md:rounded-[28px] ${className}`}
      style={{ "--hero-card-pop-delay": `${index * 150}ms`, ...style }}
    >
      <OptimizedImage
        src={person.src}
        alt={person.alt}
        loading={person === people[2] ? "eager" : "lazy"}
        fetchPriority={person === people[2] ? "high" : "auto"}
        className={`h-full w-full object-cover ${person.position} ${person.zoom || ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/5" />
    </div>
  );
}

function MobileCarouselCard({ person, index, position }) {
  return (
    <PortraitCard
      person={person}
      index={index}
      animated={false}
      className="mobile-carousel-card-enter absolute border-slate-300/70 shadow-2xl"
      style={{
        position: "absolute",
        "--mobile-card-delay": `${350 + Math.abs(index - 2) * 100}ms`,
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height,
        zIndex: position.zIndex,
        opacity: position.opacity,
        transform: `translate(-50%, calc(-50% + 100svh - 45rem)) rotate(${position.rotation}deg)`,
        transition: "left 600ms cubic-bezier(0.22, 1, 0.36, 1), top 600ms cubic-bezier(0.22, 1, 0.36, 1), width 600ms cubic-bezier(0.22, 1, 0.36, 1), height 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}

function ZigzagRail({ side }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[22%] hidden h-[390px] w-28 opacity-75 lg:block ${side === "left" ? "left-2 xl:left-8" : "right-2 xl:right-8"}`}
    >
      <svg className={`hero-zigzag-svg h-full w-full ${side === "right" ? "scale-x-[-1]" : ""}`} viewBox="0 0 112 390" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`zigzag-${side}`} x1="0" y1="0" x2="112" y2="390" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#C4B5FD" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          className="hero-zigzag-line"
          d="M94 4L20 58L94 112L20 166L94 220L20 274L94 328L52 358"
          stroke={`url(#zigzag-${side})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="hero-zigzag-glow"
          d="M94 4L20 58L94 112L20 166L94 220L20 274L94 328L52 358"
          stroke={`url(#zigzag-${side})`}
          strokeOpacity="0.2"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const [activeMobileCard, setActiveMobileCard] = useState(2);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let nextCardTimeout;
    const advanceCard = () => {
      setActiveMobileCard((current) => (current + 1) % people.length);
      nextCardTimeout = window.setTimeout(advanceCard, 2600);
    };
    const initialHoldTimeout = window.setTimeout(advanceCard, 2000);

    return () => {
      window.clearTimeout(initialHoldTimeout);
      window.clearTimeout(nextCardTimeout);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-28 text-white md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(124,58,237,0.16),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_70%,#020617_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        <ZigzagRail side="left" />
        <ZigzagRail side="right" />

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="hero-title-enter mx-auto max-w-[56rem] font-plus-jakarta text-[clamp(2.75rem,6.4vw,7rem)] font-extrabold leading-[0.94] tracking-tight text-white">
            <span className="block">Young Executive</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
              Master Class
            </span>
          </h1>
          <h2 className="hero-description-enter mx-auto mt-6 max-w-[42rem] font-plus-jakarta text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-violet-200 md:mt-7">
            <span className="block">Empowering the next generation</span>
            <span className="block">of young business executives</span>
          </h2>
          
          <a href="/join" className="hero-button-enter group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-violet-950/30 transition-all hover:scale-105 hover:bg-violet-100 md:mt-9 md:px-7 md:py-3.5">
            Register Now
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:translate-x-1">
              <ArrowRight size={14} />
            </span>
          </a>
        </div>

        <div className="relative left-1/2 mx-auto mt-10 h-[300px] w-screen max-w-none -translate-x-1/2 sm:h-[320px] md:left-auto md:mt-12 md:h-[410px] md:w-full md:max-w-[1450px] md:translate-x-0 lg:h-[475px]">
          <div aria-label="YEMC community photos" className="absolute inset-0 overflow-visible md:hidden">
            {people.map((person, index) => {
              const rawOffset = (index - activeMobileCard + people.length) % people.length;
              const offset = rawOffset > 2 ? rawOffset - people.length : rawOffset;
              return (
                <MobileCarouselCard
                  key={index}
                  person={person}
                  index={index}
                  position={mobileCardPositions[offset + 2]}
                />
              );
            })}
          </div>
          <div className="absolute left-1/2 top-1/2 hidden w-[112%] -translate-x-1/2 -translate-y-1/2 items-end justify-center gap-2 md:flex sm:gap-3 md:w-[118%] md:gap-5 lg:gap-7">
            <PortraitCard person={people[0]} index={0} className="hidden w-[18%] -rotate-[10deg] translate-y-5 md:block" />
            <PortraitCard person={people[1]} index={1} className="w-[22%] -rotate-[6deg] translate-y-3 sm:w-[20%] md:w-[18%]" />
            <PortraitCard person={people[2]} index={2} className="w-[25%] -translate-y-1 border-violet-400/70 shadow-violet-950/40 sm:w-[22%] md:w-[20%]" />
            <PortraitCard person={people[3]} index={3} className="w-[22%] translate-y-3 rotate-[6deg] sm:w-[20%] md:w-[18%]" />
            <PortraitCard person={people[4]} index={4} className="hidden w-[18%] rotate-[10deg] translate-y-5 md:block" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent md:h-32" />
        </div>

        <div className="mx-auto grid max-w-4xl border-t border-slate-800/80 pb-12 pt-7 text-center sm:grid-cols-3 sm:text-left md:pb-16">
          <div className="border-slate-800/80 px-5 py-3 sm:border-r">
            <h2 className="font-plus-jakarta text-base font-bold text-white md:text-lg">Executive Leadership</h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">Learn from leaders shaping business, faith, and culture.</p>
          </div>
          <div className="border-slate-800/80 px-5 py-3 sm:border-r">
            <h2 className="font-plus-jakarta text-base font-bold text-white md:text-lg">Practical Growth</h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">Build the skills and clarity to move your work forward.</p>
          </div>
          <div className="px-5 py-3">
            <h2 className="font-plus-jakarta text-base font-bold text-white md:text-lg">Purposeful Community</h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">Connect, collaborate, and grow with the next generation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
