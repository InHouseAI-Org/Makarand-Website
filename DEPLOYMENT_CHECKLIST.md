# ✅ Vercel Deployment Checklist

## Pre-Deployment Status: READY ✅

### Configuration Files ✅
- [x] `vercel.json` created
- [x] `.vercelignore` created
- [x] `next.config.ts` optimized for Vercel
- [x] Build command configured: `prisma generate && next build`
- [x] Local build test passed ✅

### Code Ready ✅
- [x] All sensitive files excluded in `.gitignore`
- [x] Environment variables documented
- [x] Database schema ready (Prisma)
- [x] API routes configured
- [x] NextAuth setup complete

---

## Deployment Steps

### 1. Push to GitHub ✅ (If not already done)

```bash
git add .
git commit -m "feat: Prepare for Vercel deployment with optimized config"
git push origin main
```

### 2. Deploy to Vercel

**Choose ONE method:**

#### Option A: Vercel Dashboard (Recommended for first deployment)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. Vercel auto-detects Next.js ✅
5. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install CLI (if not already installed)
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### 3. Configure Environment Variables in Vercel Dashboard

Go to: **Project Settings → Environment Variables**

#### Critical Variables (Required ✅)

```bash
# Database
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require

# Authentication
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.vercel.app

# File Uploads
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

#### Optional Variables (For Full Features)

```bash
# YouTube Integration
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id

# Instagram Integration
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_token

# Site Config
NEXT_PUBLIC_SITE_URL=https://makarandnarwekar.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_verification_code
```

### 4. After First Deployment

1. **Copy your Vercel URL** (e.g., `https://your-app.vercel.app`)
2. **Update environment variable:**
   - Go to Project Settings → Environment Variables
   - Update `NEXTAUTH_URL` to match your Vercel URL
3. **Redeploy** (Vercel → Deployments → Three dots → Redeploy)

### 5. Test Your Deployment

Visit these URLs to verify:

- [ ] Homepage: `https://your-app.vercel.app`
- [ ] Admin login: `https://your-app.vercel.app/admin/login`
- [ ] Any public page (e.g., `/about`, `/work`)
- [ ] Test database connection (check if projects/testimonials load)
- [ ] Test file upload (login to admin, try uploading an image)

### 6. Setup Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Add `makarandnarwekar.com`
3. Configure DNS with your domain registrar:
   ```
   Type: A Record
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. After DNS propagates, update:
   - `NEXTAUTH_URL=https://makarandnarwekar.com`
   - `NEXT_PUBLIC_SITE_URL=https://makarandnarwekar.com`
5. Redeploy

---

## Post-Deployment Verification

### Functional Tests
- [ ] Site loads within 2-3 seconds
- [ ] Admin login works
- [ ] Dashboard loads correctly
- [ ] Can create/edit/delete content
- [ ] File uploads work
- [ ] Forms submit successfully
- [ ] Images display correctly
- [ ] API routes respond (check Network tab)

### Performance Checks
- [ ] Lighthouse score > 90
- [ ] Images are optimized (Next.js Image)
- [ ] No console errors
- [ ] Mobile responsive

### SEO Verification
- [ ] Meta tags present (view source)
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Open Graph images work (test with https://metatags.io)

---

## Troubleshooting Common Issues

### Build Fails

**Error: "Prisma Client not found"**
```bash
Solution: Ensure DATABASE_URL is set in environment variables
Build command includes: prisma generate
```

**Error: "Module not found: @prisma/client"**
```bash
Solution: Check serverExternalPackages in next.config.ts
Already configured ✅
```

### Runtime Errors

**Error: "NEXTAUTH_URL is not defined"**
```bash
Solution: Add NEXTAUTH_URL in Vercel environment variables
Must match your deployment URL
```

**Database Connection Timeout**
```bash
Solution: Use Neon's POOLED connection string
Format: postgresql://user:pass@xxx-pooler.aws.neon.tech/db
```

**Images Not Loading**
```bash
Solution: Check UPLOADTHING variables are set
Verify image domains in next.config.ts (already configured ✅)
```

---

## Environment Variables Quick Reference

| Variable | Example | Where to Get |
|----------|---------|--------------|
| `DATABASE_URL` | `postgresql://...` | Neon Console → Connection String (Pooled) |
| `NEXTAUTH_SECRET` | `base64string...` | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://yourapp.vercel.app` | Your Vercel deployment URL |
| `UPLOADTHING_SECRET` | `sk_live_...` | UploadThing Dashboard → Settings |
| `UPLOADTHING_APP_ID` | `abc123...` | UploadThing Dashboard → App Settings |

---

## What's Already Configured ✅

1. ✅ Build optimization for Vercel
2. ✅ Prisma integration for serverless
3. ✅ Image optimization (Next.js Image component)
4. ✅ API routes ready as serverless functions
5. ✅ Static page generation where possible
6. ✅ Mumbai region (bom1) for India performance
7. ✅ Proper file exclusions (.vercelignore)
8. ✅ Compression enabled
9. ✅ Security headers ready

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma on Vercel**: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- **Neon + Vercel**: https://neon.tech/docs/guides/vercel

---

## Ready to Deploy? 🚀

**Current Status:** ✅ ALL CHECKS PASSED

You can now:
1. Push your code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

The site will be live in ~2-3 minutes after deployment starts.

---

**Last Build Test:** ✅ Passed (95 routes generated successfully)
**Configuration:** ✅ Complete
**Documentation:** ✅ Ready

**YOU ARE READY TO DEPLOY!** 🎉
