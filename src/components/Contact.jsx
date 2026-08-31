import { CheckCircle, AlertCircle, Send, Loader } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  sanitizeInput,
  validateFormData,
  validationRules,
  rateLimiter,
  generateCSRFToken,
  formatPhoneNumber,
  isValidPhone,
} from "../utils/security.js";
import { companyInfo } from "../constants/companyInfo";
import { API_URL } from "../utils/apiConfig.js";
import HoneypotField from "./HoneypotField";
import { readAssessment } from "../utils/contactIntent.js";

const PROJECT_TYPES = [
  { value: "", label: "Select a project type" },
  { value: "website", label: "Marketing site / UI/UX" },
  { value: "webapp", label: "Web application" },
  { value: "mobile", label: "Mobile app" },
  { value: "saas", label: "SaaS platform" },
  { value: "ai", label: "AI / automation" },
  { value: "other", label: "Something else" },
];

const CONTACT_FORM_KEY = "contact-form";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
    website: "",
  });
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");

  // Track mount so async work never calls setState on an unmounted component.
  const isMountedRef = useRef(true);
  const abortRef = useRef(null);

  useEffect(() => {
    setCsrfToken(generateCSRFToken());

    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get("package");
    const priceParam = urlParams.get("price");

    if (packageParam && priceParam) {
      const decodedPackage = decodeURIComponent(packageParam);
      const decodedPrice = decodeURIComponent(priceParam);
      setSelectedPackage(decodedPackage);
      setSelectedPrice(decodedPrice);

      let projectType = "";
      if (decodedPackage.includes("UI/UX")) projectType = "website";
      else if (decodedPackage.includes("Full Stack")) projectType = "webapp";
      else if (decodedPackage.includes("SaaS")) projectType = "saas";

      setFormData((prev) => ({
        ...prev,
        projectType,
        message: `I'm interested in the ${decodedPackage} package (${decodedPrice}). Please share next steps.`,
      }));
    } else {
      const intent = urlParams.get("intent");
      const source = urlParams.get("source");
      const related = urlParams.get("related");
      if (intent === "assessment") {
        const assessment = readAssessment();
        const score = urlParams.get("score") || assessment?.score;
        const opportunities = assessment?.opportunities?.join("\n") || "";
        setFormData((prev) => ({
          ...prev,
          projectType: prev.projectType || "other",
          message:
            prev.message ||
            `I'd like a follow-up on my engineering health assessment${score ? ` (score: ${score}/100)` : ""}.${
              opportunities ? `\n\nTop opportunities:\n${opportunities}` : ""
            }${source ? `\n\nSource: ${source}` : ""}`,
        }));
      } else if (intent === "modernize") {
        setFormData((prev) => ({
          ...prev,
          projectType: prev.projectType || "other",
          message:
            prev.message ||
            "I'd like to talk with an engineering director about modernizing a legacy system.",
        }));
      } else if (intent === "build-team") {
        setFormData((prev) => ({
          ...prev,
          message:
            prev.message ||
            `I'd like to build an engineering team with Ondosoft.${
              related ? ` Related work: ${related}.` : ""
            }${source ? ` (from ${source})` : ""}`,
        }));
      }
    }

    return () => {
      isMountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const validateForm = () => {
    const sanitized = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      company: sanitizeInput(formData.company),
      message: sanitizeInput(formData.message),
    };
    const newErrors = validateFormData(sanitized, validationRules);
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'phone is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'phone format is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhoneNumber(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!rateLimiter.isAllowed(CONTACT_FORM_KEY)) {
      setSubmitStatus("error");
      setErrors({ general: "Too many requests. Please wait a minute and try again." });
      return;
    }

    if (formData.website) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", projectType: "", message: "", website: "" });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const projectLabel = PROJECT_TYPES.find((opt) => opt.value === formData.projectType)?.label;
      const payload = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        company: sanitizeInput(formData.company),
        projectType: formData.projectType || undefined,
        message: sanitizeInput(formData.message),
        selectedPlan: selectedPackage || undefined,
        selectedPlanPrice: selectedPrice || undefined,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        website: formData.website,
      };
      if (projectLabel && formData.projectType) {
        payload.message = `Project type: ${projectLabel}\n\n${payload.message}`;
      }

      const res = await fetch(`${API_URL}/consultation/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await res.json().catch(() => ({}));

      if (!isMountedRef.current) return;

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", projectType: "", message: "", website: "" });
    } catch (err) {
      if (err.name === "AbortError") return;
      if (!isMountedRef.current) return;
      setSubmitStatus("error");
      setErrors({ general: err.message || "Something went wrong. Please try again." });
    } finally {
      if (isMountedRef.current) setIsSubmitting(false);
      abortRef.current = null;
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-neutral-900/70 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors";

  return (
    <div className="mt-20" id="contact">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        <span className="text-white">Let&rsquo;s Build Your</span>
        <br />
        <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text drop-shadow-lg">
          Next Big Thing.
        </span>
      </h1>
      <p className="text-center text-neutral-200 text-lg mb-8 max-w-3xl mx-auto leading-relaxed px-4">
        Book a call or drop a message &mdash; we&rsquo;ll respond within one business day.
      </p>

      {selectedPackage && selectedPrice && (
        <div className="max-w-4xl mx-auto mb-6 px-4">
          <div className="p-4 bg-orange-900/20 border border-orange-500/50 rounded-lg">
            <p className="text-orange-400 text-center">
              <span className="font-semibold">Selected Package:</span> {selectedPackage} &mdash; {selectedPrice}
            </p>
          </div>
        </div>
      )}

      {submitStatus === "success" && (
        <div className="max-w-4xl mx-auto mb-6 px-4">
          <div
            className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg flex items-center gap-3"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="text-green-500 shrink-0" />
            <p className="text-green-400">
              Thanks! We&rsquo;ve received your message and will respond within one business day.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="max-w-4xl mx-auto mb-6 px-4">
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-3" role="alert">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-red-400">{errors.general || "Something went wrong. Please try again."}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <input type="hidden" name="csrf" value={csrfToken} readOnly />
        <HoneypotField
          id="contact-website"
          value={formData.website}
          onChange={handleInputChange}
        />

        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-200 mb-2">
            Full name<span className="text-orange-400"> *</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClass}
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            required
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-200 mb-2">
            Work email<span className="text-orange-400"> *</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClass}
            placeholder={companyInfo.placeholders?.email || "you@company.com"}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-200 mb-2">
            Phone<span className="text-orange-400"> *</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className={inputClass}
            placeholder="(408) 555-0123"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            required
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1 text-sm text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-neutral-200 mb-2">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleInputChange}
            className={inputClass}
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label htmlFor="contact-project-type" className="block text-sm font-medium text-neutral-200 mb-2">
            Project type
          </label>
          <select
            id="contact-project-type"
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className={inputClass}
          >
            {PROJECT_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-200 mb-2">
            What are you trying to build?<span className="text-orange-400"> *</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`${inputClass} resize-y`}
            placeholder="A few sentences about the problem, users, and timeline."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            required
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1 text-sm text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">
            Prefer to talk live? <span className="text-neutral-200">Book a slot below.</span>
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Sending&hellip;
              </>
            ) : (
              <>
                Send message
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active,
        select:-webkit-autofill,
        textarea:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #1a1a1a inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default Contact;
