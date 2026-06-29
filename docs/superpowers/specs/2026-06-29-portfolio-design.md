# Portfolio Pessoal — Design (Spec)

**Data:** 2026-06-29
**Status:** Aprovado
**Autor:** Marcelo Soares (`marcelosoaresdev`)
**Referência visual:** augustogalego.com (single-page, clean, tipografia forte, espaçamento generoso)

---

## 1. Visão Geral

Portfólio pessoal em Next.js 15 que consome a GitHub API pública para listar projetos curados, com suporte bilíngue (PT-BR/EN) e temas light/dark. Foco em minimalismo, performance, SEO e simplicidade de manutenção.

**Princípios:**
- Clean e minimalista (referência: augustogalego)
- Mobile-first, responsivo em todos os breakpoints
- Código simples, ~25 arquivos, sem abstrações prematuras
- Sem parecer "gerado por IA" (sem gradientes, glow, parallax, 3D)
- Performance: Lighthouse ≥ 95 em todas as métricas

---

## 2. Stack Técnica

| Camada | Escolha | Versão | Justificativa |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.x | SSR/SSG, SEO, cache ISR nativo |
| Linguagem | TypeScript strict | 5.x | Type safety |
| Estilização | Tailwind CSS | 4.x | Padrão shadcn/ui |
| Componentes | shadcn/ui (base Radix UI) | latest | Acessível, copy-paste, customizável |
| Ícones | lucide-react | latest | Leve, consistente |
| Animações | Framer Motion | 11.x | Fade-in + hover (uso mínimo) |
| Fontes | Geist Sans + Geist Mono | Google Fonts API | Moderna, técnica |
| i18n | next-intl | latest | Padrão Next.js, locale routing |
| Tema | next-themes | latest | Light/dark persistente |
| API GitHub | `app/api/github/route.ts` com ISR | nativo | Cache 1h sem rate-limit |
| Conteúdo | `data/projects.json` + JSON de messages | nativo | Curadoria manual |
| Deploy | Vercel | n/a | Zero-config com Next.js |

---

## 3. Estrutura de Pastas

```
portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx           # providers (theme, i18n), fontes
│   │   ├── page.tsx             # home Server Component
│   │   └── not-found.tsx
│   └── api/
│       └── github/
│           └── route.ts         # GET /api/github?user=&type=
├── components/
│   ├── ui/                      # shadcn gerado (button, card, badge, sheet, dropdown-menu)
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   └── shared/
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── theme-toggle.tsx
│       └── lang-toggle.tsx
├── lib/
│   ├── github.ts                # fetchProjects(), fetchUser()
│   ├── i18n.ts                  # config next-intl (locales, default)
│   └── utils.ts                 # cn() helper
├── data/
│   └── projects.json            # curadoria manual
├── messages/
│   ├── pt-BR.json
│   └── en.json
├── public/
│   └── favicon.ico
├── middleware.ts                # next-intl locale routing
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json              # shadcn config
└── package.json
```

**Total alvo:** ~25 arquivos de código.

---

## 4. Seções da Home

Ordem vertical única (single-page com âncoras):

### 4.1 Hero (`#hero`)
- Nome "Marcelo Soares" (h1, Geist Sans 700, `text-4xl md:text-6xl`)
- Título profissional (h2, peso médio)
- CTA primário: "Ver projetos" (scroll para `#projects`)
- CTA secundário: "Contato" (scroll para `#contact`)
- Fade-in ao carregar

### 4.2 Sobre mim (`#about`)
- Bio curta (de `messages/{locale}.json`, 2–3 parágrafos)
- Stack como badges (React, TypeScript, Node.js, etc.)
- Avatar do GitHub via `lib/github.fetchUser()` — `<Image>` Next otimizado
- Fade-in no scroll

### 4.3 Projetos (`#projects`)
- Heading da seção
- Grid responsivo de cards (shadcn `Card`)
- Cada card exibe:
  - Nome do repo (do GitHub)
  - Descrição (curada em `projects.json`; fallback GitHub)
  - Linguagem principal + count de stars (formatado: 1.2k)
  - Link externo (ícone ArrowUpRight do lucide-react)
- Fade-in stagger (`delay: index * 0.05`)

### 4.4 Contato (`#contact`)
- Botões para GitHub, LinkedIn, Email (mailto:)
- Sem formulário (anti-spam, sem backend)
- Centralizado, simples

### 4.5 Navbar (sticky)
- Logo/nome à esquerda (link para `#hero`)
- Lang-toggle + Theme-toggle à direita
- Mobile: hamburger que abre shadcn `Sheet`

### 4.6 Footer
- Copyright dinâmico (ano atual)
- Link para código-fonte do portfólio (opcional)

---

## 5. Dados e API

### 5.1 GitHub API (`lib/github.ts`)

```ts
export async function fetchProjects(username: string): Promise<GitHubRepo[]>
export async function fetchUser(username: string): Promise<GitHubUser>
```

- Endpoint público: `https://api.github.com/users/{username}/repos?per_page=100&sort=updated`
- Cache: `next: { revalidate: 3600 }` (1h)
- Erro: retorna array vazio, loga warning, UI mostra fallback "Projetos indisponíveis"
- Rate limit: 60 req/h por IP sem token (suficiente com cache 1h)

### 5.2 Curadoria (`data/projects.json`)

```json
[
  {
    "slug": "nome-exato-do-repo",
    "order": 1,
    "descriptionPt": "Descrição custom em português",
    "descriptionEn": "Custom description in English"
  }
]
```

- Apenas repositórios listados aparecem (whitelist)
- `order` define sequência (1 = primeiro)
- Descrições curadas sobrescrevem as do GitHub (campos opcionais — se omitidos, usa descrição da API)
- Repositórios sem entrada em `projects.json` são ignorados
- O array não precisa estar pré-ordenado; o código ordena por `order` em runtime

### 5.3 Traduções (`messages/{locale}.json`)

Estrutura agrupada por seção:

```json
{
  "hero": {
    "name": "Marcelo Soares",
    "title": "Engenheiro de Software",
    "ctaProjects": "Ver projetos",
    "ctaContact": "Contato"
  },
  "about": {
    "heading": "Sobre",
    "bio": ["p1", "p2"]
  },
  "projects": {
    "heading": "Projetos",
    "viewOnGithub": "Ver no GitHub",
    "empty": "Projetos indisponíveis"
  },
  "contact": {
    "heading": "Contato",
    "description": "Vamos conversar"
  },
  "nav": {
    "about": "Sobre",
    "projects": "Projetos",
    "contact": "Contato"
  }
}
```

---

## 6. Design Visual

### 6.1 Paleta

**Light:**
- Background: `#FAFAFA` (neutral-50)
- Foreground: `#0A0A0A` (neutral-950)
- Accent: `#0066FF` (azul Vercel)
- Muted: `#737373` (neutral-500)
- Border: `#E5E5E5` (neutral-200)

**Dark:**
- Background: `#0A0A0A`
- Foreground: `#FAFAFA`
- Accent: `#3B82F6` (blue-500)
- Muted: `#A3A3A3` (neutral-400)
- Border: `#262626` (neutral-800)

### 6.2 Tipografia

- **Display (nomes):** Geist Sans 700, fluido (`text-4xl md:text-6xl`)
- **Headings:** Geist Sans 600 (`text-2xl md:text-3xl`)
- **Body:** Geist Sans 400 (`text-base leading-relaxed`)
- **Mono:** Geist Mono 400 (acentos, badges de linguagem)

### 6.3 Espaçamento

- Seções: `py-24 md:py-32`
- Texto: `max-w-3xl mx-auto`
- Grid de projetos: `max-w-6xl mx-auto`, `gap-6`
- Padding de cards: `p-6`

### 6.4 Componentes

- **Cards:** borda sutil 1px, `hover:border-accent transition-colors duration-200`, sem sombra
- **Botões:** `rounded-md` (não `rounded-full`), variantes default/outline do shadcn
- **Badges:** `rounded-full px-2.5 py-0.5 text-xs`, fundo neutro
- **Ícones:** `lucide-react`, tamanho padrão `h-4 w-4` ou `h-5 w-5`

### 6.5 Animações (Framer Motion — uso mínimo)

- `initial={{ opacity: 0, y: 8 }}` `whileInView={{ opacity: 1, y: 0 }}` `viewport={{ once: true }}` `transition={{ duration: 0.4 }}` — fade-in no scroll
- Cards de projeto: `transition={{ delay: index * 0.05 }}` — stagger sutil
- Theme toggle: rotação de ícone (sol↔lua) com `transition-transform duration-300`
- **Proibido:** parallax, 3D tilt, scroll-linked, blur, partículas, marquee

---

## 7. Responsividade (Mobile-First)

| Breakpoint | Layout |
|---|---|
| `< 640px` (mobile) | 1 coluna, navbar hamburger, tipografia fluida menor |
| `640–1024px` (tablet) | 2 colunas em projetos |
| `> 1024px` (desktop) | 3 colunas em projetos, navbar completa |

**Testado em:** 320px (iPhone SE), 375px (iPhone padrão), 768px (iPad), 1280px (laptop), 1920px (desktop).

---

## 8. Configuração de i18n

- Locales: `pt-BR` (default), `en`
- Routing: `app/[locale]/...` via `next-intl`
- `middleware.ts` redireciona `/` para `/{defaultLocale}`
- `<html lang={locale}>` dinâmico
- Meta tags traduzidas via `generateMetadata`
- Lang-toggle no navbar troca `pathname` mantendo rota

---

## 9. Configuração de Tema

- `next-themes` com `attribute="class"`
- Detecção de preferência do sistema no primeiro load
- Persistência em `localStorage`
- Sem FOUC (script inline antes do hydration)
- Theme-toggle no navbar com ícones sol/lua

---

## 10. SEO e Meta

- `<title>` e `<description>` por locale, via `generateMetadata`
- Open Graph (`og:image`, `og:title`, `og:description`)
- Twitter Card
- `sitemap.xml` gerado automaticamente pelo Next.js
- `robots.txt` permitindo indexação
- JSON-LD `Person` schema com GitHub, LinkedIn, email

---

## 11. Performance

- Server Components por padrão; `"use client"` só onde necessário (toggles, animações)
- `<Image>` Next para avatares e otimização automática
- Fontes via `next/font/google` com `display: swap`
- Bundle alvo: < 100KB JS (gzipped)
- LCP alvo: < 1.5s
- Lighthouse: Performance ≥ 95, A11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95

---

## 12. Critérios de Sucesso

1. ✅ Lighthouse ≥ 95 em todas as métricas (mobile e desktop)
2. ✅ Funciona em 320px sem scroll horizontal
3. ✅ Light e dark sem FOUC
4. ✅ Toggle de idioma troca todo conteúdo visível + meta tags
5. ✅ GitHub API cacheada, sem estourar rate-limit
6. ✅ Componentes shadcn acessíveis (Radix por baixo)
7. ✅ ~25 arquivos de código total
8. ✅ Deploy na Vercel via `git push` sem config adicional

---

## 13. Fora de Escopo (YAGNI)

- ❌ Formulário de contato (anti-spam, sem backend)
- ❌ Blog / CMS
- ❌ Autenticação GitHub (token público não necessário)
- ❌ Animações complexas (parallax, 3D)
- ❌ PWA / offline mode
- ❌ Analytics (pode adicionar Plausible/Vercel Analytics depois)
- ❌ Search no portfólio
- ❌ Comentários
- ❌ RSS feed
- ❌ Múltiplas páginas (about, blog, etc.)

---

## 14. Riscos e Mitigações

| Risco | Mitigação |
|---|---|
| GitHub API rate-limit | Cache ISR de 1h; fallback gracioso |
| shadcn/ui ficar desatualizado | Pin de versão, regenerar com cuidado |
| i18n incompleto em refactor | Testar ambos locales em CI (manual ou Playwright) |
| Layout quebrar em viewport não testado | Testar 320px, 1920px explicitamente |

---

## 15. Próximos Passos

1. Aprovar este spec
2. Criar plano de implementação via `superpowers:writing-plans`
3. Implementar em PRs pequenos (scaffold → i18n → seções → API → deploy)
4. Validar com frontend-design skill para refinamento visual final