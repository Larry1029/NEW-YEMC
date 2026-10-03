import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";
export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 border-t border-slate-900 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 lg:mb-16">
          <div className="col-span-1 lg:col-span-1">
            <a
              href="/"
              className="flex items-center justify-center gap-2 mb-4 md:mb-5 lg:mb-6 md:justify-start"
            >
              <OptimizedImage
                src="https://ucarecdn.com/9442830f-b64a-4b7c-9724-5bfdf0161590/-/format/auto/"
                alt="YEMC Logo"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg md:rounded-xl"
              />
              <span className="text-white font-bold text-xl md:text-2xl tracking-tight">
                YEMC
              </span>
            </a>
            <p className="text-slate-400 mb-5 md:mb-6 lg:mb-8 leading-relaxed text-sm md:text-base">
              Raising the next generation of Christian business executives.
            </p>
            <div className="flex justify-center gap-3 md:gap-4 md:justify-start">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500 transition-all"
                >
                  <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 md:mb-5 lg:mb-6 text-base md:text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3 lg:space-y-4">
              {[
                "About Us",
                "Our Programs",
                "Resource Library",
                "Testimonials",
                "Privacy Policy",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-violet-400 transition-colors text-sm md:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 md:mb-5 lg:mb-6 text-base md:text-lg">
              Contact Us
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start justify-center gap-2 text-center text-slate-400 text-sm md:gap-3 md:text-base md:justify-start md:text-left">
                <MapPin
                  className="w-[18px] h-[18px] md:w-5 md:h-5 text-violet-500 flex-shrink-0 mt-1"
                />
                <span>123 Business Ave, Suite 100, City, ST 12345</span>
              </li>
              <li className="flex items-center justify-center gap-2 md:gap-3 text-slate-400 text-sm md:text-base md:justify-start">
                <Phone
                  className="w-[18px] h-[18px] md:w-5 md:h-5 text-violet-500 flex-shrink-0"
                />
                <span>(+233) 26 885-1285</span>
              </li>
              <li className="flex items-center justify-center gap-2 md:gap-3 text-slate-400 text-sm md:text-base md:justify-start">
                <Mail
                  className="w-[18px] h-[18px] md:w-5 md:h-5 text-violet-500 flex-shrink-0"
                />
                <span>theyoungexecutivemasterclass.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 md:mb-5 lg:mb-6 text-base md:text-lg">
              Newsletter
            </h4>
            <p className="text-slate-400 mb-3 md:mb-4 text-xs md:text-sm">
              Get executive insights and program updates delivered to your
              inbox.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg md:rounded-xl py-2.5 md:py-3 px-3 md:px-4 text-white text-sm md:text-base focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-violet-600 hover:bg-violet-500 text-white px-3 md:px-4 rounded-lg transition-colors font-bold text-xs md:text-sm">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="pt-6 md:pt-7 lg:pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-slate-500 text-xs md:text-sm">
            © 2025 Young Executive Master Class. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs md:text-sm flex items-center gap-1">
            Made for the next generation of leaders.
          </p>
        </div>
      </div>
    </footer>
  );
}
