import {
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  Send,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatDate, formatPhone } from "@/utils/formatters";
import { useState } from "react";
export function ApplicationCard({ application, onEmail, onDelete, isDark }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all ${isDark ? "bg-slate-900 border border-slate-800 hover:border-violet-500/50" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-400/70 shadow-sm hover:shadow-md"}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-violet-500/10" : "bg-purple-100"}`}
            >
              <User
                size={24}
                className={isDark ? "text-violet-400" : "text-purple-600"}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-bold text-lg mb-1 truncate ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {application.full_name}
              </p>
              <p
                className={`text-sm truncate ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {application.email}
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {application.status && (
              <div className="text-right">
                <p
                  className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                >
                  Status
                </p>
                <p
                  className={`font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`}
                >
                  {application.status}
                </p>
              </div>
            )}
            <div className="text-right">
              <p
                className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
              >
                Submitted
              </p>
              <p
                className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}
              >
                {formatDate(application.created_at)}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp
                size={24}
                className={isDark ? "text-slate-400" : "text-gray-400"}
              />
            ) : (
              <ChevronDown
                size={24}
                className={isDark ? "text-slate-400" : "text-gray-400"}
              />
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4 mt-3 ml-16">
          {application.status && (
            <div>
              <p
                className={`text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`}
              >
                Status:{" "}
                <span
                  className={`font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`}
                >
                  {application.status}
                </span>
              </p>
            </div>
          )}
          <div>
            <p
              className={`text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`}
            >
              {formatDate(application.created_at)}
            </p>
          </div>
        </div>
      </button>
      {isExpanded && (
        <div
          className={`px-6 pb-6 ${isDark ? "border-t border-slate-800/50" : "border-t border-purple-100"}`}
        >
          <div className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-green-500/10" : "bg-green-100"}`}
                >
                  <Phone
                    size={20}
                    className={isDark ? "text-green-400" : "text-green-600"}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${application.phone}`}
                    className={`transition-colors ${isDark ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}
                  >
                    {formatPhone(application.phone)}
                  </a>
                </div>
              </div>
              {application.status && (
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-purple-500/10" : "bg-purple-100"}`}
                  >
                    <Briefcase
                      size={20}
                      className={isDark ? "text-purple-400" : "text-purple-600"}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                    >
                      Status
                    </p>
                    <p
                      className={`font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}
                    >
                      {application.status}
                    </p>
                  </div>
                </div>
              )}
              {application.institution && (
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-cyan-500/10" : "bg-cyan-100"}`}
                  >
                    <GraduationCap
                      size={20}
                      className={isDark ? "text-cyan-400" : "text-cyan-600"}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                    >
                      {application.status === "Student"
                        ? "School"
                        : application.status === "Working"
                          ? "Company"
                          : "Institution"}
                    </p>
                    <p
                      className={`font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}
                    >
                      {application.institution}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${application.consent_given ? (isDark ? "bg-green-500/10" : "bg-green-100") : (isDark ? "bg-slate-800" : "bg-gray-100")}`}
                >
                  <BadgeCheck
                    size={20}
                    className={application.consent_given ? (isDark ? "text-green-400" : "text-green-600") : (isDark ? "text-slate-400" : "text-gray-500")}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                  >
                    YEMC Forum Consent
                  </p>
                  <p
                    className={`font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}
                  >
                    {application.consent_given ? "Confirmed" : "Not recorded"}
                  </p>
                  {application.consent_given && application.consent_given_at && (
                    <p className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`}>
                      {formatDate(application.consent_given_at)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare
                  size={18}
                  className={isDark ? "text-slate-500" : "text-gray-500"}
                />
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-gray-500"}`}
                >
                  Message
                </p>
              </div>
              <div
                className={`rounded-xl p-4 max-h-48 overflow-y-auto ${isDark ? "bg-slate-950 border border-slate-800" : "bg-purple-50/50 border border-purple-100"}`}
              >
                <p
                  className={`whitespace-pre-wrap leading-relaxed ${isDark ? "text-slate-300" : "text-gray-700"}`}
                >
                  {application.message}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEmail({
                      id: application.id,
                      name: application.full_name,
                      email: application.email,
                    });
                  }}
                  className={`flex-1 rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-all ${isDark ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg"}`}
                >
                  <Send size={18} />
                  Email
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(application);
                  }}
                  className={`rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-all ${isDark ? "bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30" : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"}`}
                  title="Delete application"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
