"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Trash2,
  Shield,
  AlertCircle,
  List,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import useUser from "@/utils/useUser";
export default function AdminUsersPage() {
  const { data: currentUser, loading: userLoading } = useUser();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme") || "dark";
    setTheme(savedTheme);
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
  };
  useEffect(() => {
    if (!userLoading && !currentUser) {
      window.location.href = "/account/signin";
    }
  }, [currentUser, userLoading]);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
    enabled: !!currentUser,
  });
  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
      setDeleteConfirm(null);
    },
  });
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };
  const handleDelete = (user) => {
    if (user.id === currentUser?.id) {
      alert("You cannot delete your own account");
      return;
    }
    setDeleteConfirm(user);
  };
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm.id);
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const getFirstName = () => {
    if (!currentUser?.name) return "Admin";
    return currentUser.name.split(" ")[0];
  };
  if (userLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`}
      >
        <div
          className={`w-12 h-12 border-4 rounded-full animate-spin ${theme === "dark" ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`}
        ></div>
      </div>
    );
  }
  if (!currentUser) return null;
  const isDark = theme === "dark";
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
        <div
          className={`${isDark ? "bg-slate-900/50 border-b border-slate-800" : "bg-white/40"} backdrop-blur-md sticky top-0 z-20`}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1
                  className={`text-4xl md:text-5xl font-extrabold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  {getGreeting()}, {getFirstName()}! 👋
                </h1>
                <p
                  className={`text-lg ${isDark ? "text-slate-400" : "text-gray-600"}`}
                >
                  Manage your {users?.users?.length || 0} user
                  {users?.users?.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
                  title={`Switch to ${isDark ? "light" : "dark"} mode`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <a
                  href="/admin/applications"
                  className={`p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`}
                  title="View Applications"
                >
                  <List size={20} />
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
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div
                className={`w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`}
              ></div>
            </div>
          ) : error ? (
            <div
              className={`rounded-2xl p-6 text-center ${isDark ? "bg-red-500/10 border border-red-500" : "bg-red-50 border border-red-200"}`}
            >
              <p className={isDark ? "text-red-400" : "text-red-600"}>
                Failed to load users. Please try again.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {users?.users?.map((user) => (
                <div
                  key={user.id}
                  className={`rounded-2xl p-6 transition-all ${isDark ? "bg-slate-900 border border-slate-800 hover:border-violet-500/50" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-400/70 shadow-sm hover:shadow-md"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 grid md:grid-cols-3 gap-6">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-violet-500/10" : "bg-purple-100"}`}
                        >
                          <User
                            size={20}
                            className={
                              isDark ? "text-violet-400" : "text-purple-600"
                            }
                          />
                        </div>
                        <div>
                          <p
                            className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                          >
                            Name
                          </p>
                          <p
                            className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}
                          >
                            {user.name || "No name set"}
                          </p>
                          {user.id === currentUser?.id && (
                            <span
                              className={`inline-flex items-center gap-1 mt-1 text-xs ${isDark ? "text-violet-400" : "text-purple-600"}`}
                            >
                              <Shield size={12} />
                              You
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-blue-500/10" : "bg-blue-100"}`}
                        >
                          <Mail
                            size={20}
                            className={
                              isDark ? "text-blue-400" : "text-blue-600"
                            }
                          />
                        </div>
                        <div>
                          <p
                            className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                          >
                            Email
                          </p>
                          <p
                            className={`break-all ${isDark ? "text-slate-300" : "text-gray-700"}`}
                          >
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-green-500/10" : "bg-green-100"}`}
                        >
                          <Calendar
                            size={20}
                            className={
                              isDark ? "text-green-400" : "text-green-600"
                            }
                          />
                        </div>
                        <div>
                          <p
                            className={`text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}
                          >
                            Created
                          </p>
                          <p
                            className={
                              isDark ? "text-slate-300" : "text-gray-700"
                            }
                          >
                            {formatDate(user.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={user.id === currentUser?.id}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-red-500/10 hover:bg-red-500/20 text-red-400" : "bg-red-100 hover:bg-red-200 text-red-600"}`}
                      title={
                        user.id === currentUser?.id
                          ? "Cannot delete yourself"
                          : "Delete user"
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div
            className={`rounded-2xl p-8 max-w-md w-full ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-purple-200 shadow-2xl"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-red-500/10" : "bg-red-100"}`}
              >
                <AlertCircle
                  size={24}
                  className={isDark ? "text-red-400" : "text-red-600"}
                />
              </div>
              <h2
                className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-800"}`}
              >
                Delete User?
              </h2>
            </div>
            <p
              className={`mb-6 ${isDark ? "text-slate-400" : "text-gray-600"}`}
            >
              Are you sure you want to delete{" "}
              <strong className={isDark ? "text-white" : "text-gray-800"}>
                {deleteConfirm.email}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed ${isDark ? "bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md disabled:opacity-50"}`}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
