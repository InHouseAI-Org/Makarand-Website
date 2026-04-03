import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, UserPlus, AlertTriangle, ChevronDown, Check, GraduationCap } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useSearchParams } from "react-router";

type FormMode = "contact" | "grievance" | "volunteer" | "youth";

const grievanceCategories = [
  { value: "general", label: "General Administration" },
  { value: "complaints", label: "Civic Complaints (General Nature)" },
  { value: "health", label: "Health License / Unlicensed Traders" },
  { value: "garbage", label: "Garbage / Sewage / Drainage / Sanitation" },
  { value: "stormwater", label: "Storm Water Drain" },
  { value: "construction", label: "Illegal Construction / Building Repairs" },
  { value: "pandal", label: "Temporary Pandal" },
  { value: "roads", label: "Road Repair / Potholes / Footpath" },
  { value: "hawkers", label: "Hawkers / Encroachment" },
  { value: "zebra", label: "Zebra Crossings" },
  { value: "water", label: "Water Supply / Contamination / Leakages" },
  { value: "waterconnection", label: "New Water Connection" },
  { value: "roadblocking", label: "Road Blocking" },
  { value: "pests", label: "Mosquitoes / Pests / Rats / Fogging" },
  { value: "trees", label: "Tree Trimming / Unauthorized Cutting" },
  { value: "garden", label: "Garden Maintenance" },
  { value: "engineering", label: "Engineering Matters" },
  { value: "animals", label: "Stray Dogs / Animal Nuisance" },
  { value: "schools", label: "Municipal Schools" },
  { value: "electricity", label: "Electricity Breakdown / Street Lights" },
  { value: "other", label: "Other" },
];

const youthPrograms = [
  { value: "education", label: "Education & Skill Development" },
  { value: "employment", label: "Employment & Entrepreneurship" },
  { value: "sports", label: "Sports & Recreation" },
  { value: "innovation", label: "Innovation & Leadership" },
  { value: "health", label: "Health & Wellness" },
  { value: "community", label: "Community Engagement" },
];

export function CitizenConnect() {
  const [searchParams] = useSearchParams();
  const initialMode = (searchParams.get("mode") as FormMode) || "contact";
  const [formMode, setFormMode] = useState<FormMode>(initialMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "",
    ward: "",
    skills: "",
    program: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const programDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (programDropdownRef.current && !programDropdownRef.current.contains(event.target as Node)) {
        setIsProgramDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your submission has been received! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "", category: "", ward: "", skills: "", program: "" });
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (value: string) => {
    updateField("category", value);
    setIsDropdownOpen(false);
  };

  const handleProgramSelect = (value: string) => {
    updateField("program", value);
    setIsProgramDropdownOpen(false);
  };

  const getSelectedCategoryLabel = () => {
    const selected = grievanceCategories.find(cat => cat.value === formData.category);
    return selected ? selected.label : "Select category";
  };

  const getSelectedProgramLabel = () => {
    const selected = youthPrograms.find(prog => prog.value === formData.program);
    return selected ? selected.label : "Select a program";
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            CITIZEN CONNECT
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            We're Here to Listen
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Reach out to us with suggestions, grievances, or if you'd like to volunteer. 
            Every voice matters in building a better ward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-charcoal rounded-2xl p-8 text-white h-full">
              <h3 className="mb-6" style={{ fontSize: "20px", fontWeight: 700 }}>Office Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>Personal Office</p>
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      Ground Floor, Ajanta Apartment,<br />
                      Shaheed Bhagat Singh Road, Colaba Causeway,<br />
                      Mumbai, Maharashtra - 400005
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>'A' Ward Office</p>
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      'A' Ward Office Building, 134 'E' Shahid Bhagat Singh Marg,<br />
                      Near R.B.I., Fort, Mumbai - 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>Phone</p>
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px" }}>+91 88508 66638</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>Email</p>
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px" }}>office@narwekar.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>Office Hours</p>
                    <p className="text-white/60 mt-1 mb-2" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      <strong>Personal Office (Colaba Causeway):</strong><br />
                      Mon–Sat: 7:00 PM – 10:30 PM
                    </p>
                    <p className="text-white/60" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      <strong>'A' Ward Office (Fort):</strong><br />
                      Mon–Sat: 11:30 AM – 1:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918850866638"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#1fb855] transition-colors"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-2">
            {/* Form Mode Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: "contact" as FormMode, label: "Contact Us", icon: Send },
                { key: "grievance" as FormMode, label: "Submit Grievance", icon: AlertTriangle },
                { key: "youth" as FormMode, label: "Youth Program Enrollment", icon: GraduationCap },
                { key: "volunteer" as FormMode, label: "Volunteer Signup", icon: UserPlus },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFormMode(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                    formMode === tab.key
                      ? "bg-coral text-white shadow-lg shadow-coral/20"
                      : "bg-cream text-charcoal-light border border-border hover:bg-cream-dark"
                  }`}
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.form
              key={formMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-cream rounded-2xl p-6 lg:p-8 border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                    placeholder="Enter your full name"
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                    placeholder="+91 98765 43210"
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                    placeholder="your@email.com"
                    style={{ fontSize: "14px" }}
                  />
                </div>

                {formMode === "grievance" && (
                  <div className="md:col-span-2">
                    <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>Category *</label>
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all flex items-center justify-between ${
                          !formData.category ? "text-charcoal-light" : "text-charcoal"
                        }`}
                        style={{ fontSize: "14px" }}
                      >
                        <span>{getSelectedCategoryLabel()}</span>
                        <ChevronDown className={`w-5 h-5 text-charcoal-light transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-2 bg-white border border-border rounded-xl shadow-lg overflow-hidden"
                        >
                          <div className="max-h-64 overflow-y-auto">
                            {grievanceCategories.map((category) => (
                              <button
                                key={category.value}
                                type="button"
                                onClick={() => handleCategorySelect(category.value)}
                                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                                  formData.category === category.value
                                    ? "bg-coral-light text-coral"
                                    : "text-charcoal hover:bg-cream"
                                }`}
                                style={{ fontSize: "14px" }}
                              >
                                <span>{category.label}</span>
                                {formData.category === category.value && (
                                  <Check className="w-4 h-4 text-coral" />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {formMode === "youth" && (
                  <div className="md:col-span-2">
                    <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>Program of Interest *</label>
                    <div ref={programDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsProgramDropdownOpen(!isProgramDropdownOpen)}
                        className={`w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all flex items-center justify-between ${
                          !formData.program ? "text-charcoal-light" : "text-charcoal"
                        }`}
                        style={{ fontSize: "14px" }}
                      >
                        <span>{getSelectedProgramLabel()}</span>
                        <ChevronDown className={`w-5 h-5 text-charcoal-light transition-transform ${isProgramDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isProgramDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-2 bg-white border border-border rounded-xl shadow-lg overflow-hidden"
                        >
                          <div className="max-h-64 overflow-y-auto">
                            {youthPrograms.map((program) => (
                              <button
                                key={program.value}
                                type="button"
                                onClick={() => handleProgramSelect(program.value)}
                                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                                  formData.program === program.value
                                    ? "bg-coral-light text-coral"
                                    : "text-charcoal hover:bg-cream"
                                }`}
                                style={{ fontSize: "14px" }}
                              >
                                <span>{program.label}</span>
                                {formData.program === program.value && (
                                  <Check className="w-4 h-4 text-coral" />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {formMode === "volunteer" && (
                  <div className="md:col-span-2">
                    <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>Skills & Interests *</label>
                    <input
                      type="text"
                      required
                      value={formData.skills}
                      onChange={(e) => updateField("skills", e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                      placeholder="e.g., Event Management, Teaching, Technical Skills"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>
                    {formMode === "contact" ? "Subject" :
                     formMode === "grievance" ? "Issue Location" :
                     formMode === "youth" ? "Education Background" :
                     "How would you like to help?"}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                    placeholder={
                      formMode === "contact" ? "What is this regarding?" :
                      formMode === "grievance" ? "Enter the location of the issue" :
                      formMode === "youth" ? "e.g., 12th Grade, Undergraduate, Graduate" :
                      "Describe how you'd like to contribute"
                    }
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>
                    {formMode === "grievance" ? "Describe the Issue *" :
                     formMode === "youth" ? "Why do you want to join this program?" :
                     "Message"}
                  </label>
                  <textarea
                    rows={4}
                    required={formMode === "grievance"}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all resize-none"
                    placeholder={
                      formMode === "contact" ? "Your message..." :
                      formMode === "grievance" ? "Please describe the issue in detail..." :
                      formMode === "youth" ? "Tell us about your goals and what you hope to achieve..." :
                      "Tell us about yourself and your availability..."
                    }
                    style={{ fontSize: "14px" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-coral text-white rounded-xl hover:bg-coral-dark transition-all shadow-lg shadow-coral/20"
                style={{ fontSize: "15px", fontWeight: 600 }}
              >
                <Send className="w-4 h-4" />
                {formMode === "contact" ? "Send Message" :
                 formMode === "grievance" ? "Submit Grievance" :
                 formMode === "youth" ? "Submit Enrollment" :
                 "Sign Up as Volunteer"}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
