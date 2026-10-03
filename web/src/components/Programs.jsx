import {
  BookOpen,
  Users,
  Trophy,
  Target,
  Shield,
  Zap,
  ChevronRight,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";
export default function Programs() {
  return (
    <section
      id="programs"
      className="py-12 md:py-16 lg:py-24 bg-slate-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4">
            Our Curriculum
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-5 lg:mb-6 font-plus-jakarta">
            Level Up Your Career
          </h3>
          <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Our comprehensive curriculum combines timeless wisdom with modern
            executive strategy to prepare you for the highest levels of
            leadership.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6 lg:mb-8">
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Executive Leadership Training"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 to-purple-900/80"></div>
            </div>
            <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="text-violet-300" size={28} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 font-plus-jakarta">
                Executive Leadership Training
              </h4>
              <p className="text-slate-200 leading-relaxed text-sm md:text-base mb-6">
                Comprehensive program designed to transform aspiring leaders
                into executive powerhouses, combining spiritual wisdom with
                cutting-edge business strategy.
              </p>
              <div className="flex items-center gap-2 text-violet-300 font-bold text-sm md:text-base opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={20} />
              </div>
            </div>
          </div>
          <div className="group p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-amber-400" size={28} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 font-plus-jakarta">
                Empowering Your Career Growth
              </h4>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors text-sm md:text-base flex-1">
                Master the latest in AI, management tech, and productivity
                frameworks for high performance. Unlock tools and strategies
                that propel you to the next level of your career.
              </p>
              <div className="mt-6 flex items-center gap-2 text-amber-400 font-bold text-sm md:text-base opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          <div className="group p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-blue-400" size={28} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-plus-jakarta">
                Spiritual Foundation
              </h4>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors text-xs md:text-sm">
                Navigate complex business landscapes without compromising your
                values or integrity. Build your career on a rock-solid spiritual
                foundation.
              </p>
              <div className="mt-5 md:mt-6 flex items-center gap-2 text-blue-400 font-bold text-xs md:text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={16} />
              </div>
            </div>
          </div>
          <div className="group p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-rose-400" size={28} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-plus-jakarta">
                One-on-One Mentorship
              </h4>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors text-xs md:text-sm">
                Personal guidance from seasoned veterans who have navigated the
                path to the C-Suite. Get tailored advice for your unique career
                journey.
              </p>
              <div className="mt-5 md:mt-6 flex items-center gap-2 text-rose-400 font-bold text-xs md:text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={16} />
              </div>
            </div>
          </div>
          <div className="group p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-violet-400" size={28} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-plus-jakarta">
                Strategic Planning
              </h4>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors text-xs md:text-sm">
                Learn the core pillars of executive presence and decision
                making. Develop strategic thinking skills that set you apart as
                a leader.
              </p>
              <div className="mt-5 md:mt-6 flex items-center gap-2 text-violet-400 font-bold text-xs md:text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={16} />
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=800&fit=crop"
                alt="Professional Development"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-teal-900/80"></div>
            </div>
            <div className="relative z-10 p-5 md:p-6 lg:p-8 h-full flex flex-col justify-end">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="text-emerald-300" size={28} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-plus-jakarta">
                Professional Development
              </h4>
              <p className="text-slate-200 leading-relaxed text-xs md:text-sm mb-5 md:mb-6">
                Continuous learning programs to sharpen your skills and stay
                ahead in a rapidly changing business world.
              </p>
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs md:text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={16} />
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop"
                alt="Career Advancement"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 to-red-900/80"></div>
            </div>
            <div className="relative z-10 p-5 md:p-6 lg:p-8 h-full flex flex-col justify-end">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-orange-300" size={28} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-plus-jakarta">
                Career Advancement
              </h4>
              <p className="text-slate-200 leading-relaxed text-xs md:text-sm mb-5 md:mb-6">
                Strategic pathways and actionable steps to accelerate your climb
                to senior leadership positions.
              </p>
              <div className="flex items-center gap-2 text-orange-300 font-bold text-xs md:text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Learn More <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
