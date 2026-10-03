"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import { Play, Filter, Star, X, Download, Video, FileText } from "lucide-react";
import { useState } from "react";
export default function LessonsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const speakers = [
    {
      name: "Apostle Isaac Ali Asomah",
      title: "CEO & Founder",
      bio: "Visionary leader and founder of the Young Executive Master Class program with over 20 years of executive experience.",
      tags: ["Leadership", "Strategy"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      materials: [
        {
          type: "video",
          title: "Leadership Fundamentals Masterclass",
          duration: "45 min",
        },
        {
          type: "pdf",
          title: "Executive Leadership Framework",
          pages: "24 pages",
        },
        {
          type: "video",
          title: "Building High-Performance Teams",
          duration: "38 min",
        },
      ],
    },
    {
      name: "Mr. C.B Asante",
      title: "Business Strategist",
      bio: "Renowned business strategist specializing in market expansion and corporate growth strategies.",
      tags: ["Business", "Strategy"],
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      materials: [
        { type: "pdf", title: "Strategic Planning Guide", pages: "32 pages" },
        {
          type: "video",
          title: "Market Expansion Strategies",
          duration: "52 min",
        },
        {
          type: "pdf",
          title: "Growth Frameworks for Executives",
          pages: "18 pages",
        },
      ],
    },
    {
      name: "Rev. Nora Ali",
      title: "Spiritual Leadership",
      bio: "Inspirational speaker on ethical leadership and integrating spiritual values in business.",
      tags: ["Ethics", "Spirituality"],
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      materials: [
        {
          type: "video",
          title: "Faith in the Marketplace",
          duration: "41 min",
        },
        {
          type: "pdf",
          title: "Ethical Leadership Principles",
          pages: "22 pages",
        },
        { type: "video", title: "Leading with Integrity", duration: "35 min" },
      ],
    },
    {
      name: "Mr. Oliver Detty",
      title: "Innovation Expert",
      bio: "Leading expert in business innovation and digital transformation strategies.",
      tags: ["Innovation", "Technology"],
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      materials: [
        {
          type: "video",
          title: "Digital Transformation Essentials",
          duration: "48 min",
        },
        {
          type: "pdf",
          title: "Innovation Toolkit for Leaders",
          pages: "28 pages",
        },
        {
          type: "video",
          title: "Emerging Tech Trends 2026",
          duration: "44 min",
        },
      ],
    },
    {
      name: "Mr. Alex Boateng Atakorah",
      title: "Networking Specialist",
      bio: "Master of professional networking and relationship building in corporate environments.",
      tags: ["Networking", "Relationships"],
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      materials: [
        {
          type: "video",
          title: "Building Your Professional Network",
          duration: "39 min",
        },
        {
          type: "pdf",
          title: "Networking Strategies That Work",
          pages: "20 pages",
        },
        {
          type: "video",
          title: "Relationship Capital in Business",
          duration: "42 min",
        },
      ],
    },
  ];
  const galleryItems = [
    {
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      title: "Opening Keynote",
      description: "Apostle Isaac Ali Asomah delivering the opening address",
      category: "Keynote",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      title: "Signing In",
      description: "All participants keying in their credentials",
      category: "Workshops",
    },
    {
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      title: "Spiritual Leadership",
      description: "Rev. Nora Ali leading the opening prayer",
      category: "Keynote",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      title: "Innovation Workshop",
      description: "Mr. Oliver Detty demonstrating new technologies",
      category: "Workshops",
    },
    {
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      title: "Networking Session",
      description: "Mr. Alex Boateng Atakorah facilitating connections",
      category: "Networking",
    },
    {
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      title: "Photo Shoots",
      description: "Young participants taking photos before and after event",
      category: "Awards",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      title: "Questions and Answers",
      description:
        "Young executives ask questions during sessions held by speakers",
      category: "Workshops",
    },
    {
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
      title: "Group Photo",
      description: "Participants applauding speakers",
      category: "Networking",
    },
  ];
  const testimonials = [
    {
      name: "Larry Glover",
      role: "Software Developer at YEMC",
      content:
        "YEMC has revolutionized my approach to business leadership. The Christian perspective combined with practical business insights has given me a unique edge in my career development.",
      rating: 5,
    },
    {
      name: "Pastor Esther",
      role: "Startup Sponsor",
      content:
        "Mr. Asante's strategic frameworks are game-changers. I've already implemented three of his models in our expansion plan.",
      rating: 5,
    },
    {
      name: "Mrs. Amuzu",
      role: "Community Member",
      content:
        "The networking opportunities were incredible. Thanks to Mr. Atakorah's session, I secured two potential investors for my venture.",
      rating: 5,
    },
  ];
  const filters = ["All", "Keynote", "Workshops", "Networking", "Awards"];
  const filteredGallery =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Header />
      <main className="pt-24">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight">
                Learn From The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Best
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Access world-class resources, engage with distinguished
                speakers, and explore past sessions that shaped the careers of
                hundreds of young executives.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Our Faculty
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
                Distinguished Speakers
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <OptimizedImage
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-violet-500"
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">
                        {speaker.name}
                      </h4>
                      <p className="text-violet-400 text-sm font-medium">
                        {speaker.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {speaker.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {speaker.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedSpeaker(speaker)}
                    className="flex items-center gap-2 text-white font-bold hover:text-violet-400 transition-colors group"
                  >
                    <Play size={16} />
                    View Materials
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Past Events
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta mb-8">
                Event Gallery
              </h3>
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                      activeFilter === filter
                        ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all"
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h4 className="text-white font-bold text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold border border-slate-800 hover:border-violet-500 transition-all">
                Load More Photos
              </button>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Success Stories
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
                What Participants Said
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6 text-sm italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-violet-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta">
                  Join Us Next Year!
                </h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  The Young Executive Master Class 2026 will be even bigger and
                  better. Be the first to know when registration opens.
                </p>
                <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between rounded-t-[40px]">
              <div className="flex items-center gap-4">
                <OptimizedImage
                  src={selectedSpeaker.image}
                  alt={selectedSpeaker.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500"
                />
                <div>
                  <h3 className="text-white font-bold text-xl">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-violet-400 text-sm">
                    {selectedSpeaker.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="p-8">
              <p className="text-slate-400 mb-8 leading-relaxed">
                {selectedSpeaker.bio}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedSpeaker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-violet-500/10 text-violet-400 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-bold text-lg mb-6">
                Available Materials
              </h4>
              <div className="space-y-4">
                {selectedSpeaker.materials.map((material, index) => (
                  <div
                    key={index}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                        {material.type === "video" ? (
                          <Video size={20} className="text-violet-500" />
                        ) : (
                          <FileText size={20} className="text-violet-500" />
                        )}
                      </div>
                      <div>
                        <h5 className="text-white font-bold mb-1">
                          {material.title}
                        </h5>
                        <p className="text-slate-500 text-sm">
                          {material.duration || material.pages}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-violet-400 font-bold hover:text-violet-300 transition-colors">
                      <Download size={18} />
                      Access
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-violet-900/20 to-blue-900/20 border border-violet-500/20 rounded-2xl">
                <p className="text-slate-400 text-sm text-center">
                  <strong className="text-white">Note:</strong> Materials are
                  available exclusively to registered YEMC participants.
                  <a
                    href="/contact"
                    className="text-violet-400 hover:text-violet-300 ml-1"
                  >
                    Contact us
                  </a>{" "}
                  to get access.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
