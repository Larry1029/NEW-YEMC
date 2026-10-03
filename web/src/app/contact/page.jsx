"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }, 1500);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const contactInfo = [
    {
      icon: <Mail size={24} className="text-violet-500" />,
      title: "Email",
      value: "theyoungexecutivemasterclass@gmail.com",
      link: "mailto:theyoungexecutivemasterclass@gmail.com",
    },
    {
      icon: <Phone size={24} className="text-violet-500" />,
      title: "Phone",
      value: "(+233) 26 885-1285",
      link: "tel:+233268851285",
    },
    {
      icon: <MapPin size={24} className="text-violet-500" />,
      title: "Location",
      value: "AH Hotel - East Legon, Accra",
      link: null,
    },
  ];
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Header />
      <main className="pt-24">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight">
                Get In{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Have questions about YEMC? We're here to help! Fill out the form
                and our team will get back to you shortly.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4">
                    Contact Information
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta mb-6">
                    Let's Connect
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Whether you're interested in joining our next masterclass,
                    have questions about our programs, or want to learn more
                    about becoming a speaker, we'd love to hear from you.
                  </p>
                </div>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-1">
                            {info.title}
                          </h4>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-slate-400 hover:text-violet-400 transition-colors break-all"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-slate-400">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden lg:block relative">
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
                  <div className="bg-gradient-to-br from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-3xl p-8">
                    <p className="text-white text-lg font-medium mb-2">
                      Office Hours
                    </p>
                    <p className="text-slate-400 text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM (GMT)
                    </p>
                    <p className="text-slate-400 text-sm">
                      Saturday: 10:00 AM - 2:00 PM (GMT)
                    </p>
                    <p className="text-slate-400 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-white font-medium mb-2 text-sm"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2 text-sm"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white font-medium mb-2 text-sm"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white font-medium mb-2 text-sm"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-5 rounded-2xl font-extrabold text-lg hover:from-violet-700 hover:to-blue-700 transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      "Sending..."
                    ) : status === "success" ? (
                      "Message Sent!"
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                  {status === "success" && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
                      <p className="text-green-400 font-medium">
                        Thank you! We'll get back to you soon.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-plus-jakarta">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Join hundreds of young executives who have elevated their
                  leadership skills and deepened their faith through our
                  transformative programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/lessons"
                    className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-violet-100 transition-all"
                  >
                    View Programs
                  </a>
                  <a
                    href="/#about"
                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold border border-slate-800 hover:border-violet-500 transition-all"
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
