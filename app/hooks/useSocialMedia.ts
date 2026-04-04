import { useState, useEffect } from "react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface InstagramPost {
  id: string;
  permalink: string;
  caption?: string;
  media_url: string;
  media_type: string;
  timestamp: string;
}

export function useYouTubeFeed(channelId: string, apiKey: string) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYouTubeVideos() {
      if (!apiKey) {
        setError("YouTube API key not configured");
        setLoading(false);
        return;
      }

      if (!channelId) {
        setError("YouTube channel ID not configured");
        setLoading(false);
        return;
      }

      try {
        // YouTube Data API v3
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=3&type=video`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message || "Failed to fetch YouTube videos");
        }

        const videoList: YouTubeVideo[] = (data.items || []).map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
        }));

        setVideos(videoList);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching YouTube videos:", err);
        setError(err.message || "Failed to load YouTube videos");
        setLoading(false);
      }
    }

    fetchYouTubeVideos();
  }, [channelId, apiKey]);

  return { videos, loading, error };
}

export function useInstagramFeed(accessToken?: string) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstagramPosts() {
      if (!accessToken) {
        setError("Instagram access token not configured");
        setLoading(false);
        return;
      }

      try {
        // Instagram Basic Display API
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type&access_token=${accessToken}&limit=3`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message || "Failed to fetch Instagram posts");
        }

        setPosts(data.data || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching Instagram posts:", err);
        setError(err.message || "Failed to load Instagram posts");
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [accessToken]);

  return { posts, loading, error };
}
