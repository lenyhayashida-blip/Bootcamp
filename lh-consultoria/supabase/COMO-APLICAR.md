# Como aplicar as migrações no Supabase

Não é preciso instalar nada. O Supabase tem um editor de SQL no próprio site.

## Passo a passo

1. Acesse **supabase.com** e entre no projeto da LH Consultoria
2. Na coluna da esquerda, clique no ícone **SQL Editor** (parece uma folha com `>_`)
3. Clique em **New query**
4. Abra o arquivo `supabase/migrations/0001_estrutura_inicial.sql` (nesta mesma
   pasta do projeto), selecione **tudo** (Ctrl+A) e copie (Ctrl+C)
5. Cole dentro do editor do Supabase (Ctrl+V)
6. Clique em **Run** (ou aperte Ctrl+Enter)

Deve aparecer "Success. No rows returned" — é isso mesmo, significa que deu certo.

## Como conferir se funcionou

Na coluna da esquerda, clique em **Table Editor**. Devem aparecer nove tabelas:

`profiles`, `leads`, `products`, `user_access`, `content`, `consultations`,
`pipeline_stages`, `pipeline_entries`, `interactions`

Clique em `pipeline_stages` — ela já deve vir preenchida com os seis estágios
do funil (Novo lead, Qualificado, Em conversa, Proposta, Fechado, Perdido).

## Depois: pegar as chaves

Ainda no Supabase, vá em **Project Settings → API** e copie:

- **Project URL** → vai virar `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → vai virar `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → vai virar `SUPABASE_SERVICE_ROLE_KEY`

Essas três entram nas **Environment Variables** do projeto na Vercel.

⚠️ A `service_role` é a chave mestra: ela ignora todas as regras de segurança.
Nunca cole ela em nenhum arquivo do projeto nem em lugar público — só no painel
de variáveis de ambiente da Vercel. (Regra 8.2 do CLAUDE.md.)

## Sobre a segurança deste banco

Todas as nove tabelas estão com RLS (Row Level Security) ligado, e nenhuma
política usa a condição `true`, conforme a seção 8.1 do CLAUDE.md:

- **leads, consultorias, funil e interações**: só administradores acessam. Os
  formulários públicos do site gravam através de uma rota no servidor, nunca
  direto do navegador.
- **products**: o visitante só enxerga produtos marcados como publicados.
- **content**: só membros logados leem o que está publicado.
- **user_access**: cada pessoa vê apenas os próprios acessos.
- **profiles**: cada pessoa vê e edita apenas o próprio perfil.

Quem é admin é definido pela coluna `role` na tabela `profiles`. Depois de criar
sua conta no site (Fase 8), será preciso rodar uma vez, no SQL Editor:

```sql
update public.profiles set role = 'admin' where email = 'seu-email@exemplo.com';
```
