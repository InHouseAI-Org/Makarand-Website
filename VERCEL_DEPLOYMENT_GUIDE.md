# Vercel Deployment Guide for Makarand Narwekar Website

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Neon Database**: Your PostgreSQL database (already configured)
4. **UploadThing Account**: For file uploads (already configured)

## Step-by-Step Deployment

### 1. Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### 2. Push Code to GitHub

```bash
git add .
git commit -m "feat: Prepare for Vercel deployment"
git push origin main
```

### 3. Import Project to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

**Option B: Via CLI**
```bash
vercel
```

### 4. Configure Environment Variables

In the Vercel dashboard, go to **Project Settings → Environment Variables** and add:

#### Required Database Variables
```
DATABASE_URL=your_neon_database_connection_string
```
Example: `postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

#### Required Authentication Variables
```
NEXTAUTH_SECRET=your_secure_random_string_here
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```

To generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

#### UploadThing Configuration
```
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

#### YouTube API (Optional - for video content)
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id
```

#### Instagram API (Optional - for social media feeds)
```
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_token
```

#### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://makarandnarwekar.com
```

#### Google Analytics (Optional)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_verification_code
```

### 5. Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### 6. Deploy

Click **Deploy** in the Vercel dashboard, or run:
```bash
vercel --prod
```

### 7. Update NEXTAUTH_URL After First Deployment

After your first deployment:
1. Copy your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
2. Update the `NEXTAUTH_URL` environment variable to match this URL
3. Redeploy

### 8. Configure Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Add `makarandnarwekar.com`
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to use your custom domain

## Environment Variables Checklist

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | ✅ Yes | Authentication encryption key |
| `NEXTAUTH_URL` | ✅ Yes | Your deployment URL |
| `UPLOADTHING_SECRET` | ✅ Yes | File upload service |
| `UPLOADTHING_APP_ID` | ✅ Yes | File upload app ID |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | ⚠️ Optional | YouTube video integration |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | ⚠️ Optional | YouTube channel ID |
| `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` | ⚠️ Optional | Instagram feed |
| `NEXT_PUBLIC_SITE_URL` | ⚠️ Optional | SEO and metadata |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ⚠️ Optional | Google Analytics |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | ⚠️ Optional | Search Console |

## Database Setup on Neon

Your Neon database is already configured. Ensure:

1. **Connection pooling is enabled** for serverless
2. Use the **pooled connection string** from Neon dashboard
3. The connection string includes `?sslmode=require`

Example pooled connection string:
```
postgresql://user:password@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] Admin login works (`/admin/login`)
- [ ] Database queries work (check any page that fetches data)
- [ ] File uploads work (test in admin dashboard)
- [ ] API routes respond correctly
- [ ] Images load properly
- [ ] Forms submit successfully

## Troubleshooting

### Build Fails with Prisma Error
**Solution**: Ensure `DATABASE_URL` is set and `prisma generate` runs in build command

### NextAuth Error: "NEXTAUTH_URL is not defined"
**Solution**: Add `NEXTAUTH_URL` environment variable matching your deployment URL

### Database Connection Timeout
**Solution**: Use Neon's **pooled connection string** instead of direct connection

### Images Not Loading
**Solution**:
1. Check UploadThing environment variables are set
2. Verify image domains in `next.config.ts`

### Cold Start Issues
Vercel serverless functions may have ~1-2s cold starts, but this is much better than Render's 50s wake time

## Performance Optimization

Vercel automatically provides:
- ✅ **Global CDN** for static assets
- ✅ **Edge caching** for pages
- ✅ **Image optimization** via Next.js Image component
- ✅ **Automatic compression** (gzip/brotli)
- ✅ **HTTP/2 and HTTP/3** support

## Monitoring

1. **Vercel Analytics**: Enable in Project Settings
2. **Vercel Logs**: View function logs in dashboard
3. **Google Analytics**: Track via `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- **Push to `main`**: Deploys to production
- **Push to other branches**: Creates preview deployments
- **Pull Requests**: Automatic preview URLs

## Region Configuration

The site is configured to deploy in the **Mumbai (bom1)** region for optimal performance in India. This is set in `vercel.json`.

## Cost

- **Hobby Plan (Free)**:
  - 100 GB bandwidth/month
  - Unlimited serverless function executions
  - Unlimited deployments
  - Perfect for this project

- **Pro Plan ($20/month)**:
  - 1 TB bandwidth
  - Better analytics
  - Priority support

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js on Vercel**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## Quick Deploy Commands

```bash
# First time setup
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Check deployment status
vercel inspect [deployment-url]
```

## Getting Your Environment Variables

### DATABASE_URL
1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Click "Connection Details"
4. Copy the **Pooled connection** string

### UploadThing Keys
1. Go to [UploadThing Dashboard](https://uploadthing.com/dashboard)
2. Select your app
3. Copy **App ID** and **Secret**

### YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable YouTube Data API v3
3. Create credentials → API Key

### Instagram Access Token
1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create an Instagram Basic Display app
3. Generate long-lived access token

---

**Your site is now ready for deployment on Vercel!** 🚀
