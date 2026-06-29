# Portfolio — Marcelo Soares

Portfólio pessoal construído com Next.js, shadcn/ui, Framer Motion e GitHub API.

## Stack

- Next.js (App Router)
- TypeScript strict
- Tailwind CSS 4
- shadcn/ui (Radix)
- next-intl (PT-BR / EN)
- next-themes (light / dark)
- Framer Motion (animações sutis)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estrutura

- `app/[locale]/` — rotas localizadas (PT-BR, EN)
- `components/sections/` — Hero, About, Projects, Contact
- `components/shared/` — Navbar, Footer, toggles, FadeIn
- `lib/` — github.ts (API), curation.ts (whitelist), i18n.ts
- `data/projects.json` — curadoria manual de repositórios
- `messages/` — traduções PT-BR e EN

## Documentação

- Spec: `docs/superpowers/specs/2026-06-29-portfolio-design.md`
- Plan: `docs/superpowers/plans/2026-06-29-portfolio.md`

## Deploy

Hospedado na Vercel. Push em `main` dispara deploy automático.
