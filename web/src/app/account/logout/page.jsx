"use client";
import { useEffect } from "react";
import useAuth from "@/utils/useAuth";
export default function LogoutPage() {
  const { signOut } = useAuth();
  useEffect(() => {
    const logout = async () => {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    };
    logout();
  }, [signOut]);
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Signing out...</p>
      </div>
    </div>
  );
}
