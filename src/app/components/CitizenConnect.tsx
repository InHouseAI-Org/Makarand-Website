import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, UserPlus, AlertTriangle } from "lucide-react";
import { toast, Toaster } from "sonner";

type FormMode = "contact" | "grievance" | "volunteer";

export function CitizenConnect() {
  const [formMode, setFormMode] = useState<FormMode>("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "",
    ward: "",
    skills: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your submission has been received! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "", category: "", ward: "", skills: "" });
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>Office Address</p>
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      Ward Office, Colaba Division,<br />
                      Mumbai - 400001,<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>Phone</p>
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px" }}>+91 98765 43210</p>
                    <p className="text-white/60" style={{ fontSize: "13px" }}>+91 22 2204 1234</p>
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
                    <p className="text-white/60 mt-1" style={{ fontSize: "13px" }}>
                      Mon–Fri: 10:00 AM – 6:00 PM<br />
                      Saturday: 10:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210"
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
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                      style={{ fontSize: "14px" }}
                    >
                      <option value="">Select category</option>
                      <option value="roads">Roads & Infrastructure</option>
                      <option value="water">Water Supply</option>
                      <option value="sanitation">Sanitation & Cleanliness</option>
                      <option value="lighting">Street Lighting</option>
                      <option value="safety">Public Safety</option>
                      <option value="other">Other</option>
                    </select>
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
                    {formMode === "contact" ? "Subject" : formMode === "grievance" ? "Issue Location" : "How would you like to help?"}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-coral/30 focus:border-coral outline-none transition-all"
                    placeholder={
                      formMode === "contact" ? "What is this regarding?" :
                      formMode === "grievance" ? "Enter the location of the issue" :
                      "Describe how you'd like to contribute"
                    }
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-charcoal mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>
                    {formMode === "grievance" ? "Describe the Issue *" : "Message"}
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
                {formMode === "contact" ? "Send Message" : formMode === "grievance" ? "Submit Grievance" : "Sign Up as Volunteer"}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
