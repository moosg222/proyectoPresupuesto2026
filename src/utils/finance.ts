import type { Budget, Category, DashboardMetrics, Transaction } from '../types/domain';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
}

export function calculateDashboardMetrics(transactions: Transaction[], month: string): DashboardMetrics {
  const monthTx = transactions.filter((tx) => tx.fecha.startsWith(month));
  const year = month.slice(0, 4);
  const yearTx = transactions.filter((tx) => tx.fecha.startsWith(year));

  const totalIngresosMes = monthTx.filter((t) => t.tipo === 'ingreso').reduce((acc, t) => acc + Number(t.valor), 0);
  const totalGastosMes = monthTx.filter((t) => t.tipo === 'gasto').reduce((acc, t) => acc + Number(t.valor), 0);
  const balanceAnual = yearTx.reduce((acc, t) => acc + (t.tipo === 'ingreso' ? Number(t.valor) : -Number(t.valor)), 0);

  return {
    totalIngresosMes,
    totalGastosMes,
    balanceMensual: totalIngresosMes - totalGastosMes,
    balanceAnual
  };
}

export function categoryTotals(transactions: Transaction[], categories: Category[], type: 'ingreso' | 'gasto') {
  const map = new Map(categories.filter((c) => c.tipo === type).map((c) => [c.id, c.nombre]));
  const totals = new Map<string, number>();

  transactions
    .filter((tx) => tx.tipo === type)
    .forEach((tx) => {
      const label = map.get(tx.categoria_id) ?? 'Sin categoría';
      totals.set(label, (totals.get(label) ?? 0) + Number(tx.valor));
    });

  return Array.from(totals.entries()).map(([name, value]) => ({ name, value }));
}

export function monthlyEvolution(transactions: Transaction[]) {
  const totals = new Map<string, { ingresos: number; gastos: number }>();
  transactions.forEach((tx) => {
    const month = tx.fecha.slice(0, 7);
    const current = totals.get(month) ?? { ingresos: 0, gastos: 0 };
    if (tx.tipo === 'ingreso') current.ingresos += Number(tx.valor);
    else current.gastos += Number(tx.valor);
    totals.set(month, current);
  });

  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({ month, ...value, balance: value.ingresos - value.gastos }));
}

export function budgetVsExpense(budgets: Budget[], transactions: Transaction[], categories: Category[], month: string) {
  const categoryMap = new Map(categories.map((c) => [c.id, c.nombre]));
  return budgets
    .filter((b) => b.mes === month)
    .map((budget) => {
      const spent = transactions
        .filter((tx) => tx.tipo === 'gasto' && tx.categoria_id === budget.categoria_id && tx.fecha.startsWith(month))
        .reduce((sum, tx) => sum + Number(tx.valor), 0);
      return {
        categoria: categoryMap.get(budget.categoria_id) ?? 'Sin categoría',
        presupuestado: Number(budget.valor_presupuestado),
        gastado: spent
      };
    });
}
