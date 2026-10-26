export default function ComingSoonNotice() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-5 py-8 backdrop-blur-md">
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-lg rounded-3xl border border-violet-400/25 bg-slate-950/90 p-8 text-center shadow-2xl shadow-violet-950/30 sm:p-12"
      >
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
          YEMC
        </p>
        <h2 className="mb-4 font-plus-jakarta text-3xl font-extrabold text-white sm:text-4xl">
          Coming Soon
        </h2>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          We’re putting the finishing touches on this page. Please check back
          soon.
        </p>
      </div>
    </div>
  );
}
