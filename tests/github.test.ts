import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchProjects, fetchUser, type GitHubRepo, type GitHubUser } from "@/lib/github";

describe("lib/github", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("fetchProjects", () => {
    it("retorna lista de repositórios parseados", async () => {
      const mockRepos: Partial<GitHubRepo>[] = [
        { id: 1, name: "repo-a", full_name: "user/repo-a", description: "A", html_url: "https://github.com/user/repo-a", stargazers_count: 10, language: "TypeScript", fork: false, archived: false },
        { id: 2, name: "repo-b", full_name: "user/repo-b", description: null, html_url: "https://github.com/user/repo-b", stargazers_count: 5, language: null, fork: false, archived: false },
      ];

      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRepos,
      }));

      const repos = await fetchProjects("user");

      expect(repos).toHaveLength(2);
      expect(repos[0].name).toBe("repo-a");
      expect(repos[0].stargazers_count).toBe(10);
      expect(repos[1].description).toBeNull();
    });

    it("filtra forks e arquivados", async () => {
      const mockRepos: Partial<GitHubRepo>[] = [
        { id: 1, name: "fork", fork: true, archived: false, stargazers_count: 0, language: null, html_url: "", full_name: "" },
        { id: 2, name: "archived", fork: false, archived: true, stargazers_count: 0, language: null, html_url: "", full_name: "" },
        { id: 3, name: "valid", fork: false, archived: false, stargazers_count: 1, language: "JS", html_url: "x", full_name: "u/valid" },
      ];

      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRepos,
      }));

      const repos = await fetchProjects("user");
      expect(repos).toHaveLength(1);
      expect(repos[0].name).toBe("valid");
    });

    it("retorna [] em caso de erro HTTP", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
      const repos = await fetchProjects("user");
      expect(repos).toEqual([]);
    });

    it("retorna [] em caso de exceção de rede", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
      const repos = await fetchProjects("user");
      expect(repos).toEqual([]);
    });

    it("envia header Accept correto", async () => {
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => [] });
      vi.stubGlobal("fetch", fetchMock);

      await fetchProjects("marcelosoaresdev");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/users/marcelosoaresdev/repos?per_page=100&sort=updated",
        expect.objectContaining({
          headers: expect.objectContaining({ Accept: "application/vnd.github+json" }),
        })
      );
    });
  });

  describe("fetchUser", () => {
    it("retorna dados do usuário", async () => {
      const mockUser: Partial<GitHubUser> = {
        login: "marcelosoaresdev",
        name: "Marcelo Soares",
        avatar_url: "https://avatars.githubusercontent.com/u/123",
        bio: "Engenheiro",
        html_url: "https://github.com/marcelosoaresdev",
      };

      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockUser,
      }));

      const user = await fetchUser("marcelosoaresdev");
      expect(user.login).toBe("marcelosoaresdev");
      expect(user.avatar_url).toContain("avatars");
    });

    it("retorna null em erro", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
      const user = await fetchUser("ghost");
      expect(user).toBeNull();
    });
  });
});
