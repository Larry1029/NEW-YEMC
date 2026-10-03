import { useState } from "react";
import { X, Send } from "lucide-react";
export function EmailModal({ emailModal, onClose, isDark }) {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sendEmailToApplicant = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      alert("Please fill in both subject and message");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch("/api/applications/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailModal.email,
          subject: emailSubject,
          message: emailMessage,
          applicantName: emailModal.name,
        }),
      });
      if (!response.ok) throw new Error("Failed to send email");
      alert(`Email sent successfully to ${emailModal.name}!`);
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  const handleClose = () => {
    setEmailSubject("");
    setEmailMessage("");
    onClose();
  };
  if (!emailModal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 relative ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-purple-200 shadow-2xl"}`}
      >
        <button
          onClick={handleClose}
          className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-violet-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <X size={20} />
        </button>
        <div className="mb-6">
          <h2
            className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}
          >
            Send Email
          </h2>
          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}
          >
            To: {emailModal.name} ({emailModal.email})
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-gray-700"}`}
            >
              Subject
            </label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Enter email subject..."
              className={`w-full rounded-xl px-4 py-3 focus:outline-none transition-all ${isDark ? "bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-purple-50/50 border border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-400"}`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-gray-700"}`}
            >
              Message
            </label>
            <textarea
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder={`Hi ${emailModal.name.split(" ")[0]},\n\nThank you for applying to YEMC...`}
              rows={12}
              className={`w-full rounded-xl px-4 py-3 focus:outline-none transition-all resize-none ${isDark ? "bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-purple-50/50 border border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-400"}`}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isSending}
            className={`px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Cancel
          </button>
          <button
            onClick={sendEmailToApplicant}
            disabled={isSending || !emailSubject.trim() || !emailMessage.trim()}
            className={`px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isDark ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md"}`}
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
