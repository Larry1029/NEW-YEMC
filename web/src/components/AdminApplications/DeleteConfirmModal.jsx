import { X, Trash2 } from "lucide-react";
export function DeleteConfirmModal({
  deleteConfirm,
  onClose,
  onConfirm,
  isDeleting,
  isDark,
}) {
  if (!deleteConfirm) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md rounded-2xl p-8 relative ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-red-200 shadow-2xl"}`}
      >
        <button
          onClick={onClose}
          disabled={isDeleting}
          className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-red-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <X size={20} />
        </button>
        <div className="mb-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-red-500/10" : "bg-red-50"}`}
          >
            <Trash2
              size={32}
              className={isDark ? "text-red-400" : "text-red-600"}
            />
          </div>
          <h2
            className={`text-2xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-gray-800"}`}
          >
            Delete Application?
          </h2>
          <p
            className={`text-sm text-center ${isDark ? "text-slate-400" : "text-gray-600"}`}
          >
            Are you sure you want to delete the application from{" "}
            <span className="font-semibold">{deleteConfirm.full_name}</span>?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className={`px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isDark ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-600 hover:bg-red-700 text-white shadow-md"}`}
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
