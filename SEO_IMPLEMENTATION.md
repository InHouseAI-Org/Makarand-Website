# SEO Implementation Guide
## Makarand Narwekar Website

This document outlines the comprehensive SEO implementation for the Makarand Narwekar website, including all optimizations, structured data, and best practices.

---

## Table of Contents

1. [Overview](#overview)
2. [SEO Utilities](#seo-utilities)
3. [Dynamic Sitemap](#dynamic-sitemap)
4. [Structured Data (JSON-LD)](#structured-data-json-ld)
5. [Metadata Implementation](#metadata-implementation)
6. [Open Graph Images](#open-graph-images)
7. [Breadcrumb Navigation](#breadcrumb-navigation)
8. [Technical SEO](#technical-seo)
9. [Testing & Validation](#testing--validation)
10. [Best Practices](#best-practices)

---

## Overview

The website implements **comprehensive SEO** following Google's best practices and structured data guidelines. All pages are optimized for:

- **Search Engine Discovery**: Dynamic sitemap, robots.txt
- **Rich Snippets**: JSON-LD structured data
- **Social Sharing**: Open Graph & Twitter Cards
- **Mobile-First**: Responsive meta tags
- **Performance**: Optimized metadata delivery

---

## SEO Utilities

**Location**: `/lib/seo.ts`

### Core Functions

#### 1. `generateSEO(config: SEOConfig): Metadata`
Generates comprehensive metadata for any page.

**Usage**:
```typescript
import { generateSEO, KEYWORDS, combineKeywords } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'About Makarand Narwekar',
  description: 'Learn about Makarand\'s journey...',
  keywords: combineKeywords(KEYWORDS.base, KEYWORDS.governance),
  canonical: '/about',
  ogImage: '/api/og?title=About&description=Journey',
  ogType: 'profile',
});
```

**Parameters**:
- `title` (string): Page title
- `description` (string): Meta description (150-160 chars recommended)
- `keywords` (string[]): SEO keywords
- `canonical` (string): Canonical URL path
- `ogImage` (string): Open Graph image URL
- `ogType` ('website' | 'article' | 'profile'): OG type
- `publishedTime` (string): ISO date for articles
- `modifiedTime` (string): ISO date for articles
- `authors` (string[]): Author names
- `noindex` (boolean): Prevent indexing

#### 2. Structured Data Generators

**Organization Schema**:
```typescript
generateOrganizationSchema()
```

**Person Schema**:
```typescript
generatePersonSchema()
```

**WebSite Schema** (with search):
```typescript
generateWebSiteSchema()
```

**Breadcrumb Schema**:
```typescript
generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' }
])
```

**Article Schema**:
```typescript
generateArticleSchema({
  headline: 'Project Title',
  description: 'Project description',
  image: '/image.jpg',
  datePublished: '2024-01-01T00:00:00Z',
  dateModified: '2024-01-02T00:00:00Z',
  author: 'Makarand Narwekar',
  url: '/project/123'
})
```

**Event Schema**:
```typescript
generateEventSchema({
  name: 'Community Event',
  description: 'Event description',
  startDate: '2024-12-25T10:00:00Z',
  endDate: '2024-12-25T14:00:00Z',
  location: { name: 'Mumbai', address: 'A Ward' },
  image: '/event.jpg',
  url: '/events/123'
})
```

**Local Government Schema**:
```typescript
generateLocalGovernmentSchema()
```

#### 3. Keyword Sets

Pre-defined keyword collections in `KEYWORDS` object:

- `KEYWORDS.base` - Core keywords (Makarand Narwekar, Mumbai Corporator, etc.)
- `KEYWORDS.development` - Development-related
- `KEYWORDS.governance` - Governance-related
- `KEYWORDS.youth` - Youth programs
- `KEYWORDS.projects` - Infrastructure projects

**Combine Keywords**:
```typescript
combineKeywords(
  KEYWORDS.base,
  KEYWORDS.governance,
  ['Custom', 'Keywords']
)
```

---

## Dynamic Sitemap

**Location**: `/app/sitemap.ts`

### Features

- **Database Integration**: Automatically pulls all projects, press, videos, awards from Prisma
- **Dynamic Updates**: Updates `lastModified` based on database timestamps
- **Smart Priorities**: Different priorities based on content type
- **Change Frequencies**: Adaptive based on content status (ongoing vs completed)

### URL Categories

| Type | Priority | Change Frequency | Source |
|------|----------|------------------|--------|
| Homepage | 1.0 | daily | Static |
| Main Pages | 0.9 | weekly | Static |
| Projects | 0.7 | weekly/monthly | Database |
| Press Articles | 0.6 | monthly | Database |
| Videos | 0.6 | monthly | Database |
| Awards | 0.5 | yearly | Database |

### Accessing Sitemap

- **URL**: `https://makarandnarwekar.com/sitemap.xml`
- **Auto-generated**: On every request (dynamic)
- **Cached**: By Next.js based on revalidation settings

---

## Structured Data (JSON-LD)

### Global Schemas (All Pages)

Located in `/app/layout.tsx`:

1. **Organization Schema**: Office information, contact, address
2. **Person Schema**: Makarand Narwekar's profile
3. **WebSite Schema**: Site-wide search action
4. **LocalGovernment Schema**: Municipal office details

### Page-Specific Schemas

#### Project Pages (`/project/[id]`)
- **Article Schema**: Project as an article with publication dates
- Includes: title, description, images, dates, author

#### Press Coverage (`/media/press/[id]`)
- **Article Schema**: Press article with source attribution
- Includes: headline, source, publication date, external URL

#### Events (if implemented)
- **Event Schema**: Event details with location and timing

### Schema Validation

Test your structured data:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/

---

## Metadata Implementation

### Root Layout Metadata

**Location**: `/app/layout.tsx`

**Features**:
- Template-based titles: `%s | Makarand Narwekar`
- Comprehensive keywords (15+ terms)
- Open Graph configuration
- Twitter Card configuration
- Google verification placeholder
- Geo-targeting (Mumbai, Maharashtra)
- Viewport & theme color

### Page-Level Metadata

All major pages use `generateSEO()` utility:

#### Updated Pages:
1. `/about` - Profile metadata
2. `/vision` - Vision & goals
3. `/work` - Projects & impact
4. `/youth` - Youth programs
5. `/project/[id]` - Dynamic project metadata
6. `/media/press/[id]` - Dynamic press metadata

### Metadata Best Practices

**Title Length**: 50-60 characters
```typescript
title: 'About Makarand Narwekar | Journey & Commitment'
```

**Description Length**: 150-160 characters
```typescript
description: 'Discover Makarand Narwekar\'s inspiring journey...'
```

**Keywords**: 10-15 relevant keywords
```typescript
keywords: combineKeywords(KEYWORDS.base, KEYWORDS.governance)
```

**Canonical URLs**: Always include
```typescript
canonical: '/about'
```

---

## Open Graph Images

### Dynamic OG Image Generation

**Location**: `/app/api/og/route.tsx`

**Endpoint**: `/api/og`

### Parameters

- `title` (string): Main title text
- `description` (string): Subtitle/description
- `type` (string): Badge type - `default`, `project`, `press`, `award`, `government`, `youth`
- `category` (string): Custom badge text

### Usage Examples

**Default Page**:
```
/api/og?title=About Makarand&description=Journey of Service&type=default
```

**Project**:
```
/api/og?title=Road Development&description=Infrastructure Upgrade&type=project
```

**Press**:
```
/api/og?title=Press Article&description=News Coverage&type=press
```

**Award**:
```
/api/og?title=Community Award&description=Recognition&type=award
```

### Features

- **Dynamic**: Generates images on-the-fly
- **Branded**: Includes Makarand Narwekar branding
- **Color-Coded**: Different badge colors per type
- **Optimized**: 1200x630px (ideal for social media)
- **Edge Runtime**: Fast generation using Next.js Edge

### Color Scheme

| Type | Badge Color |
|------|-------------|
| Project | Green (#10B981) |
| Press | Blue (#3B82F6) |
| Award | Orange (#F59E0B) |
| Government | Purple (#8B5CF6) |
| Youth | Pink (#EC4899) |
| Default | Red (#FF6B6B) |

---

## Breadcrumb Navigation

**Location**: `/app/components/Breadcrumb.tsx`

### Features

- **Automatic Home**: Always includes homepage
- **Schema Markup**: Injects BreadcrumbList JSON-LD
- **Accessible**: ARIA labels and navigation
- **Styled**: Responsive with icons

### Usage

```tsx
import { Breadcrumb } from '@/app/components/Breadcrumb';

<Breadcrumb
  items={[
    { name: 'Work', url: '/work' },
    { name: 'Project Name', url: '/project/123' }
  ]}
/>
```

### Auto-generates Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://..." },
    { "@type": "ListItem", "position": 2, "name": "Work", "item": "https://..." }
  ]
}
```

---

## Technical SEO

### Robots.txt

**Location**: `/app/robots.ts`

**Configuration**:
- Allows all bots on public pages
- Disallows `/api/` and `/admin/`
- Includes sitemap reference
- Specifies host

### Mobile Optimization

**Viewport Meta**:
```typescript
viewport: {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF6B6B'
}
```

### Performance

- **Force Dynamic**: Real-time database data
- **Revalidation**: Configured per page type
- **Image Optimization**: WebP format support
- **Edge Runtime**: OG image generation

### Geo-Targeting

```html
<meta name="geo.region" content="IN-MH" />
<meta name="geo.placename" content="Mumbai" />
```

### PWA Support

- Web app manifest at `/manifest.json`
- Apple touch icons
- Service worker ready (if implemented)

---

## Testing & Validation

### Tools

1. **Google Search Console**
   - Submit sitemap: `https://makarandnarwekar.com/sitemap.xml`
   - Verify ownership (update `layout.tsx` with verification code)
   - Monitor indexing status

2. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test structured data rendering

3. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Paste JSON-LD for validation

4. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test Open Graph tags

5. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter Card rendering

6. **Lighthouse (Chrome DevTools)**
   - Run SEO audit
   - Target: 90+ SEO score

### Checklist

- [ ] Verify sitemap generates correctly
- [ ] Test all structured data schemas
- [ ] Validate Open Graph images render
- [ ] Check mobile responsiveness
- [ ] Verify canonical URLs
- [ ] Test breadcrumb navigation
- [ ] Confirm robots.txt rules
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Core Web Vitals
- [ ] Check for broken links

---

## Best Practices

### Content

1. **Unique Titles**: Every page has unique, descriptive title
2. **Meta Descriptions**: Compelling, 150-160 chars
3. **Keywords**: Natural integration, no stuffing
4. **Headers**: Proper H1-H6 hierarchy
5. **Alt Text**: All images need descriptive alt text

### Technical

1. **Canonical URLs**: Prevent duplicate content
2. **Structured Data**: Rich snippets eligibility
3. **Mobile-First**: Responsive design
4. **Performance**: Fast loading times
5. **HTTPS**: Secure connection (ensure in production)

### Updates

1. **Regular Content**: Update projects regularly
2. **Fresh Data**: Sitemap auto-updates from database
3. **Monitor Analytics**: Track performance
4. **Fix Errors**: Address Search Console issues
5. **Stay Current**: Update schemas as guidelines change

### Monitoring

- **Google Search Console**: Weekly checks
- **Analytics**: Monitor organic traffic
- **Rankings**: Track keyword positions
- **CTR**: Optimize meta for higher click-through
- **Structured Data**: Check for errors monthly

---

## Implementation Files

### Key Files Created/Modified

| File | Purpose |
|------|---------|
| `/lib/seo.ts` | SEO utilities & schema generators |
| `/app/sitemap.ts` | Dynamic sitemap with DB integration |
| `/app/layout.tsx` | Global schemas & metadata |
| `/app/components/Breadcrumb.tsx` | Breadcrumb with schema |
| `/app/api/og/route.tsx` | Dynamic OG image generation |
| `/app/about/page.tsx` | Enhanced metadata |
| `/app/vision/page.tsx` | Enhanced metadata |
| `/app/work/page.tsx` | Enhanced metadata |
| `/app/youth/page.tsx` | Enhanced metadata |
| `/app/project/[id]/page.tsx` | Dynamic metadata + Article schema |
| `/app/media/press/[id]/page.tsx` | Dynamic metadata + Article schema |

### Database Integration

The sitemap dynamically queries:
- `prisma.project.findMany()`
- `prisma.governmentProject.findMany()`
- `prisma.pressCoverage.findMany()`
- `prisma.video.findMany()`
- `prisma.award.findMany()`

Ensure these models exist and are populated.

---

## Next Steps

### To Activate

1. **Google Search Console**:
   - Verify ownership
   - Submit sitemap
   - Update verification code in `layout.tsx`

2. **Update Images**:
   - Add `/og-image.jpg` (1200x630px)
   - Add `/twitter-image.jpg` (1200x630px)
   - Add `/logo.png` for schemas

3. **Content Optimization**:
   - Add alt text to all images
   - Review and optimize meta descriptions
   - Ensure unique content on all pages

4. **Monitoring Setup**:
   - Enable Google Analytics (already configured)
   - Set up conversion tracking
   - Monitor Core Web Vitals

### Future Enhancements

- [ ] Add FAQ schema for common questions
- [ ] Implement Review/Rating schema for testimonials
- [ ] Add Video schema for media content
- [ ] Create location-based LocalBusiness schema
- [ ] Add hreflang tags if multi-language support needed
- [ ] Implement AMP (if required)
- [ ] Add schema for government projects specifically

---

## Support & Resources

- **Next.js Metadata Docs**: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Google Search Central**: https://developers.google.com/search
- **Schema.org**: https://schema.org/
- **Open Graph Protocol**: https://ogp.me/

---

**Last Updated**: 2026-04-05
**Implemented By**: Claude Code Assistant
**Status**: ✅ Production Ready
