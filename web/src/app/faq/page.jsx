"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is the Young Executive Master Class (YEMC)?",
          a: "YEMC is a comprehensive leadership development program designed specifically for young professionals who want to excel in their careers while maintaining their Christian values. We offer masterclasses, mentorship, and a supportive community of faith-driven executives.",
        },
        {
          q: "Who can join YEMC?",
          a: "YEMC is open to young professionals, entrepreneurs, and aspiring executives who are committed to integrating their Christian faith with their professional development. Whether you're just starting your career or already in a leadership position, our programs are designed to meet you where you are.",
        },
        {
          q: "Where are YEMC programs held?",
          a: "Our flagship in-person events are held at the AH Hotel in East Legon, Accra, Ghana. We also offer virtual programs and masterclasses that can be accessed from anywhere in the world.",
        },
      ],
    },
    {
      category: "Programs & Registration",
      questions: [
        {
          q: "How do I register for a program?",
          a: "You can register by visiting our Lessons page, selecting the program you're interested in, and filling out the registration form. You can also contact us directly for personalized assistance with the registration process.",
        },
        {
          q: "What is the cost of YEMC programs?",
          a: "Program costs vary depending on the specific masterclass or event. We offer different pricing tiers to accommodate various budgets and provide early bird discounts. Contact us for detailed pricing information for your program of interest.",
        },
        {
          q: "How long do the programs last?",
          a: "Our programs range from one-day intensive workshops to multi-week masterclasses. The Young Executive Master Class flagship program typically runs for 6-8 weeks with weekly sessions.",
        },
        {
          q: "Are there payment plans available?",
          a: "Yes, we offer flexible payment plans to make our programs accessible. Contact our team to discuss payment options that work for your situation.",
        },
      ],
    },
    {
      category: "Content & Learning",
      questions: [
        {
          q: "What topics are covered in the masterclasses?",
          a: "Our curriculum covers leadership development, strategic thinking, ethical business practices, spiritual integration in the workplace, networking, innovation, and personal branding. Each program is designed to provide both theoretical knowledge and practical skills.",
        },
        {
          q: "Are the sessions recorded?",
          a: "Yes, all sessions are recorded and made available to registered participants. You'll have access to session recordings and materials through our online platform.",
        },
        {
          q: "Do I get a certificate upon completion?",
          a: "Yes, participants who complete the full program receive a certificate of completion from YEMC, recognizing their commitment to professional and spiritual development.",
        },
      ],
    },
    {
      category: "Community & Support",
      questions: [
        {
          q: "What happens after I complete a program?",
          a: "Upon completion, you become part of our alumni network with continued access to resources, networking events, and ongoing learning opportunities. We foster a lifelong community of support and growth.",
        },
        {
          q: "Can I access materials after the program ends?",
          a: "Yes, all registered participants retain access to course materials, recordings, and resources even after the program concludes.",
        },
        {
          q: "How can I connect with other YEMC members?",
          a: "We have an active community platform where members can connect, share experiences, and collaborate. We also host regular networking events, both virtual and in-person.",
        },
      ],
    },
    {
      category: "Speakers & Mentorship",
      questions: [
        {
          q: "Who are the speakers and instructors?",
          a: "Our faculty includes accomplished business leaders, seasoned executives, and spiritual mentors who have extensive experience in their fields. You can learn more about our speakers on the Lessons page.",
        },
        {
          q: "Is one-on-one mentorship available?",
          a: "Yes, we offer mentorship opportunities as part of select programs. Our mentorship program pairs participants with experienced leaders for personalized guidance and support.",
        },
      ],
    },
  ];
  const toggleFAQ = (categoryIndex, questionIndex) => {
    const flatIndex =
      faqs
        .slice(0, categoryIndex)
        .reduce((sum, cat) => sum + cat.questions.length, 0) + questionIndex;
    setOpenIndex(openIndex === flatIndex ? null : flatIndex);
  };
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Header />
      <main className="pt-24">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Questions
                </span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Everything you need to know about YEMC programs, community, and
                how to get started.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const flatIndex =
                      faqs
                        .slice(0, categoryIndex)
                        .reduce((sum, cat) => sum + cat.questions.length, 0) +
                      questionIndex;
                    const isOpen = openIndex === flatIndex;
                    return (
                      <div
                        key={questionIndex}
                        className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all"
                      >
                        <button
                          onClick={() =>
                            toggleFAQ(categoryIndex, questionIndex)
                          }
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <h3 className="text-white font-bold text-lg pr-4">
                            {faq.q}
                          </h3>
                          <ChevronDown
                            size={24}
                            className={`text-violet-500 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          } overflow-hidden`}
                        >
                          <div className="px-6 pb-6">
                            <p className="text-slate-400 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta">
                  Still Have Questions?
                </h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  Our team is here to help! Get in touch and we'll respond as
                  soon as possible.
                </p>
                <a
                  href="/contact"
                  className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl inline-block"
                >
                  Contact Us
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
