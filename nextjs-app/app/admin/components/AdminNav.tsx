'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Home, FolderKanban, Building2, Users, Newspaper, MessageSquare, Share2, Image, LogOut, Inbox, Menu, X } from 'lucide-react';

export function AdminNav({ session }: { session: any }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(true); // Default to true to prevent flash
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/contact-submissions', label: 'Submissions', icon: Inbox },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { href: '/admin/government-projects', label: 'Gov Projects', icon: Building2 },
    { href: '/admin/ward-officers', label: 'Ward Officers', icon: Users },
    { href: '/admin/media', label: 'Media', icon: Newspaper },
    { href: '/admin/gallery', label: 'Gallery', icon: Image },
    { href: '/admin/social-media', label: 'Social Media', icon: Share2 },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50 shadow-sm">
        <div className="max-w-7xl mx-auto md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/admin" className="text-charcoal font-bold flex-shrink-0" style={{ fontSize: '15px', fontFamily: 'var(--font-family-serif)' }}>
              Admin Panel
            </Link>

            {/* Desktop Nav */}
            {isDesktop && (
              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-2 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-coral text-white font-semibold'
                          : 'text-charcoal-light hover:bg-cream hover:text-charcoal'
                      }`}
                      style={{ fontSize: '13px' }}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Desktop Logout & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              {isDesktop && (
                <button
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  style={{ fontSize: '13px' }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}

              {!isDesktop && (
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 text-charcoal hover:bg-cream rounded-lg transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && !isDesktop && (
          <div className="border-t border-border bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-coral text-white font-semibold'
                        : 'text-charcoal-light hover:bg-cream hover:text-charcoal'
                    }`}
                    style={{ fontSize: '14px' }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile Logout */}
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all mt-2"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </nav>
    </>
  );
}
