# Social Media Auto-Fetch Setup Guide

This guide explains how to automatically fetch the latest 3 posts from YouTube and Instagram on the media page.

## YouTube Setup (No API Key Required) ✅

YouTube fetching works automatically using RSS feeds!

### Getting Your YouTube Channel ID:

1. Go to your YouTube channel: https://youtube.com/@narwekarmakarand
2. Right-click on the page and select "View Page Source"
3. Search for `"channelId"` or `"externalId"` in the source code
4. Copy the channel ID (starts with `UC...`)
5. Update the `YOUTUBE_CHANNEL_ID` in `src/app/components/MediaSection.tsx`:

```typescript
const YOUTUBE_CHANNEL_ID = "YOUR_ACTUAL_CHANNEL_ID"; // Replace with your channel ID
```

**Alternative Method:**
1. Go to https://www.youtube.com/@narwekarmakarand
2. Click on any video
3. Look at the URL - it will be like: `https://www.youtube.com/watch?v=VIDEO_ID`
4. Go to: `https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID`
5. Try different methods on https://commentpicker.com/youtube-channel-id.php

## Instagram Setup (Requires Access Token) 🔑

Instagram requires an access token from Facebook Developer Console.

### Option 1: Use Manual Embeds (Quick & Easy)

If you don't want to set up the API, just update the post IDs in `MediaSection.tsx`:

1. Go to the Instagram post you want to embed
2. Copy the URL: `https://www.instagram.com/p/POST_ID/`
3. Extract the POST_ID from the URL
4. Update the fallback array in `MediaSection.tsx` (lines 409-412):

```typescript
{[
  "CxYz123",  // Replace with actual post IDs
  "DaEf456",
  "GhIj789"
].map((postId, index) => (
```

### Option 2: Automatic Fetching (Recommended for Long-term)

To automatically fetch the latest 3 Instagram posts:

#### Step 1: Create a Facebook App

1. Go to https://developers.facebook.com/
2. Click "My Apps" → "Create App"
3. Select "Business" type
4. Fill in the app details and create

#### Step 2: Add Instagram Basic Display

1. In your app dashboard, go to "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. In Settings, add:
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
4. Save changes

#### Step 3: Add Instagram Test User

1. Go to "Instagram Basic Display" → "Basic Display"
2. Scroll down to "User Token Generator"
3. Click "Add or Remove Instagram Testers"
4. Add your Instagram account
5. Accept the invite on Instagram (Settings → Apps → Tester Invites)

#### Step 4: Generate Access Token

1. Back in the app dashboard under "User Token Generator"
2. Click "Generate Token" next to your Instagram account
3. Authorize the app
4. Copy the Access Token (starts with `IGQV...`)

#### Step 5: Add Token to Environment

Create a `.env` file in the project root:

```env
VITE_INSTAGRAM_TOKEN=YOUR_ACCESS_TOKEN_HERE
```

**Important:**
- Vite requires environment variables to be prefixed with `VITE_`
- Add `.env` to `.gitignore` to keep your token secure!
- Restart the dev server after adding the `.env` file

#### Step 6: Refresh Long-Lived Token (Optional)

Instagram tokens expire after 60 days. To get a long-lived token:

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_TOKEN"
```

Or use this URL:
```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_TOKEN
```

## Testing

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/media` page
3. Scroll down to "Social Media Updates"
4. YouTube videos should load automatically
5. Instagram posts will show:
   - Automatically if token is configured
   - Manually from hardcoded post IDs if not

## Troubleshooting

### YouTube Not Loading
- Check if the channel ID is correct
- Check browser console for CORS errors
- Try using a different CORS proxy if needed

### Instagram Not Loading
- Verify the access token is valid
- Check if it's properly set in `.env`
- Make sure Instagram account is public or test user is added
- Check token expiration (tokens last 60 days)

### CORS Issues
The YouTube feed uses a CORS proxy (`api.allorigins.win`). If it's down:
- Try alternative: `https://corsproxy.io/?`
- Or use: `https://cors-anywhere.herokuapp.com/`

## Updating Post IDs Manually

If automatic fetching fails, you can always fall back to manual Instagram post IDs:

In `src/app/components/MediaSection.tsx`, find the fallback section and update:

```typescript
{[
  "POST_ID_1",  // Get from Instagram post URL
  "POST_ID_2",
  "POST_ID_3"
].map((postId, index) => (
```

## Performance Notes

- YouTube RSS feed is cached by the browser
- Instagram API has rate limits (200 requests per hour per user)
- Consider implementing caching on the server-side for production
- Loading states and error handling are built-in

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all credentials are correct
3. Test API endpoints directly in browser
4. Check Instagram and Facebook developer documentation
