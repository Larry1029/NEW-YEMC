import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import logoSrc from "../public/yef-logo.jpg";

export default function ComingSoonNotice({
  page,
  title,
  message,
  actionLabel = "Back to Home",
  actionHref = "/",
  blurBackground = true,
  overlay = true,
  centeredCheck = false,
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!overlay) {
      setIsMounted(true);
      return undefined;
    }

    const scrollY = window.scrollY;
    const body = document.body;
    const originalStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    setIsMounted(true);

    return () => {
      Object.assign(body.style, originalStyles);
      window.scrollTo(0, scrollY);
    };
  }, [overlay]);

  if (!isMounted) return null;

  const notice = (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/45 p-7 text-center shadow-xl backdrop-blur-xl sm:p-9"
    >
      <div className="mb-5 flex justify-center">
        {centeredCheck ? (
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-400/10 text-3xl font-bold text-emerald-400"
          >
            ✓
          </div>
        ) : (
          <img
            src={logoSrc}
            alt="YEF logo"
            className="h-12 w-12 rounded-xl bg-white object-contain"
          />
        )}
      </div>
      <h2 className="mb-3 font-plus-jakarta text-2xl font-bold text-white sm:text-3xl">
        {title || `${page} are coming soon`}
      </h2>
      <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
        {message || "This page will be updated with this year's lessons."}
      </p>
      <a
        href={actionHref}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-slate-400 hover:bg-white/5"
      >
        {actionLabel}
      </a>
    </div>
  );

  if (!overlay) return notice;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex h-[100dvh] w-screen items-center justify-center overflow-y-auto bg-slate-950/55 px-5 py-8 ${
        blurBackground ? "backdrop-blur-md" : ""
      }`}
    >
      {notice}
    </div>,
    document.body,
  );
}
