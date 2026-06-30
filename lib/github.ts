export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  blog?: string | null;
  company?: string | null;
  location?: string | null;
};

const GITHUB_API = "https://api.github.com";

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`GitHub API ${res.status}: ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`GitHub API error: ${(err as Error).message}`);
    return null;
  }
}

export async function fetchProjects(username: string): Promise<GitHubRepo[]> {
  const data = await safeFetch<GitHubRepo[]>(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`
  );
  if (!data) return [];
  return data.filter((r) => !r.fork && !r.archived);
}

export async function fetchUser(username: string): Promise<GitHubUser | null> {
  return safeFetch<GitHubUser>(`${GITHUB_API}/users/${username}`);
}
