# CLAUDE.md — LH Consultoria

## 1. CONTEXTO DO PROJETO

Projeto: LH Consultoria — Leny Hayashida Consultoria
Tipo: Site institucional + E-commerce de infoprodutos + CRM de gestão de clientes
Stack: Next.js 15 (App Router, TypeScript) + Supabase (Auth + Database + Storage) + Vercel
Idioma: Português (pt-BR) — todo código, comentários e mensagens em PT-BR

### Arquitetura:
- Landing Page institucional com estética minimalista oriental (Japandi)
- Diagnóstico interativo "7 Sinais da Gestão" para captura de leads
- E-commerce de infoprodutos (cursos, e-books, mentorias) com checkout integrado (Hotmart)
- Área de membros para acesso pós-compra (estilo Portal Aura)
- CRM interno para gestão de leads, funil de vendas e histórico de clientes
- Blog/Conteúdo educativo

### Jornada do usuário:
1. Visitante acessa a landing page
2. Responde ao diagnóstico "7 Sinais" (captura de lead → CRM)
3. Recebe resultado + oferta de consultoria ou infoproduto
4. Checkout via Hotmart → acesso liberado
5. Cliente entra na área de membros
6. Dados fluem para o CRM para gestão de relacionamento

### Identidade Visual (baseada nas artes anexas):
- Logo: monograma "LH" minimalista (linhas retas, traço vertical central compartilhado)
- Paleta: charcoal escuro (#1A1A1A fundo), dourado (#C9A96E acentos), off-white (#F5F2ED)
- Tipografia: Playfair Display (serifada, para títulos), Montserrat (sans-serif, para corpo)
- Estética: Japandi (minimalismo japonês + escandinavo)
  - Conceito Ma (espaço vazio intencional = respiração visual)
  - Conceito Shibui (beleza simples, sutil, não intrusiva)
  - Conceito Kintsugi (linhas douradas = valor na experiência/correção)
- Referência visual: fundo charcoal texturizado, linhas douradas finas verticais e horizontais, foto profissional em preto e branco, tipografia serifada elegante

### Proposta de valor (extraída das artes):
- "Sua empresa é familiar ou é uma família que tem um CNPJ? A diferença vale milhões."
- "Diagnóstico em 7 Sinais — Descubra antes que custe milhões."
- Tom: autoridade, provocativo, direto, sem clichês motivacionais

### Público-alvo:
CEOs de PMEs (faturamento R$ 500K-5M/mês) que cresceram mas cujos processos não acompanharam.

### Quem é Leny Hayashida:
- CEO da Zalike (importadora e distribuidora, R$ 3M/mês) — empresa separada da LH Consultoria
- 30+ anos de experiência em varejo, indústria, importação e gestão
- Trajetória: falência familiar (1995) → Sony Japão (2003-2007) → perfumaria (R$ 1,5M) → Zalike (R$ 3M/mês)
- Cursando Mestrado em Transformação de Negócios com IA + Programa Avançado de Macroeconomia (Paulo Guedes)
- Diferencial: disciplina japonesa aplicada a processos brasileiros

---

## 2. ESTRUTURA DE PÁGINAS

| Página | Função | Acesso |
|---|---|---|
| Landing Page (/) | Apresentação + diagnóstico "7 Sinais" | Público |
| Diagnóstico (/diagnostico) | Quiz interativo de 7 perguntas → resultado + captura de e-mail | Público |
| Resultado (/resultado) | Pontuação + análise + CTA para consultoria | Público (pós-diagnóstico) |
| Sobre (/sobre) | História, autoridade, credenciais, trajetória | Público |
| Produtos (/produtos) | Vitrine de infoprodutos + botão comprar (Hotmart) | Público |
| Consultoria (/consultoria) | Página de venda da consultoria paga + agendamento | Público |
| Blog (/blog) | Artigos de gestão, IA e PMEs | Público |
| Contato (/contato) | Formulário de contato qualificado | Público |
| Login (/login) | Autenticação (Supabase Auth) | Público |
| Cadastro (/cadastro) | Cadastro gratuito para área de membros | Público |
| Área de Membros (/membros) | Conteúdo gratuito (carrosséis, guias, vídeos) | Login (gratuito) |
| Curso (/cursos/[slug]) | Player de vídeo + módulos + progresso | Login (com acesso) |
| Minha Conta (/minha-conta) | Meus cursos, perfil, progresso | Login |
| Admin Dashboard (/admin) | Métricas de leads, conversões, conteúdo | Login (admin) |
| Admin Clientes (/admin/clientes) | Gestão de leads e clientes | Login (admin) |
| Admin Pipeline (/admin/pipeline) | Funil de vendas Kanban | Login (admin) |
| Admin Produtos (/admin/produtos) | Gestão de infoprodutos | Login (admin) |
| Admin Conteúdo (/admin/conteudo) | Gestão de blog e área de membros | Login (admin) |

---

## 3. ESTRUTURA DE PASTAS

```
consultoria-lh/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── sobre/page.tsx
│   │   ├── diagnostico/page.tsx
│   │   ├── resultado/page.tsx
│   │   ├── produtos/page.tsx
│   │   ├── consultoria/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── contato/page.tsx
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── cadastro/page.tsx
│   │   └── layout.tsx
│   ├── (membros)/
│   │   ├── membros/page.tsx
│   │   ├── cursos/[slug]/page.tsx
│   │   ├── minha-conta/page.tsx
│   │   └── layout.tsx
│   ├── (admin)/
│   │   ├── admin/page.tsx
│   │   ├── admin/clientes/page.tsx
│   │   ├── admin/pipeline/page.tsx
│   │   ├── admin/produtos/page.tsx
│   │   ├── admin/conteudo/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── diagnostico/route.ts
│   │   ├── lead/route.ts
│   │   ├── hotmart/webhook/route.ts
│   │   └── contact/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── DiagnosticQuiz.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ProductsShowcase.tsx
│   │   ├── StorytellingSection.tsx
│   │   ├── NewsletterCTA.tsx
│   │   └── Footer.tsx
│   ├── membros/
│   │   ├── CourseCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── ModuleAccordion.tsx
│   ├── admin/
│   │   ├── ClientTable.tsx
│   │   ├── LeadKanban.tsx
│   │   ├── PipelineChart.tsx
│   │   └── ProductForm.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── Logo.tsx
│       └── ThemeProvider.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── hotmart/
│   │   └── client.ts
│   ├── validators/
│   │   └── schemas.ts
│   └── utils/
│       └── cn.ts
├── supabase/
│   └── migrations/
├── public/
│   ├── images/
│   └── pdfs/
├── CLAUDE.md
├── next.config.js
├── tailwind.config.ts
├── .env.local
└── package.json
```

---

## 4. ENTIDADES DE DADOS

- **Leads**: nome, e-mail, telefone, origem, pontuação do diagnóstico, estágio do funil, data
- **Usuarios**: nome, e-mail, role (membro/admin), data de cadastro
- **Produtos**: título, descrição, categoria (curso/ebook/mentoria/diagnóstico), preço, URL Hotmart, thumbnail, publicado
- **AcessoUsuario**: user_id, product_id, status (ativo/expirado/reembolsado), expira_em
- **Conteudo**: título, descrição, tipo (carrossel/pdf/vídeo), categoria, ordem, status
- **Consultorias**: lead_id, data agendada, status, valor
- **PipelineStages**: nome, posição, cor
- **PipelineEntries**: client_id, stage_id, valor, título, data_esperada_fechamento
- **Interacoes**: client_id, tipo (call/email/meeting/note), descrição, data

---

## 5. FUNCIONALIDADES PRINCIPAIS

**Diagnóstico "7 Sinais"**:
- 7 perguntas com múltipla escolha
- Sistema de pontuação (0-100)
- Resultado personalizado com análise
- Captura de e-mail obrigatória para ver resultado completo
- Integração com Supabase (tabela leads)

**E-commerce de Infoprodutos**:
- Vitrine de produtos buscando da tabela products no Supabase
- Cada produto com link direto para checkout no Hotmart
- Webhook Hotmart para liberar acesso automático pós-compra
- Área de membros com acesso baseado em user_access

**CRM Interno**:
- Dashboard com métricas (leads/mês, conversão, funil)
- Gestão de clientes (tabela, busca, filtros, detalhe com histórico)
- Pipeline Kanban (cards arrastáveis entre estágios)
- Gestão de produtos (CRUD de infoprodutos)
- Gestão de conteúdo (blog + área de membros)

**Área de Membros**:
- Cadastro gratuito (nome + e-mail)
- Conteúdo organizado por tema
- Progresso salvo no Supabase
- Player de vídeo integrado

---

## 6. REGRAS DE DESIGN

- Identidade visual: fundo charcoal escuro (#1A1A1A), tipografia serifada branca (Playfair Display) para títulos, sans-serif (Montserrat) para corpo, linhas douradas (#C9A96E) como acento
- Layout minimalista, editorial, premium (estética Japandi)
- Mobile-first obrigatório
- Acessibilidade WCAG AA
- Espaçamento generoso (conceito Ma)
- Sem clutter visual (conceito Shibui)
- Linhas douradas finas como divisórias (conceito Kintsugi)

---

## 7. REGRAS DE CONTEÚDO

- NUNCA expor dados sensíveis da empresa Zalike em nenhum conteúdo público
- A LH Consultoria é empresa separada da Zalike
- Leny é CEO da Zalike, não sócia (sócios: Osmar, Fernanda, Guilherme, Leia)
- Conteúdo educativo baseado em experiência real, não teórica
- Tom: autoridade com empatia, sem clichês motivacionais
- Público-alvo: CEOs de PMEs (faturamento R$ 500K-5M/mês)
- Quando mencionar a Zalike, referenciar como "empresa onde atuo como CEO" ou "na empresa que dirijo"

---

## 8. REGRAS DE SEGURANÇA (OBRIGATÓRIAS E PERMANENTES)

### 8.1 — Supabase RLS (Row Level Security)
- RLS habilitado em TODAS as tabelas (sem exceção)
- Policy de SELECT: usuário só vê seus próprios dados (auth.uid() = user_id)
- Policy de INSERT: WITH CHECK garante que user_id = auth.uid()
- Policy de UPDATE: WITH CHECK garante que user_id = auth.uid()
- Policy de DELETE: USING garante que user_id = auth.uid()
- NUNCA usar policy true (permite tudo)
- Testar com supabase test db antes de deploy
- Service Role Key NUNCA no código do cliente

### 8.2 — Proteção de Keys do Supabase
- NEXT_PUBLIC_SUPABASE_URL → pode ser público
- NEXT_PUBLIC_SUPABASE_ANON_KEY → pode ser público (RLS protege)
- SUPABASE_SERVICE_ROLE_KEY → JAMAIS no cliente. SEMPRE server-side only
- NUNCA prefixar Service Role Key com NEXT_PUBLIC_
- NUNCA importar Service Role Key em arquivos com 'use client'

### 8.3 — Headers HTTP de Segurança
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
- Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com https://js.hotmart.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://api.stripe.com https://api.hotmart.com; frame-src https://js.stripe.com https://checkout.hotmart.com

### 8.4 — Validação de Input (Server-Side)
- TODOS os inputs validados com Zod antes de processar
- Nunca usar dangerouslySetInnerHTML
- Sanitizar HTML de entrada no servidor
- Limite de caracteres em todos os campos
- Tipos de dados validados (não confiar no cliente)

### 8.5 — CSRF Protection
- Server Actions do Next.js validam Origin automaticamente (manter)
- Rotas de API customizadas DEVEM validar header Origin
- Implementar CSRF token para formulários públicos (diagnóstico 7 sinais)
- Validar método HTTP (POST apenas para mutações)

### 8.6 — Rate Limiting
- Rota de login: máximo 5 tentativas por IP em 15 minutos
- Rota de checkout: máximo 10 tentativas por IP em 10 minutos
- Rota de diagnóstico: máximo 3 submissões por IP em 5 minutos
- Implementar com @upstash/ratelimit + Redis (Vercel KV)

### 8.7 — Upload de Arquivos
- Validar MIME type real (não confiar na extensão)
- Tamanho máximo: 5MB para imagens
- Remover metadados EXIF antes de salvar
- Tipos permitidos: image/jpeg, image/png, image/webp
- NUNCA salvar upload no mesmo diretório do código
- Usar Supabase Storage com bucket privado

### 8.8 — Pre-commit Hooks
- Rodar lint
- Rodar type-check (tsc --noEmit)
- Bloquear commit se .env ou .env.local estiver staged
- Rodar secret scanning (gitleaks ou trufflehog)

### 8.9 — Session e Auth
- Usar Supabase Auth com refresh token rotation
- Cookie httpOnly, secure, sameSite=strict
- Logout invalida sessão no servidor (não só no cliente)
- Tempo de sessão: 24h para área de membros
- MFA obrigatório para admin/CRM

### 8.10 — Checklist de Pentest Pré-Deploy
Antes de TODO deploy para produção, validar:
1. RLS ativo em todas as tabelas (rodar supabase test db)
2. Service Role Key não aparece em nenhum arquivo do cliente
3. Headers de segurança configurados no next.config.js
4. Todos os inputs validados com Zod
5. Rate limiting ativo em rotas de auth/checkout/diagnóstico
6. Upload de arquivos valida MIME type e remove EXIF
7. .env NÃO está no git
8. Pre-commit hooks passando
9. CSRF protection em formulários públicos
10. CSP configurada corretamente
11. Cookies httpOnly e secure
12. HTTPS forçado (Vercel faz automaticamente)
13. Variáveis de ambiente validadas no startup

### 8.11 — Instrução Permanente de Segurança
Esta seção de segurança é OBRIGATÓRIA e PERMANENTE. Toda nova feature, toda nova rota, todo novo formulário DEVE passar pelo checklist acima antes de merge. Segurança não é opcional. Sempre valide segurança antes de qualquer mudança na página. Se algo falhar no checklist de pentest, o deploy está BLOQUEADO até correção.

---

## 9. REGRAS DE FUNIL

- Diagnóstico é gratuito mas requer e-mail
- Resultado completo só após cadastro
- Conteúdo da área de membros é gratuito (captura de leads)
- Consultoria e infoprodutos são produtos pagos (Hotmart)
- Nenhum dado de lead é vendido ou compartilhado

---

## 10. REGRAS DE PERFORMANCE

- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Imagens otimizadas (Next.js Image)
- Lazy loading em carrosséis e conteúdo
- SEO: meta tags dinâmicas, sitemap, robots.txt
- Server Components por padrão, Client Components apenas quando necessário

---

## 11. REGRAS DE COMMIT E DEPLOY

- NUNCA faça commit direto na branch main
- Sempre crie uma branch feature/nome-da-tarefa
- Após commit, abrir Pull Request para staging
- Aguardar aprovação humana antes do merge
- Merge para staging → Vercel cria Preview URL
- Validação no preview → PR de staging → main
- Merge para main → Vercel publica em produção automaticamente

---

## 12. VARIÁVEIS DE AMBIENTE

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
HOTMART_WEBHOOK_SECRET=
HOTMART_CLIENT_ID=
HOTMART_CLIENT_SECRET=
NEXT_PUBLIC_SITE_URL=
```

---

## 13. ORDEM DE EXECUÇÃO

1. Estrutura de pastas + Design System (Tailwind + globals.css + fontes)
2. Layout raiz (Navbar + Footer + ThemeProvider)
3. Landing page completa (todas as seções)
4. Migrações SQL no Supabase + dados iniciais
5. Página de produtos (buscando do Supabase)
6. Página de diagnóstico (quiz interativo + captura de lead)
7. Página de contato (salvando leads)
8. Autenticação (login + middleware)
9. Área de membros (minha conta + curso)
10. Webhook Hotmart
11. CRM Dashboard
12. CRM Clientes
13. CRM Pipeline Kanban
14. CRM Produtos
15. Blog/Conteúdo

Comece pela FASE 1. Confirme a estrutura criada antes de avançar.
