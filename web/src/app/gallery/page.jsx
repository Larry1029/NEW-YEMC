"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import { Camera, Heart, Users, Sparkles } from "lucide-react";

const galleryImages = [
  {
    src: "https://ucarecdn.com/e14beff5-d58b-41f7-96a2-7fd11feb0cc0/-/format/auto/",
    title: "YEMC Leadership Team",
    category: "Team",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    title: "Executive Leadership Session",
    category: "Training",
  },
  {
    src: "https://ucarecdn.com/e44e0eaa-125a-48a9-9d31-91307512c9ad/-/format/auto/",
    title: "Career Development Workshop",
    category: "Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    title: "Prayer & Worship",
    category: "Spiritual",
  },
  {
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=800&q=80",
    title: "One-on-One Mentorship",
    category: "Mentorship",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
    title: "Strategic Planning Session",
    category: "Strategy",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    title: "Collaborative Networking",
    category: "Community",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    title: "Team Brainstorming",
    category: "Team",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    title: "Business Conference",
    category: "Training",
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    title: "Executive Mastermind",
    category: "Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80",
    title: "Worship & Reflection",
    category: "Spiritual",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    title: "Leadership Training",
    category: "Training",
  },
];

function MasonryCard({ image, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: (index % 6) * 0.1 }}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm cursor-pointer"
    >
      <div className="relative overflow-hidden w-full h-full">
        <OptimizedImage
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="w-full h-auto block object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
        />
        {/* Elegant transparent overlay with slide-up textual content */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end translate-y-4 group-hover:translate-y-0">
          <span className="w-fit px-3 py-1 bg-violet-600/80 backdrop-blur-md text-white text-xs font-semibold rounded-full mb-2 uppercase tracking-wide">
            {image.category}
          </span>
          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight">
            {image.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.95]);

  return (
    <div ref={ref} className="relative h-[400px] md:h-[600px] overflow-hidden my-16 rounded-[40px] shadow-2xl border border-white/10 mx-4 md:mx-6 lg:mx-10">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"
          alt="Parallax Background"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="max-w-3xl glass-panel p-8 md:p-12 rounded-3xl bg-slate-950/40 backdrop-blur-lg border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 font-plus-jakarta"
          >
            Moments of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Transformation
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-slate-300 text-lg md:text-2xl font-medium"
          >
            Every image tells a story of faith, growth, and excellence at YEMC.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { icon: Camera, value: "1000+", label: "Moments Captured" },
    { icon: Users, value: "200+", label: "Youth Trained" },
    { icon: Heart, value: "100%", label: "Faith-Centered" },
    { icon: Sparkles, value: "10+", label: "Years Impact" },
  ];

  return (
    <div ref={ref} className="py-20 relative border-y border-white/5 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-5 border border-white/10 group-hover:bg-violet-600/20 group-hover:border-violet-500/50 transition-colors duration-300">
                <stat.icon size={32} className="text-violet-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 font-plus-jakarta">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm md:text-base font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#070914] relative selection:bg-violet-500/30 selection:text-white">
      {/* Reduced background blur intensity to fix scroll overflow on mobile */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-violet-600/10 blur-[100px] rounded-full mix-blend-screen opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen opacity-60"></div>
      </div>

      <Header />

      <main className="pt-32 md:pt-40 relative z-10 w-full overflow-hidden">
        {/* Dynamic Hero Section */}
        <section className="px-6 lg:px-10 pb-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-plus-jakarta tracking-tight">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Gallery
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                A vivid visual journey through leadership development, spiritual
                growth, and community excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Flexbox Masonry Layout (Fixes CSS columns uneven bottom space) */}
        <section className="px-4 md:px-6 lg:px-10 pb-24">
          <div className="max-w-screen-2xl mx-auto">
            {/* Mobile: 1 Column */}
            <div className="flex sm:hidden flex-col gap-6">
              {galleryImages.map((image, index) => (
                <MasonryCard key={`mobile-${index}`} image={image} index={index} />
              ))}
            </div>

            {/* Tablet: 2 Columns */}
            <div className="hidden sm:flex lg:hidden gap-6 w-full">
              <div className="flex flex-col gap-6 flex-1">
                {galleryImages.filter((_, i) => i % 2 === 0).map((image, index) => (
                  <MasonryCard key={`tablet-0-${index}`} image={image} index={index * 2} />
                ))}
              </div>
              <div className="flex flex-col gap-6 flex-1">
                {galleryImages.filter((_, i) => i % 2 === 1).map((image, index) => (
                  <MasonryCard key={`tablet-1-${index}`} image={image} index={index * 2 + 1} />
                ))}
              </div>
            </div>

            {/* Desktop: 3 Columns */}
            <div className="hidden lg:flex gap-6 w-full">
              <div className="flex flex-col gap-6 flex-1">
                {galleryImages.filter((_, i) => i % 3 === 0).map((image, index) => (
                  <MasonryCard key={`desktop-0-${index}`} image={image} index={index * 3} />
                ))}
              </div>
              <div className="flex flex-col gap-6 flex-1">
                {galleryImages.filter((_, i) => i % 3 === 1).map((image, index) => (
                  <MasonryCard key={`desktop-1-${index}`} image={image} index={index * 3 + 1} />
                ))}
              </div>
              <div className="flex flex-col gap-6 flex-1">
                {galleryImages.filter((_, i) => i % 3 === 2).map((image, index) => (
                  <MasonryCard key={`desktop-2-${index}`} image={image} index={index * 3 + 2} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ParallaxSection />

        <StatsBanner />

        {/* Cleaned up Featured Moments Grid */}
        <section className="px-6 lg:px-10 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center font-plus-jakarta"
            >
              Featured Moments
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {galleryImages.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900/50 aspect-[4/3] shadow-lg cursor-pointer"
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070914] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="inline-block px-4 py-1.5 bg-violet-600/30 backdrop-blur-md border border-violet-500/50 text-white text-xs font-bold rounded-full mb-3 tracking-wide">
                      {image.category}
                    </span>
                    <h3 className="text-white font-bold text-2xl md:text-3xl leading-snug">
                      {image.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimalist Glassmorphism CTA */}
        <section className="py-24 px-6 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl bg-gradient-to-br from-violet-900/40 to-blue-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 md:p-16 text-center shadow-2xl"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-plus-jakarta">
              Ready to Join the Master Class?
            </h3>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Create your own moments of transformation, growth, and unparalleled impact alongside our leadership team.
            </p>
            <a
              href="/join"
              className="inline-block px-10 py-5 bg-white text-slate-950 font-extrabold text-lg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:bg-violet-50 hover:scale-105 transition-all duration-300 uppercase tracking-widest"
            >
              Get Started Today
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
