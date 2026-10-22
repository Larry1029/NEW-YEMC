import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

const fields = [
  ["full_name", "Full name", true],
  ["email", "Email", true],
  ["phone", "Phone", true],
  ["status", "Status", false],
  ["institution", "Institution", false],
];

export function EditApplicationModal({
  application,
  onClose,
  onSave,
  isSaving,
  isAdmin,
  isDark,
  error,
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (application) {
      setForm({
        full_name: application.full_name || "",
        email: application.email || "",
        phone: application.phone || "",
        status: application.status || "",
        institution: application.institution || "",
        message: application.message || "",
      });
    }
  }, [application]);

  if (!application || !form) return null;

  const inputClass = `w-full rounded-xl px-4 py-3 focus:outline-none transition-all ${
    isDark
      ? "bg-slate-950 border border-slate-800 text-white focus:border-violet-500"
      : "bg-purple-50/50 border border-purple-200 text-gray-900 focus:border-purple-400"
  }`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave(form);
        }}
        className={`w-full max-w-2xl rounded-2xl p-5 sm:p-8 relative max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-slate-900 border border-slate-800"
            : "bg-white border border-purple-200 shadow-2xl"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          aria-label="Close edit application form"
          className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center ${
            isDark
              ? "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <X size={20} />
        </button>
        <h2
          className={`text-2xl font-bold mb-2 pr-10 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Edit Application
        </h2>
        {!isAdmin && (
          <p
            className={`mb-6 rounded-xl p-4 text-sm ${
              isDark
                ? "bg-amber-500/10 border border-amber-500/30 text-amber-200"
                : "bg-amber-50 border border-amber-200 text-amber-800"
            }`}
          >
            Your changes will be sent to the admin. They will not take effect
            until the admin reviews and approves your request.
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-4 mt-5 sm:mt-6">
          {fields.map(([key, label, required]) => (
            <label
              key={key}
              className={`text-sm font-semibold ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {label}
              <input
                required={required}
                type={key === "email" ? "email" : "text"}
                value={form[key]}
                onChange={(event) =>
                  setForm({ ...form, [key]: event.target.value })
                }
                className={`${inputClass} mt-2 font-normal`}
              />
            </label>
          ))}
          <label
            className={`text-sm font-semibold sm:col-span-2 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Message
            <textarea
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              rows={5}
              className={`${inputClass} mt-2 font-normal resize-y`}
            />
          </label>
        </div>
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className={`min-h-11 px-5 py-3 rounded-xl font-semibold ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`min-h-11 px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 ${
              isDark
                ? "bg-violet-600 hover:bg-violet-500 text-white"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
          >
            <Save size={18} />
            {isSaving
              ? "Saving..."
              : isAdmin
                ? "Save Changes"
                : "Send for Admin Review"}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
