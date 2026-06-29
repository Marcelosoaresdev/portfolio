import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";

export type CuratedProject = {
  slug: string;
  order: number;
  descriptionPt?: string;
  descriptionEn?: string;
};

export type CuratedRepo = GitHubRepo & {
  displayDescription: string;
};

export function curateProjects(
  repos: GitHubRepo[],
  curated: CuratedProject[],
  locale: Locale
): CuratedRepo[] {
  const map = new Map(curated.map((c) => [c.slug, c]));
  const filtered = repos.filter((r) => map.has(r.name));
  const sorted = [...filtered].sort((a, b) => {
    const oa = map.get(a.name)!.order;
    const ob = map.get(b.name)!.order;
    return oa - ob;
  });

  return sorted.map((repo) => {
    const c = map.get(repo.name)!;
    const custom = locale === "en" ? c.descriptionEn : c.descriptionPt;
    return {
      ...repo,
      description: custom || repo.description || "",
    };
  });
}
