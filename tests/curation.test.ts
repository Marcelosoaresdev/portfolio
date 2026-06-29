import { describe, it, expect } from "vitest";
import { curateProjects } from "@/lib/curation";
import type { GitHubRepo } from "@/lib/github";

const curated = [
  { slug: "alpha", order: 2, descriptionPt: "PT alpha", descriptionEn: "EN alpha" },
  { slug: "beta", order: 1, descriptionPt: "PT beta" },
];

const repos: GitHubRepo[] = [
  { id: 1, name: "alpha", full_name: "u/alpha", description: "GitHub alpha", html_url: "https://github.com/u/alpha", stargazers_count: 10, language: "TS", fork: false, archived: false },
  { id: 2, name: "beta", full_name: "u/beta", description: "GitHub beta", html_url: "https://github.com/u/beta", stargazers_count: 5, language: "JS", fork: false, archived: false },
  { id: 3, name: "gamma", full_name: "u/gamma", description: "not curated", html_url: "https://github.com/u/gamma", stargazers_count: 1, language: "Py", fork: false, archived: false },
];

describe("curateProjects", () => {
  it("retorna apenas repositórios na curadoria", () => {
    const result = curateProjects(repos, curated, "pt-BR");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.name)).toEqual(["beta", "alpha"]);
  });

  it("respeita ordem do JSON", () => {
    const result = curateProjects(repos, curated, "pt-BR");
    expect(result[0].name).toBe("beta");
    expect(result[1].name).toBe("alpha");
  });

  it("usa descrição curada quando presente", () => {
    const result = curateProjects(repos, curated, "pt-BR");
    expect(result[0].description).toBe("PT beta");
  });

  it("usa descrição curada em EN", () => {
    const result = curateProjects(repos, curated, "en");
    expect(result[1].description).toBe("EN alpha");
  });

  it("fallback para descrição do GitHub quando curadoria omite", () => {
    const partial = [{ slug: "alpha", order: 1 }];
    const result = curateProjects(repos, partial, "pt-BR");
    expect(result[0].description).toBe("GitHub alpha");
  });
});
