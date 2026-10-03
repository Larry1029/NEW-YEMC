"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import {
  Users,
  MessageSquare,
  Calendar,
  Award,
  Globe,
  Handshake,
} from "lucide-react";
export default function CommunityPage() {
  const benefits = [
    {
      icon: <Users size={28} />,
      title: "Exclusive Network",
      description:
        "Connect with 500+ young executives across various industries and sectors.",
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Peer Mentorship",
      description:
        "Learn from fellow alumni and share experiences in a supportive environment.",
    },
    {
      icon: <Calendar size={28} />,
      title: "Regular Events",
      description:
        "Access monthly meetups, workshops, and networking sessions.",
    },
    {
      icon: <Award size={28} />,
      title: "Continuous Learning",
      description:
        "Ongoing access to resources, masterclasses, and industry insights.",
    },
    {
      icon: <Globe size={28} />,
      title: "Global Connections",
      description:
        "Build relationships with Christian business leaders worldwide.",
    },
    {
      icon: <Handshake size={28} />,
      title: "Collaboration Opportunities",
      description:
        "Partner on projects, ventures, and initiatives with community members.",
    },
  ];
  const events = [
    {
      title: "Monthly Leadership Roundtable",
      date: "First Friday of Every Month",
      description:
        "Interactive discussions on current business challenges and opportunities.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Alumni Networking Mixer",
      date: "Quarterly",
      description:
        "Casual meet-and-greet sessions to strengthen community bonds.",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Faith & Business Summit",
      date: "Annual",
      description:
        "Our flagship event bringing together leaders for inspiration and growth.",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    },
  ];
  const testimonials = [
    {
      name: "Emmanuel Kwarteng",
      role: "Tech Entrepreneur",
      content:
        "The YEMC community has been instrumental in my growth. The connections I've made here have opened doors I never imagined.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Grace Mensah",
      role: "Corporate Executive",
      content:
        "Being part of this community means having a support system that truly understands the unique challenges of faith-based leadership.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "David Osei",
      role: "Business Consultant",
      content:
        "The mentorship and accountability I've found here has accelerated my career in ways I couldn't have achieved alone.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
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
                Join Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Community
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Connect with a vibrant network of faith-driven executives who
                are transforming industries and impacting lives across Africa
                and beyond.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Active Members" },
                { number: "50+", label: "Industries" },
                { number: "15+", label: "Countries" },
                { number: "100+", label: "Events Hosted" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-violet-500/50 transition-all"
                >
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Member Benefits
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
                Why Join Us?
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors text-violet-500">
                    {benefit.icon}
                  </div>
                  <h4 className="text-white font-bold text-xl mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Community Activities
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
                Regular Events
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all group"
                >
                  <OptimizedImage
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-8">
                    <div className="text-violet-400 text-sm font-bold mb-2">
                      {event.date}
                    </div>
                    <h4 className="text-white font-bold text-xl mb-3">
                      {event.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                Member Stories
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
                What Our Community Says
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <OptimizedImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-violet-500"
                    />
                    <div>
                      <h4 className="text-white font-bold">
                        {testimonial.name}
                      </h4>
                      <p className="text-violet-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm italic">
                    "{testimonial.content}"
                  </p>
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
                  Ready to Join?
                </h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  Become part of Africa's premier community of faith-driven
                  business leaders.
                </p>
                <a
                  href="/contact"
                  className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl inline-block"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
