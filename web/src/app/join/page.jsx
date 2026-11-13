"use client";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";
import conferenceImage from "../../public/632A81(264) - Copy.jpg";
import virtualConferenceImage from "../../public/632A81(323) - Copy.jpg";
export default function JoinPage() {
  const location = useLocation();
  const isMembershipApplication = location.pathname !== "/virtual-registration";
  const isVirtualExperience = !isMembershipApplication;
  const registrationType = isMembershipApplication ? "membership" : "virtual";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    otherDetails: "",
    status: "",
    otherStatus: "",
    institution: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(true);
  const [consentChecked, setConsentChecked] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const emailErrorFor = (value) => {
    const email = value.trim();
    if (!email) return "Email address is required";
    return /^[^\s@]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(email)
      ? ""
      : "Enter a valid email address, like mailhere@gmail.com";
  };
  const phoneErrorFor = (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!/^[\d\s()+-]+$/.test(value)) return "Please enter a valid phone number";
    const digitCount = value.replace(/\D/g, "").length;
    return (isVirtualExperience || isMembershipApplication
      ? digitCount >= 7 && digitCount <= 15
      : digitCount === 10)
      ? ""
      : isVirtualExperience
        ? "Enter a valid phone number with 7 to 15 digits"
        : isMembershipApplication
          ? "Enter a valid phone number with 7 to 15 digits"
          : "Phone number must be exactly 10 digits";
  };
  const validateForm = () => {
    const errors = {};
    const emailError = emailErrorFor(formData.email);
    if (emailError) errors.email = emailError;
    const phoneError = phoneErrorFor(formData.phoneNumber);
    if (phoneError) errors.phoneNumber = phoneError;
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (isVirtualExperience && !formData.country.trim()) {
      errors.country = "Country is required";
    }
    if (isVirtualExperience && !formData.otherDetails.trim()) {
      errors.otherDetails = "Other essential details are required";
    }
    if (!formData.status) {
      errors.status = "Please select your status";
    }
    if (formData.status === "Other" && !formData.otherStatus.trim()) {
      errors.otherStatus = "Please specify your status";
    }
    if (!formData.institution.trim() && formData.status !== "Other" && formData.status !== "Unemployed") {
      errors.institution = "Please enter your school or place of work";
    }
    if (!isVirtualExperience && !formData.message.trim()) {
      errors.message = "Message is required";
    }
    if (!isVirtualExperience && !consentChecked) {
      errors.consent = "Please confirm that you want to join the YEMC community.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => {
      const next = { ...prev };
      if (name === "email") next.email = value.trim() ? emailErrorFor(value) : "";
      else if (name === "phoneNumber") next.phoneNumber = value.trim() ? phoneErrorFor(value) : "";
      else if (prev[name]) next[name] = "";
      return next;
    });
    setSubmitError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/join-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: formData.email.trim(),
          consentGiven: consentChecked,
          registrationType,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }
      setWelcomeEmailSent(data.emailSent !== false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError(
        error.message || "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        </div>
        <div className="relative z-10 w-full max-w-xl">
          <a href="/" className="mb-6 inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </a>
          <section role="status" aria-live="polite" className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-12 text-center md:px-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
              {isMembershipApplication ? "YEMC Membership" : "YEMC 2026 Virtual Registration"}
            </p>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              {isMembershipApplication ? "Welcome to YEMC" : "Your virtual registration is confirmed"}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {isMembershipApplication
                ? welcomeEmailSent
                  ? "You are now part of YEMC. Welcome! We have sent you a confirmation email, and our team will be in touch soon."
                  : "You are now part of YEMC. Welcome! Our team will be in touch soon. We could not deliver your confirmation email just now."
                : "We sent your virtual registration details to your email address."}
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>
      <div className="relative z-10">
        <div className="pt-8 px-6 md:px-10 max-w-7xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Home</span>
          </a>
        </div>
        <div className="py-20 px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 font-plus-jakarta leading-tight">
                {isMembershipApplication ? (
                  <>
                    Become a{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                      YEMC Member
                    </span>
                  </>
                ) : (
                  <>
                    Register for{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                      YEMC 2026
                    </span>
                  </>
                )}
              </h1>
            </div>
              <div className="overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl md:rounded-[40px] p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isMembershipApplication ? (
                    <div className="-mx-8 -mt-8 md:-mx-12 md:-mt-12 border-b border-slate-800 bg-gradient-to-br from-violet-950 to-slate-900 px-8 py-8 md:px-12 md:py-10">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
                        Join our community
                      </p>
                      <h2 className="mt-2 font-plus-jakarta text-2xl font-extrabold text-white md:text-3xl">
                        Take your next step with YEMC
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                        Share a little about yourself and our team will be in touch.
                      </p>
                    </div>
                  ) : (
                  <div className="-mx-8 -mt-8 md:-mx-12 md:-mt-12 overflow-hidden border-b border-slate-800">
                    <div className="relative isolate h-52 md:h-64">
                      <OptimizedImage
                        src={isVirtualExperience ? virtualConferenceImage : conferenceImage}
                        alt="A YEMC conference attendee speaking to the audience"
                        loading="eager"
                        className={`absolute inset-0 h-full w-full object-cover ${isVirtualExperience ? "object-[center_30%]" : "object-[center_42%]"}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/5" />
                      <div className="absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-7">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-200">
                          Young Executive Master Class
                        </p>
                        <h2 className="font-plus-jakarta text-2xl font-extrabold text-white md:text-4xl">
                          2026 Conference
                        </h2>
                      </div>
                    </div>
                    <dl className="grid gap-4 px-8 py-5 text-center text-sm md:grid-cols-3 md:gap-6 md:px-12 md:text-left md:text-base">
                      <div>
                        <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-300">Date</dt>
                        <dd className="text-slate-200">Saturday, 7th November 2026</dd>
                      </div>
                      <div>
                        <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-300">Venue</dt>
                        <dd className="text-slate-200">Palms by Eagles (formerly Holiday Inn)</dd>
                      </div>
                      <div>
                        <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-300">Theme</dt>
                        <dd className="text-slate-200">AI for the next Gen of career and business executives</dd>
                      </div>
                    </dl>
                  </div>
                  )}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-white font-bold mb-3 text-sm md:text-base"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${validationErrors.fullName ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.fullName && (
                      <p className="mt-2 text-sm text-red-400">
                        {validationErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-bold mb-3 text-sm md:text-base"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(validationErrors.email)}
                      aria-describedby={validationErrors.email ? "email-error" : undefined}
                      className={`w-full bg-slate-950 border ${validationErrors.email ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                      placeholder="your.email@example.com"
                    />
                    {validationErrors.email && (
                      <p id="email-error" role="alert" className="mt-2 text-sm text-red-400">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-white font-bold mb-3 text-sm md:text-base"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${validationErrors.phoneNumber ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                      placeholder={isMembershipApplication || isVirtualExperience
                        ? "Enter your phone number (7-15 digits)"
                        : "1234567890 (10 digits)"}
                    />
                    {validationErrors.phoneNumber && (
                      <p className="mt-2 text-sm text-red-400">
                        {validationErrors.phoneNumber}
                      </p>
                    )}
                  </div>
                    {isVirtualExperience && (
                      <>
                        <div>
                          <label htmlFor="country" className="block text-white font-bold mb-3 text-sm md:text-base">
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full bg-slate-950 border ${validationErrors.country ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                            placeholder="Enter your country"
                          />
                          {validationErrors.country && (
                            <p className="mt-2 text-sm text-red-400">{validationErrors.country}</p>
                          )}
                        </div>
                      </>
                    )}
                    <div>
                      <label
                        htmlFor="status"
                      className="block text-white font-bold mb-3 text-sm md:text-base"
                    >
                      {isMembershipApplication ? "Current Status" : "Status"}
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${validationErrors.status ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base appearance-none cursor-pointer`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.25rem",
                      }}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-slate-950 text-slate-500"
                      >
                        Select your status
                      </option>
                      <option
                        value="Student"
                        className="bg-slate-950 text-white"
                      >
                        Student
                      </option>
                      <option
                        value="Working"
                        className="bg-slate-950 text-white"
                      >
                        Working
                      </option>
                      <option
                        value="Unemployed"
                        className="bg-slate-950 text-white"
                      >
                        Unemployed
                      </option>
                      <option value="Other" className="bg-slate-950 text-white">
                        Other
                      </option>
                    </select>
                    {validationErrors.status && (
                      <p className="mt-2 text-sm text-red-400">
                        {validationErrors.status}
                      </p>
                    )}
                    {formData.status === "Other" && (
                      <div className="mt-4">
                        <label
                          htmlFor="otherStatus"
                          className="block text-white font-bold mb-3 text-sm md:text-base"
                        >
                          Please specify your status
                        </label>
                        <input
                          type="text"
                          id="otherStatus"
                          name="otherStatus"
                          value={formData.otherStatus}
                          onChange={handleChange}
                          className={`w-full bg-slate-950 border ${validationErrors.otherStatus ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                          placeholder="Enter your status"
                        />
                        {validationErrors.otherStatus && (
                          <p className="mt-2 text-sm text-red-400">
                            {validationErrors.otherStatus}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.status !== "Other" && (
                    <div>
                      <label
                        htmlFor="institution"
                        className="block text-white font-bold mb-3 text-sm md:text-base"
                      >
                        {isMembershipApplication ? "School, Organization, or Place of Work" : "School or Place of Work"}
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className={`w-full bg-slate-950 border ${validationErrors.institution ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                        placeholder="Enter your school or company name"
                      />
                      {validationErrors.institution && (
                        <p className="mt-2 text-sm text-red-400">
                          {validationErrors.institution}
                        </p>
                      )}
                    </div>
                  )}
                  {isVirtualExperience && (
                    <div>
                      <label htmlFor="otherDetails" className="block text-white font-bold mb-3 text-sm md:text-base">
                        Other Essential Details
                      </label>
                      <textarea
                        id="otherDetails"
                        name="otherDetails"
                        value={formData.otherDetails}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full resize-none bg-slate-950 border ${validationErrors.otherDetails ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`}
                        placeholder="Add any other information we should know"
                      />
                      {validationErrors.otherDetails && (
                        <p className="mt-2 text-sm text-red-400">{validationErrors.otherDetails}</p>
                      )}
                    </div>
                  )}
                  {!isVirtualExperience && (
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white font-bold mb-3 text-sm md:text-base"
                    >
                      {isMembershipApplication ? "Why would you like to join YEMC?" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full bg-slate-950 border ${validationErrors.message ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none text-sm md:text-base`}
                      placeholder={isMembershipApplication
                        ? "Tell us about yourself and why you would like to become part of YEMC..."
                        : "Tell us about your goals and what you hope to achieve with YEMC..."}
                    ></textarea>
                    {validationErrors.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {validationErrors.message}
                      </p>
                    )}
                  </div>
                  )}
                  {!isVirtualExperience && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <label className="flex items-start gap-3 text-sm md:text-base text-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => {
                          setConsentChecked(e.target.checked);
                          if (validationErrors.consent) {
                            setValidationErrors((prev) => ({ ...prev, consent: "" }));
                          }
                          setSubmitError("");
                        }}
                        className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500"
                      />
                      <span>
                        I agree to join the YEMC community and receive information about YEMC events, webinars, opportunities, and other engagements.
                      </span>
                    </label>
                    {validationErrors.consent && (
                      <p className="mt-2 text-sm text-red-400">{validationErrors.consent}</p>
                    )}
                  </div>
                  )}
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
                      <p className="text-sm text-red-400">{submitError}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-extrabold text-base md:text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {isVirtualExperience ? "Register for Virtual Experience" : "Become a YEMC Member"}
                        <Send size={18} />
                      </>
                    )}
                  </button>
              </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
