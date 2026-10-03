"use client";
import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { ArrowLeft, Mail, Lock, AlertCircle, User } from "lucide-react";
export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithCredentials } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setIsLoading(true);
    try {
      await signUpWithCredentials({
        name: name.trim(),
        email,
        password,
        callbackUrl: "/admin/applications",
        redirect: true,
      });
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Home</span>
          </a>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 font-plus-jakarta">
              Create Admin Account
            </h1>
            <p className="text-slate-400">
              Set up your YEMC admin dashboard access
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-white font-bold mb-3 text-sm"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-white font-bold mb-3 text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-white font-bold mb-3 text-sm"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Must be at least 8 characters
              </p>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white font-bold mb-3 text-sm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <a
                href="/account/signin"
                className="text-violet-400 hover:text-violet-300 font-semibold"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
