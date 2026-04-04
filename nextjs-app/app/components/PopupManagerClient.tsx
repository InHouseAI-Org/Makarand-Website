'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MessageCircle, Bell } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: Date;
  location: string | null;
  buttonText: string;
  buttonLink: string | null;
  image: string | null;
  priority: number;
  active: boolean;
}

interface PopupManagerClientProps {
  events: Event[];
}

const whatsappConfig = {
  title: "Have a Grievance?",
  description: "Reach out to us directly on WhatsApp for quick resolution of your concerns.",
  buttonText: "Chat on WhatsApp",
  buttonLink: "https://wa.me/918850866638?text=Hello, I would like to raise a grievance regarding...",
};

export function PopupManagerClient({ events: dbEvents }: PopupManagerClientProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  // Debug logging
  console.log('=== POPUP MANAGER DEBUG ===');
  console.log('pathname:', pathname);
  console.log('isAdminRoute:', isAdminRoute);
  console.log('dbEvents.length:', dbEvents.length);
  console.log('dbEvents:', JSON.stringify(dbEvents, null, 2));
  console.log('showEventsPopup:', showEventsPopup);
  console.log('===========================');

  // Show popup on every page load (when component mounts and pathname is available)
  useEffect(() => {
    console.log('useEffect triggered - pathname:', pathname, 'isAdminRoute:', isAdminRoute, 'dbEvents.length:', dbEvents.length);

    if (isAdminRoute) {
      console.log('Admin route - no popups');
      return;
    }

    // Small delay to ensure pathname is ready
    const timer = setTimeout(() => {
      if (dbEvents.length > 0) {
        // If there are events, show events popup first
        console.log('Setting showEventsPopup to TRUE');
        setShowEventsPopup(true);
      } else {
        // If no events, show WhatsApp popup directly
        console.log('No events - showing WhatsApp popup directly');
        setShowWhatsAppPopup(true);
      }
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - runs only on mount, shows popup every time page loads

  const handleCloseEvents = () => {
    setShowEventsPopup(false);
    // Show WhatsApp popup 2 seconds after dismissing events (only if not on admin route)
    if (!isAdminRoute) {
      setTimeout(() => {
        setShowWhatsAppPopup(true);
      }, 2000);
    }
  };

  const handleCloseWhatsApp = () => {
    setShowWhatsAppPopup(false);
  };

  const handleButtonClick = (link: string | null) => {
    if (!link) return;

    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  // Don't render anything on admin routes
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      {/* Events Popup */}
      <AnimatePresence>
        {showEventsPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleCloseEvents}
            />

            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-2xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-border max-h-[85vh] flex flex-col">
                  {/* Header */}
                  <div className="relative bg-gradient-to-br from-coral via-coral-dark to-coral-soft px-6 py-6 sm:px-8 sm:py-8">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    {/* Close Button */}
                    <button
                      onClick={handleCloseEvents}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-xl hover:bg-white/90 flex items-center justify-center transition-all z-10"
                    >
                      <X className="w-5 h-5 text-charcoal" />
                    </button>

                    <div className="text-white relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                          <Bell className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-widest uppercase opacity-90">Upcoming Events</p>
                          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-family-serif)" }}>
                            Don't Miss Out!
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Events List - Scrollable */}
                  <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-4">
                    {dbEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-cream to-white border-2 border-border rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-coral/30 transition-all group"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-coral-light rounded-full flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:scale-110 transition-all">
                            <Calendar className="w-5 h-5 text-coral group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-charcoal text-base sm:text-lg font-bold mb-1" style={{ fontFamily: "var(--font-family-serif)" }}>
                              {event.title}
                            </h3>
                            <p className="text-charcoal-light text-sm leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(event.buttonLink)}
                          className="w-full py-2.5 bg-coral text-white rounded-xl hover:bg-coral-dark transition-all shadow-md hover:shadow-lg text-sm font-semibold"
                        >
                          {event.buttonText} →
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp Popup - Shows 2 seconds after events popup is dismissed */}
      <AnimatePresence>
        {showWhatsAppPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleCloseWhatsApp}
            />

            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-border">
                  {/* WhatsApp Header */}
                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#25D366] via-[#1fb855] to-[#128C7E] flex items-center justify-center overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    {/* Close Button */}
                    <button
                      onClick={handleCloseWhatsApp}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-xl hover:bg-white/90 flex items-center justify-center transition-all z-10"
                    >
                      <X className="w-5 h-5 text-charcoal" />
                    </button>

                    <div className="text-center text-white px-6 relative z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/30">
                        <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold tracking-widest uppercase">Quick Support</p>
                    </div>
                  </div>

                  {/* WhatsApp Details */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-charcoal mb-3 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-family-serif)" }}>
                      {whatsappConfig.title}
                    </h3>
                    <p className="text-charcoal-light mb-6 text-sm sm:text-base leading-relaxed">
                      {whatsappConfig.description}
                    </p>

                    <button
                      onClick={() => handleButtonClick(whatsappConfig.buttonLink)}
                      className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#1fb855] text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base font-bold"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {whatsappConfig.buttonText} →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
