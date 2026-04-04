'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MediaFilterTabsProps {
  currentCategory?: string;
}

export function MediaFilterTabs({ currentCategory }: MediaFilterTabsProps) {
  const pathname = usePathname();

  const tabs = [
    { label: 'All Media', value: undefined },
    { label: 'Press Coverage', value: 'press' },
    { label: 'Awards & Recognition', value: 'award' },
    { label: 'Video Posts', value: 'video' },
  ];

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const isActive = currentCategory === tab.value;
        const href = tab.value ? `${pathname}?category=${tab.value}` : pathname;

        return (
          <Link
            key={tab.label}
            href={href}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              isActive
                ? 'bg-coral text-white shadow-lg'
                : 'bg-white border-2 border-border text-charcoal hover:bg-cream'
            }`}
            style={{ fontSize: '14px' }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
