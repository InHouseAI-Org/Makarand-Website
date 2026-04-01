# Makarand Narwekar - Next.js Website

Modern, SEO-optimized website for Mumbai Corporator Makarand Narwekar built with Next.js 15, React 19, and Tailwind CSS.

## 🚀 Features

- ✅ **Server-Side Rendering (SSR)** - Improved SEO and performance
- ✅ **Comprehensive SEO** - Meta tags, Open Graph, Twitter Cards, structured data
- ✅ **Automatic Sitemap & Robots.txt** - Better search engine indexing
- ✅ **Image Optimization** - Next.js Image component support
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Modern styling with custom theme
- ✅ **Framer Motion** - Smooth animations
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Social Media Integration** - YouTube, Instagram APIs

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# YouTube API Configuration
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id_here

# Instagram API Configuration
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://makarandnarwekar.com
```

See `.env.local.example` for all available options.

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── about/              # About page
│   ├── vision/             # Vision page
│   ├── work/               # Work & Impact page
│   ├── youth/              # Youth programs page
│   ├── government-projects/# Government projects page
│   ├── ward/               # Ward information page
│   ├── media/              # Media coverage
│   │   └── [type]/[id]/    # Dynamic media detail pages
│   ├── connect/            # Contact page
│   ├── project/[id]/       # Dynamic project detail pages
│   ├── components/         # Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── layout.tsx          # Root layout with SEO
│   ├── template.tsx        # Template with Header/Footer
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt configuration
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 SEO Features

### Metadata

Every page has optimized metadata:
- Title tags with templates
- Meta descriptions
- Keywords
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data

JSON-LD structured data for:
- Person schema (homepage)
- Organization information
- Social media profiles
- Address and contact info

### Sitemap & Robots

- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Proper crawling instructions

## 🔧 Configuration

### Tailwind Theme

Custom colors defined in `tailwind.config.ts`:
- `coral` - Primary brand color
- `charcoal` - Dark text
- `cream` - Light backgrounds

### Image Optimization

Configure remote image patterns in `next.config.ts`:
- YouTube thumbnails
- Instagram CDN

## 📱 Pages & Routes

| Route | Description | SEO Priority |
|-------|-------------|--------------|
| `/` | Homepage | 1.0 |
| `/about` | About page | 0.9 |
| `/vision` | Vision & goals | 0.9 |
| `/work` | Projects & impact | 0.9 |
| `/youth` | Youth programs | 0.8 |
| `/government-projects` | Government initiatives | 0.8 |
| `/ward` | Ward information | 0.7 |
| `/media` | Media coverage | 0.8 |
| `/connect` | Contact page | 0.7 |
| `/project/[id]` | Project details | 0.6 |
| `/media/[type]/[id]` | Media details | 0.6 |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

Vercel automatically:
- Builds and deploys on push
- Provides preview URLs for PRs
- Enables edge caching
- Handles SSL certificates

### Environment Variables on Vercel

Add these in Project Settings → Environment Variables:
- `NEXT_PUBLIC_YOUTUBE_API_KEY`
- `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID`
- `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN`

## 📊 Performance

Next.js provides:
- Automatic code splitting
- Image optimization
- Font optimization
- Route prefetching
- API routes (if needed)

## 🔍 SEO Testing

After deployment, test with:
- [Google Search Console](https://search.google.com/search-console)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

## 📝 License

© 2026 Makarand Narwekar. All rights reserved.

## 🆘 Support

For issues or questions, please contact the development team.
