# Portfolio — Reposicionamento Full Stack (Spec)

**Data:** 2026-06-30
**Status:** Aprovado pelo usuário (rascunho de design aprovado em conversa)
**Autor:** Marcelo Soares (`marcelosoaresdev`)
**Pré-requisito:** `data/profile.md` (criado em 2026-06-30) — fonte de verdade para os dados profissionais.

---

## 1. Contexto

O portfólio atual se apresenta como genérico ("Engenheiro de Software" / "Software Engineer") e o copy do About reforça foco em TypeScript, React e Next.js — leitura front-end. O currículo de Marcelo (ver `data/profile.md`) tem base sólida nos dois lados (Node.js, PostgreSQL, Drizzle no back; React, Next.js, Tailwind no front) e ele quer ser visto como **Full Stack Júnior**, não como front ou back exclusivo.

Esta spec é uma atualização mínima de copy e dados para refletir esse posicionamento, sem mexer em estrutura, layout ou stack técnico do portfólio.

---

## 2. Objetivo

Trocar o posicionamento percebido do portfólio de "engenheiro de software genérico / foco front" para "desenvolvedor full stack", deixando claro que Marcelo trabalha em todas as camadas (UI, API, banco).

---

## 3. Escopo

### Dentro

- Copy do hero (título profissional) em PT-BR e EN
- Bio do About (2 parágrafos) em PT-BR e EN
- Metadata `<title>` em PT-BR e EN
- Ordem e composição da constante `STACK` em `components/sections/about.tsx`
- Texto do campo `Focus` no sidebar do About
- E-mail de contato (placeholder → real)
- Whitelist de projetos em `data/projects.json` (incluir Todo List Fullstack)

### Fora (YAGNI)

- Nova seção de Experiência (4CODGO, Vitis Souls)
- Card placeholder para Dashboard Financeiro
- Refatoração da i18n para incluir `STACK` ou `Focus`
- Mudanças em layout, animação, tema, paleta, tipografia
- Adicionar outros repositórios (`projeto-resolucity`, calculadoras, `SiteCursos`)
- SEO/JSON-LD além do `<title>` que já está em messages

---

## 4. Arquivos tocados (5)

### 4.1 `messages/pt-BR.json`

**`hero.title`**
- antes: `"Engenheiro de Software"`
- depois: `"Desenvolvedor Full Stack"`

**`about.bio`** (array de 2 strings)
```json
[
  "Sou Marcelo Soares, desenvolvedor full stack baseado no Brasil. Trabalho com desenvolvimento web, da interface ao banco de dados — APIs, autenticação e persistência.",
  "No front, TypeScript, React e Next.js. No back, Node.js, PostgreSQL e Drizzle. Gosto de código bem escrito, interfaces acessíveis e produtos que resolvem problemas reais."
]
```

**`metadata.title`**
- antes: `"Marcelo Soares — Engenheiro de Software"`
- depois: `"Marcelo Soares — Desenvolvedor Full Stack"`

**`metadata.description`:** sem mudança (genérico o suficiente).

### 4.2 `messages/en.json`

**`hero.title`**
- antes: `"Software Engineer"`
- depois: `"Full Stack Developer"`

**`about.bio`**
```json
[
  "I'm Marcelo Soares, a full stack developer based in Brazil. I work across the web stack — from UI to database, including APIs, auth, and persistence.",
  "On the front: TypeScript, React, Next.js. On the back: Node.js, PostgreSQL, Drizzle. I enjoy well-written code, accessible interfaces, and products that solve real problems."
]
```

**`metadata.title`**
- antes: `"Marcelo Soares — Software Engineer"`
- depois: `"Marcelo Soares — Full Stack Developer"`

**`metadata.description`:** sem mudança.

### 4.3 `components/sections/about.tsx`

**Constante `STACK`** (linha 11) — reordenada para destacar ferramentas back entre as primeiras:
```ts
const STACK = ["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "Tailwind"];
```

**Sidebar `Focus`** (parágrafo na linha 79) — texto:
- antes: `Web · TypeScript`
- depois: `Full Stack · TypeScript`

Nenhuma outra linha do componente muda.

### 4.4 `components/sections/contact.tsx`

**Item `email`** do array `CONTACTS` (linhas 56–62):
- `href`: `"mailto:marcelo@example.com"` → `"mailto:marcelohsoares142@gmail.com"`
- `label`: `"marcelo@example.com"` → `"marcelohsoares142@gmail.com"`

E-mail vem de `data/profile.md` (atualizado em 2026-06-30).

### 4.5 `data/projects.json`

Adicionar o Todo List Fullstack (slug `Desafio-To-do-list-app`, confirmado via GitHub API `users/marcelosoaresdev/repos` em 2026-06-30):

```json
[
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

A curadoria (`lib/curation.ts`) filtra a lista da API do GitHub pelo slug em `c.slug` igualando a `r.name`. Funciona sem mudança na lógica.

---

## 5. Critérios de aceite

1. `GET /pt-BR` mostra `hero.title = "Desenvolvedor Full Stack"`
2. `GET /en` mostra `hero.title = "Full Stack Developer"`
3. Bio do About menciona React/Next no front **e** Node/PostgreSQL/Drizzle no back em ambos locales
4. Stack badges na ordem: `TypeScript, React, Node.js, Next.js, PostgreSQL, Tailwind`
5. Sidebar mostra `Full Stack · TypeScript` em ambos locales
6. Link de e-mail aponta para `mailto:marcelohsoares142@gmail.com` e o label mostra `marcelohsoares142@gmail.com`
7. Seção Projetos renderiza **2 cards**: `portfolio` (1º) + `Desafio-To-do-list-app` (2º)
8. **Nenhum** card placeholder para "Dashboard Financeiro" aparece
9. `<title>` da aba mostra `Marcelo Soares — Desenvolvedor Full Stack` (PT-BR) e `Marcelo Soares — Full Stack Developer` (EN)
10. Toggle de tema (light/dark) e de idioma continuam funcionando sem regressão
11. Layout responsivo intacto em 320px, 768px, 1280px+

---

## 6. Plano de teste

```bash
npm run build   # deve passar sem erros
npm run lint    # deve passar sem warnings
```

Verificação manual no navegador:
- `http://localhost:3000/pt-BR` → confirmar critérios 1, 3, 4, 5, 6, 7, 9
- `http://localhost:3000/en` → confirmar critérios 2, 3, 4, 5, 6, 7, 9
- Trocar tema e idioma → confirmar critério 10
- Redimensionar janela nos 3 breakpoints → confirmar critério 11

Sem testes automatizados novos: escopo é só copy + dados, não há lógica nova.

---

## 7. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Slug do GitHub mudar (renomear repo) | `curateProjects` filtra por nome exato; se quebrar, o card simplesmente desaparece. Atualizar `data/projects.json` quando necessário. |
| Bio ficar longa demais e quebrar layout em mobile | Verificar manualmente em 320px; o CSS atual usa `max-w-prose` e `leading-[1.75]` que devem absorver. |
| E-mail real exposto no HTML estático | Esperado — é portfólio público, é o ponto do link `mailto:`. |

---

## 8. Mensagem de commit sugerida

```
feat(portfolio): rebrand copy + data to full-stack positioning
```

---

## 9. Fora de escopo (reforço)

- ❌ Seção "Experiência" (4CODGO, Vitis Souls) — não adicionar nesta spec; perfil permanece minimalista
- ❌ Card placeholder "em breve" — não implementar; Dashboard entra quando tiver repo público
- ❌ Tradução de `STACK` e `Focus` para i18n — manter hardcoded
- ❌ Mudanças em `metadata.description` — copy genérico atual serve
- ❌ Outros repos (`projeto-resolucity`, `SiteCursos`, calculadoras) — não adicionar nesta spec