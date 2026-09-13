-- =====================================================================
-- LH Consultoria — estrutura inicial do banco de dados
-- Fase 4 do CLAUDE.md
--
-- Este arquivo cria: tabelas, indices, gatilhos, RLS (Row Level Security),
-- politicas de acesso e os dados iniciais do funil.
--
-- REGRA PERMANENTE (CLAUDE.md secao 8.1): RLS habilitado em TODAS as
-- tabelas, sem excecao, e nenhuma policy pode usar "true" como condicao.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. PERFIS DE USUARIO
-- Espelha auth.users do Supabase e guarda o papel (membro ou admin).
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nome        text not null,
  email       text not null,
  role        text not null default 'membro' check (role in ('membro', 'admin')),
  criado_em   timestamptz not null default now()
);

comment on table public.profiles is 'Usuarios da area de membros e do CRM';


-- Funcao auxiliar: diz se o usuario logado é admin.
-- SECURITY DEFINER evita recursao infinita nas policies que consultam profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;


-- Cria o perfil automaticamente quando alguem se cadastra.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ---------------------------------------------------------------------
-- 2. LEADS (captura do diagnostico 7 Sinais e do formulario de contato)
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id                    uuid primary key default gen_random_uuid(),
  nome                  text not null,
  email                 text not null,
  telefone              text,
  origem                text not null default 'diagnostico'
                          check (origem in ('diagnostico', 'contato', 'newsletter', 'indicacao', 'outro')),
  pontuacao_diagnostico smallint check (pontuacao_diagnostico between 0 and 100),
  estagio_funil         text not null default 'novo'
                          check (estagio_funil in ('novo', 'qualificado', 'em_conversa', 'proposta', 'ganho', 'perdido')),
  observacoes           text,
  criado_em             timestamptz not null default now()
);

create index if not exists leads_email_idx  on public.leads (email);
create index if not exists leads_criado_idx on public.leads (criado_em desc);

comment on table public.leads is
  'Leads capturados no site. A gravacao acontece server-side (rota de API com service role), nunca direto do navegador.';


-- ---------------------------------------------------------------------
-- 3. PRODUTOS (infoprodutos vendidos via Hotmart)
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  slug        text not null unique,
  descricao   text,
  categoria   text not null check (categoria in ('curso', 'ebook', 'mentoria', 'diagnostico')),
  preco       numeric(10, 2),
  url_hotmart text,
  thumbnail   text,
  publicado   boolean not null default false,
  ordem       smallint not null default 0,
  criado_em   timestamptz not null default now()
);

create index if not exists products_publicado_idx on public.products (publicado, ordem);


-- ---------------------------------------------------------------------
-- 4. ACESSO DO USUARIO AOS PRODUTOS (liberado pelo webhook da Hotmart)
-- ---------------------------------------------------------------------
create table if not exists public.user_access (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  product_id  uuid not null references public.products (id) on delete cascade,
  status      text not null default 'ativo' check (status in ('ativo', 'expirado', 'reembolsado')),
  expira_em   timestamptz,
  criado_em   timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists user_access_user_idx on public.user_access (user_id);


-- ---------------------------------------------------------------------
-- 5. CONTEUDO DA AREA DE MEMBROS
-- ---------------------------------------------------------------------
create table if not exists public.content (
  id         uuid primary key default gen_random_uuid(),
  titulo     text not null,
  slug       text not null unique,
  descricao  text,
  tipo       text not null check (tipo in ('carrossel', 'pdf', 'video', 'artigo')),
  categoria  text,
  url        text,
  ordem      smallint not null default 0,
  status     text not null default 'rascunho' check (status in ('rascunho', 'publicado', 'arquivado')),
  criado_em  timestamptz not null default now()
);

create index if not exists content_status_idx on public.content (status, ordem);


-- ---------------------------------------------------------------------
-- 6. CONSULTORIAS AGENDADAS
-- ---------------------------------------------------------------------
create table if not exists public.consultations (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references public.leads (id) on delete set null,
  data_agendada timestamptz,
  status        text not null default 'agendada'
                  check (status in ('agendada', 'realizada', 'cancelada', 'no_show')),
  valor         numeric(10, 2),
  observacoes   text,
  criado_em     timestamptz not null default now()
);


-- ---------------------------------------------------------------------
-- 7. FUNIL DE VENDAS (Kanban do CRM)
-- ---------------------------------------------------------------------
create table if not exists public.pipeline_stages (
  id       uuid primary key default gen_random_uuid(),
  nome     text not null,
  posicao  smallint not null,
  cor      text not null default '#C9A96E'
);

create table if not exists public.pipeline_entries (
  id                      uuid primary key default gen_random_uuid(),
  lead_id                 uuid not null references public.leads (id) on delete cascade,
  stage_id                uuid not null references public.pipeline_stages (id) on delete restrict,
  titulo                  text not null,
  valor                   numeric(10, 2),
  data_esperada_fechamento date,
  criado_em               timestamptz not null default now(),
  atualizado_em           timestamptz not null default now()
);

create index if not exists pipeline_entries_stage_idx on public.pipeline_entries (stage_id);


-- ---------------------------------------------------------------------
-- 8. INTERACOES COM O CLIENTE (historico do CRM)
-- ---------------------------------------------------------------------
create table if not exists public.interactions (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  tipo       text not null check (tipo in ('call', 'email', 'meeting', 'note')),
  descricao  text not null,
  data       timestamptz not null default now(),
  criado_em  timestamptz not null default now()
);

create index if not exists interactions_lead_idx on public.interactions (lead_id, data desc);


-- ---------------------------------------------------------------------
-- 9. GATILHO DE atualizado_em
-- ---------------------------------------------------------------------
create or replace function public.touch_atualizado_em()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists pipeline_entries_touch on public.pipeline_entries;
create trigger pipeline_entries_touch
  before update on public.pipeline_entries
  for each row execute function public.touch_atualizado_em();


-- =====================================================================
-- 10. ROW LEVEL SECURITY — obrigatorio em TODAS as tabelas
-- =====================================================================
alter table public.profiles         enable row level security;
alter table public.leads            enable row level security;
alter table public.products         enable row level security;
alter table public.user_access      enable row level security;
alter table public.content          enable row level security;
alter table public.consultations    enable row level security;
alter table public.pipeline_stages  enable row level security;
alter table public.pipeline_entries enable row level security;
alter table public.interactions     enable row level security;


-- PROFILES: cada um ve e edita o proprio perfil; admin ve todos.
drop policy if exists profiles_select_proprio on public.profiles;
create policy profiles_select_proprio on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists profiles_update_proprio on public.profiles;
create policy profiles_update_proprio on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);


-- LEADS: dado sensivel de negocio. Ninguem le pelo navegador, so admin.
-- A gravacao dos formularios publicos acontece server-side, com service role,
-- que por natureza ignora RLS (CLAUDE.md 8.2).
drop policy if exists leads_admin_tudo on public.leads;
create policy leads_admin_tudo on public.leads
  for all using (public.is_admin()) with check (public.is_admin());


-- PRODUCTS: a vitrine publica le apenas os publicados. Admin gerencia tudo.
drop policy if exists products_select_publicados on public.products;
create policy products_select_publicados on public.products
  for select using (publicado = true or public.is_admin());

drop policy if exists products_admin_escrita on public.products;
create policy products_admin_escrita on public.products
  for all using (public.is_admin()) with check (public.is_admin());


-- USER_ACCESS: cada usuario ve apenas os proprios acessos.
drop policy if exists user_access_select_proprio on public.user_access;
create policy user_access_select_proprio on public.user_access
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists user_access_admin_escrita on public.user_access;
create policy user_access_admin_escrita on public.user_access
  for all using (public.is_admin()) with check (public.is_admin());


-- CONTENT: membros logados leem o que esta publicado. Admin gerencia.
drop policy if exists content_select_publicado on public.content;
create policy content_select_publicado on public.content
  for select using (
    (status = 'publicado' and auth.uid() is not null) or public.is_admin()
  );

drop policy if exists content_admin_escrita on public.content;
create policy content_admin_escrita on public.content
  for all using (public.is_admin()) with check (public.is_admin());


-- CRM (consultorias, funil e interacoes): exclusivo de admin.
drop policy if exists consultations_admin on public.consultations;
create policy consultations_admin on public.consultations
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists pipeline_stages_admin on public.pipeline_stages;
create policy pipeline_stages_admin on public.pipeline_stages
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists pipeline_entries_admin on public.pipeline_entries;
create policy pipeline_entries_admin on public.pipeline_entries
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists interactions_admin on public.interactions;
create policy interactions_admin on public.interactions
  for all using (public.is_admin()) with check (public.is_admin());


-- =====================================================================
-- 11. DADOS INICIAIS
-- =====================================================================

-- Estagios do funil de vendas
insert into public.pipeline_stages (nome, posicao, cor)
select * from (values
  ('Novo lead',      1, '#8A8A8A'),
  ('Qualificado',    2, '#C9A96E'),
  ('Em conversa',    3, '#DFC496'),
  ('Proposta',       4, '#A8874F'),
  ('Fechado',        5, '#4E7A4E'),
  ('Perdido',        6, '#7A4E4E')
) as novos (nome, posicao, cor)
where not exists (select 1 from public.pipeline_stages);


-- Produtos de exemplo — criados como NAO publicados de proposito,
-- para nada falso aparecer no site antes de a Leny revisar.
insert into public.products (titulo, slug, descricao, categoria, publicado, ordem)
select * from (values
  ('Da Rotina ao Processo', 'da-rotina-ao-processo',
   'O metodo para transformar o que so existe na cabeca das pessoas em processo que sobrevive a ferias, demissao e crescimento.',
   'curso', false, 1),
  ('Os 7 Sinais, explicados', 'os-7-sinais-explicados',
   'O material completo por tras do diagnostico: o que cada sinal indica e o que fazer nos primeiros 30 dias.',
   'ebook', false, 2),
  ('Sala do CEO', 'sala-do-ceo',
   'Encontros em grupo reduzido para CEOs que precisam decidir com metodo, nao com intuicao.',
   'mentoria', false, 3)
) as novos (titulo, slug, descricao, categoria, publicado, ordem)
where not exists (select 1 from public.products);
