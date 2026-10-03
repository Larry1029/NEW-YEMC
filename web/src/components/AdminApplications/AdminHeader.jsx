import {
  Search,
  ArrowLeft,
  LogOut,
  Users,
  Download,
  Upload,
  Sun,
  Moon,
} from "lucide-react";
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
}) {
  const isDark = theme === "dark";
  return (
    <div
      className={`${isDark ? "bg-slate-900/50 border-b border-slate-800" : "bg-white/40"} backdrop-blur-md sticky top-0 z-20`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 group">
              <OptimizedImage
                src="https://ucarecdn.com/dcbe7a42-7e7a-473b-96c1-4a135fdecc95/-/format/auto/"
                alt="YEMC Logo"
                className="w-12 h-12 rounded-xl shadow-lg group-hover:scale-105 transition-transform"
              />
              <span
                className={`font-bold text-2xl tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}
                style={{ fontFamily: "'Dela Gothic One', sans-serif" }}
              >
                YEMC
              </span>
            </a>
            <div
              className={`hidden md:block w-px h-12 ${isDark ? "bg-slate-700" : "bg-gray-300"}`}
            ></div>
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
          <div className="md:hidden">
            <h1
              className={`text-2xl font-extrabold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              {getGreeting()}! 👋
            </h1>
            <p
              className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}
            >
              {total} application{total !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <label
              className={`p-3 rounded-xl transition-all cursor-pointer ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
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
              className={`p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Export to CSV"
            >
              <Download size={20} />
            </button>
            <a
              href="/admin/users"
              className={`p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Manage Users"
            >
              <Users size={20} />
            </a>
            <a
              href="/account/logout"
              className={`p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Logout"
            >
              <LogOut size={20} />
            </a>
            <a
              href="/"
              className={`p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
              title="Back to Home"
            >
              <ArrowLeft size={20} />
            </a>
          </div>
        </div>
        <div className="relative">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-gray-400"}`}
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full rounded-2xl pl-12 pr-4 py-4 focus:outline-none transition-all ${isDark ? "bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 text-gray-900 placeholder-gray-400 focus:border-purple-400 shadow-sm"}`}
          />
        </div>
      </div>
    </div>
  );
}
