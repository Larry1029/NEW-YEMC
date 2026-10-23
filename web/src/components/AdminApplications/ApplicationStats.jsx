import { BadgeCheck, CalendarPlus, QrCode, Users } from "lucide-react";

const metrics = [
  {
    key: "total",
    label: "Total Applicants",
    Icon: Users,
    iconClass: "text-blue-600",
    iconBackground: "bg-blue-50",
  },
  {
    key: "applicationsToday",
    label: "Applications Today",
    Icon: CalendarPlus,
    iconClass: "text-violet-600",
    iconBackground: "bg-violet-50",
  },
  {
    key: "consentConfirmed",
    label: "Consent Confirmed",
    Icon: BadgeCheck,
    iconClass: "text-emerald-600",
    iconBackground: "bg-emerald-50",
  },
  {
    key: "checkedIn",
    label: "Checked In",
    Icon: QrCode,
    iconClass: "text-amber-600",
    iconBackground: "bg-amber-50",
  },
];

export function ApplicationStats({ stats, isDark }) {
  return (
    <section
      aria-label="Applicant statistics"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {metrics.map(({ key, label, Icon, iconClass, iconBackground }) => (
        <article
          key={key}
          className={`min-w-0 rounded-2xl border p-3 sm:p-4 ${
            isDark
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-200 bg-slate-50/90 shadow-sm"
          }`}
        >
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                isDark ? "bg-slate-800" : iconBackground
              }`}
            >
              <Icon
                size={18}
                className={isDark ? "text-violet-300" : iconClass}
              />
            </div>
            <p
              className={`min-w-0 truncate text-xl font-extrabold tracking-tight sm:text-2xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {stats?.[key] ?? "—"}
            </p>
          </div>
          <p
            className={`mt-2 text-xs leading-4 sm:text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {label}
          </p>
        </article>
      ))}
    </section>
  );
}
