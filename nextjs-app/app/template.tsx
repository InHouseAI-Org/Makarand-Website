'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PopupManager } from './components/PopupManager';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="flex-1" key={pathname}>
        {children}
      </main>
      <Footer />
      <PopupManager />
    </>
  );
}
