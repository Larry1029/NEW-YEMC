"use client";
import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import aboutImage1 from "../../public/632A81(296) - Copy.jpg";
import aboutImage2 from "../../public/632A81(264) - Copy.jpg";
import aboutImage3 from "../../public/632A81(316) - Copy.jpg";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
export default function AboutPage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const revealTargets = document.querySelectorAll("main > section, main > section img, footer");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    revealTargets.forEach((target) => {
      target.classList.add(target instanceof HTMLImageElement ? "scroll-reveal-image" : "scroll-reveal");
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "500+", label: "Alumni", icon: <Users size={28} /> },
    { value: "120+", label: "Masterclass Sessions", icon: <Briefcase size={28} /> },
    { value: "50+", label: "Mentors", icon: <Award size={28} /> },
    { value: "95%", label: "Participant Satisfaction", icon: <TrendingUp size={28} /> },
  ];

  const features = [
    {
      title: "Executive Leadership Training",
      description:
        "Practical sessions that build confidence, clarity, and strategic leadership for career growth.",
    },
    {
      title: "Faith-Centered Mentorship",
      description:
        "Guidance from seasoned leaders who help members navigate business with integrity and purpose.",
    },
    {
      title: "Career & Business Growth",
      description:
        "Actionable frameworks for building teams, scaling organizations, and leading with excellence.",
    },
  ];

  const team = [
    {
      name: "Apostle Isaac Ali Asomah",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Rev. Nora Ali",
      role: "Spiritual Director",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Mr. C.B Asante",
      role: "Chief Strategy Officer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Esther Mensah",
      role: "Program Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Daniel Owusu",
      role: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Grace Boateng",
      role: "Community Director",
      image:
        "https://images.unsplash.com/photo-1531124136-2c7f6f7d8c09?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kwame Mensah",
      role: "Partnerships Lead",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Adwoa Asante",
      role: "Finance Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Header hideUntilScroll />
      <main className="lg:pt-24">
        <section className="overflow-hidden bg-slate-950 text-white lg:hidden">
          <div className="relative h-[50svh] min-h-[320px] max-h-[520px] md:h-[56svh] md:max-h-[680px]">
            <OptimizedImage
              src={aboutImage2}
              alt="YEMC leadership session"
              loading="eager"
              fetchPriority="high"
              className="about-hero-photo-enter h-full w-full object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/15 via-transparent to-violet-950/30" />
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] w-full"
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0C120 75 180 370 470 398C650 418 735 340 820 275C884 226 944 210 1000 210V400H0V0Z"
                fill="#020617"
              />
            </svg>
          </div>
          <div className="relative mx-auto -mt-1 max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 md:px-10 lg:pb-24">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-violet-300">
                About YEMC
              </p>
              <h1 className="max-w-2xl font-plus-jakarta text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Empowering the{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Next Generation
                </span>{" "}
                of Young Business Executives
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base md:text-lg">
                Young Executive Master Class started with a simple mission: raising the next generation of business executives through mentorship programs and conferences. Founded in 2024, we've gained deep expertise from our team of seasoned executives who have been in the business for over 10 years.
              </p>
              <div className="mt-5 space-y-3 sm:mt-6">
                {[
                  "Faith-led leadership training for young professionals",
                  "Mentorship and community that strengthen character and business skill",
                  "Practical resources for growing your influence and income",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-400 sm:h-5 sm:w-5" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/join" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-violet-500 hover:to-blue-500">
                  Apply to YEMC <ArrowRight size={16} />
                </a>
                <a href="/lessons" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-violet-500/60 hover:bg-slate-800">
                  Explore Lessons
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_30%)] px-6 py-24 text-white lg:block">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-8">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">About Us</p>
                <h1 className="max-w-3xl font-plus-jakarta text-5xl font-extrabold leading-tight tracking-tight text-white xl:text-6xl">
                  Empowering the{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Next Generation
                  </span>{" "}
                  of Young Business Executives
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                  At Young Executive Master Class (YEMC), we are dedicated to raising the next generation of Christian business executives. Our goal is to provide you with the tools, resources, and community support needed to excel in your career while staying grounded in your faith.
                </p>
                <div className="space-y-4">
                  {[
                    "Faith-led leadership training for young professionals",
                    "Mentorship and community that strengthen character and business skill",
                    "Practical resources for growing your influence and income",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href="/join" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">Apply to YEMC</a>
                  <a href="/lessons" className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition hover:border-violet-500">Explore Lessons</a>
                </div>
              </div>
              <div className="grid h-[540px] grid-cols-2 grid-rows-2 gap-6">
                <div className="relative row-span-2 overflow-hidden rounded-[32px] bg-slate-900 shadow-xl">
                  <OptimizedImage src={aboutImage1} alt="YEMC members working together" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="overflow-hidden rounded-[32px] bg-slate-900 shadow-xl">
                  <OptimizedImage src={aboutImage2} alt="YEMC leadership session" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="overflow-hidden rounded-[32px] bg-slate-900 shadow-xl">
                  <OptimizedImage src={aboutImage3} alt="YEMC team at work" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-x-clip bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Mission block */}
            <div className="relative min-w-0">
              <div className="pointer-events-none absolute inset-x-0 top-9 flex h-16 items-center justify-start overflow-hidden px-4 sm:px-6 md:top-16 md:h-20">
                <h2
                  className="select-none whitespace-nowrap text-6xl font-extrabold uppercase leading-none tracking-wide text-transparent sm:text-8xl md:text-[clamp(5rem,8.5vw,7.5rem)]"
                  style={{ WebkitTextStroke: "1px rgba(99,102,241,0.16)" }}
                >
                  MISSION
                </h2>
              </div>
              <div className="relative z-10 px-4 py-10 text-left sm:px-6 md:py-16">
                <h3 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 sm:text-4xl md:text-5xl lg:text-6xl">
                  Mission
                </h3>
                <p className="max-w-3xl text-base leading-relaxed text-slate-400">
                  To raise Next Generation Business Executives through mentorship programs and conferences. We are committed to equipping young professionals with the confidence, strategy, and spiritual values needed to lead with excellence in today’s marketplace.
                </p>
              </div>
            </div>

            {/* Vision block */}
            <div className="relative min-w-0">
              <div className="pointer-events-none absolute inset-x-0 top-9 flex h-16 items-center justify-end overflow-hidden px-4 sm:px-6 md:top-16 md:h-20">
                <h2
                  className="select-none whitespace-nowrap text-6xl font-extrabold uppercase leading-none tracking-wide text-transparent sm:text-8xl md:text-[clamp(5rem,8.5vw,7.5rem)]"
                  style={{ WebkitTextStroke: "1px rgba(59,130,246,0.16)" }}
                >
                  VISION
                </h2>
              </div>
              <div className="relative z-10 px-4 py-10 text-right sm:px-6 md:py-16">
                <h3 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 sm:text-4xl md:text-5xl lg:text-6xl">
                  Vision
                </h3>
                <p className="ml-auto max-w-3xl text-base leading-relaxed text-right text-slate-400">
                  To roll out mentorship programs aimed at raising Next Generation Business Executives. Our vision is to expand our mentorship network, support emerging leaders, and create a community where faith and competency grow together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-900 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-center lg:space-y-8 lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-400 sm:text-sm sm:tracking-[0.35em]">
                Company Overview
              </p>
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white tracking-tight sm:text-4xl md:text-5xl lg:mx-0">
                Developing Young leaders for marketplace success
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
                YEMC combines expert-led masterclasses, faith-centered mentorship, and an active alumni network to accelerate your professional journey.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      
                      <span className="text-slate-400 text-xs uppercase tracking-[0.25em]">
                        Focus
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white sm:mt-6 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto h-[280px] w-full max-w-2xl sm:h-[360px] lg:h-[540px]">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-violet-500/10 to-blue-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[40px] border border-slate-800 shadow-xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
                  alt="IT solutions"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-900 bg-slate-950 px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center sm:p-6 lg:p-8">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 sm:mb-6 sm:h-14 sm:w-14">
                    {item.icon}
                  </div>
                  <p className="text-3xl font-bold text-white sm:text-4xl">{item.value}</p>
                  <p className="mt-3 text-slate-400 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-900 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-400 font-semibold mb-3">
                Leadership Team
              </p>
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white tracking-tight sm:text-4xl md:text-5xl">
                Meet the leaders guiding YEMC forward
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
                  <div className="flex h-56 items-center justify-center overflow-hidden bg-slate-800 sm:h-64 lg:h-80">
                    <UserRound aria-hidden="true" className="h-20 w-20 text-slate-600" strokeWidth={1.25} />
                  </div>
                  <div className="p-3 sm:p-5 lg:p-6">
                    <h3 className="text-base font-semibold leading-snug text-white sm:text-lg lg:text-xl">{member.name}</h3>
                    <p className="mt-2 text-sm text-violet-400 sm:text-base">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
