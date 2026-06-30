# Portfolio Full-Stack Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the portfolio from front-end-leaning generic to explicit Full Stack by updating copy, stack order, contact email, and curated projects list.

**Architecture:** Pure copy + data update. No new components, no new logic, no new tests. Five files touched: 2 i18n message files, 2 component files (hardcoded constants only), 1 data file. Existing logic (curation, i18n routing, GitHub fetch) stays untouched.

**Tech Stack:** Next.js 16 (App Router), TypeScript strict, next-intl, Tailwind CSS 4, vitest (existing, not extended).

**Spec:** `docs/superpowers/specs/2026-06-30-portfolio-fullstack-rebrand.md`

---

## File Structure

**Modified files (5):**

| File | What changes |
|---|---|
| `messages/pt-BR.json` | `hero.title`, `about.bio[0..1]`, `metadata.title` |
| `messages/en.json` | Same 3 keys, English values |
| `components/sections/about.tsx` | `STACK` const reorder (line 11), `Focus` paragraph text (line 79) |
| `components/sections/contact.tsx` | `email.href` (line 57) + `email.label` (line 60) in `CONTACTS` array |
| `data/projects.json` | Add `Desafio-To-do-list-app` entry with `order: 2` |

**No new files. No deleted files. No type changes. No new tests.**

**Commits:** 5 (one per task), plus 1 conditional fix-up commit at the end if visual verification surfaces issues.

---

### Task 1: Update PT-BR messages

**Files:**
- Modify: `messages/pt-BR.json`

- [ ] **Step 1: Change `hero.title`**

Use Edit tool:
- old: `    "title": "Engenheiro de Software",`
- new: `    "title": "Desenvolvedor Full Stack",`

- [ ] **Step 2: Replace `about.bio` array (2 paragraphs)**

Use Edit tool:
- old:
```
  "bio": [
    "Sou Marcelo Soares, engenheiro de software baseado no Brasil. Trabalho com desenvolvimento web há anos, focando em criar experiências digitais limpas e funcionais.",
    "Meu foco está em TypeScript, React e Next.js. Gosto de código bem escrito, interfaces acessíveis e produtos que resolvem problemas reais."
  ]
```
- new:
```
  "bio": [
    "Sou Marcelo Soares, desenvolvedor full stack baseado no Brasil. Trabalho com desenvolvimento web, da interface ao banco de dados — APIs, autenticação e persistência.",
    "No front, TypeScript, React e Next.js. No back, Node.js, PostgreSQL e Drizzle. Gosto de código bem escrito, interfaces acessíveis e produtos que resolvem problemas reais."
  ]
```

- [ ] **Step 3: Change `metadata.title`**

Use Edit tool:
- old: `    "title": "Marcelo Soares — Engenheiro de Software",`
- new: `    "title": "Marcelo Soares — Desenvolvedor Full Stack",`

- [ ] **Step 4: Validate JSON parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/pt-BR.json'))"`
Expected: no output (exit 0). If error: re-check Step 1-3 diffs.

- [ ] **Step 5: Commit**

```bash
git add messages/pt-BR.json
git commit -m "feat(portfolio): pt-BR copy to full-stack positioning"
```

---

### Task 2: Update EN messages

**Files:**
- Modify: `messages/en.json`

- [ ] **Step 1: Change `hero.title`**

Use Edit tool:
- old: `    "title": "Software Engineer",`
- new: `    "title": "Full Stack Developer",`

- [ ] **Step 2: Replace `about.bio` array**

Use Edit tool:
- old:
```
  "bio": [
    "I'm Marcelo Soares, a software engineer based in Brazil. I've been working with web development for years, focusing on building clean and functional digital experiences.",
    "My focus is on TypeScript, React, and Next.js. I enjoy well-written code, accessible interfaces, and products that solve real problems."
  ]
```
- new:
```
  "bio": [
    "I'm Marcelo Soares, a full stack developer based in Brazil. I work across the web stack — from UI to database, including APIs, auth, and persistence.",
    "On the front: TypeScript, React, Next.js. On the back: Node.js, PostgreSQL, Drizzle. I enjoy well-written code, accessible interfaces, and products that solve real problems."
  ]
```

- [ ] **Step 3: Change `metadata.title`**

Use Edit tool:
- old: `    "title": "Marcelo Soares — Software Engineer",`
- new: `    "title": "Marcelo Soares — Full Stack Developer",`

- [ ] **Step 4: Validate JSON parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/en.json'))"`
Expected: no output (exit 0).

- [ ] **Step 5: Commit**

```bash
git add messages/en.json
git commit -m "feat(portfolio): en copy to full-stack positioning"
```

---

### Task 3: Update About stack and focus label

**Files:**
- Modify: `components/sections/about.tsx`

- [ ] **Step 1: Reorder `STACK` const (line 11)**

Use Edit tool:
- old: `const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind", "PostgreSQL"];`
- new: `const STACK = ["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "Tailwind"];`

- [ ] **Step 2: Update `Focus` paragraph text (line 79)**

Use Edit tool:
- old: `                  Web · TypeScript`
- new: `                  Full Stack · TypeScript`

The leading whitespace matches the indentation inside the `<aside>` JSX block. Do not change indentation, only the text content.

- [ ] **Step 3: Commit**

```bash
git add components/sections/about.tsx
git commit -m "feat(portfolio): rebalance stack badges and update focus label"
```

---

### Task 4: Update Contact email

**Files:**
- Modify: `components/sections/contact.tsx`

- [ ] **Step 1: Replace email `href` and `label` in the `CONTACTS` array**

Use Edit tool:
- old:
```
    href: "mailto:marcelo@example.com",
    icon: <Mail className="h-5 w-5" />,
    key: "email",
    label: "marcelo@example.com",
```
- new:
```
    href: "mailto:marcelohsoares142@gmail.com",
    icon: <Mail className="h-5 w-5" />,
    key: "email",
    label: "marcelohsoares142@gmail.com",
```

Only lines 1 and 4 of the snippet change. The surrounding context (`icon`, `key`, `external: false`) is the match anchor.

- [ ] **Step 2: Commit**

```bash
git add components/sections/contact.tsx
git commit -m "feat(portfolio): use real contact email"
```

---

### Task 5: Add Todo List Fullstack to curated projects

**Files:**
- Modify: `data/projects.json`

- [ ] **Step 1: Add `Desafio-To-do-list-app` as a 2nd entry**

Use Edit tool (anchor on the closing `]` of the current single-element array):
- old:
```
  {
    "slug": "portfolio",
    "order": 1,
    "descriptionPt": "Este portfólio pessoal, construído com Next.js, shadcn/ui e Framer Motion.",
    "descriptionEn": "This personal portfolio, built with Next.js, shadcn/ui, and Framer Motion."
  }
]
```
- new:
```
  {
    "slug": "portfolio",
    "order": 1,
    "descriptionPt": "Este portfólio pessoal, construído com Next.js, shadcn/ui e Framer Motion.",
    "descriptionEn": "This personal portfolio, built with Next.js, shadcn/ui, and Framer Motion."
  },
  {
    "slug": "Desafio-To-do-list-app",
    "order": 2,
    "descriptionPt": "Aplicação fullstack: React no front, Node.js no back. Autenticação JWT + bcrypt, middlewares de proteção de rotas e PostgreSQL via Neon com Drizzle ORM.",
    "descriptionEn": "Fullstack application: React on the front, Node.js on the back. JWT + bcrypt authentication, route protection middleware, and PostgreSQL via Neon with Drizzle ORM."
  }
]
```

- [ ] **Step 2: Validate JSON parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('data/projects.json'))"`
Expected: no output (exit 0).

- [ ] **Step 3: Commit**

```bash
git add data/projects.json
git commit -m "feat(portfolio): add Todo List Fullstack to curated projects"
```

---

### Task 6: Build, lint, and visual verification

**No files modified in this task unless a fix is needed.** Validates Tasks 1–5 against the spec's acceptance criteria.

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: exits 0 with no errors. Pre-existing warnings OK to ignore.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: exits 0. Routes compile. No TypeScript errors.

- [ ] **Step 3: Ensure dev server is running on port 3000**

If `npm run dev` is not already running, start it in background:
Run in background: `npm run dev`
Expected: `▲ Next.js 16.x` banner with `Local: http://localhost:3000` within 10s.

If already running: skip, proceed to Step 4.

- [ ] **Step 4: Verify PT-BR route (`http://localhost:3000/pt-BR`)**

Confirm against spec section 5 acceptance criteria. Each must hold:
- [ ] Criterion 1: Hero subtitle reads `Desenvolvedor Full Stack`
- [ ] Criterion 3 (PT): Bio mentions React/Next no front **e** Node/PostgreSQL/Drizzle no back
- [ ] Criterion 4: Stack badges appear in order `TypeScript, React, Node.js, Next.js, PostgreSQL, Tailwind`
- [ ] Criterion 5 (PT): Sidebar shows `Full Stack · TypeScript`
- [ ] Criterion 6: Contact email link uses `mailto:marcelohsoares142@gmail.com` and the label shows the same
- [ ] Criterion 7 (PT): Projects section shows exactly 2 cards — `portfolio` (1st), `Desafio-To-do-list-app` (2nd)
- [ ] Criterion 9 (PT): Browser tab title is `Marcelo Soares — Desenvolvedor Full Stack`

- [ ] **Step 5: Verify EN route (`http://localhost:3000/en`)**

- [ ] Criterion 2: Hero subtitle reads `Full Stack Developer`
- [ ] Criterion 3 (EN): Bio mentions TypeScript/React/Next.js on the front **and** Node.js/PostgreSQL/Drizzle on the back
- [ ] Criterion 5 (EN): Sidebar shows `Full Stack · TypeScript`
- [ ] Criterion 9 (EN): Browser tab title is `Marcelo Soares — Full Stack Developer`

- [ ] **Step 6: Verify dashboard placeholder is NOT present**

In both locales, scroll through Projects section. Confirm only 2 cards (no 3rd placeholder, no "em breve" or "coming soon" text).

- [ ] **Step 7: Verify theme + language toggles still work**

Click theme toggle in the navbar → light ↔ dark, no broken layout. Click language toggle → URL switches between `/pt-BR` and `/en`, content swaps.

- [ ] **Step 8: Verify responsiveness at 3 breakpoints**

Resize browser to 320px, 768px, 1280px wide. At each:
- [ ] No horizontal scroll
- [ ] Navbar collapses to hamburger at <768px
- [ ] Projects grid is 1 / 2 / 3 columns respectively

- [ ] **Step 9: Conditional fix-up commit**

If Steps 1–8 surfaced any issue:
- Fix it (likely in `messages/*.json` or `components/sections/about.tsx`).
- Run `npm run build` again to confirm.
- Commit:
```bash
git add -A
git commit -m "fix(portfolio): address verification findings"
```

If nothing needed: no commit. Plan is complete.

---

## Self-Review Checklist (executed before publishing)

- [x] **Spec coverage:** Section 4.1 → Task 1; 4.2 → Task 2; 4.3 → Task 3; 4.4 → Task 4; 4.5 → Task 5; Section 5 acceptance criteria → Task 6 Steps 4–5.
- [x] **Placeholder scan:** No TBD/TODO. Every code block is complete.
- [x] **Type consistency:** No types defined or referenced — only string literals and JSON values.
- [x] **Acceptance criteria covered:** All 11 criteria from spec section 5 are verified explicitly in Task 6.
- [x] **Commits per task:** 5 commits (one per Task 1–5) plus 1 conditional fix-up commit.