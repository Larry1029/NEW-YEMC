import { Quote, Star } from "lucide-react";
export default function Testimonials() {
  const testimonials = [
    {
      name: "Larry Glover",
      role: "IT head at YEMC",
      image:
        "https://ucarecdn.com/b4eaf79a-b87d-4810-b811-098932f52071/-/format/auto/",
      content:
        "YEMC has revolutionized my approach to business leadership. The Christian perspective combined with practical business insights has given me a unique edge in my career development.",
    },
    {
      name: "Benedicta Afi",
      role: "Community Member",
      image:
        "https://ucarecdn.com/785f0d16-77f9-4520-8b7b-572a606afa18/-/format/auto/",
      content:
        "The mentorship program at YEMC has been transformative. The blend of spiritual wisdom and business acumen has helped me make more balanced and ethical decisions in my leadership role.",
    },
    {
      name: "Nana Efua",
      role: "Community Member",
      image:
        "https://ucarecdn.com/8b9b1c65-6693-4ae8-8b75-8d886d22c137/-/format/auto/",
      content:
        "As a young entrepreneur, YEMC provided me with the foundation I needed. The practical resources and spiritual guidance have been instrumental in building my business with integrity.",
    },
  ];
  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 lg:py-24 bg-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4">
              Success Stories
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-5 lg:mb-6 font-plus-jakarta">
              What Our Fellows Say
            </h3>
            <p className="text-slate-400 text-sm md:text-base lg:text-lg mb-6 md:mb-7 lg:mb-8 leading-relaxed">
              Join hundreds of Christian professionals who have transformed
              their careers and business practices through our masterclass.
            </p>

          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full"></div>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-slate-800 border border-slate-700 relative group transition-all duration-300 hover:bg-slate-700/50 ${
                  i === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="absolute top-4 md:top-5 lg:top-6 right-4 md:right-5 lg:right-6 text-violet-500/20 group-hover:text-violet-500 transition-colors">
                  <Quote className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10" />
                </div>
                <p className="text-slate-300 mb-5 md:mb-6 lg:mb-8 italic leading-relaxed relative z-10 text-xs md:text-sm lg:text-base">
                  "{t.content}"
                </p>
                <p className="text-slate-500 text-[10px] md:text-xs tracking-wide">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
