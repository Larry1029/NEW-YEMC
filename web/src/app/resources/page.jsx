"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  Lock,
} from "lucide-react";
export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Leadership Guides",
      icon: <BookOpen size={28} />,
      resources: [
        {
          title: "Executive Leadership Framework 2026",
          type: "PDF Guide",
          description:
            "Comprehensive guide to modern leadership principles for Christian executives.",
          pages: "45 pages",
          locked: false,
        },
        {
          title: "Building High-Performance Teams",
          type: "eBook",
          description:
            "Practical strategies for creating and managing exceptional teams.",
          pages: "78 pages",
          locked: true,
        },
        {
          title: "Faith in the Workplace",
          type: "Study Guide",
          description:
            "Navigate the intersection of faith and professional life.",
          pages: "32 pages",
          locked: false,
        },
      ],
    },
    {
      title: "Video Masterclasses",
      icon: <Video size={28} />,
      resources: [
        {
          title: "Strategic Thinking for Executives",
          type: "Video Series",
          description: "5-part masterclass on developing strategic mindsets.",
          duration: "4.5 hours",
          locked: true,
        },
        {
          title: "Networking That Works",
          type: "Workshop Recording",
          description:
            "Learn proven techniques for building meaningful professional relationships.",
          duration: "2 hours",
          locked: true,
        },
        {
          title: "Digital Transformation Essentials",
          type: "Keynote",
          description:
            "Understanding and leading digital change in your organization.",
          duration: "1.5 hours",
          locked: true,
        },
      ],
    },
    {
      title: "Templates & Tools",
      icon: <FileText size={28} />,
      resources: [
        {
          title: "Personal Development Plan Template",
          type: "Excel Template",
          description:
            "Structured template for mapping your career growth journey.",
          size: "2.4 MB",
          locked: false,
        },
        {
          title: "Business Strategy Canvas",
          type: "PDF Worksheet",
          description:
            "Visual tool for developing and refining business strategies.",
          size: "1.8 MB",
          locked: false,
        },
        {
          title: "Leadership Assessment Tool",
          type: "Interactive PDF",
          description:
            "Evaluate your leadership strengths and development areas.",
          size: "3.1 MB",
          locked: true,
        },
      ],
    },
  ];
  const featuredResources = [
    {
      title: "YEMC Alumni Success Stories",
      description:
        "Inspiring journeys of transformation from our community members.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
      type: "Case Studies",
      locked: false,
    },
    {
      title: "Annual Leadership Report 2025",
      description:
        "Key trends and insights shaping executive leadership in Africa.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      type: "Research",
      locked: false,
    },
    {
      title: "Exclusive Member Podcast Series",
      description:
        "Conversations with industry leaders and faith-driven entrepreneurs.",
      image:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80",
      type: "Audio",
      locked: true,
    },
  ];
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Header />
      <main className="pt-24">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight">
                Resource{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Library
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Access curated resources, tools, and content designed to
                accelerate your leadership journey and spiritual growth.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Featured
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
                Top Resources
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all group"
                >
                  <div className="relative">
                    <OptimizedImage
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {resource.locked && (
                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                        <Lock size={14} className="text-violet-400" />
                        <span className="text-violet-400 text-xs font-bold">
                          Members Only
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-violet-400 text-sm font-bold mb-2">
                      {resource.type}
                    </div>
                    <h4 className="text-white font-bold text-xl mb-3">
                      {resource.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <button className="flex items-center gap-2 text-white font-bold hover:text-violet-400 transition-colors">
                      {resource.locked ? (
                        <>
                          <Lock size={16} />
                          Join to Access
                        </>
                      ) : (
                        <>
                          <ExternalLink size={16} />
                          View Resource
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            {resourceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-20 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500">
                    {category.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-plus-jakarta">
                    {category.title}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-violet-400 text-sm font-bold">
                          {resource.type}
                        </div>
                        {resource.locked && (
                          <Lock size={16} className="text-slate-600" />
                        )}
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">
                        {resource.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs">
                          {resource.pages || resource.duration || resource.size}
                        </span>
                        <button className="flex items-center gap-2 text-violet-400 font-bold hover:text-violet-300 transition-colors text-sm">
                          {resource.locked ? (
                            <>
                              <Lock size={14} />
                              Locked
                            </>
                          ) : (
                            <>
                              <Download size={14} />
                              Download
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock size={32} className="text-violet-400" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta">
                  Unlock Full Access
                </h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join YEMC to access our complete library of exclusive
                  resources, masterclasses, templates, and tools designed for
                  your success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/lessons"
                    className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl"
                  >
                    View Programs
                  </a>
                  <a
                    href="/contact"
                    className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-extrabold text-lg border border-slate-800 hover:border-violet-500 transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
