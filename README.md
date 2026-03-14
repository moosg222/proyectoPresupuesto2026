# Sistema de Control Financiero Personal (React + Supabase)

Aplicación fullstack para registrar ingresos/gastos, gestionar categorías/subcategorías y visualizar dashboard anual/mensual.

## Stack
- React + Vite + TypeScript
- TailwindCSS
- TanStack Query
- Recharts
- Supabase (PostgreSQL, Auth, Storage)

## Estructura
```txt
src/
  components/
  pages/
  hooks/
  services/
  types/
  utils/
supabase/
  migrations/
```

## 1) Crear base de datos en Supabase
1. Crear proyecto en Supabase.
2. Copiar `Project URL` y `anon key`.
3. Crear `.env`:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## 2) Crear tablas
Ejecuta la migración `supabase/migrations/202601010001_finance_schema.sql` desde SQL Editor o con Supabase CLI.

Incluye:
- `users`
- `categorias`
- `subcategorias`
- `transacciones`
- `presupuestos`

## 3) Crear políticas de seguridad
La migración habilita RLS en todas las tablas y define políticas por `auth.uid()` para aislar datos por usuario.

## 4) Crear servicios de conexión
- `src/services/supabaseClient.ts`: inicializa cliente Supabase.
- `src/services/authService.ts`: signup/login/logout.
- `src/services/financeService.ts`: CRUD de categorías, subcategorías, transacciones y presupuestos.

## 5) Crear hooks de datos
- `src/hooks/useAuth.ts`: estado de sesión.
- `src/hooks/useFinanceData.ts`: queries/mutations con caché de TanStack Query.

## 6) Crear componentes React
Componentes reutilizables implementados:
- `TransactionForm`
- `TransactionTable`
- `CategoryForm`
- `CategoryList`
- `DashboardCards`
- `Charts`
- `Filters`
- `Sidebar`

## 7) Crear dashboard
`src/pages/DashboardPage.tsx` calcula y muestra:
- total ingresos del mes
- total gastos del mes
- balance mensual
- balance anual

## 8) Crear gráficos
`src/components/Charts.tsx` incorpora:
- gastos por categoría
- ingresos por categoría
- evolución mensual
- presupuesto vs gasto

## 9) CRUD completo
- Categorías: crear/eliminar (base lista para edición).
- Subcategorías: servicios completos.
- Transacciones: crear/eliminar (base lista para edición).
- Presupuestos: upsert por categoría y mes.

## Páginas
- Dashboard
- Transacciones
- Categorías
- Reportes
- Configuración
- Auth (registro/login)

## Correr proyecto
```bash
npm install
npm run dev
```

## Optimización aplicada
- Capa de caché e invalidación con TanStack Query.
- Índices SQL para consultas de dashboard por usuario/fecha.
- RLS + políticas por usuario.
