'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MessageCircle, Bell } from "lucide-react";

interface Popup {
  id: string;
  type: "event" | "whatsapp";
  delay: number; // seconds
  content: {
    title: string;
    description: string;
    image?: string;
    buttonText: string;
    buttonLink?: string;
    onButtonClick?: () => void;
  };
}

const popups: Popup[] = [
  {
    id: "upcoming-event",
    type: "event",
    delay: 5,
    content: {
      title: "Community Health Camp - Jan 28, 2026",
      description: "Free health check-ups, medicines, and consultations. Join us at Ward Office from 9 AM to 5 PM.",
      image: "/event-banner.jpg", // Add your event image
      buttonText: "Register Now",
      buttonLink: "/connect?mode=contact",
    },
  },
  {
    id: "whatsapp-grievance",
    type: "whatsapp",
    delay: 10, // Shows 10 seconds after closing the first popup
    content: {
      title: "Have a Grievance?",
      description: "Reach out to us directly on WhatsApp for quick resolution of your concerns.",
      buttonText: "Chat on WhatsApp",
      buttonLink: "https://wa.me/918850866638?text=Hello, I would like to raise a grievance regarding...",
    },
  },
];

export function PopupManager() {
  const [currentPopup, setCurrentPopup] = useState<Popup | null>(null);
  const [shownPopups, setShownPopups] = useState<Set<string>>(new Set());
  const [popupQueue, setPopupQueue] = useState<Popup[]>([]);

  useEffect(() => {
    // Check localStorage to avoid showing popups in the entire user journey
    const storedShownPopups = localStorage.getItem("shownPopups");
    if (storedShownPopups) {
      setShownPopups(new Set(JSON.parse(storedShownPopups)));
    }

    // Initialize popup queue
    setPopupQueue(popups);
  }, []);

  useEffect(() => {
    if (popupQueue.length === 0 || currentPopup) return;

    const nextPopup = popupQueue[0];

    // Check if popup was already shown in this session
    if (shownPopups.has(nextPopup.id)) {
      setPopupQueue(prev => prev.slice(1));
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setCurrentPopup(nextPopup);
    }, nextPopup.delay * 1000);

    return () => clearTimeout(timer);
  }, [popupQueue, currentPopup, shownPopups]);

  const handleClose = () => {
    if (!currentPopup) return;

    // Mark as shown permanently in localStorage
    const updatedShownPopups = new Set(shownPopups);
    updatedShownPopups.add(currentPopup.id);
    setShownPopups(updatedShownPopups);
    localStorage.setItem("shownPopups", JSON.stringify([...updatedShownPopups]));

    // Remove from queue and show next
    setPopupQueue(prev => prev.slice(1));
    setCurrentPopup(null);
  };

  const handleButtonClick = () => {
    if (!currentPopup) return;

    if (currentPopup.content.onButtonClick) {
      currentPopup.content.onButtonClick();
    } else if (currentPopup.content.buttonLink) {
      if (currentPopup.content.buttonLink.startsWith("http")) {
        window.open(currentPopup.content.buttonLink, "_blank");
      } else {
        window.location.href = currentPopup.content.buttonLink;
      }
    }

    handleClose();
  };

  return (
    <AnimatePresence>
      {currentPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
              >
                <X className="w-4 h-4 text-charcoal" />
              </button>

              {/* Content */}
              {currentPopup.type === "event" ? (
                <div>
                  {/* Event Image/Header */}
                  <div className="relative h-32 bg-gradient-to-r from-coral to-coral-dark flex items-center justify-center">
                    <div className="text-center text-white">
                      <Bell className="w-12 h-12 mx-auto mb-2" />
                      <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em" }}>UPCOMING EVENT</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-coral shrink-0 mt-1" />
                      <div>
                        <h3 className="text-charcoal mb-2" style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
                          {currentPopup.content.title}
                        </h3>
                        <p className="text-charcoal-light" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                          {currentPopup.content.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleButtonClick}
                      className="w-full py-3 bg-coral text-white rounded-xl hover:bg-coral-dark transition-all shadow-lg shadow-coral/20"
                      style={{ fontSize: "14px", fontWeight: 600 }}
                    >
                      {currentPopup.content.buttonText}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* WhatsApp Header */}
                  <div className="relative h-32 bg-[#25D366] flex items-center justify-center">
                    <div className="text-center text-white">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2" />
                      <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em" }}>QUICK SUPPORT</p>
                    </div>
                  </div>

                  {/* WhatsApp Details */}
                  <div className="p-6">
                    <h3 className="text-charcoal mb-2" style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
                      {currentPopup.content.title}
                    </h3>
                    <p className="text-charcoal-light mb-6" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {currentPopup.content.description}
                    </p>

                    <button
                      onClick={handleButtonClick}
                      className="w-full py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#1fb855] transition-all shadow-lg flex items-center justify-center gap-2"
                      style={{ fontSize: "14px", fontWeight: 600 }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      {currentPopup.content.buttonText}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
