# Complete API Setup Guide for YouTube & Instagram

This guide will walk you through setting up automatic fetching of the latest 3 posts from YouTube and Instagram.

---

## 📺 YouTube Data API v3 Setup

### Prerequisites
- Google Account
- YouTube Channel

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: `Makarand-Website` (or any name)
5. Click "Create"

### Step 2: Enable YouTube Data API v3

1. In the Cloud Console, go to **APIs & Services** → **Library**
2. Search for "YouTube Data API v3"
3. Click on it and press **Enable**

### Step 3: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API Key**
3. Copy the API Key (it will look like: `AIzaSyDXXXXXXXXXXXXXXXXXXXXXXX`)
4. (Optional but recommended) Click **Edit API Key** to restrict it:
   - Under "API restrictions", select "Restrict key"
   - Check only "YouTube Data API v3"
   - Under "Website restrictions", add your domain
   - Click **Save**

### Step 4: Get Your YouTube Channel ID

**Method 1: From Channel Settings**
1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click on **Settings** → **Channel** → **Advanced settings**
3. Copy your **Channel ID** (starts with `UC...`)

**Method 2: From Channel URL**
1. Go to your channel: `https://youtube.com/@narwekarmakarand`
2. Right-click → View Page Source
3. Search for `"channelId"` or `"externalId"`
4. Copy the ID (starts with `UC...`)

**Method 3: Using a Tool**
1. Go to https://commentpicker.com/youtube-channel-id.php
2. Enter your channel URL
3. Get the Channel ID

### YouTube API Quota Information
- **Free quota**: 10,000 units per day
- **Our usage**: ~1 unit per request (well within limits)
- Each page load uses ~1 unit, so you can have 10,000 page loads per day

---

## 📸 Instagram Basic Display API Setup

### Prerequisites
- Instagram Business or Creator Account
- Facebook Account
- Facebook Page linked to Instagram

### Step 1: Convert to Instagram Business Account

1. Open Instagram app
2. Go to **Settings** → **Account** → **Switch to Professional Account**
3. Choose **Business** or **Creator**
4. Connect to a Facebook Page (create one if needed)

### Step 2: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose **Business** as app type
4. Fill in app details:
   - **App name**: `Makarand Website`
   - **App contact email**: Your email
5. Click **Create App**

### Step 3: Add Instagram Basic Display Product

1. In your app dashboard, find **Add Product**
2. Locate **Instagram Basic Display**
3. Click **Set Up**

### Step 4: Configure Instagram Basic Display

1. Go to **Instagram Basic Display** → **Basic Display**
2. Click **Create New App**
3. Fill in the fields:
   - **Display Name**: `Makarand Website`
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
4. Click **Save Changes**
5. Copy the following credentials:
   - **Instagram App ID**
   - **Instagram App Secret**
   - **Client Token**

### Step 5: Add Instagram Test User

1. Scroll down to **User Token Generator**
2. Click **Add or Remove Instagram Testers**
3. Enter your Instagram username
4. Click **Submit**
5. On Instagram:
   - Go to **Settings** → **Apps and Websites** → **Tester Invites**
   - Accept the invitation

### Step 6: Generate Access Token

1. Back in **User Token Generator**
2. Click **Generate Token** next to your Instagram account
3. Log in and authorize the app
4. Copy the **Access Token** (starts with `IGQV...` or `IGQ...`)

### Step 7: Get Long-Lived Access Token

Short-lived tokens expire in 1 hour. Convert to long-lived (60 days):

**Method 1: Using Browser**
```
https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={instagram-app-secret}&access_token={short-lived-token}
```

Replace:
- `{instagram-app-secret}`: Your Instagram App Secret
- `{short-lived-token}`: The token from Step 6

**Method 2: Using curl**
```bash
curl -i -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_TOKEN"
```

The response will contain:
```json
{
  "access_token": "LONG_LIVED_TOKEN",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

Copy the new **long-lived access_token**.

### Step 8: Refresh Long-Lived Token (Optional)

Tokens expire after 60 days. To refresh before expiry:

```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={long-lived-token}
```

💡 **Tip**: Set a reminder to refresh the token every 50 days.

### Instagram API Quota Information
- **Rate limit**: 200 requests per hour per user
- **Our usage**: 1 request per page load
- Well within limits for typical website traffic

---

## 🔧 Implementation in Your Project

### Step 1: Create Environment File

Create a `.env` file in the project root:

```env
# YouTube API
VITE_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxxxxx

# Instagram API
VITE_INSTAGRAM_ACCESS_TOKEN=IGQVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Step 2: Add .env to .gitignore

Make sure `.env` is in your `.gitignore` file:

```gitignore
# Environment variables
.env
.env.local
.env.production
```

### Step 3: Restart Development Server

After creating/updating `.env`, restart your dev server:

```bash
npm run dev
```

---

## 🧪 Testing Your API Connections

### Test YouTube API

Open this URL in your browser (replace with your credentials):
```
https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&channelId=YOUR_CHANNEL_ID&part=snippet,id&order=date&maxResults=3
```

Expected response: JSON with your latest 3 videos

### Test Instagram API

Open this URL in your browser (replace with your token):
```
https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type&access_token=YOUR_ACCESS_TOKEN&limit=3
```

Expected response: JSON with your latest 3 posts

---

## 📋 Quick Checklist

### YouTube ✅
- [ ] Google Cloud Project created
- [ ] YouTube Data API v3 enabled
- [ ] API Key generated and restricted
- [ ] Channel ID obtained
- [ ] Credentials added to `.env`
- [ ] API tested in browser

### Instagram ✅
- [ ] Instagram Business/Creator account set up
- [ ] Facebook Page linked to Instagram
- [ ] Facebook App created
- [ ] Instagram Basic Display added to app
- [ ] Instagram account added as tester
- [ ] Test user invitation accepted
- [ ] Access token generated
- [ ] Long-lived token obtained
- [ ] Token added to `.env`
- [ ] API tested in browser

---

## 🔒 Security Best Practices

1. **Never commit `.env` to Git**
   - Always keep API keys secret
   - Use environment variables for production

2. **Restrict Your YouTube API Key**
   - Limit to specific APIs
   - Add HTTP referrer restrictions for production

3. **Rotate Instagram Token Regularly**
   - Set calendar reminder for 50 days
   - Refresh token before expiry

4. **Monitor API Usage**
   - YouTube: Check [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Dashboard
   - Instagram: Monitor in [Facebook Developers](https://developers.facebook.com/)

5. **Use Different Tokens for Dev/Production**
   - `.env` for local development
   - Environment variables in hosting platform for production

---

## 🚨 Troubleshooting

### YouTube Issues

**"Daily Limit Exceeded"**
- You've hit the 10,000 units/day quota
- Wait 24 hours or request quota increase

**"Access Not Configured"**
- API not enabled in Google Cloud Console
- Go to APIs & Services → Library → Enable YouTube Data API v3

**"Invalid API Key"**
- Check if key is copied correctly
- Verify API restrictions don't block your request

### Instagram Issues

**"Invalid OAuth access token"**
- Token expired (refresh it)
- Token not copied correctly
- Wrong app secret used during exchange

**"Unsupported get request"**
- Account not set to Business/Creator
- Account not added as tester
- Tester invite not accepted

**"Rate limit exceeded"**
- Wait 1 hour
- Reduce number of requests

**"User does not exist"**
- App not in live mode (OK for testing)
- Account not properly connected

---

## 📞 Support Resources

### YouTube
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [API Key Best Practices](https://support.google.com/googleapi/answer/6310037)

### Instagram
- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Access Token Guide](https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens)
- [Common Errors](https://developers.facebook.com/docs/instagram-basic-display-api/reference/error-codes)

---

## 📝 Summary

Once you complete this setup:

✅ **YouTube**: Automatically fetches latest 3 videos
✅ **Instagram**: Automatically fetches latest 3 posts/reels
✅ **No manual updates needed**: Content updates automatically
✅ **Loading states**: Beautiful spinners while loading
✅ **Error handling**: Graceful fallback if APIs fail

**Estimated Setup Time**: 30-45 minutes

Let me know when you have the credentials ready, and I'll help you configure them!
