import { describe, it, expect } from "vitest";
import { curateProjects } from "@/lib/curation";
import type { GitHubRepo } from "@/lib/github";

const curated = [
  { slug: "alpha", descriptionPt: "PT alpha", descriptionEn: "EN alpha" },
  { slug: "beta", descriptionPt: "PT beta" },
];

const repos: GitHubRepo[] = [
  { id: 1, name: "alpha", full_name: "u/alpha", description: "GitHub alpha", html_url: "https://github.com/u/alpha", stargazers_count: 10, language: "TS", fork: false, archived: false, updated_at: "2024-06-01T00:00:00Z" },
  { id: 2, name: "beta", full_name: "u/beta", description: "GitHub beta", html_url: "https://github.com/u/beta", stargazers_count: 5, language: "JS", fork: false, archived: false, updated_at: "2023-01-01T00:00:00Z" },
  { id: 3, name: "gamma", full_name: "u/gamma", description: "not curated", html_url: "https://github.com/u/gamma", stargazers_count: 1, language: "Py", fork: false, archived: false, updated_at: "2024-12-01T00:00:00Z" },
];

describe("curateProjects", () => {
  it("retorna apenas repositórios na curadoria", () => {
    const result = curateProjects(repos, curated, "pt-BR");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.name)).toEqual(["alpha", "beta"]);
  });

  it("ordena por updated_at desc (mais recente primeiro)", () => {
    const result = curateProjects(repos, curated, "pt-BR");
    expect(result[0].name).toBe("alpha");
    expect(result[1].name).toBe("beta");
  });

  it("usa descrição curada quando presente", () => {
    const result = curateProjects(repos, curated, "pt-BR");
    expect(result[0].description).toBe("PT alpha");
  });

  it("usa descrição curada em EN", () => {
    const result = curateProjects(repos, curated, "en");
    expect(result[0].description).toBe("EN alpha");
  });

  it("fallback para descrição do GitHub quando curadoria omite", () => {
    const partial = [{ slug: "alpha" }];
    const result = curateProjects(repos, partial, "pt-BR");
    expect(result[0].description).toBe("GitHub alpha");
  });
});
