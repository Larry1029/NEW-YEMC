"use client";
import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithCredentials, signInWithGoogle } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/admin/applications",
        redirect: true,
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Invalid email or password. Please try again.");
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
              Admin Sign In
            </h1>
            <p className="text-slate-400">Access the YEMC admin dashboard</p>
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
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="password"
                  className="block text-white font-bold text-sm"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs text-violet-400 hover:text-violet-300 font-semibold"
                >
                  Forgot password?
                </a>
              </div>
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-8 mb-6 flex items-center justify-center gap-4">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-slate-500 text-sm font-medium">
              or continue with
            </span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>
          <button
            onClick={() =>
              signInWithGoogle({ callbackUrl: "/admin/applications" })
            }
            type="button"
            className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign in with Google
          </button>
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <a
                href="/account/signup"
                className="text-violet-400 hover:text-violet-300 font-semibold"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
