import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logoSrc from "../public/logo_roundbck.png";

const socialLinks = [
  { Icon: Instagram, href: "https://www.instagram.com/p/Deq2vj3lrab/?mdxt=OXp4aW85Y3ptZjFn", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/feed/update/activity:7517867059071012864", label: "LinkedIn" },
  { Icon: Facebook, href: "https://m.facebook.com/story.php?story_fbid=pfbid02GJXpUDLykaSf3GdjVkYcWLpc3GHC9vJzEhPvZw7TYBWD3sgcAQ7TVEt4kYbn9oXbl&id=61587141539332", label: "Facebook" },
];

export default function Footer() {
  const linkGroups = {
    Explore: [["About Us", "/about"], ["Gallery", "/gallery"], ["Lessons", "/lessons"]],
    Community: [["Community", "/community"], ["Resources", "/resources"], ["FAQ", "/faq"], ["Contact", "/contact"]],
  };

  return (
    <footer className="bg-[#040713] px-4 pb-5 pt-14 text-white sm:px-6 lg:px-10 lg:pt-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[#040713] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="grid items-center gap-7 bg-[#8B5CF6] px-6 py-8 sm:px-9 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-10">
          <div>
            <h2 className="font-plus-jakarta text-3xl font-bold leading-tight sm:text-4xl">Stay connected with YEMC</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Leadership insights, masterclass updates, and opportunities delivered to your inbox.
            </p>
          </div>
          <form className="flex w-full flex-col gap-3 lg:w-[430px] lg:flex-row" onSubmit={(event) => event.preventDefault()}>
            <input type="email" required aria-label="Email address" placeholder="Email address" className="h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 text-sm text-[#040713] outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-white/70" />
            <button type="submit" className="h-12 shrink-0 rounded-full bg-[#040713] px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-[#040713]">Subscribe</button>
          </form>
        </div>

        <div className="grid gap-10 px-6 py-10 sm:px-9 lg:grid-cols-[1.6fr_0.7fr_0.7fr] lg:px-12 lg:py-12">
          <div>
            <a href="/" className="inline-flex items-center gap-3">
              <img src={logoSrc} alt="YEMC logo" className="h-12 w-12 rounded-full object-contain" />
              <span className="font-plus-jakarta text-xl font-bold">Young Executive Master Class</span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">Raising the next generation of Christian business executives through mentorship, faith and excellence.</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(linkGroups).map(([title, entries]) => (
            <div key={title}>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">{title}</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {entries.map(([label, href]) => <li key={label}><a href={href} className="transition hover:text-[#A78BFA]">{label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-6 flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-slate-500 sm:mx-9 sm:flex-row sm:items-center sm:justify-between lg:mx-12">
          <p>© {new Date().getFullYear()} Young Executive Master Class. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#8B5CF6]" /><span>Accra, Ghana</span></div>
        </div>
      </div>
    </footer>
  );
}
