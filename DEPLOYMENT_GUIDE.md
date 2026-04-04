# Deployment Guide - Render + Neon Database

This guide will help you deploy your Makarand Narwekar website to Render with a Neon PostgreSQL database.

## Prerequisites

- [x] GitHub repository with your code
- [ ] Render account (https://render.com)
- [ ] Neon account (https://neon.tech)
- [ ] UploadThing account (https://uploadthing.com)

## Step 1: Set Up Neon Database

1. **Create Neon Account & Project**
   - Go to https://neon.tech
   - Sign up / Log in
   - Click "Create Project"
   - Name: `makarand-website-db` (or any name)
   - Region: Choose closest to your users (e.g., US East)
   - PostgreSQL version: Latest (15 or 16)

2. **Get Connection String**
   - After project creation, go to Dashboard
   - Click "Connection Details"
   - Copy the **Connection String** (starts with `postgresql://`)
   - It should look like: `postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require`

3. **Enable Connection Pooling** (Important for Prisma)
   - In Neon dashboard, enable "Connection Pooling"
   - Get the **Pooled Connection String**
   - Save both regular and pooled connection strings

## Step 2: Configure Environment Variables for Render

You'll need these environment variables in your Render dashboard:

### Required Variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-app-name.onrender.com"

# UploadThing (for image uploads)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
UPLOADTHING_TOKEN="your-token"

# Optional: Social Media APIs
NEXT_PUBLIC_YOUTUBE_API_KEY="your-youtube-api-key"
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID="your-channel-id"
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN="your-instagram-token"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://your-app-name.onrender.com"
```

### How to Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 3: Deploy to Render

### Option A: New Deployment

1. **Connect GitHub Repository**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository: `Makarand Narwekar Website Design`

2. **Configure Build Settings**
   - **Name**: `makarand-website` (or your choice)
   - **Region**: US East (or closest to your users)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (since we moved everything to root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or Starter for better performance)

3. **Add Environment Variables**
   - Scroll to "Environment Variables"
   - Click "Add Environment Variable"
   - Add all variables from Step 2 above
   - **Important**: Add them one by one

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes first time)

### Option B: Update Existing Deployment

1. **Push Changes to GitHub**
   ```bash
   git push origin main
   ```

2. **Update Environment Variables**
   - Go to your Render dashboard
   - Select your web service
   - Go to "Environment" tab
   - Add/update the environment variables from Step 2

3. **Trigger Redeploy**
   - Go to "Manual Deploy" → "Deploy latest commit"
   - Or push a new commit to trigger auto-deploy

## Step 4: Run Database Migration

After first deployment:

1. **Access Render Shell**
   - In Render dashboard, go to your web service
   - Click "Shell" tab
   - Run: `npx prisma db push`
   - This will create all database tables

2. **Create Admin User**
   - In Render shell, run: `npm run create-admin`
   - Follow prompts to create admin account

## Step 5: Verify Deployment

1. **Check Build Logs**
   - Make sure build completed successfully
   - No errors in logs

2. **Test Website**
   - Visit your Render URL: `https://your-app-name.onrender.com`
   - Test homepage loads
   - Test admin login: `https://your-app-name.onrender.com/admin/login`

3. **Test Database Connection**
   - Try logging into admin panel
   - Create a test event
   - Check if it shows on homepage

## Step 6: Custom Domain (Optional)

1. **Add Custom Domain in Render**
   - Go to Settings → Custom Domain
   - Add: `makarandnarwekar.com`
   - Add: `www.makarandnarwekar.com`

2. **Update DNS Settings**
   - Add CNAME records in your domain registrar:
   ```
   CNAME www your-app-name.onrender.com
   CNAME @ your-app-name.onrender.com (or use A record)
   ```

3. **Update Environment Variables**
   - Change `NEXT_PUBLIC_SITE_URL` to `https://makarandnarwekar.com`
   - Change `NEXTAUTH_URL` to `https://makarandnarwekar.com`

## Common Issues & Solutions

### Issue: Build Fails
**Solution**: Check that all dependencies are in `package.json`, not in old root files

### Issue: Database Connection Error
**Solution**:
- Verify `DATABASE_URL` is correct
- Make sure Neon project is active
- Check if connection pooling is enabled

### Issue: Images Not Uploading
**Solution**:
- Verify UploadThing credentials are correct
- Check UploadThing dashboard for errors

### Issue: "Module not found" errors
**Solution**:
- Run `npm install` locally
- Make sure `package-lock.json` is committed
- Check import paths are correct (no `/nextjs-app/` references)

## Deployment Checklist

- [ ] Neon database created and connection string copied
- [ ] All environment variables added to Render
- [ ] Code pushed to GitHub (latest commit)
- [ ] Render web service created/updated
- [ ] Build completed successfully
- [ ] Database migrated with `npx prisma db push`
- [ ] Admin user created
- [ ] Website loads correctly
- [ ] Admin panel works
- [ ] Events system works
- [ ] Custom domain configured (if applicable)

## Monitoring & Maintenance

- **Logs**: Check Render logs regularly for errors
- **Database**: Monitor Neon dashboard for storage usage
- **Uptime**: Render free tier sleeps after 15min inactivity (upgrade to Starter for 24/7)
- **Backups**: Neon automatically backs up your database

## Support Resources

- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Last Updated**: April 4, 2026
**Status**: Ready for Deployment ✅
