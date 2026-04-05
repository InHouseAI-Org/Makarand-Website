# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 tracking for your website.

## Step 1: Create a Google Analytics 4 Property

1. **Go to Google Analytics**
   - Visit [https://analytics.google.com](https://analytics.google.com)
   - Sign in with your Google account

2. **Create a new property** (if you don't have one)
   - Click on **Admin** (gear icon in the bottom left)
   - In the **Account** column, select or create an account
   - In the **Property** column, click **Create Property**
   - Enter property details:
     - Property name: `Makarand Narwekar Website`
     - Time zone: `India Time (IST)`
     - Currency: `Indian Rupee (₹)`
   - Click **Next**

3. **Set up your business details**
   - Industry: `Politics & Government`
   - Business size: Select appropriate size
   - Select how you want to use Google Analytics
   - Click **Create**

4. **Accept the Terms of Service**

## Step 2: Set Up a Data Stream

1. **Choose a platform**
   - Select **Web**

2. **Set up web stream**
   - Website URL: `https://makarandnarwekar.com`
   - Stream name: `Makarand Narwekar Website`
   - **Enhanced measurement**: Leave ON (recommended)
     - This automatically tracks: page views, scrolls, outbound clicks, site search, video engagement, file downloads
   - Click **Create stream**

3. **Copy your Measurement ID**
   - You'll see a **Measurement ID** like `G-XXXXXXXXXX`
   - Copy this ID - you'll need it in the next step

## Step 3: Add Measurement ID to Your Website

1. **Create or update your `.env.local` file**
   ```bash
   # In your project root directory
   cp .env.local.example .env.local
   ```

2. **Add your Measurement ID**
   - Open `.env.local`
   - Find the line: `NEXT_PUBLIC_GA_MEASUREMENT_ID=`
   - Add your Measurement ID: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - Save the file

3. **Restart your development server**
   ```bash
   npm run dev
   ```

## Step 4: Verify Tracking is Working

1. **Test in development**
   - Visit your website locally: `http://localhost:3000`
   - Open Google Analytics
   - Go to **Reports** → **Realtime**
   - You should see your visit appear in real-time

2. **Deploy to production**
   - Commit your changes (don't commit `.env.local`)
   - Push to your repository
   - Deploy on Render
   - Add the environment variable on Render:
     - Go to your Render dashboard
     - Select your web service
     - Go to **Environment** tab
     - Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
   - Redeploy your service

3. **Test production**
   - Visit your live website
   - Check Google Analytics **Realtime** report again

## Step 5: Set Up Custom Events (Optional but Recommended)

The analytics system is already configured to track custom events. You can view these in Google Analytics:

1. **Go to Configure** → **Events**
2. You'll see these custom events as they occur:
   - `button_click` - Track CTA button clicks
   - `form_submission` - Track contact form submissions
   - `project_view` - Track project detail views
   - `event_registration` - Track event popup registrations
   - `whatsapp_click` - Track WhatsApp contact clicks
   - `social_share` - Track social media shares
   - `outbound_link` - Track external link clicks

## What Data Will You See?

### Automatic Tracking (Enhanced Measurement)
- Page views
- Scroll depth
- Outbound link clicks
- Site search
- Video plays
- File downloads

### Custom Tracking (Already Implemented)
- Button clicks (VIEW OUR WORK, SHARE YOUR CONCERN, etc.)
- Form submissions
- Project views
- Media gallery views
- Event registrations
- WhatsApp contact clicks

### Reports Available
1. **Realtime** - See current visitors
2. **User Acquisition** - Where visitors come from (Google, Facebook, direct, etc.)
3. **Engagement** - Page views, time on page, bounce rate
4. **Demographics** - Age, gender, interests (if available)
5. **Tech** - Devices, browsers, screen sizes
6. **Locations** - Countries, cities, languages

## Important Notes

- **Privacy**: GA4 is more privacy-focused than Universal Analytics
- **Data Processing**: It may take 24-48 hours for full data to appear
- **Real-time**: Real-time reports show data within minutes
- **Environment Variable**: Never commit `.env.local` to git (it's in `.gitignore`)
- **Render Setup**: Remember to add the environment variable in Render's dashboard

## Troubleshooting

### Not seeing data in Google Analytics?

1. **Check Measurement ID**
   - Verify the ID in `.env.local` matches your GA4 property
   - Make sure it starts with `G-` not `UA-`

2. **Check browser console**
   - Open DevTools (F12)
   - Look for any errors
   - In Network tab, filter for `google-analytics` or `gtag`

3. **Ad blockers**
   - Disable ad blockers and privacy extensions
   - They often block Google Analytics

4. **Environment variable**
   - Make sure you restarted the dev server after adding the variable
   - On Render, verify the environment variable is set correctly

### Still having issues?

- Check the [Google Analytics Help Center](https://support.google.com/analytics)
- Verify your data stream is active in GA4 settings
- Make sure your website is publicly accessible (for production testing)

## Advanced Configuration (Optional)

### Set Up Conversions

1. Go to **Configure** → **Events**
2. Click on an event (e.g., `form_submission`)
3. Toggle **Mark as conversion**
4. This helps track goal completions

### Set Up Audiences

1. Go to **Configure** → **Audiences**
2. Create custom audiences based on behavior
3. Example: "Engaged Users" = users who spent >1 minute on site

### Link to Google Search Console

1. Go to **Admin** → **Property Settings**
2. Click **Search Console Links**
3. Link your Search Console account
4. See which search queries bring users to your site

---

**Questions?** Contact your development team or refer to the [Google Analytics documentation](https://support.google.com/analytics/answer/9304153).
