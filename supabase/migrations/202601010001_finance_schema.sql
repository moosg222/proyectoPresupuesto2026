-- 1) Extensiones
create extension if not exists "pgcrypto";

-- 2) Tabla users (perfil app vinculado a auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 3) Catálogo financiero
create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  tipo text not null check (tipo in ('ingreso', 'gasto')),
  user_id uuid not null references public.users(id) on delete cascade,
  unique (nombre, tipo, user_id)
);

create table if not exists public.subcategorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  categoria_id uuid not null references public.categorias(id) on delete cascade,
  unique (nombre, categoria_id)
);

create table if not exists public.transacciones (
  id uuid primary key default gen_random_uuid(),
  descripcion text not null,
  valor numeric(14,2) not null check (valor >= 0),
  tipo text not null check (tipo in ('ingreso', 'gasto')),
  categoria_id uuid not null references public.categorias(id),
  subcategoria_id uuid references public.subcategorias(id),
  fecha date not null,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.presupuestos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid not null references public.categorias(id) on delete cascade,
  mes text not null check (mes ~ '^\\d{4}-\\d{2}$'),
  valor_presupuestado numeric(14,2) not null check (valor_presupuestado >= 0),
  user_id uuid not null references public.users(id) on delete cascade,
  unique (categoria_id, mes, user_id)
);

-- 4) Índices de performance
create index if not exists idx_transacciones_user_fecha on public.transacciones(user_id, fecha desc);
create index if not exists idx_transacciones_categoria on public.transacciones(categoria_id);
create index if not exists idx_presupuestos_user_mes on public.presupuestos(user_id, mes);

-- 5) RLS
alter table public.users enable row level security;
alter table public.categorias enable row level security;
alter table public.subcategorias enable row level security;
alter table public.transacciones enable row level security;
alter table public.presupuestos enable row level security;

-- Users
create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_update_own" on public.users for update using (auth.uid() = id);

-- Categorías
create policy "categorias_all_own" on public.categorias
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Subcategorías (heredan acceso por categoría)
create policy "subcategorias_all_own" on public.subcategorias
for all
using (exists (select 1 from public.categorias c where c.id = categoria_id and c.user_id = auth.uid()))
with check (exists (select 1 from public.categorias c where c.id = categoria_id and c.user_id = auth.uid()));

-- Transacciones
create policy "transacciones_all_own" on public.transacciones
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Presupuestos
create policy "presupuestos_all_own" on public.presupuestos
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 6) Storage para comprobantes
insert into storage.buckets (id, name, public)
values ('comprobantes', 'comprobantes', false)
on conflict (id) do nothing;

create policy "storage_comprobantes_select" on storage.objects
for select using (bucket_id = 'comprobantes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "storage_comprobantes_insert" on storage.objects
for insert with check (bucket_id = 'comprobantes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "storage_comprobantes_update" on storage.objects
for update using (bucket_id = 'comprobantes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "storage_comprobantes_delete" on storage.objects
for delete using (bucket_id = 'comprobantes' and auth.uid()::text = (storage.foldername(name))[1]);
