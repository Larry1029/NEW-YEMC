"use client";
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import OptimizedImage from "../components/OptimizedImage";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
export default function HomePage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const sections = document.querySelectorAll("main > section:not(:first-child)");
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

    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      src: "https://ucarecdn.com/4056e7a1-fe00-48dc-8088-7f1082e7a6d5/-/format/auto/",
      title: "Executive Leadership Training",
      description:
        "Learn from industry veterans in an immersive masterclass session",
    },
    {
      src: "https://ucarecdn.com/e44e0eaa-125a-48a9-9d31-91307512c9ad/-/format/auto/",
      title: "Empowering Your Career Growth",
      description: "Access valuable resources and keep growing",
    },
    {
      src: "https://ucarecdn.com/fffc5bfd-68fa-474d-94ee-ef5c3f24132b/-/format/auto/",
      title: "Spiritual Foundation",
      description: "Faith-centered leadership",
    },
    {
      src: "https://ucarecdn.com/d6e99419-ab1b-45c7-a407-f99dd278a583/-/format/auto/",
      title: "One-on-One Mentorship",
      description: "Personal guidance from experts",
    },
    {
      src: "https://ucarecdn.com/2f088fea-7487-4da9-8076-4afcec7d18d1/-/format/auto/",
      title: "Strategic Planning",
      description: "Develop market-ready business plans",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Header />
      <main className="text-center md:text-left">
        <Hero />
        <section
          id="about"
          className="overflow-x-clip py-8 md:py-16 lg:py-24 bg-slate-950 border-y border-slate-900"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="relative isolate overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-slate-800 shadow-2xl">
                <div className="absolute -top-6 -right-6 z-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-violet-600/20 blur-[100px] rounded-full"></div>
                <OptimizedImage
                  src="/IMG_7335.JPG.jpeg?v=2"
                  alt="YEMC Team Meeting"
                  style={{ objectPosition: "center 18%" }}
                  className="relative z-10 w-full h-[250px] md:h-[300px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 z-20 text-center md:inset-x-5 md:bottom-5 lg:inset-x-8 lg:bottom-8">
                  <h4 className="font-plus-jakarta text-lg font-bold leading-tight tracking-[-0.04em] text-violet-100 drop-shadow-[0_8px_20px_rgba(15,23,42,0.9)] md:text-2xl lg:text-3xl">
                    Apostle Ali Asomah Isaac
                  </h4>
                  <p className="mt-1.5 flex items-center justify-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-orange-800 md:text-[9px] lg:text-[12px]">
                    <span>Founder & CEO</span>
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4">
                  Our Mission
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold text-white mb-4 md:mb-6 lg:mb-8 font-plus-jakarta leading-tight">
                  Empowering Young Leaders to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    Transform
                  </span>{" "}
                  their Career and Business.
                </h3>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-slate-400 leading-relaxed mb-4 md:mb-6">
                  Young Executive Master Class started with a simple mission:
                  raising the next generation business executives through
                  mentorship programs and conferences. Founded in 2024, we've
                  gained deep expertise from our team of seasoned executives who
                  have been in the business for over 10 years.
                </p>
                <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 md:justify-start">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-slate-950 bg-violet-600 flex items-center justify-center text-white font-bold text-xs md:text-sm lg:text-base">
                      ZL
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-slate-950 bg-blue-600 flex items-center justify-center text-white font-bold text-xs md:text-sm lg:text-base">
                      E
                    </div>
                  </div>
                  <p className="text-slate-500 italic text-xs md:text-sm lg:text-base">
                    "Our mentors are CEOs of leading businesses and
                    organizations."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8 md:py-16 lg:py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4">
                Experience YEMC
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white font-plus-jakarta px-2">
                Where Faith Meets Excellence
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {highlights.map((item, index) => {
                const isLarge = index === 0;
                return (
                  <div
                    key={index}
                    className={`${isLarge ? "md:col-span-2 lg:col-span-2" : ""
                      } relative group overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 hover:border-violet-500/50 transition-all h-[200px] md:h-auto`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                    <div className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-3 md:left-4 lg:left-6 right-3 md:right-4 lg:right-6">
                      <h4
                        className={`text-white font-bold mb-1 md:mb-2 font-plus-jakarta ${isLarge
                          ? "text-lg md:text-xl lg:text-2xl xl:text-3xl"
                          : "text-sm md:text-base lg:text-lg"
                          }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-slate-300 text-xs md:text-sm lg:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="py-8 md:py-16 lg:py-24 bg-slate-950 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-10 -left-10 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-violet-600/10 blur-[100px] rounded-full"></div>
                <OptimizedImage
                  src="https://ucarecdn.com/e14beff5-d58b-41f7-96a2-7fd11feb0cc0/-/format/auto/"
                  alt="YEMC Impact"
                  className="w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-slate-800 shadow-2xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4">
                  With YEMC
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 lg:mb-8 font-plus-jakarta leading-tight">
                  Unlock endless possibilities for professional{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    growth
                  </span>{" "}
                  with the Young Executive Master Class platform.
                </h3>
                <p className="text-slate-400 text-sm md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 leading-relaxed">
                  Access a carefully curated collection of resources and
                  materials from our previous master classes, empowering you to
                  continually enhance your skills and stay informed on vital
                  industry insights.
                </p>
                <div className="space-y-2 md:space-y-3 lg:space-y-4 mb-6 md:mb-8 lg:mb-10">
                  {[
                    "Get the latest updates directly to your inbox",
                    "Career-building resources, free and accessible",
                    "Practical Ethical Leadership Frameworks",
                    "Network, collaborate, and grow",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-center md:gap-3 md:justify-start md:text-left">
                      <CheckCircle2
                        className="w-4 h-4 md:w-5 md:h-5 text-violet-500 flex-shrink-0"
                      />
                      <span className="text-slate-200 font-medium text-xs md:text-sm lg:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="/about"
                  className="group inline-flex items-center gap-2 text-white font-bold text-sm md:text-base lg:text-lg hover:text-violet-400 transition-colors"
                >
                  Learn more about our mission
                  <ArrowRight
                    className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <section className="py-8 md:py-12 lg:py-20 px-4 md:px-6 bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-2xl md:rounded-3xl lg:rounded-[40px] p-6 md:p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0">
                <OptimizedImage
                  src="https://ucarecdn.com/aae1fc13-686a-4f0e-948e-6fc67f0f2a53/-/format/auto/"
                  alt="Background"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-900/60 to-blue-900/60"></div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-violet-500/10 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-3 lg:mb-4 font-plus-jakarta px-2">
                  Ready to Transform Your Leadership?
                </h3>
                <p className="text-slate-300 text-sm md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto px-2">
                  Join hundreds of young executives who are growing in faith,
                  strategy, and influence.
                </p>
                <a
                  href="/contact"
                  className="bg-white text-slate-950 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl font-extrabold text-sm md:text-base lg:text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-6 md:py-12 lg:py-16 border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <p className="text-center text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-4 md:mb-6 lg:mb-8">
              Distinguished Sponsors
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 xl:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {["ZoomLion", "Eagles", "Jospon Group", "Benat Auto", "Ivas"].map(
                (brand) => (
                  <span
                    key={brand}
                    className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white tracking-tighter"
                  >
                    {brand}
                  </span>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}