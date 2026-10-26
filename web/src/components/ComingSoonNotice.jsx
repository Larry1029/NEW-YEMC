import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import logoSrc from "../public/yef-logo.jpg";

export default function ComingSoonNotice({ page }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex h-[100dvh] w-screen items-center justify-center overflow-y-auto bg-slate-950/55 px-5 py-8 backdrop-blur-md">
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-950/95 p-7 text-center sm:p-9"
      >
        <div className="mb-5 flex justify-center">
          <img
            src={logoSrc}
            alt="YEF logo"
            className="h-12 w-12 rounded-xl bg-white object-contain"
          />
        </div>
        <h2 className="mb-3 font-plus-jakarta text-2xl font-bold text-white sm:text-3xl">
          {page} are coming soon
        </h2>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          This page will be updated with this year&apos;s lessons.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-slate-400 hover:bg-white/5"
        >
          Back to Home
        </a>
      </div>
    </div>,
    document.body,
  );
}
