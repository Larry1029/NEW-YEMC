import {
  Search,
  ArrowLeft,
  LogOut,
  Users,
  Download,
  Upload,
  Sun,
  Moon,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { getGreeting, getFirstName } from "@/utils/formatters";
import OptimizedImage from "../OptimizedImage";
export function AdminHeader({
  user,
  total,
  searchQuery,
  onSearchChange,
  onExport,
  onUpload,
  hasApplications,
  theme,
  onToggleTheme,
  isAdmin,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === "dark";
  const actionClass = `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
    isDark
      ? "text-slate-200 hover:bg-slate-800"
      : "text-slate-700 hover:bg-slate-100"
  }`;

  return (
    <div
      className={`${isDark ? "bg-slate-900/50 border-b border-slate-800" : "bg-white/40"} backdrop-blur-md relative z-20 md:sticky md:top-0`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:mb-8">
          <div className="flex items-center justify-between gap-8 md:justify-start md:gap-6">
            <a href="/" className="flex shrink-0 items-center gap-2 group">
              <OptimizedImage
                src="https://ucarecdn.com/dcbe7a42-7e7a-473b-96c1-4a135fdecc95/-/format/auto/"
                alt="YEMC Logo"
                className="h-9 w-9 rounded-xl shadow-lg transition-transform group-hover:scale-105 sm:h-12 sm:w-12"
              />
              <span
                className={`font-bold text-xl tracking-tight sm:text-2xl ${isDark ? "text-white" : "text-gray-800"}`}
                style={{ fontFamily: "'Dela Gothic One', sans-serif" }}
              >
                YEMC
              </span>
            </a>
            <div
              className={`hidden md:block w-px h-12 ${isDark ? "bg-slate-700" : "bg-gray-300"}`}
            ></div>
            <div className="relative ml-auto shrink-0 md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open admin menu"
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isDark
                    ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <MoreVertical size={21} />
              </button>
              {isMenuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close admin menu"
                    className="fixed inset-0 z-30 cursor-default"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div
                    role="menu"
                    className={`absolute right-0 top-12 z-40 w-52 rounded-2xl border p-2 shadow-xl ${
                      isDark
                        ? "border-slate-700 bg-slate-900"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <label className={`${actionClass} cursor-pointer`} role="menuitem">
                      <Upload size={17} />
                      Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(event) => {
                          setIsMenuOpen(false);
                          onUpload(event);
                        }}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onExport();
                      }}
                      disabled={!hasApplications}
                      className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      <Download size={17} />
                      Export CSV
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onToggleTheme();
                      }}
                      className={actionClass}
                    >
                      {isDark ? <Sun size={17} /> : <Moon size={17} />}
                      {isDark ? "Light theme" : "Dark theme"}
                    </button>
                    {isAdmin && (
                      <a
                        href="/admin/users"
                        role="menuitem"
                        onClick={() => setIsMenuOpen(false)}
                        className={actionClass}
                      >
                        <Users size={17} />
                        Manage users
                      </a>
                    )}
                    <a
                      href="/"
                      role="menuitem"
                      onClick={() => setIsMenuOpen(false)}
                      className={actionClass}
                    >
                      <ArrowLeft size={17} />
                      Back to home
                    </a>
                    <a
                      href="/account/logout"
                      role="menuitem"
                      onClick={() => setIsMenuOpen(false)}
                      className={`${actionClass} text-red-600 hover:bg-red-50 ${
                        isDark
                          ? "text-red-300 hover:bg-red-500/10"
                          : "text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <LogOut size={17} />
                      Log out
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className="hidden md:block">
              <h1
                className={`text-3xl font-extrabold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {getGreeting()}, {getFirstName(user?.name)}! 👋
              </h1>
              <p
                className={`text-base ${isDark ? "text-slate-400" : "text-gray-600"}`}
              >
                Manage your {total} application
                {total !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:gap-2">
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className={`rounded-xl p-3 transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <label
              aria-label="Upload CSV"
              className={`rounded-xl p-3 transition-all cursor-pointer ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Upload CSV"
            >
              <Upload size={20} />
              <input
                type="file"
                accept=".csv"
                onChange={onUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={onExport}
              disabled={!hasApplications}
              aria-label="Export applications to CSV"
              className={`rounded-xl p-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Export to CSV"
            >
              <Download size={20} />
            </button>
            {isAdmin && (
              <a
                href="/admin/users"
                aria-label="Manage users"
                className={`rounded-xl p-3 transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
                title="Manage Users"
              >
                <Users size={20} />
              </a>
            )}
            <a
              href="/account/logout"
              aria-label="Log out"
              className={`rounded-xl p-3 transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Logout"
            >
              <LogOut size={20} />
            </a>
            <a
              href="/"
              aria-label="Back to home"
              className={`rounded-xl p-3 transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Back to Home"
            >
              <ArrowLeft size={20} />
            </a>
          </div>
        </div>
        <div className="relative mt-2 md:mt-0">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-gray-400"}`}
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 text-base focus:outline-none transition-all ${isDark ? "bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 text-gray-900 placeholder-gray-400 focus:border-purple-400 shadow-sm"}`}
          />
        </div>
      </div>
    </div>
  );
}
