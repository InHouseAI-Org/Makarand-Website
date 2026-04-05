'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb navigation component with SEO schema markup
 * Automatically includes structured data for search engines
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Always include home as first item
  const breadcrumbItems: BreadcrumbItem[] = [{ name: 'Home', url: '/' }, ...items];

  // Generate schema
  const schema = generateBreadcrumbSchema(breadcrumbItems);

  useEffect(() => {
    // Inject schema on client-side
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'breadcrumb-schema';

    // Remove existing breadcrumb schema if present
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [schema]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const isHome = index === 0;

        return (
          <div key={item.url} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}

            {isLast ? (
              <span className="font-medium text-gray-900 dark:text-gray-100" aria-current="page">
                {isHome && <Home className="w-4 h-4 inline mr-1" />}
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-primary transition-colors flex items-center"
              >
                {isHome && <Home className="w-4 h-4 inline mr-1" />}
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
