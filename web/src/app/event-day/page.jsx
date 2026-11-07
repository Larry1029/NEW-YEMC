"use client";

import { useState } from "react";
import { ArrowUpRight, Expand, X } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import OptimizedImage from "../../components/OptimizedImage";
import convenerImage from "../../public/yemc-2026-convener.png";
import morningProgrammeImage from "../../public/conference-programme-morning.png";
import afternoonProgrammeImage from "../../public/conference-programme-afternoon.png";

export default function EventDayPage() {
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />

      <main>
        <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-32">
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-violet-950 via-violet-950 to-white" />
          <div className="absolute left-[-4rem] top-28 h-52 w-52 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="absolute right-[-4rem] top-52 h-52 w-52 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="mb-7 text-center text-white">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-200">
                YEMC 2026 Conference Guide
              </p>
              <h1 className="mt-3 font-plus-jakarta text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                Lead with Purpose.{" "}
                <span className="bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                  Grow with Impact.
                </span>
              </h1>
            </div>

            <div className="-mx-4 overflow-hidden bg-white shadow-[0_28px_80px_rgba(76,29,149,0.25)] ring-1 ring-violet-100 sm:mx-0 sm:rounded-[2rem]">
              <OptimizedImage
                src={convenerImage}
                alt="Apostle Isaac Ali Asomah and his wife"
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full object-contain object-center"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-7 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Why we gather</p>
              <h2 className="mt-2 font-plus-jakarta text-3xl font-extrabold text-slate-950 sm:text-4xl">
                The purpose behind YEMC
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <article>
                <h3 className="font-plus-jakarta text-2xl font-bold text-violet-950">Our Vision</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  To empower the next generation of exceptional business leaders equipped with skill,
                  knowledge and character that drives sustainable business/career growth and excellence.
                </p>
              </article>
              <article>
                <h3 className="font-plus-jakarta text-2xl font-bold text-fuchsia-950">Our Mission</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  To provide a world-class youth empowerment programme focused on mentorship, executive
                  education and leadership skills that drives career and business excellence.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-10 sm:px-6 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="font-plus-jakarta text-3xl font-extrabold text-slate-950 sm:text-4xl">
                Conference Programme
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsProgrammeOpen(true)}
              className="group mt-7 block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
              aria-label="Open conference programme"
            >
              <div className="relative space-y-px bg-slate-200">
                <OptimizedImage
                  src={morningProgrammeImage}
                  alt="YEMC morning conference programme"
                  className="h-auto w-full object-contain"
                />
                <OptimizedImage
                  src={afternoonProgrammeImage}
                  alt="YEMC afternoon conference programme"
                  className="h-auto w-full object-contain"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm">
                  <Expand className="h-4 w-4" />
                  Open full size
                </span>
              </div>
            </button>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:py-20">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-950 via-violet-800 to-fuchsia-700 px-6 py-10 text-center text-white shadow-[0_24px_70px_rgba(91,33,182,0.28)] sm:px-10 sm:py-14">
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />
            <div className="absolute -bottom-16 -right-10 h-44 w-44 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Your voice matters</p>
              <h2 className="mt-3 font-plus-jakarta text-3xl font-extrabold sm:text-4xl">
                Help shape the next YEMC experience.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-violet-100 sm:text-base">
                Share your experience in our post-conference survey.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeyntldtsM63G8M95mhG6WYX-7f1ofCYLVzJkT7QfdQM0-kOg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-violet-900 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Take Survey
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {isProgrammeOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Conference programme"
        >
          <button
            type="button"
            onClick={() => setIsProgrammeOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm"
            aria-label="Close conference programme"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="h-full w-full overflow-auto">
            <OptimizedImage
              src={morningProgrammeImage}
              alt="YEMC morning conference programme full size"
              className="w-full object-contain"
            />
            <OptimizedImage
              src={afternoonProgrammeImage}
              alt="YEMC afternoon conference programme full size"
              className="w-full object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
