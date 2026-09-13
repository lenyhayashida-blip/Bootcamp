# Bootcamp IA

Projeto Next.js inicial, já preparado para o fluxo: **GitHub → Vercel (deploy automático) → Supabase**.

## Estrutura

- `pages/index.js` — página inicial
- `lib/supabaseClient.js` — cliente do Supabase (lê as chaves das variáveis de ambiente)
- `.env.example` — modelo das variáveis de ambiente necessárias

## Enviar para o GitHub pela primeira vez

Dê um clique duplo em `enviar-primeira-vez.bat`. Ele conecta esta pasta ao repositório
`https://github.com/lenyhayashida-blip/Bootcamp` e envia o código.

## Enviar atualizações depois

Sempre que quiser publicar mudanças feitas nesta pasta, dê um clique duplo em `enviar-atualizacoes.bat`.

## Ligar a Vercel (uma única vez)

1. Acesse vercel.com e entre na sua conta
2. **Add New... → Project**
3. Escolha **Import Git Repository** e selecione `lenyhayashida-blip/Bootcamp`
4. Clique em **Deploy**

A partir daí, todo `push` no GitHub gera um deploy novo automaticamente — sem nenhuma ação extra.

## Configurar o Supabase na Vercel

No painel do projeto na Vercel: **Settings → Environment Variables**, adicione:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Os valores estão no painel do Supabase em **Project Settings → API**.
