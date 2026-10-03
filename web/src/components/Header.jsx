"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useLocation } from "react-router";
import logoSrc from "../public/yef-logo.jpg";
import OptimizedImage from "./OptimizedImage";
export default function Header({ hideUntilScroll = false }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Lessons", href: "/lessons" },
  ];
  const resourcesLinks = [
    { name: "Community", href: "/community" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
  ];
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 pb-2 transition-[opacity,transform] duration-300 md:px-0 md:pt-0 md:pb-0 ${hideUntilScroll && !isScrolled ? "pointer-events-none -translate-y-full opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100" : "translate-y-0 opacity-100"}`}
      >
        <div className={`w-full mx-auto flex flex-col justify-center rounded-3xl border border-transparent transition-all duration-300 max-w-[1600px] ${isScrolled ? `md:max-w-5xl md:h-20 md:px-5 ${isMenuOpen ? "bg-transparent shadow-none backdrop-blur-none" : "bg-slate-950/45 shadow-xl backdrop-blur-xl"} md:border md:border-white/10` : "md:h-24 bg-transparent md:border-0 md:px-4 lg:px-4"}`}>
          <div className="flex items-center justify-between bg-transparent md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:justify-items-stretch rounded-3xl md:rounded-none px-5 py-3 md:px-0 md:py-0 w-full">
            <a href="/" className="flex items-center gap-2 group">
              <OptimizedImage
                loading="eager"
                fetchPriority="high"
                src={logoSrc}
                alt="YEF Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain bg-white shadow-none md:shadow-lg group-hover:scale-105 transition-transform"
              />
              <span
                className="text-white font-bold text-xl md:text-2xl tracking-tight"
                style={{ fontFamily: "'Dela Gothic One', sans-serif" }}
              >
                YEMC
              </span>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="relative flex h-11 w-11 items-center justify-center text-white md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`absolute h-[2.5px] w-6 rounded-full bg-white transition-transform duration-200 ease-out ${isMenuOpen ? "rotate-45" : "-translate-y-[7px]"}`} />
              <span className={`absolute h-[2.5px] w-6 rounded-full bg-white transition-all duration-200 ease-out ${isMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`} />
              <span className={`absolute h-[2.5px] w-6 rounded-full bg-white transition-transform duration-200 ease-out ${isMenuOpen ? "-rotate-45" : "translate-y-[7px]"}`} />
            </button>
            <nav className="hidden md:flex items-center justify-self-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-medium text-sm transition-colors ${isActive
                        ? "text-violet-400 font-bold"
                        : "text-slate-300 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div
                className="relative group"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 font-medium text-sm transition-colors ${resourcesLinks.some((r) => r.href === location.pathname)
                      ? "text-violet-400 font-bold"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Resources
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isResourcesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isResourcesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                      {resourcesLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            className={`block px-6 py-3 transition-colors ${isActive
                                ? "text-white bg-violet-600 font-semibold"
                                : "text-slate-300 hover:text-white hover:bg-slate-800"
                              }`}
                          >
                            {link.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
            <a
              href="/contact"
              className="hidden md:flex items-center justify-self-end gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-violet-100 group"
            >
              Contact Us
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
          {isMenuOpen && (
            <nav
              id="mobile-menu"
              aria-label="Mobile navigation"
              className="mobile-menu-enter md:hidden mt-2 rounded-3xl border border-white/10 bg-slate-950/45 p-6 flex flex-col gap-4 text-center shadow-xl backdrop-blur-xl"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium text-base py-2 px-3 rounded-lg transition-all ${isActive
                        ? "text-white bg-violet-600 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className={`flex items-center justify-center gap-2 w-full font-medium text-base py-2 px-3 rounded-lg transition-all ${resourcesLinks.some((r) => r.href === location.pathname)
                      ? "text-white bg-violet-600 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                >
                  Resources
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${isResourcesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isResourcesOpen && (
                  <div className="mt-2 ml-3 space-y-2">
                    {resourcesLinks.map((link) => {
                      const isActive = location.pathname === link.href;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block font-medium py-2 px-3 rounded-lg transition-all ${isActive
                              ? "text-white bg-violet-600 font-semibold"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            }`}
                        >
                          {link.name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              <a
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-center mt-2"
              >
                Contact Us
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
