import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * Dynamic sitemap generation with database integration
 * Automatically includes all projects, press coverage, videos, and awards
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://makarandnarwekar.com';
  const currentDate = new Date();

  // Fetch all projects from database with error handling
  let projects: any[] = [];
  let govProjects: any[] = [];
  let pressArticles: any[] = [];
  let videos: any[] = [];
  let awards: any[] = [];

  try {
    projects = await prisma.project.findMany({
      select: {
        id: true,
        updatedAt: true,
        status: true,
      },
    });
  } catch (error) {
    console.warn('Failed to fetch projects for sitemap:', error);
  }

  try {
    govProjects = await prisma.governmentProject.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.warn('Failed to fetch government projects for sitemap:', error);
  }

  try {
    // Use Media model with category filter for press
    const pressMedia = await prisma.media.findMany({
      where: { category: 'press' },
      select: {
        id: true,
        updatedAt: true,
      },
    });
    pressArticles = pressMedia;
  } catch (error) {
    console.warn('Failed to fetch press coverage for sitemap:', error);
  }

  try {
    // Use Media model with category filter for videos
    const videoMedia = await prisma.media.findMany({
      where: { category: 'video' },
      select: {
        id: true,
        updatedAt: true,
      },
    });
    videos = videoMedia;
  } catch (error) {
    console.warn('Failed to fetch videos for sitemap:', error);
  }

  try {
    awards = await prisma.award.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.warn('Failed to fetch awards for sitemap:', error);
  }

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vision`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youth`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/government-projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ward`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/connect`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: project.updatedAt || currentDate,
    changeFrequency: project.status === 'ongoing' ? ('weekly' as const) : ('monthly' as const),
    priority: 0.7,
  }));

  // Dynamic government project pages (if they have dedicated pages)
  const govProjectPages: MetadataRoute.Sitemap = govProjects.map((project) => ({
    url: `${baseUrl}/government-projects/${project.id}`,
    lastModified: project.updatedAt || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic press coverage pages
  const pressPages: MetadataRoute.Sitemap = pressArticles.map((article) => ({
    url: `${baseUrl}/media/press/${article.id}`,
    lastModified: article.updatedAt || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic video pages
  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${baseUrl}/media/video/${video.id}`,
    lastModified: video.updatedAt || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic award pages
  const awardPages: MetadataRoute.Sitemap = awards.map((award) => ({
    url: `${baseUrl}/media/award/${award.id}`,
    lastModified: award.updatedAt || currentDate,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...projectPages,
    ...govProjectPages,
    ...pressPages,
    ...videoPages,
    ...awardPages,
  ];
}
