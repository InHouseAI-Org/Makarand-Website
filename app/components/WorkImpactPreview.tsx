import { prisma } from "@/lib/prisma";
import { WorkImpactPreviewClient } from "./WorkImpactPreviewClient";

export async function WorkImpactPreview() {
  // Fetch featured projects from Project table
  const projectsFromDB = await prisma.project.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });


  projectsFromDB.forEach((project, index) => {
    
  });

  // Calculate impact stats from database
  const totalProjects = await prisma.project.count({
    where: {
      published: true,
      status: 'completed',
    },
  });

  const allProjects = await prisma.project.findMany({
    where: {
      published: true,
    },
    select: {
      budget: true,
    },
  });

  // Calculate total budget (rough estimate)
  let totalBudget = 0;
  allProjects.forEach(project => {
    if (project.budget) {
      // Extract numbers from budget string (e.g., "₹5 Cr" -> 5)
      const match = project.budget.match(/[\d.]+/);
      if (match) {
        totalBudget += parseFloat(match[0]);
      }
    }
  });

  // Format budget for display
  const formatBudget = (amount: number) => {
    if (amount >= 1) {
      return `₹${Math.round(amount)} Cr+`;
    }
    return `₹${(amount * 10).toFixed(0)} L+`;
  };

  // Default impact stats with database values - using icon names instead of components
  const impactStats = [
    {
      iconName: "TrendingUp" as const,
      value: totalBudget > 0 ? formatBudget(totalBudget) : "₹15 Cr+",
      label: "Development Funds"
    },
    {
      iconName: "Hammer" as const,
      value: totalProjects > 0 ? `${totalProjects}+` : "200+",
      label: "Projects Completed"
    },
    {
      iconName: "Users" as const,
      value: "50,000+",
      label: "Citizens Impacted"
    },
    {
      iconName: "MapPin" as const,
      value: "12 km",
      label: "Roads Reconstructed"
    },
  ];

  // Transform featured projects from Project table
  const featuredProjects = projectsFromDB.map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    image: project.image || undefined, // Convert null to undefined
    status: project.status === 'completed' ? 'Completed' :
            project.status === 'ongoing' ? 'Ongoing' :
            'Planned',
  }));

  console.log('=== TRANSFORMED FEATURED PROJECTS ===');
  featuredProjects.forEach((project, index) => {
    console.log(`Transformed Project ${index + 1}:`, {
      id: project.id,
      title: project.title,
      category: project.category,
      image: project.image,
      hasImage: !!project.image,
      status: project.status
    });
  });
  console.log('===================================');

  return (
    <WorkImpactPreviewClient
      impactStats={impactStats}
      featuredProjects={featuredProjects}
    />
  );
}
