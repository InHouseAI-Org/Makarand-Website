-- ==========================================
-- REAL SOCIAL MEDIA DATA FROM LOCAL SEED
-- Instagram and YouTube Posts/Videos
-- ==========================================

-- ==========================================
-- CLEAR EXISTING SOCIAL MEDIA EMBEDS
-- ==========================================

DELETE FROM "SocialMediaEmbed";

-- ==========================================
-- INSERT YOUTUBE VIDEOS (3 videos)
-- ==========================================

INSERT INTO "SocialMediaEmbed" (
  "id",
  "platform",
  "postUrl",
  "extractedId",
  "embedType",
  "title",
  "displayOrder",
  "isPublished",
  "createdAt",
  "updatedAt"
) VALUES
-- YouTube Video 1
(
  'sm_yt_001',
  'youtube',
  'https://www.youtube.com/watch?v=3YjdF4cmab0',
  '3YjdF4cmab0',
  'video',
  'Latest Update',
  0,
  true,
  NOW(),
  NOW()
),

-- YouTube Video 2
(
  'sm_yt_002',
  'youtube',
  'https://www.youtube.com/watch?v=JJ6eIGMQvgk',
  'JJ6eIGMQvgk',
  'video',
  'Community Event',
  1,
  true,
  NOW(),
  NOW()
),

-- YouTube Video 3
(
  'sm_yt_003',
  'youtube',
  'https://www.youtube.com/watch?v=9aG0Wf8BB28',
  '9aG0Wf8BB28',
  'video',
  'Ward Development',
  2,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- INSERT INSTAGRAM POSTS (3 posts)
-- ==========================================

INSERT INTO "SocialMediaEmbed" (
  "id",
  "platform",
  "postUrl",
  "extractedId",
  "embedType",
  "title",
  "displayOrder",
  "isPublished",
  "createdAt",
  "updatedAt"
) VALUES
-- Instagram Reel 1
(
  'sm_ig_001',
  'instagram',
  'https://www.instagram.com/reel/DTW39YcDLNO/',
  'DTW39YcDLNO',
  'reel',
  'Community Initiative',
  0,
  true,
  NOW(),
  NOW()
),

-- Instagram Post 2
(
  'sm_ig_002',
  'instagram',
  'https://www.instagram.com/p/DDQ8CUlIttt/',
  'DDQ8CUlIttt',
  'p',
  'Local Development',
  1,
  true,
  NOW(),
  NOW()
),

-- Instagram Post 3
(
  'sm_ig_003',
  'instagram',
  'https://www.instagram.com/p/DWl7UpGDPNL/',
  'DWl7UpGDPNL',
  'p',
  'Public Service',
  2,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- VERIFICATION
-- ==========================================

SELECT
  platform,
  COUNT(*) as count
FROM "SocialMediaEmbed"
GROUP BY platform;

SELECT
  platform,
  title,
  "extractedId",
  "postUrl"
FROM "SocialMediaEmbed"
ORDER BY platform, "displayOrder";

-- ==========================================
-- Expected Results:
-- YouTube: 3 videos
-- Instagram: 3 posts
-- Total: 6 social media embeds
-- ==========================================
