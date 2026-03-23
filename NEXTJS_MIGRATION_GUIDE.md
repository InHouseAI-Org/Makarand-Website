# Next.js Migration Guide

This guide will help you migrate your React + Vite project to Next.js for better SEO and performance.

## 🎯 Why Next.js?

- ✅ **Server-Side Rendering (SSR)** - Better SEO, faster initial load
- ✅ **Static Site Generation (SSG)** - Pre-render pages at build time
- ✅ **Built-in SEO optimization** - Meta tags, Open Graph, structured data
- ✅ **Image optimization** - Automatic image optimization
- ✅ **API routes** - Backend endpoints without separate server
- ✅ **Better performance** - Automatic code splitting, prefetching

## 📋 Migration Checklist

### Phase 1: Setup (30 minutes)
- [ ] Create new Next.js 15 project
- [ ] Copy source files
- [ ] Update dependencies
- [ ] Configure Tailwind CSS
- [ ] Set up environment variables

### Phase 2: Code Migration (2-3 hours)
- [ ] Convert routing structure
- [ ] Update imports and paths
- [ ] Add metadata and SEO
- [ ] Convert API hooks
- [ ] Update image imports

### Phase 3: Testing & Deployment (1 hour)
- [ ] Test all pages
- [ ] Test API integrations
- [ ] Deploy to Vercel
- [ ] Set up production environment variables

---

## 🚀 Step-by-Step Migration

### Step 1: Create Next.js Project

Open a terminal in a **new directory** (don't replace your current project yet):

```bash
npx create-next-app@latest makarand-nextjs --typescript --tailwind --app --no-src-dir
cd makarand-nextjs
```

**Configuration prompts:**
- ✅ TypeScript? → Yes
- ✅ ESLint? → Yes
- ✅ Tailwind CSS? → Yes
- ✅ `app/` directory? → Yes (Next.js 15 App Router)
- ❌ `src/` directory? → No
- ✅ Import alias (@/*)? → Yes

### Step 2: Install Additional Dependencies

```bash
npm install framer-motion lucide-react sonner
```

### Step 3: Copy Configuration Files

From your current project, copy these to the new Next.js project:

```bash
# Tailwind config
cp tailwind.config.js makarand-nextjs/

# Environment variables (create new .env.local)
# Note: Next.js uses NEXT_PUBLIC_ prefix instead of VITE_
```

### Step 4: Update Environment Variables

Create `.env.local` in Next.js project:

```env
# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=AIza...
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UC...

# Instagram API
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=IGQ...
```

**Important:**
- Vite uses `VITE_` prefix
- Next.js uses `NEXT_PUBLIC_` prefix for client-side variables
- Server-side only variables don't need prefix

### Step 5: Update Tailwind Config

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coral': {
          DEFAULT: '#FF6B6B',
          light: '#FFE5E5',
          dark: '#E85555',
        },
        'charcoal': {
          DEFAULT: '#2D3436',
          light: '#636E72',
        },
        'cream': {
          DEFAULT: '#FFF8F3',
          dark: '#F5E6DC',
        },
        'border': '#E8E8E8',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 🗂️ Directory Structure Conversion

### Current Structure (Vite + React Router)
```
src/app/
├── components/
├── pages/
├── hooks/
└── routes.ts
```

### New Structure (Next.js App Router)
```
app/
├── (routes)/
│   ├── page.tsx                    # Home (/)
│   ├── about/page.tsx              # /about
│   ├── vision/page.tsx             # /vision
│   ├── work/page.tsx               # /work
│   ├── ward/page.tsx               # /ward
│   ├── media/page.tsx              # /media
│   ├── media/[type]/[id]/page.tsx  # /media/:type/:id
│   ├── connect/page.tsx            # /connect
│   ├── youth/page.tsx              # /youth
│   ├── government-projects/page.tsx
│   └── project/[id]/page.tsx       # /project/:id
├── components/                      # Shared components
├── hooks/                          # Custom hooks
├── layout.tsx                      # Root layout (Header/Footer)
├── globals.css                     # Global styles
└── api/                            # API routes (optional)
```

---

## 🔄 Code Conversion Examples

### 1. Root Layout (Header + Footer)

Create `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import './globals.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export const metadata: Metadata = {
  title: 'Makarand Narwekar | Corporator',
  description: 'Dedicated to transforming our ward through transparent governance, sustainable development, and citizen-first service.',
  keywords: 'Makarand Narwekar, Corporator, Mumbai, Ward Development, BJP',
  openGraph: {
    title: 'Makarand Narwekar | Corporator',
    description: 'Dedicated to transforming our ward',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### 2. Home Page

Create `app/page.tsx`:

```typescript
import { Hero } from './components/Hero'
import { AboutPreview } from './components/AboutPreview'
import { VisionPreview } from './components/VisionPreview'
import { WorkImpactPreview } from './components/WorkImpactPreview'
import { MediaPreview } from './components/MediaPreview'
import { Testimonials } from './components/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <VisionPreview />
      <WorkImpactPreview />
      <MediaPreview />
      <Testimonials />
    </>
  )
}
```

### 3. About Page

Create `app/about/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { About } from '../components/About'

export const metadata: Metadata = {
  title: 'About | Makarand Narwekar',
  description: 'Learn about Makarand Narwekar\'s journey and commitment to public service.',
}

export default function AboutPage() {
  return <About />
}
```

### 4. Dynamic Routes (Project Detail)

Create `app/project/[id]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { ProjectDetail } from '@/app/components/ProjectDetail'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Project: ${params.id} | Makarand Narwekar`,
  }
}

export default function ProjectDetailPage({ params }: Props) {
  return <ProjectDetail id={params.id} />
}
```

### 5. Update Components - Remove React Router

**Before (React Router):**
```typescript
import { Link } from "react-router";

<Link to="/about">About</Link>
```

**After (Next.js):**
```typescript
import Link from 'next/link'

<Link href="/about">About</Link>
```

### 6. Update Image Imports

**Before:**
```typescript
<img src={IMAGES.hero} alt="Hero" />
```

**After (with Next.js Image optimization):**
```typescript
import Image from 'next/image'

<Image
  src={IMAGES.hero}
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### 7. Update Environment Variables

**Before (Vite):**
```typescript
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
```

**After (Next.js):**
```typescript
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
```

### 8. Update Hooks for API Calls

Your hooks in `hooks/useSocialMedia.ts` will work as-is, just update env variables:

```typescript
// Update this line:
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";
```

---

## 📝 Migration Script

I'll create an automated migration script for you. Run this after creating the Next.js project:

```bash
#!/bin/bash
# migration.sh

echo "🚀 Starting Next.js migration..."

# Copy components
cp -r src/app/components app/

# Copy hooks
cp -r src/app/hooks app/

# Copy images (if you have them)
cp -r public/* ../makarand-nextjs/public/

echo "✅ Files copied!"
echo "📝 Next steps:"
echo "1. Update all 'react-router' imports to 'next/link'"
echo "2. Update 'import.meta.env' to 'process.env'"
echo "3. Add metadata to each page"
echo "4. Test all routes"
```

---

## 🎨 SEO Enhancements in Next.js

### 1. Metadata API

Add to each page:

```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
    images: ['/twitter-image.jpg'],
  },
}
```

### 2. Structured Data (JSON-LD)

Add to pages for rich snippets:

```typescript
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Makarand Narwekar',
    jobTitle: 'Corporator',
    url: 'https://makarandnarwekar.com',
    sameAs: [
      'https://www.facebook.com/MakarandNarwekarOfficial',
      'https://x.com/MNarwekar',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

### 3. Sitemap Generation

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://makarandnarwekar.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://makarandnarwekar.com/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add all routes
  ]
}
```

### 4. Robots.txt

Create `app/robots.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://makarandnarwekar.com/sitemap.xml',
  }
}
```

---

## 🚢 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Next.js migration"
git branch -M main
git remote add origin https://github.com/yourusername/makarand-nextjs.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_YOUTUBE_API_KEY`
   - `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID`
   - `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN`
5. Click "Deploy"

Vercel will automatically:
- Build your project
- Deploy to production
- Provide a `.vercel.app` domain
- Set up automatic deployments on push

### 3. Custom Domain

In Vercel dashboard:
1. Go to project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## 🧪 Testing Checklist

Before going live:

- [ ] All pages load correctly
- [ ] Navigation works (no React Router errors)
- [ ] Images load and are optimized
- [ ] API calls work (YouTube/Instagram)
- [ ] Forms submit correctly
- [ ] Meta tags show in page source (View Page Source)
- [ ] Social media previews work (test with Facebook/Twitter debugger)
- [ ] Mobile responsive
- [ ] Performance score (Lighthouse)
- [ ] SEO score (Lighthouse)

---

## 🔍 SEO Testing Tools

After deployment, test with:

1. **Google Search Console** - https://search.google.com/search-console
2. **Facebook Sharing Debugger** - https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator** - https://cards-dev.twitter.com/validator
4. **Lighthouse** (in Chrome DevTools)
5. **PageSpeed Insights** - https://pagespeed.web.dev/

---

## 📊 Expected SEO Improvements

### Before (Vite + React)
- ❌ Client-side rendering only
- ❌ SEO relies on JavaScript
- ❌ Slower initial page load
- ❌ Poor social media previews

### After (Next.js)
- ✅ Server-side rendering
- ✅ HTML available immediately for crawlers
- ✅ Faster initial page load
- ✅ Rich social media previews
- ✅ Better Core Web Vitals scores
- ✅ Structured data for rich snippets

---

## 🆘 Common Migration Issues

### Issue 1: "window is not defined"
**Solution:** Use `useEffect` or check for browser:
```typescript
if (typeof window !== 'undefined') {
  // Browser-only code
}
```

### Issue 2: Dynamic imports
**Solution:** Use Next.js dynamic imports:
```typescript
import dynamic from 'next/dynamic'

const Component = dynamic(() => import('./Component'), {
  ssr: false
})
```

### Issue 3: Framer Motion hydration errors
**Solution:** Add `suppressHydrationWarning`:
```typescript
<motion.div suppressHydrationWarning>
```

---

## ⏱️ Migration Timeline

- **Day 1 (4-5 hours)**: Setup + Basic migration
- **Day 2 (3-4 hours)**: Fix issues + SEO optimization
- **Day 3 (2 hours)**: Testing + Deployment

**Total: 2-3 days of work**

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [SEO in Next.js](https://nextjs.org/learn/seo/introduction-to-seo)
- [Vercel Deployment](https://vercel.com/docs)

---

## 💡 Pro Tips

1. **Keep both projects** during migration - test side by side
2. **Migrate page by page** - don't rush
3. **Test SEO early** - check meta tags as you go
4. **Use TypeScript** - catches migration errors early
5. **Monitor performance** - use Vercel Analytics

---

## 📞 Need Help?

If you get stuck:
1. Check Next.js docs
2. Search Next.js GitHub issues
3. Ask on Next.js Discord
4. I'm here to help!

---

Ready to start? Let me know and I can help you with each step! 🚀
