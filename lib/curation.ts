import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";

export type CuratedProject = {
  slug: string;
  displayName?: string;
  liveUrl?: string;
  image?: string;
  descriptionPt?: string;
  descriptionEn?: string;
};

export type CuratedRepo = Omit<GitHubRepo, "description"> & {
  description: string;
  displayName?: string;
  liveUrl?: string;
  image?: string;
};

export function curateProjects(
  repos: GitHubRepo[],
  curated: CuratedProject[],
  locale: Locale
): CuratedRepo[] {
  const repoMap = new Map(repos.map((r) => [r.name, r]));
  const now = new Date().toISOString();

  const entries = curated.map((c) => {
    const repo = repoMap.get(c.slug);
    const description =
      (locale === "en" ? c.descriptionEn : c.descriptionPt) ||
      repo?.description ||
      "";

    if (repo) {
      return {
        ...repo,
        description,
        displayName: c.displayName,
        liveUrl: c.liveUrl,
        image: c.image,
        html_url: c.liveUrl ?? repo.html_url,
      };
    }

    return {
      id: hashSlug(c.slug),
      name: c.slug,
      full_name: c.slug,
      description,
      displayName: c.displayName,
      html_url: c.liveUrl ?? `https://github.com/marcelosoaresdev/${c.slug}`,
      stargazers_count: 0,
      language: null,
      fork: false,
      archived: false,
      updated_at: now,
      liveUrl: c.liveUrl,
      image: c.image,
    };
  });

  return entries.sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}