import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { engineeringArticles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://riteshchauhan.dev";

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/skills",
    "/experience",
    "/engineering",
    "/resume",
    "/contact"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-10-20"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date("2026-10-20"),
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  const articleRoutes = engineeringArticles.map((a) => ({
    url: `${baseUrl}/engineering/${a.slug}`,
    lastModified: new Date("2026-10-20"),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
