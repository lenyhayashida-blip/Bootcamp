# LH Consultoria

Site institucional + e-commerce de infoprodutos + CRM, para a LH Consultoria
(Leny Hayashida). Ver `CLAUDE.md` nesta pasta para a especificação completa
do projeto (contexto, páginas, entidades de dados, regras de segurança e
ordem de execução).

Domínio: **www.lhconsultoriaempresarial.com.br**

## Status

- [x] **Fase 1** — Estrutura de pastas + Design System (Tailwind, globals.css, fontes)
- [x] **Fase 2** — Layout raiz (Navbar + Footer + ThemeProvider)
- [x] **Fase 3** — Landing page completa (Hero, Storytelling, Serviços, Vitrine, CTA)
- [x] **Fase 4** — Migrações SQL no Supabase + dados iniciais (ver `supabase/COMO-APLICAR.md`)
- [ ] Fase 5 — Página de produtos
- [ ] Fase 6 — Diagnóstico "7 Sinais"
- [ ] Fase 7 — Página de contato
- [ ] Fase 8 — Autenticação
- [ ] Fase 9 — Área de membros
- [ ] Fase 10 — Webhook Hotmart
- [ ] Fase 11-14 — CRM (Dashboard, Clientes, Pipeline, Produtos)
- [ ] Fase 15 — Blog/Conteúdo

## Rodando localmente

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha com as chaves reais do
Supabase (nunca commitar `.env.local`).

## Design System (Fase 1)

- **Cores**: `charcoal` (#1A1A1A), `gold` (#C9A96E), `offwhite` (#F5F2ED) — configuradas em `tailwind.config.ts`
- **Tipografia**: Playfair Display (`font-serif`, títulos) e Montserrat (`font-sans`, corpo), carregadas via `next/font/google` em `app/layout.tsx`
- **Utilitários**: `.divider-kintsugi`, `.section-padding`, `.eyebrow`, `.prose-editorial` em `app/globals.css`
- **Componentes base**: `components/ui/Button.tsx`, `components/ui/Container.tsx`, `components/shared/Logo.tsx`

## Ativando o pre-commit hook (segurança — CLAUDE.md 8.8)

O ambiente remoto não permite gravar direto em `.husky/`, então o conteúdo
do hook ficou em `scripts/pre-commit-hook.txt`. Para ativar (uma vez só,
depois do `npm install`):

```bash
npx husky init
cp scripts/pre-commit-hook.txt .husky/pre-commit
```

No Windows (PowerShell), troque o `cp` por `copy scripts\pre-commit-hook.txt .husky\pre-commit`.
Depois disso, todo `git commit` roda lint, type-check e bloqueia `.env` staged automaticamente.

## Observação sobre o CSP (next.config.js)

O `Content-Security-Policy` do CLAUDE.md inclui domínios do Stripe
(`js.stripe.com`, `api.stripe.com`) mesmo o checkout sendo via Hotmart.
Mantive como está (fiel à especificação), mas vale confirmar se o Stripe
será usado em algum ponto (ex: assinaturas recorrentes da consultoria) —
caso não, dá para remover essas entradas do CSP para deixá-lo mais restrito.

## Deploy

Este projeto vive no mesmo repositório GitHub do `Bootcamp IA`, dentro da
pasta `lh-consultoria/`. Para publicar como projeto próprio na Vercel (com
domínio próprio), crie um **novo projeto na Vercel** apontando para este
mesmo repositório, mas configure em
**Project Settings → General → Root Directory** o valor `lh-consultoria`.
Assim ele builda e publica de forma independente do projeto de teste que
já existe na raiz do repositório.
