"use client";

import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import OptimizedImage from "../../components/OptimizedImage";
import convenerImage from "../../public/yemc-2026-convener.png";

const morningProgramme = [
  ["7:30 - 8:00 am", "Arrival and Registration"],
  ["8:00 - 8:05 am", "Opening Prayer"],
  ["8:05 - 8:20 am", "Opening Video"],
  ["8:20 - 8:30 am", "Welcome Address", "Apostle Isaac Ali Asomah", "Convener, YEMC"],
  ["8:30 - 8:35 am", "Sponsor Advertisement and Speaker Profile of Mr. Jacob Yeboa"],
  ["8:35 - 9:05 am", "Special Address", "Mr. Jacob Yeboa", "Partner, Bait Consulting Limited"],
  ["9:05 - 9:10 am", "Questions and Answers"],
  ["9:10 - 9:15 am", "Sponsor Advertisement and Speaker Profile of Mr. Oliver Akubia"],
  ["9:15 - 9:45 am", "Special Address", "Mr. Oliver Akubia", "Chief Executive Officer, Millennium Insurance"],
  ["9:45 - 9:55 am", "Questions and Answers"],
  ["10:00 - 10:05 am", "Energiser and Speaker Profile of Dr. Gideon Baffoe"],
  ["10:05 - 11:05 am", "AI for Career and Academia", "Dr. Gideon Baffoe", "Founder & CEO, GIDYA Limited"],
  ["11:05 - 11:25 am", "Questions and Answers"],
  ["11:25 - 11:30 am", "Patron and Board Videos"],
  ["11:30 - 11:35 am", "Speaker Profile of Apostle Isaac Ali Asomah"],
];

const afternoonProgramme = [
  ["11:35 am - 12:00 pm", "YEMC Entrepreneur Mentorship Fellowship Launch and Awards", "Apostle Isaac Ali Asomah", "Convener, YEMC"],
  ["12:00 - 12:30 pm", "Break"],
  ["12:30 - 12:35 pm", "Sponsor Advertisement and Speaker Profile of Dr. David King Boison"],
  ["12:35 - 2:00 pm", "AI for Business", "Dr. David King Boison (PhD)", "CEO, Knowledge Web Centre Ghana Ltd."],
  ["2:00 - 2:05 pm", "YEMC Testimonials and Speaker Profile of Hon. Dr. Julius Debrah"],
  ["2:05 - 2:35 pm", "Keynote Address", "Hon. Dr. Julius Debrah", "Chief of Staff, Office of the President"],
  ["2:35 - 2:40 pm", "Energiser and Speaker Profile of Mr. C.B. Asante"],
  ["2:40 - 3:10 pm", "Special Address", "Mr. Christian B. Asante", "Chief Executive Officer, Eagles Properties Limited"],
  ["2:40 - 3:10 pm", "Special Address", "Dr. Joseph Siaw Agyepong", "Executive Chairman, Jospong Group of Companies"],
  ["3:10 - 3:30 pm", "Announcements, Vote of Thanks, Sponsor Acknowledgements and Closing"],
];

function ProgrammeSection({ title, items }) {
  return (
    <section aria-labelledby={`${title}-heading`} className="mt-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
        <h3 id={`${title}-heading`} className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
          {title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        {items.map(([time, session, speaker, role], index) => (
          <div
            key={`${time}-${session}-${index}`}
            className={`grid grid-cols-[5.9rem_1fr] gap-3 px-4 py-4 sm:grid-cols-[7.5rem_1fr] sm:px-5 ${
              index !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className="flex items-start gap-1.5 text-xs font-bold text-violet-700 sm:text-sm">
              <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{time}</span>
            </div>
            <div>
              <p className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{session}</p>
              {speaker && (
                <div className="mt-1.5 border-l-2 border-fuchsia-400 pl-3">
                  <p className="text-xs font-semibold text-slate-700 sm:text-sm">{speaker}</p>
                  {role && <p className="mt-0.5 text-xs leading-snug text-slate-500">{role}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function EventDayPage() {
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
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-200">YEMC 2026 Conference</p>
              <h1 className="mt-3 font-plus-jakarta text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
                One Day.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-violet-300">
                  Extraordinary Leaders.
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-violet-100 sm:text-base">
                Your guide to today&apos;s ideas, conversations and connections.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(76,29,149,0.25)] ring-1 ring-violet-100">
              <OptimizedImage
                src={convenerImage}
                alt="Apostle Isaac Ali Asomah and his wife"
                loading="eager"
                fetchPriority="high"
                className="h-[22rem] w-full object-cover object-center sm:h-[28rem] md:h-[34rem]"
              />
              <div className="grid gap-3 px-5 py-5 sm:grid-cols-2 sm:px-7">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <CalendarDays className="h-5 w-5 shrink-0 text-violet-700" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</p>
                    <p className="text-sm font-bold text-slate-800">Saturday, 7 November 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <MapPin className="h-5 w-5 shrink-0 text-fuchsia-600" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Venue</p>
                    <p className="text-sm font-bold text-slate-800">Palms by Eagles, Accra</p>
                  </div>
                </div>
              </div>
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
            <div className="grid gap-4 md:grid-cols-2">
              <article className="relative overflow-hidden rounded-[1.75rem] border border-violet-100 bg-violet-50/70 p-6 sm:p-8">
                <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-violet-300/30 blur-2xl" />
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-700 text-lg font-bold text-white">A</span>
                <h3 className="relative mt-6 font-plus-jakarta text-2xl font-bold text-violet-950">Our Vision</h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  To empower the next generation of exceptional business leaders equipped with skill, knowledge and character that drives sustainable business/career growth and excellence.
                </p>
              </article>
              <article className="relative overflow-hidden rounded-[1.75rem] border border-fuchsia-100 bg-fuchsia-50/70 p-6 sm:p-8">
                <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-fuchsia-300/30 blur-2xl" />
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-700 text-lg font-bold text-white">B</span>
                <h3 className="relative mt-6 font-plus-jakarta text-2xl font-bold text-fuchsia-950">Our Mission</h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  To provide a world-class youth empowerment programme focused on mentorship, executive education and leadership skills that drives career and business excellence.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-10 sm:px-6 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Saturday, 7 November 2026</p>
              <h2 className="mt-2 font-plus-jakarta text-3xl font-extrabold text-slate-950 sm:text-4xl">Conference Programme</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
                AI for the next generation of career and business executives
              </p>
            </div>
            <ProgrammeSection title="Morning" items={morningProgramme} />
            <ProgrammeSection title="Afternoon" items={afternoonProgramme} />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:py-20">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-950 via-violet-800 to-fuchsia-700 px-6 py-10 text-center text-white shadow-[0_24px_70px_rgba(91,33,182,0.28)] sm:px-10 sm:py-14">
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />
            <div className="absolute -bottom-16 -right-10 h-44 w-44 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Your voice matters</p>
              <h2 className="mt-3 font-plus-jakarta text-3xl font-extrabold sm:text-4xl">Help shape the next YEMC experience.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-violet-100 sm:text-base">
                Share your experience in our post-conference survey. It only takes a few minutes.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeyntldtsM63G8M95mhG6WYX-7f1ofCYLVzJkT7QfdQM0-kOg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-violet-900 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Complete the post-conference survey
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
