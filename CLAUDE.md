# CLAUDE.md — Project guidance

## Stack

- Next.js (App Router, RSC)
- TypeScript strict
- Tailwind CSS 4 (sintaxe `@import "tailwindcss"` + `@theme inline` em `app/globals.css`)
- shadcn/ui baseado em Radix
- next-intl para i18n (PT-BR default, EN)
- next-themes para dark mode
- Framer Motion para animações

## Regras de código

- NUNCA criar nova pasta `src/` — usar App Router em `app/`
- SEMPRE usar o alias `@/` para imports
- Componentes em `components/` (PascalCase arquivos)
- Helpers em `lib/`
- SEM `any`. SEM `@ts-ignore`. Preferir `unknown` + narrowing
- SEM comentários óbvios. Comentários só para "porquê" não-óbvio

## i18n

- Toda string visível vem de `messages/{locale}.json`
- Locales: `pt-BR` (default), `en`
- Rotas em `app/[locale]/...`
- Middleware redireciona `/` para `/${defaultLocale}`

## Tema

- Variáveis CSS em `app/globals.css` via `@theme` (Tailwind v4)
- Light + Dark com toggle no navbar (next-themes)
- NUNCA hardcodar cor — sempre via classe Tailwind (`bg-background`, `text-foreground`)

## GitHub API

- Pública, sem token (rate-limit 60 req/h)
- Cache ISR 1h via `next: { revalidate: 3600 }`
- Whitelist em `data/projects.json`
- Erros retornam `[]` ou `null` (UI tem fallback)

## Animações

- Framer Motion: uso mínimo (fade-in scroll, hover)
- PROIBIDO: parallax, 3D tilt, scroll-linked, blur decorativo
- Wrapper `FadeIn` em `components/shared/fade-in.tsx`

## Documentação

- Spec: `docs/superpowers/specs/2026-06-29-portfolio-design.md`
- Plan: `docs/superpowers/plans/2026-06-29-portfolio.md`
- Sempre ler antes de mudanças estruturais
