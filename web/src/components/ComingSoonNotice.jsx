export default function ComingSoonNotice({ page }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-5 py-8 backdrop-blur-md">
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-950/95 p-7 text-center sm:p-9"
      >
        <h2 className="mb-3 font-plus-jakarta text-2xl font-bold text-white sm:text-3xl">
          {page} are coming soon
        </h2>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          This page will be updated with this year&apos;s lessons.
        </p>
      </div>
    </div>
  );
}
