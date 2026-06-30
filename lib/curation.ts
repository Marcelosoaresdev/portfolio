import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";

export type CuratedProject = {
  slug: string;
  descriptionPt?: string;
  descriptionEn?: string;
};

export type CuratedRepo = Omit<GitHubRepo, "description"> & {
  description: string;
};

export function curateProjects(
  repos: GitHubRepo[],
  curated: CuratedProject[],
  locale: Locale
): CuratedRepo[] {
  const map = new Map(curated.map((c) => [c.slug, c]));
  const filtered = repos.filter((r) => map.has(r.name));
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return sorted.map((repo) => {
    const c = map.get(repo.name);
    const custom = c ? (locale === "en" ? c.descriptionEn : c.descriptionPt) : undefined;
    return {
      ...repo,
      description: custom || repo.description || "",
    };
  });
}
