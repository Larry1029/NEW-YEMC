"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BadgeCheck, Building2, Mail, Phone, ShieldCheck } from "lucide-react";
import logoSrc from "../../../public/yef-logo.jpg";
import OptimizedImage from "../../../components/OptimizedImage";

const activeCheckIns = new Map();

function requestCheckIn(token) {
  let request = activeCheckIns.get(token);
  if (!request) {
    request = fetch(`/api/conference-pass/${encodeURIComponent(token)}/check-in`, {
      method: "POST",
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "This conference pass could not be verified.");
      }
      return data;
    });
    activeCheckIns.set(token, request);
    const clearRequest = () => {
      if (activeCheckIns.get(token) === request) activeCheckIns.delete(token);
    };
    request.then(clearRequest, clearRequest);
  }
  return request;
}

export default function ConferencePassPage() {
  const { token } = useParams();
  const [result, setResult] = useState({ status: "loading", attendee: null });

  useEffect(() => {
    let isMounted = true;
    requestCheckIn(token)
      .then((attendee) => {
        if (isMounted) setResult({ status: "confirmed", attendee });
      })
      .catch((error) => {
        if (isMounted) {
          setResult({
            status: "error",
            message: error.message || "Unable to verify this conference pass. Check your connection and try again.",
          });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [token]);

  const isLoading = result.status === "loading";
  const attendee = result.attendee;
  const alreadyCheckedIn = attendee?.alreadyCheckedIn;

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>
      <div className="relative z-10 w-full max-w-lg">
        <a href="/" aria-label="YEMC home" className="mb-6 flex justify-center">
          <OptimizedImage
            src={logoSrc}
            alt="YEMC logo"
            className="h-16 w-16 rounded-2xl object-contain"
          />
        </a>
        <section className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className={`px-6 py-8 text-center sm:px-10 ${result.status === "error" ? "bg-red-950/50" : "bg-emerald-950/40"}`}>
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${result.status === "error" ? "bg-red-500/10 text-red-400" : "bg-emerald-400/10 text-emerald-300"}`}>
            {isLoading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-current/30 border-t-current" />
            ) : result.status === "error" ? (
              <ShieldCheck size={32} />
            ) : (
              <BadgeCheck size={36} />
            )}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">YEMC 2026 Conference</p>
          <h1 className="mt-2 font-plus-jakarta text-2xl font-extrabold sm:text-3xl">
            {isLoading
              ? "Verifying pass"
              : result.status === "error"
                ? "Pass not verified"
                : alreadyCheckedIn
                  ? "Already checked in"
                  : "Entry confirmed"}
          </h1>
          {result.status === "error" ? (
            <p role="alert" className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-red-200">
              {result.message}
            </p>
          ) : (
            <p className="mt-3 text-sm text-slate-300">
              {isLoading
                ? "Checking this attendee's registration…"
                : alreadyCheckedIn
                  ? "This pass has already been used to check in."
                  : "This registration is valid. The attendee has been checked in."}
            </p>
          )}
        </div>

        {attendee && (
          <div className="space-y-5 px-6 py-7 sm:px-10">
            <div className="border-b border-slate-800 pb-5 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Attendee</p>
              <h2 className="mt-1 break-words text-2xl font-bold">{attendee.fullName}</h2>
            </div>
            <dl className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={19} className="mt-0.5 shrink-0 text-emerald-300" />
                <div className="min-w-0">
                  <dt className="text-xs text-slate-500">Email</dt>
                  <dd className="break-all text-sm text-slate-100">{attendee.email}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={19} className="mt-0.5 shrink-0 text-emerald-300" />
                <div>
                  <dt className="text-xs text-slate-500">Phone</dt>
                  <dd className="text-sm text-slate-100">{attendee.phoneNumber}</dd>
                </div>
              </div>
              {attendee.institution && (
                <div className="flex items-start gap-3">
                  <Building2 size={19} className="mt-0.5 shrink-0 text-emerald-300" />
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">School / Place of Work / Business</dt>
                    <dd className="break-words text-sm text-slate-100">{attendee.institution}</dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        )}
        </section>
      </div>
    </main>
  );
}
