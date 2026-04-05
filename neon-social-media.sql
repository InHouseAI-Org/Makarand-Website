-- ==========================================
-- SOCIAL MEDIA EMBEDS FOR MAKARAND NARWEKAR
-- Instagram and YouTube Posts
-- ==========================================

-- ==========================================
-- CLEAR EXISTING SOCIAL MEDIA EMBEDS
-- ==========================================

DELETE FROM "SocialMediaEmbed";

-- ==========================================
-- INSTAGRAM POSTS
-- ==========================================

-- Note: Replace these URLs with actual Instagram post URLs from Makarand Narwekar's account
-- Format: https://www.instagram.com/p/POST_ID/
-- The extractedId should be the POST_ID from the URL

INSERT INTO "SocialMediaEmbed" (
  "id",
  "platform",
  "embedType",
  "title",
  "description",
  "postUrl",
  "extractedId",
  "displayOrder",
  "isPublished",
  "createdAt",
  "updatedAt"
) VALUES
-- Instagram Post 1 - Example (Replace with actual post URL)
(
  'sm_ig_001',
  'instagram',
  'post',
  'Community Development Initiative',
  'Recent community development work in A Ward',
  'https://www.instagram.com/p/EXAMPLE1/',
  'EXAMPLE1',
  1,
  true,
  NOW(),
  NOW()
),

-- Instagram Post 2 - Example (Replace with actual post URL)
(
  'sm_ig_002',
  'instagram',
  'post',
  'Infrastructure Project Update',
  'Latest infrastructure improvements in the ward',
  'https://www.instagram.com/p/EXAMPLE2/',
  'EXAMPLE2',
  2,
  true,
  NOW(),
  NOW()
),

-- Instagram Post 3 - Example (Replace with actual post URL)
(
  'sm_ig_003',
  'instagram',
  'post',
  'Citizen Engagement Event',
  'Meeting with ward residents',
  'https://www.instagram.com/p/EXAMPLE3/',
  'EXAMPLE3',
  3,
  true,
  NOW(),
  NOW()
),

-- Instagram Post 4 - Example (Replace with actual post URL)
(
  'sm_ig_004',
  'instagram',
  'post',
  'Public Service Announcement',
  'Important updates for A Ward citizens',
  'https://www.instagram.com/p/EXAMPLE4/',
  'EXAMPLE4',
  4,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- YOUTUBE VIDEOS
-- ==========================================

-- Note: Replace these URLs with actual YouTube video URLs
-- Format: https://www.youtube.com/watch?v=VIDEO_ID
-- The extractedId should be the VIDEO_ID from the URL

INSERT INTO "SocialMediaEmbed" (
  "id",
  "platform",
  "embedType",
  "title",
  "description",
  "postUrl",
  "extractedId",
  "displayOrder",
  "isPublished",
  "createdAt",
  "updatedAt"
) VALUES
-- YouTube Video 1 - Example (Replace with actual video URL)
(
  'sm_yt_001',
  'youtube',
  'video',
  'Ward Development Overview',
  'Complete overview of development work in A Ward',
  'https://www.youtube.com/watch?v=EXAMPLE_VIDEO1',
  'EXAMPLE_VIDEO1',
  5,
  true,
  NOW(),
  NOW()
),

-- YouTube Video 2 - Example (Replace with actual video URL)
(
  'sm_yt_002',
  'youtube',
  'video',
  'Public Address',
  'Address to ward citizens on key initiatives',
  'https://www.youtube.com/watch?v=EXAMPLE_VIDEO2',
  'EXAMPLE_VIDEO2',
  6,
  true,
  NOW(),
  NOW()
),

-- YouTube Video 3 - Example (Replace with actual video URL)
(
  'sm_yt_003',
  'youtube',
  'video',
  'Community Event Highlights',
  'Highlights from recent community events',
  'https://www.youtube.com/watch?v=EXAMPLE_VIDEO3',
  'EXAMPLE_VIDEO3',
  7,
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

SELECT * FROM "SocialMediaEmbed" ORDER BY displayOrder;

-- ==========================================
-- INSTRUCTIONS TO UPDATE WITH REAL DATA:
-- ==========================================
--
-- 1. Go to Instagram: https://www.instagram.com/makarandnarwekarofficial/
-- 2. Click on a post you want to embed
-- 3. Copy the URL (e.g., https://www.instagram.com/p/ABC123xyz/)
-- 4. Replace 'EXAMPLE1' with the actual post ID (e.g., 'ABC123xyz')
-- 5. Replace the full URL in postUrl field
-- 6. Update title and description to match the post
--
-- For YouTube:
-- 1. Go to YouTube: https://youtube.com/@narwekarmakarand
-- 2. Click on a video you want to embed
-- 3. Copy the video URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
-- 4. Replace 'EXAMPLE_VIDEO1' with the actual video ID (e.g., 'dQw4w9WgXcQ')
-- 5. Replace the full URL in postUrl field
-- 6. Update title and description to match the video
--
-- ==========================================
