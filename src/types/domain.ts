export type TransactionType = 'ingreso' | 'gasto';

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}

export interface Category {
  id: string;
  nombre: string;
  tipo: TransactionType;
  user_id: string;
}

export interface Subcategory {
  id: string;
  nombre: string;
  categoria_id: string;
}

export interface Transaction {
  id: string;
  descripcion: string;
  valor: number;
  tipo: TransactionType;
  categoria_id: string;
  subcategoria_id: string | null;
  fecha: string;
  user_id: string;
  created_at: string;
}

export interface Budget {
  id: string;
  categoria_id: string;
  mes: string;
  valor_presupuestado: number;
  user_id: string;
}

export interface DashboardMetrics {
  totalIngresosMes: number;
  totalGastosMes: number;
  balanceMensual: number;
  balanceAnual: number;
}

export interface FilterState {
  mes: string;
  categoriaId: string;
  tipo: 'todos' | TransactionType;
}
