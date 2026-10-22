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
import { EditApplicationModal } from "@/components/AdminApplications/EditApplicationModal";
import { ApprovalRequests } from "@/components/AdminApplications/ApprovalRequests";
import { ApplicationStats } from "@/components/AdminApplications/ApplicationStats";
import { LoadingScreen } from "@/components/AdminApplications/LoadingScreen";
export default function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailModal, setEmailModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editApplication, setEditApplication] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const { data: user, loading: userLoading } = useUser();
  const { theme, toggleTheme, isDark } = useTheme();
  const {
    applications,
    total,
    stats,
    isAdmin,
    isLoading,
    error,
    deleteMutation,
    requestMutation,
    refetch,
  } = useApplications(searchQuery);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  const handleDelete = (application) => {
    setActionError(null);
    setDeleteConfirm(application);
  };
  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    setActionError(null);
    try {
      if (isAdmin) {
        await deleteMutation.mutateAsync(deleteConfirm.id);
        setActionNotice("The application was deleted.");
      } else {
        await requestMutation.mutateAsync({
          applicationId: deleteConfirm.id,
          action: "delete",
        });
        setActionNotice(
          "Your deletion request was sent to the admin for review and approval.",
        );
      }
      setDeleteConfirm(null);
    } catch (error) {
      setActionError(error.message);
    }
  };
  const handleEditSave = async (changes) => {
    setActionError(null);
    setIsSavingEdit(true);
    try {
      if (isAdmin) {
        const response = await fetch("/api/applications/edit", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editApplication.id, ...changes }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to update application");
        }
        await refetch();
        setActionNotice("The application was updated.");
      } else {
        await requestMutation.mutateAsync({
          applicationId: editApplication.id,
          action: "edit",
          changes,
        });
        setActionNotice(
          "Your edit request was sent to the admin for review and approval. The applicant record will not change until it is approved.",
        );
      }
      setEditApplication(null);
    } catch (error) {
      setActionError(error.message);
    } finally {
      setIsSavingEdit(false);
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
          isAdmin={isAdmin}
        />
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-8">
          <div className="mb-6 md:hidden">
            <ApplicationStats stats={stats} isDark={isDark} />
          </div>
          {!isAdmin && !isLoading && (
            <div
              className={`mb-6 rounded-xl border p-4 ${
                isDark
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                  : "bg-amber-50 border-amber-200 text-amber-800"
              }`}
            >
              Applicant edits and deletions must be reviewed and approved by the
              admin before they take effect. CSV imports and applicant emails
              remain available.
            </div>
          )}
          {actionNotice && (
            <div
              role="status"
              className={`mb-6 rounded-xl border p-4 ${
                isDark
                  ? "bg-green-900/20 border-green-500/30 text-green-300"
                  : "bg-green-50 border-green-200 text-green-800"
              }`}
            >
              {actionNotice}
              <button
                type="button"
                onClick={() => setActionNotice(null)}
                className="ml-3 font-bold underline"
              >
                Dismiss
              </button>
            </div>
          )}
          {actionError && (
            <div
              role="alert"
              className={`mb-6 rounded-xl border p-4 ${
                isDark
                  ? "bg-red-900/20 border-red-500/30 text-red-300"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {actionError}
            </div>
          )}
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
          {isAdmin && <ApprovalRequests isDark={isDark} />}
          <div className="mb-4 flex items-center justify-between">
            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Applicants
            </h2>
            <span
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {total} total
            </span>
          </div>
          <ApplicationsList
            applications={applications}
            isLoading={isLoading}
            error={error}
            searchQuery={searchQuery}
            onEmail={setEmailModal}
            onDelete={handleDelete}
            onEdit={(application) => {
              setActionError(null);
              setEditApplication(application);
            }}
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
        isDeleting={deleteMutation.isPending || requestMutation.isPending}
        isDark={isDark}
        isAdmin={isAdmin}
        error={actionError}
      />
      <EditApplicationModal
        application={editApplication}
        onClose={() => setEditApplication(null)}
        onSave={handleEditSave}
        isSaving={isSavingEdit || requestMutation.isPending}
        isAdmin={isAdmin}
        isDark={isDark}
        error={actionError}
      />
    </div>
  );
}
