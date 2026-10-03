import { MessageSquare } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
export function ApplicationsList({
  applications,
  isLoading,
  error,
  searchQuery,
  onEmail,
  onDelete,
  isDark,
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className={`w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`}
        ></div>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className={`rounded-2xl p-6 text-center ${isDark ? "bg-red-500/10 border border-red-500" : "bg-red-50 border border-red-200"}`}
      >
        <p className={isDark ? "text-red-400" : "text-red-600"}>
          Failed to load applications. Please try again.
        </p>
      </div>
    );
  }
  if (applications.length === 0) {
    return (
      <div
        className={`rounded-2xl p-12 text-center ${isDark ? "bg-slate-900/50 border border-slate-800" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 shadow-sm"}`}
      >
        <MessageSquare
          size={48}
          className={`mx-auto mb-4 ${isDark ? "text-slate-600" : "text-purple-300"}`}
        />
        <h3
          className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}
        >
          No Applications Yet
        </h3>
        <p className={isDark ? "text-slate-400" : "text-gray-600"}>
          {searchQuery
            ? "No applications match your search."
            : "Applications will appear here when people submit the join form."}
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onEmail={onEmail}
          onDelete={onDelete}
          isDark={isDark}
        />
      ))}
    </div>
  );
}
