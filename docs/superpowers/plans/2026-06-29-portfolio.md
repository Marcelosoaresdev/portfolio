# Portfolio Pessoal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portfólio pessoal em Next.js que consome a GitHub API pública, bilíngue (PT-BR/EN), com temas light/dark, ~25 arquivos, deploy na Vercel.

**Architecture:** Next.js (App Router) com `[locale]` segment, Server Components para fetch e SEO, Client Components só para toggles e animações. ISR de 1h para GitHub API. Curadoria via `data/projects.json`. i18n via `next-intl`, tema via `next-themes`, animações via Framer Motion (uso mínimo).

**Tech Stack:** Next.js (versão atual via `create-next-app@latest`), TypeScript strict, Tailwind CSS 4 (`@import "tailwindcss"` syntax), shadcn/ui (Radix), Framer Motion, next-intl, next-themes, lucide-react, Geist fonts via `next/font/google`.

> **Nota de versão (2026-06-29):** `create-next-app@latest` instala Next.js 16 e Tailwind 4. Ambos são compatíveis com todo o plano abaixo, exceto a Task 26 que usa sintaxe de variáveis CSS de Tailwind 4 via `@theme inline` em `globals.css` (NÃO `tailwind.config.ts`). Atualize antes de implementar a Task 26.

**Reference Spec:** `docs/superpowers/specs/2026-06-29-portfolio-design.md`

---

## File Structure

**Created files (~30):**

```
portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   └── api/github/route.ts
├── components/
│   ├── ui/                          (shadcn-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── sheet.tsx
│   │   └── dropdown-menu.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── project-card.tsx
│   └── shared/
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── theme-toggle.tsx
│       ├── lang-toggle.tsx
│       ├── fade-in.tsx
│       └── section-heading.tsx
├── lib/
│   ├── github.ts
│   ├── curation.ts
│   ├── i18n.ts
│   ├── seo.ts
│   └── utils.ts
├── data/
│   └── projects.json
├── messages/
│   ├── pt-BR.json
│   └── en.json
├── public/
│   └── favicon.ico
├── tests/
│   ├── github.test.ts
│   └── curation.test.ts
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json
├── package.json
└── .gitignore
```

---

## Fase 1 — Scaffold e Dependências

### Task 1: Scaffold Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`

- [ ] **Step 1: Criar projeto Next.js (versão atual)**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias="@/*" --use-npm --eslint --yes
```

> **Nota Windows:** se o diretório tiver letra maiúscula (ex: `Portfolio`), o `create-next-app` pode reclamar. Workaround: scaffold num diretório temporário lowercase e mover os arquivos. Verificar `package.json` está com `"name": "portfolio"` (não `"portfolio-scaffold"`).

Expected: projeto criado com `app/`, `package.json`, `tsconfig.json`, `next.config.ts`, etc. Versão Next.js será a mais recente (15+ ou 16) e Tailwind será v4.

- [ ] **Step 2: Limpar boilerplate padrão**

Substituir `app/page.tsx` por:
```tsx
export default function Home() {
  return <main>Portfolio scaffolded</main>;
}
```

Substituir `app/layout.tsx` por:
```tsx
import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Portfolio pessoal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

Substituir `app/globals.css` por versão vazia (Tailwind v4 syntax):
```css
@import "tailwindcss";
```

- [ ] **Step 3: Inicializar git**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && git init && git add -A && git commit -m "chore: scaffold next.js 15"
```

- [ ] **Step 4: Verificar dev server**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run dev
```

Expected: server em `http://localhost:3000`, página mostra "Portfolio scaffolded". Ctrl+C para parar.

---

### Task 2: Configurar tsconfig strict

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Adicionar strict mode**

Substituir `tsconfig.json` por:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] },
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Verificar type-check**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npx tsc --noEmit
```

Expected: exit code 0, sem erros.

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json && git commit -m "chore: enable strict mode in tsconfig"
```

---

### Task 3: Instalar dependências de UI

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar libs runtime**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm install next-intl next-themes framer-motion lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Instalar libs de dev (testes)**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom @types/node
```

- [ ] **Step 3: Verificar instalação**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && cat package.json | grep -E "next-intl|next-themes|framer-motion|lucide-react|vitest"
```

Expected: 5 linhas com os pacotes listados.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json && git commit -m "chore: add ui and test dependencies"
```

---

### Task 4: Inicializar shadcn/ui

**Files:**
- Create: `components.json`, `components/ui/button.tsx`, `lib/utils.ts`, modify `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Rodar init do shadcn**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npx shadcn@latest init --yes --base-color neutral
```

Expected: `components.json`, `lib/utils.ts` criados, `tailwind.config.ts` atualizado.

- [ ] **Step 2: Adicionar componentes shadcn necessários**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npx shadcn@latest add button card badge sheet dropdown-menu separator --yes
```

Expected: arquivos em `components/ui/` para cada componente.

- [ ] **Step 3: Verificar componentes**

Run:
```bash
ls "C:/Users/Marcelo/Desktop/Portfolio/components/ui"
```

Expected: lista com `button.tsx`, `card.tsx`, `badge.tsx`, `sheet.tsx`, `dropdown-menu.tsx`, `separator.tsx`.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: init shadcn/ui and add base components"
```

---

## Fase 2 — i18n e Tema

### Task 5: Configurar next-intl

**Files:**
- Create: `lib/i18n.ts`, `middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Criar lib/i18n.ts**

Criar `lib/i18n.ts`:
```ts
export const locales = ["pt-BR", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt-BR";
```

- [ ] **Step 2: Criar middleware.ts**

Criar `middleware.ts` na raiz:
```ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 3: Criar lib/i18n-request.ts (helper de mensagens)**

Criar `lib/i18n-request.ts`:
```ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Atualizar next.config.ts com plugin next-intl**

Substituir `next.config.ts`:
```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n-request.ts");

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(i18n): configure next-intl middleware and request config"
```

---

### Task 6: Criar messages/pt-BR.json

**Files:**
- Create: `messages/pt-BR.json`

- [ ] **Step 1: Criar arquivo de traduções PT**

Criar `messages/pt-BR.json`:
```json
{
  "metadata": {
    "title": "Marcelo Soares — Engenheiro de Software",
    "description": "Portfólio pessoal de Marcelo Soares. Projetos open-source, artigos e contato."
  },
  "nav": {
    "about": "Sobre",
    "projects": "Projetos",
    "contact": "Contato"
  },
  "hero": {
    "greeting": "Olá, eu sou",
    "title": "Engenheiro de Software",
    "subtitle": "Construindo produtos digitais com foco em simplicidade e performance.",
    "ctaProjects": "Ver projetos",
    "ctaContact": "Contato"
  },
  "about": {
    "heading": "Sobre",
    "bio": [
      "Sou Marcelo Soares, engenheiro de software baseado no Brasil. Trabalho com desenvolvimento web há anos, focando em criar experiências digitais limpas e funcionais.",
      "Meu foco está em TypeScript, React e Next.js. Gosto de código bem escrito, interfaces acessíveis e produtos que resolvem problemas reais."
    ],
    "stackHeading": "Stack principal"
  },
  "projects": {
    "heading": "Projetos",
    "subtitle": "Repositórios open-source selecionados.",
    "viewOnGithub": "Ver no GitHub",
    "starsLabel": "stars",
    "empty": "Projetos indisponíveis no momento."
  },
  "contact": {
    "heading": "Contato",
    "description": "Vamos conversar sobre código, projetos ou oportunidades.",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "email": "Email"
  },
  "footer": {
    "copyright": "Todos os direitos reservados.",
    "builtWith": "Construído com Next.js"
  }
}
```

- [ ] **Step 2: Validar JSON**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && node -e "JSON.parse(require('fs').readFileSync('messages/pt-BR.json','utf8')); console.log('ok')"
```

Expected: `ok`.

- [ ] **Step 3: Commit**

```bash
git add messages/pt-BR.json && git commit -m "feat(i18n): add pt-BR translations"
```

---

### Task 7: Criar messages/en.json

**Files:**
- Create: `messages/en.json`

- [ ] **Step 1: Criar arquivo de traduções EN**

Criar `messages/en.json`:
```json
{
  "metadata": {
    "title": "Marcelo Soares — Software Engineer",
    "description": "Personal portfolio of Marcelo Soares. Open-source projects, articles, and contact."
  },
  "nav": {
    "about": "About",
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "title": "Software Engineer",
    "subtitle": "Building digital products focused on simplicity and performance.",
    "ctaProjects": "View projects",
    "ctaContact": "Contact"
  },
  "about": {
    "heading": "About",
    "bio": [
      "I'm Marcelo Soares, a software engineer based in Brazil. I've been working with web development for years, focusing on building clean and functional digital experiences.",
      "My focus is on TypeScript, React, and Next.js. I enjoy well-written code, accessible interfaces, and products that solve real problems."
    ],
    "stackHeading": "Main stack"
  },
  "projects": {
    "heading": "Projects",
    "subtitle": "Selected open-source repositories.",
    "viewOnGithub": "View on GitHub",
    "starsLabel": "stars",
    "empty": "Projects unavailable at the moment."
  },
  "contact": {
    "heading": "Contact",
    "description": "Let's talk about code, projects, or opportunities.",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "email": "Email"
  },
  "footer": {
    "copyright": "All rights reserved.",
    "builtWith": "Built with Next.js"
  }
}
```

- [ ] **Step 2: Validar JSON**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('ok')"
```

Expected: `ok`.

- [ ] **Step 3: Commit**

```bash
git add messages/en.json && git commit -m "feat(i18n): add en translations"
```

---

### Task 8: Configurar next-themes no layout

**Files:**
- Create: `components/theme-provider.tsx`
- Modify: `app/[locale]/layout.tsx` (após criar na Task 24)

- [ ] **Step 1: Criar ThemeProvider**

Criar `components/theme-provider.tsx`:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 2: Commit (será usado na Task 24)**

```bash
git add components/theme-provider.tsx && git commit -m "feat(theme): add theme provider wrapper"
```

---

### Task 9: Criar ThemeToggle

**Files:**
- Create: `components/shared/theme-toggle.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/shared/theme-toggle.tsx`:
```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/theme-toggle.tsx && git commit -m "feat(theme): add theme toggle component"
```

---

## Fase 3 — GitHub API

### Task 10: Criar lib/utils.ts (cn helper)

**Files:**
- Create/verify: `lib/utils.ts`

- [ ] **Step 1: Garantir que existe (shadcn já cria)**

Verificar que `lib/utils.ts` contém:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Se não existir, criar com esse conteúdo.

- [ ] **Step 2: Commit se criado**

```bash
git add lib/utils.ts && git commit -m "chore: add cn helper" || echo "already exists"
```

---

### Task 11: Configurar vitest

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`, modify `package.json`

- [ ] **Step 1: Criar vitest.config.ts**

Criar `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 2: Criar tests/setup.ts**

Criar `tests/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Adicionar script de test em package.json**

Em `package.json`, em `"scripts"`, adicionar:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Rodar vitest para confirmar**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm test
```

Expected: exit 0, "No test files found" ou similar (zero testes ainda, mas config funcional).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: configure vitest"
```

---

### Task 12: Implementar lib/github.ts com TDD

**Files:**
- Create: `lib/github.ts`, `tests/github.test.ts`

- [ ] **Step 1: Escrever teste falho**

Criar `tests/github.test.ts`:
```ts
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
```

- [ ] **Step 2: Rodar teste (deve falhar)**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm test -- tests/github.test.ts
```

Expected: FAIL, "Cannot find module '@/lib/github'".

- [ ] **Step 3: Implementar lib/github.ts**

Criar `lib/github.ts`:
```ts
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
```

- [ ] **Step 4: Rodar teste (deve passar)**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm test -- tests/github.test.ts
```

Expected: PASS, 6 testes verdes.

- [ ] **Step 5: Commit**

```bash
git add lib/github.ts tests/github.test.ts && git commit -m "feat(github): add fetchProjects and fetchUser with cache and error handling"
```

---

### Task 13: Criar data/projects.json curado

**Files:**
- Create: `data/projects.json`

- [ ] **Step 1: Criar estrutura inicial vazia com exemplo**

Criar `data/projects.json`:
```json
[
  {
    "slug": "portfolio",
    "order": 1,
    "descriptionPt": "Este portfólio pessoal, construído com Next.js, shadcn/ui e Framer Motion.",
    "descriptionEn": "This personal portfolio, built with Next.js, shadcn/ui, and Framer Motion."
  }
]
```

- [ ] **Step 2: Validar JSON**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && node -e "console.log(JSON.parse(require('fs').readFileSync('data/projects.json','utf8')).length)"
```

Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add data/projects.json && git commit -m "feat(data): add curated projects whitelist"
```

---

### Task 14: Implementar lib/curation.ts com TDD

**Files:**
- Create: `lib/curation.ts`, `tests/curation.test.ts`

- [ ] **Step 1: Escrever teste falho**

Criar `tests/curation.test.ts`:
```ts
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
    expect(result[0].description).toBe("EN alpha");
  });

  it("fallback para descrição do GitHub quando curadoria omite", () => {
    const partial = [{ slug: "alpha", order: 1 }];
    const result = curateProjects(repos, partial, "pt-BR");
    expect(result[0].description).toBe("GitHub alpha");
  });
});
```

- [ ] **Step 2: Rodar teste (deve falhar)**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm test -- tests/curation.test.ts
```

Expected: FAIL, "Cannot find module '@/lib/curation'".

- [ ] **Step 3: Implementar lib/curation.ts**

Criar `lib/curation.ts`:
```ts
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
      displayDescription: custom || repo.description || "",
    };
  });
}
```

- [ ] **Step 4: Rodar teste (deve passar)**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm test -- tests/curation.test.ts
```

Expected: PASS, 5 testes verdes.

- [ ] **Step 5: Commit**

```bash
git add lib/curation.ts tests/curation.test.ts && git commit -m "feat(curation): merge github repos with curated whitelist and locale-aware descriptions"
```

---

## Fase 4 — Componentes Visuais

### Task 15: Criar lib/seo.ts (JSON-LD helper)

**Files:**
- Create: `lib/seo.ts`

- [ ] **Step 1: Criar helper de SEO**

Criar `lib/seo.ts`:
```ts
import type { Locale } from "@/lib/i18n";

export function personJsonLd(locale: Locale, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcelo Soares",
    url: `${baseUrl}/${locale}`,
    sameAs: [
      "https://github.com/marcelosoaresdev",
      "https://www.linkedin.com/in/marcelosoaresdev",
    ],
    jobTitle: locale === "en" ? "Software Engineer" : "Engenheiro de Software",
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/seo.ts && git commit -m "feat(seo): add JSON-LD Person schema helper"
```

---

### Task 16: Criar FadeIn wrapper (Framer Motion)

**Files:**
- Create: `components/shared/fade-in.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/shared/fade-in.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/fade-in.tsx && git commit -m "feat(motion): add fade-in wrapper component"
```

---

### Task 17: Criar SectionHeading

**Files:**
- Create: `components/shared/section-heading.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/shared/section-heading.tsx`:
```tsx
type Props = {
  id?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ id, title, subtitle }: Props) {
  return (
    <div id={id} className="mb-12">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/section-heading.tsx && git commit -m "feat: add section heading shared component"
```

---

### Task 18: Criar LangToggle

**Files:**
- Create: `components/shared/lang-toggle.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/shared/lang-toggle.tsx`:
```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locales, type Locale } from "@/lib/i18n";

export function LangToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(target: Locale) {
    if (target === locale) return;
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    router.push(segments.join("/"));
  }

  const next = locale === "pt-BR" ? "en" : "pt-BR";
  const label = locale === "pt-BR" ? "EN" : "PT";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`Switch language to ${next}`}
      onClick={() => switchTo(next)}
    >
      <Languages className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/lang-toggle.tsx && git commit -m "feat(i18n): add language toggle component"
```

---

### Task 19: Criar Navbar

**Files:**
- Create: `components/shared/navbar.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/shared/navbar.tsx`:
```tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");

  const links = [
    { href: "#about", label: t("about") },
    { href: "#projects", label: t("projects") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="font-semibold tracking-tight">
          Marcelo Soares
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <LangToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="mt-8 flex flex-col gap-6">
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="text-lg">
                    {l.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/navbar.tsx && git commit -m "feat(nav): add sticky navbar with mobile sheet menu"
```

---

### Task 20: Criar Footer

**Files:**
- Create: `components/shared/footer.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/shared/footer.tsx`:
```tsx
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        <p>
          © {year} Marcelo Soares. {t("copyright")}
        </p>
        <p className="mt-1">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/footer.tsx && git commit -m "feat: add footer component"
```

---

### Task 21: Criar ProjectCard

**Files:**
- Create: `components/project-card.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/project-card.tsx`:
```tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import type { CuratedRepo } from "@/lib/curation";

type Props = {
  repo: CuratedRepo;
  viewLabel: string;
  starsLabel: string;
};

export function ProjectCard({ repo, viewLabel, starsLabel }: Props) {
  return (
    <Card className="group transition-colors hover:border-foreground/40">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight">{repo.name}</h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${viewLabel}: ${repo.name}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{repo.displayDescription}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
          {repo.stargazers_count > 0 && (
            <span>
              {repo.stargazers_count.toLocaleString()} {starsLabel}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/project-card.tsx && git commit -m "feat(projects): add project card component"
```

---

### Task 22: Criar seção Hero

**Files:**
- Create: `components/sections/hero.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/sections/hero.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="flex min-h-[70vh] items-center py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-4">
        <FadeIn>
          <p className="text-sm font-medium text-muted-foreground">{t("greeting")}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">Marcelo Soares</h1>
          <p className="mt-3 text-xl font-medium text-muted-foreground md:text-2xl">{t("title")}</p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild>
              <a href="#projects">{t("ctaProjects")}</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">{t("ctaContact")}</a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/hero.tsx && git commit -m "feat(hero): add hero section with fade-in"
```

---

### Task 23: Criar seção About

**Files:**
- Create: `components/sections/about.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/sections/about.tsx`:
```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import type { GitHubUser } from "@/lib/github";

type Props = {
  user: GitHubUser | null;
};

const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind", "PostgreSQL"];

export function About({ user }: Props) {
  const t = useTranslations("about");

  return (
    <section id="about" className="border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <SectionHeading id="about" title={t("heading")} />
          <div className="grid gap-12 md:grid-cols-[1fr,200px] md:items-start">
            <div>
              {t.rich("bio", {
                p: (chunks) => <p className="mt-4 text-base leading-relaxed text-muted-foreground">{chunks}</p>,
              })}

              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide">{t("stackHeading")}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mx-auto md:mx-0">
              {user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  width={200}
                  height={200}
                  className="rounded-full border border-border/40"
                  priority
                />
              ) : (
                <div className="h-[200px] w-[200px] rounded-full bg-muted" />
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/about.tsx && git commit -m "feat(about): add about section with avatar and stack badges"
```

---

### Task 24: Criar seção Projects

**Files:**
- Create: `components/sections/projects.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/sections/projects.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/project-card";
import type { CuratedRepo } from "@/lib/curation";

type Props = {
  projects: CuratedRepo[];
};

export function Projects({ projects }: Props) {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <SectionHeading id="projects" title={t("heading")} subtitle={t("subtitle")} />
        </FadeIn>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((repo, idx) => (
              <FadeIn key={repo.id} delay={idx * 0.05}>
                <ProjectCard repo={repo} viewLabel={t("viewOnGithub")} starsLabel={t("starsLabel")} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/projects.tsx && git commit -m "feat(projects): add projects grid section with staggered fade-in"
```

---

### Task 25: Criar seção Contact

**Files:**
- Create: `components/sections/contact.tsx`

- [ ] **Step 1: Criar componente**

Criar `components/sections/contact.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const CONTACTS = [
  { href: "https://github.com/marcelosoaresdev", icon: Github, key: "github" as const },
  { href: "https://www.linkedin.com/in/marcelosoaresdev", icon: Linkedin, key: "linkedin" as const },
  { href: "mailto:marcelo@example.com", icon: Mail, key: "email" as const },
];

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <FadeIn>
          <SectionHeading id="contact" title={t("heading")} />
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CONTACTS.map(({ href, icon: Icon, key }) => (
              <Button key={key} variant="outline" asChild>
                <a href={href} target={key === "email" ? undefined : "_blank"} rel={key === "email" ? undefined : "noreferrer noopener"}>
                  <Icon className="mr-2 h-4 w-4" />
                  {t(key)}
                </a>
              </Button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/contact.tsx && git commit -m "feat(contact): add contact section with social buttons"
```

---

## Fase 5 — Integração e Layout

### Task 26: Criar app/[locale]/layout.tsx

**Files:**
- Create: `app/[locale]/layout.tsx`
- Modify: `app/layout.tsx` (manter mínimo, delega para [locale])

- [ ] **Step 1: Criar app/[locale]/layout.tsx**

Criar `app/[locale]/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { locales, type Locale } from "@/lib/i18n";
import "../globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Substituir app/layout.tsx por stub**

Sobrescrever `app/layout.tsx`:
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

(O layout real vive em `[locale]/layout.tsx` para suportar locale no `<html lang>`.)

- [ ] **Step 3: Substituir app/page.tsx por redirect**

Sobrescrever `app/page.tsx`:
```tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
```

- [ ] **Step 4: Configurar globals.css com variáveis de tema (Tailwind v4)**

Sobrescrever `app/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: #fafafa;
  --color-foreground: #0a0a0a;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #737373;
  --color-border: #e5e5e5;
  --color-accent: #0066ff;
  --color-accent-foreground: #ffffff;
}

@layer base {
  .dark {
    --color-background: #0a0a0a;
    --color-foreground: #fafafa;
    --color-muted: #262626;
    --color-muted-foreground: #a3a3a3;
    --color-border: #262626;
    --color-accent: #3b82f6;
    --color-accent-foreground: #ffffff;
  }
}

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
}
```

> **Nota Tailwind v4:** variáveis CSS são definidas em `@theme` (não `tailwind.config.ts`). Para usar: `bg-background`, `text-foreground`, `border-border` automaticamente. O `darkMode` vira `@custom-variant dark`.

- [ ] **Step 5: Verificar build**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run build
```

Expected: build concluído sem erros.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(layout): integrate providers, fonts, i18n, theme, navbar and footer"
```

---

### Task 27: Criar app/[locale]/page.tsx (home)

**Files:**
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Criar página home**

Criar `app/[locale]/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { fetchProjects, fetchUser } from "@/lib/github";
import { curateProjects } from "@/lib/curation";
import curated from "@/data/projects.json";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const [repos, user] = await Promise.all([
    fetchProjects("marcelosoaresdev"),
    fetchUser("marcelosoaresdev"),
  ]);

  const projects = curateProjects(repos, curated, locale as Locale);

  return (
    <>
      <Hero />
      <About user={user} />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Adicionar JSON-LD no layout**

Em `app/[locale]/layout.tsx`, dentro do `<head>` (antes do `</body>` por simplicidade), adicionar antes do fechamento do `<body>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(personJsonLd(locale, "https://marcelosoares.dev")),
  }}
/>
```

(Importar `personJsonLd` no topo do arquivo.)

- [ ] **Step 3: Verificar type-check**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 4: Rodar dev server e testar manualmente**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run dev
```

Em outra aba: `curl http://localhost:3000/pt-BR` deve retornar 200 e HTML com nome "Marcelo Soares".

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(home): compose all sections with github data and curated projects"
```

---

### Task 28: Criar app/[locale]/not-found.tsx

**Files:**
- Create: `app/[locale]/not-found.tsx`

- [ ] **Step 1: Criar página 404**

Criar `app/[locale]/not-found.tsx`:
```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Página não encontrada</p>
        <Link href="/pt-BR" className="mt-4 inline-block text-sm underline">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/not-found.tsx && git commit -m "feat: add 404 page"
```

---

## Fase 6 — SEO Avançado

### Task 29: Criar sitemap e robots

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Criar app/sitemap.ts**

Criar `app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://marcelosoares.dev";
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
```

- [ ] **Step 2: Criar app/robots.ts**

Criar `app/robots.ts`:
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://marcelosoares.dev/sitemap.xml",
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts app/robots.ts && git commit -m "feat(seo): add sitemap and robots"
```

---

## Fase 7 — Validação Final

### Task 30: Rodar suite completa de testes

- [ ] **Step 1: Rodar todos os testes**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm test
```

Expected: PASS, 11 testes verdes (6 github + 5 curation).

- [ ] **Step 2: Type-check**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Lint**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run lint
```

Expected: sem erros (warnings OK se houver).

---

### Task 31: Build de produção

- [ ] **Step 1: Build local**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run build
```

Expected: build concluído, rotas `/`, `/pt-BR`, `/en` listadas.

- [ ] **Step 2: Inspecionar output**

Verificar que `NextIntlClientProvider` não reclama e que páginas são SSG (○) ou ISR (●).

---

### Task 32: Validação de responsividade (manual)

- [ ] **Step 1: Rodar dev server**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run dev
```

- [ ] **Step 2: Testar em DevTools**

Abrir `http://localhost:3000/pt-BR` em DevTools, testar:
- 320px (iPhone SE): sem scroll horizontal, navbar colapsada
- 768px (iPad): grid 2 colunas em projects
- 1280px (laptop): grid 3 colunas, navbar completa
- Toggle de tema funciona
- Toggle de idioma troca para `/en` e troca todo conteúdo
- Cards de projeto têm hover

- [ ] **Step 3: Corrigir issues**

Para qualquer issue visual, ajustar nos componentes correspondentes e re-commit.

---

### Task 33: Lighthouse local

- [ ] **Step 1: Build de produção**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && npm run build && npm start
```

- [ ] **Step 2: Rodar Lighthouse**

Abrir DevTools → Lighthouse → Analyze page load (mobile + desktop).

Esperado:
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

- [ ] **Step 3: Iterar se necessário**

Se algum critério falhar, investigar (geralmente imagens, fontes, JS bundle) e corrigir.

---

### Task 34: Commit final

- [ ] **Step 1: Verificar estado git**

Run:
```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && git status
```

Expected: working tree clean.

- [ ] **Step 2: Tag de release**

```bash
git tag v0.1.0 && git log --oneline | head -20
```

Expected: lista de commits semânticos (`feat:`, `chore:`, `fix:`).

---

## Fase 8 — Deploy (manual na Vercel)

### Task 35: Push para GitHub

- [ ] **Step 1: Criar repo no GitHub**

Via interface web: criar `marcelosoaresdev/portfolio`.

- [ ] **Step 2: Adicionar remote e push**

```bash
cd "C:/Users/Marcelo/Desktop/Portfolio" && git remote add origin https://github.com/marcelosoaresdev/portfolio.git && git branch -M main && git push -u origin main
```

---

### Task 36: Conectar Vercel

- [ ] **Step 1: Importar projeto na Vercel**

Acessar `vercel.com/new`, importar `marcelosoaresdev/portfolio`.

- [ ] **Step 2: Configurar domínio (opcional)**

Adicionar domínio customizado `marcelosoares.dev` em Settings → Domains.

- [ ] **Step 3: Deploy**

Clicar Deploy. Vercel detecta Next.js, faz build, deploy.

- [ ] **Step 4: Validar produção**

Abrir URL de produção, verificar:
- Site carrega
- Tema funciona
- Idioma funciona
- Projetos aparecem

---

## Self-Review (executado pelo autor do plano)

**1. Spec coverage:**

| Seção do spec | Tasks |
|---|---|
| 1. Visão Geral | Plano inteiro |
| 2. Stack | Tasks 1–4 |
| 3. Estrutura de Pastas | Tasks 5, 24 |
| 4.1 Hero | Task 22 |
| 4.2 About | Task 23 |
| 4.3 Projects | Tasks 21, 24 |
| 4.4 Contact | Task 25 |
| 4.5 Navbar | Task 19 |
| 4.6 Footer | Task 20 |
| 5.1 GitHub API | Task 12 |
| 5.2 Curadoria | Tasks 13, 14 |
| 5.3 Traduções | Tasks 6, 7 |
| 6.1 Paleta | Task 26 (globals.css) |
| 6.2 Tipografia | Task 26 (Geist fonts) |
| 6.3 Espaçamento | Aplicado nas seções |
| 6.4 Componentes | Tasks 17, 19, 21, 26 |
| 6.5 Animações | Task 16 |
| 7. Responsividade | Tasks 19 (sheet mobile), 32 |
| 8. i18n | Tasks 5, 6, 7, 18, 26 |
| 9. Tema | Tasks 8, 9, 26 |
| 10. SEO | Tasks 15, 26, 27, 29 |
| 11. Performance | Tasks 26 (font display), 32 |
| 12. Critérios de Sucesso | Tasks 30–34 |
| 13. Fora de Escopo | Confirmado em nenhuma task |
| 14. Riscos | Mitigações aplicadas |

**2. Placeholder scan:** Sem TBDs, TODOs ou "fill in details". Todos os steps têm código completo.

**3. Type consistency:**
- `GitHubRepo` definido Task 12, usado em Tasks 13, 21, 24
- `GitHubUser` definido Task 12, usado em Tasks 23, 27
- `CuratedRepo` definido Task 14, usado em Tasks 21, 24, 27
- `CuratedProject` definido Task 14, usado em Task 27
- `Locale` definido Task 5, usado em Tasks 7, 14, 18, 27
- Funções: `fetchProjects`, `fetchUser` (Task 12), `curateProjects` (Task 14) — todas usadas consistentemente

Sem inconsistências encontradas.