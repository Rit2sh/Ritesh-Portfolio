import { describe, it, expect } from "vitest";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experiences } from "@/data/experience";
import { validateContactForm } from "@/lib/validation";

describe("Profile Data Integrity", () => {
  it("should have valid name, headline, and email", () => {
    expect(profile.name).toBe("Ritesh Chauhan");
    expect(profile.email).toBe("chauhan.ritesh.work@gmail.com");
    expect(profile.headline).toContain("Software Engineer");
    expect(profile.positioning.length).toBeGreaterThan(4);
  });

  it("should have verified university education", () => {
    expect(profile.education.institution).toBe("CGC University, Jhanjeri");
    expect(profile.education.degree).toContain("B.Tech in Computer Science");
  });
});

describe("Project Catalog Strict Rules", () => {
  it("should contain all 10 approved projects", () => {
    expect(projects.length).toBe(10);
  });

  it("should have unique slugs across all projects", () => {
    const slugs = projects.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("should strictly keep PayGlow and Stockly separate", () => {
    const payglow = projects.find((p) => p.slug === "payglow");
    const stockly = projects.find((p) => p.slug === "stockly");

    expect(payglow).toBeDefined();
    expect(stockly).toBeDefined();
    expect(payglow?.category).toBe("Full-Stack & SaaS");
    expect(stockly?.category).toBe("Fintech");
    expect(payglow?.name).not.toBe(stockly?.name);
    expect(payglow?.demoUrl).toBe("https://www.payglow.in");
  });

  it("should only use approved statuses", () => {
    const validStatuses = ["Live", "In Development", "Prototype", "Concept"];
    projects.forEach((p) => {
      expect(validStatuses).toContain(p.status);
    });
  });

  it("should contain architecture steps and trade-offs for each project", () => {
    projects.forEach((p) => {
      expect(p.architectureSteps.length).toBeGreaterThan(0);
      expect(p.tradeoffs.length).toBeGreaterThan(0);
      expect(p.difficultProblems.length).toBeGreaterThan(0);
      expect(p.productRequirements.length).toBeGreaterThan(0);
    });
  });
});

describe("Skills Categorization Integrity", () => {
  it("should strictly assign each skill to one of the 3 approved categories", () => {
    const approvedCategories = [
      "Demonstrated in Project",
      "Working Knowledge",
      "Currently Learning"
    ];

    skillGroups.forEach((group) => {
      expect(group.skills.length).toBeGreaterThan(0);
      group.skills.forEach((skill) => {
        expect(approvedCategories).toContain(skill.category);
      });
    });
  });
});

describe("Verified Experience Integrity", () => {
  it("should verify leadership in PayGlow and TheBTechGuy", () => {
    const payglowExp = experiences.find((e) => e.organization.includes("PayGlow"));
    const btechGuyExp = experiences.find((e) => e.organization.includes("TheBTechGuy"));

    expect(payglowExp).toBeDefined();
    expect(btechGuyExp).toBeDefined();
  });
});

describe("Contact Form Validation Engine", () => {
  it("should fail validation for empty or invalid data", () => {
    const res = validateContactForm({});
    expect(res.valid).toBe(false);
    expect(res.errors.name).toBeDefined();
    expect(res.errors.email).toBeDefined();
    expect(res.errors.message).toBeDefined();
  });

  it("should fail for invalid email format", () => {
    const res = validateContactForm({
      name: "Ritesh",
      email: "not-an-email",
      message: "This is a sufficiently long test message."
    });
    expect(res.valid).toBe(false);
    expect(res.errors.email).toBeDefined();
  });

  it("should succeed for valid input payload", () => {
    const res = validateContactForm({
      name: "Jane Recruiter",
      email: "jane@company.com",
      company: "Top Tech Corp",
      opportunityType: "Full-Time Software Engineering",
      message: "We would like to interview you for a Software Engineer role on our team."
    });
    expect(res.valid).toBe(true);
    expect(Object.keys(res.errors).length).toBe(0);
  });
});
