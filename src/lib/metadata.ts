import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} — ${profile.headline}`,
  description: profile.summary,
  url: "https://riteshchauhan.dev",
  ogImage: "https://riteshchauhan.dev/og-image.png",
  links: {
    github: profile.github,
    linkedin: profile.linkedin,
    email: profile.email
  }
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${profile.name}`
    },
    description,
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: `${profile.name} Portfolio`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${profile.name} - Software Engineer Portfolio`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ritesh_builds"
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Software Engineer",
    description: profile.summary,
    url: siteConfig.url,
    sameAs: [profile.github, profile.linkedin, profile.twitter].filter(Boolean),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution
    },
    knowsAbout: [
      "Full-Stack Development",
      "Backend Engineering",
      "Artificial Intelligence",
      "Distributed Systems",
      "Fintech Systems",
      "Cybersecurity"
    ]
  };
}
