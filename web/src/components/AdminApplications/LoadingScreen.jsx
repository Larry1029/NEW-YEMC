export function LoadingScreen({ isDark }) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isDark ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`}
    >
      <div
        className={`w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`}
      ></div>
    </div>
  );
}
