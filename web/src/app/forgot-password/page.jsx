"use client";
import { useState } from "react";
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from "lucide-react";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send reset email");
      }
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "Something went wrong. Please try again.");
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
            href="/account/signin"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Sign In</span>
          </a>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          {success ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white mb-2 font-plus-jakarta">
                  Check Your Email
                </h1>
                <p className="text-slate-400">
                  We've sent a password reset link to{" "}
                  <strong className="text-white">{email}</strong>
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <p className="text-sm text-slate-400">
                  Click the link in the email to reset your password. The link
                  will expire in 1 hour.
                </p>
              </div>
              <a
                href="/account/signin"
                className="inline-block text-violet-400 hover:text-violet-300 font-semibold"
              >
                Return to Sign In
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 font-plus-jakarta">
                  Reset Password
                </h1>
                <p className="text-slate-400">
                  Enter your email and we'll send you a reset link
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-slate-500 text-sm">
                  Remember your password?{" "}
                  <a
                    href="/account/signin"
                    className="text-violet-400 hover:text-violet-300 font-semibold"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
