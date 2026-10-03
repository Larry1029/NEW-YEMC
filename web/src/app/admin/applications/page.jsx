"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/utils/useUser";
import { useApplications } from "@/hooks/useApplications";
import { useTheme } from "@/hooks/useTheme";
import { exportToCSV } from "@/utils/exportCSV";
import { AdminHeader } from "@/components/AdminApplications/AdminHeader";
import { ApplicationsList } from "@/components/AdminApplications/ApplicationsList";
import { EmailModal } from "@/components/AdminApplications/EmailModal";
import { DeleteConfirmModal } from "@/components/AdminApplications/DeleteConfirmModal";
import { LoadingScreen } from "@/components/AdminApplications/LoadingScreen";
export default function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailModal, setEmailModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const { data: user, loading: userLoading } = useUser();
  const { theme, toggleTheme, isDark } = useTheme();
  const { applications, total, isLoading, error, deleteMutation, refetch } =
    useApplications(searchQuery);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  const handleDelete = (application) => {
    setDeleteConfirm(application);
  };
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };
  const handleExport = () => {
    exportToCSV(applications);
  };
  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploadSuccess(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/applications/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload CSV");
      }
      setUploadSuccess(
        `Successfully imported ${data.inserted} of ${data.total} applications`,
      );
      refetch();
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error.message);
    }
    event.target.value = "";
  };
  if (userLoading) {
    return <LoadingScreen isDark={isDark} />;
  }
  if (!user) return null;
  return (
    <div
      className={`min-h-screen font-sans ${isDark ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`}
    >
      {isDark && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>
      )}
      <div className="relative z-10">
        <AdminHeader
          user={user}
          total={total}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={handleExport}
          onUpload={handleUpload}
          hasApplications={applications.length > 0}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {uploadError && (
            <div
              className={`mb-6 p-4 rounded-xl ${isDark ? "bg-red-900/20 border border-red-500/30 text-red-400" : "bg-red-50 border border-red-200 text-red-700"}`}
            >
              <p className="font-semibold">Upload Error</p>
              <p className="text-sm mt-1">{uploadError}</p>
            </div>
          )}
          {uploadSuccess && (
            <div
              className={`mb-6 p-4 rounded-xl ${isDark ? "bg-green-900/20 border border-green-500/30 text-green-400" : "bg-green-50 border border-green-200 text-green-700"}`}
            >
              <p className="font-semibold">Upload Successful</p>
              <p className="text-sm mt-1">{uploadSuccess}</p>
            </div>
          )}
          <ApplicationsList
            applications={applications}
            isLoading={isLoading}
            error={error}
            searchQuery={searchQuery}
            onEmail={setEmailModal}
            onDelete={handleDelete}
            isDark={isDark}
          />
        </div>
      </div>
      <EmailModal
        emailModal={emailModal}
        onClose={() => setEmailModal(null)}
        isDark={isDark}
      />
      <DeleteConfirmModal
        deleteConfirm={deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        isDeleting={deleteMutation.isPending}
        isDark={isDark}
      />
    </div>
  );
}
