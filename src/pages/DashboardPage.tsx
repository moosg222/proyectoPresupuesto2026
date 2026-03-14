import { useMemo, useState } from 'react';
import { DashboardCards } from '../components/DashboardCards';
import { Charts } from '../components/Charts';
import { Filters } from '../components/Filters';
import { useBudgets, useCategories, useTransactions } from '../hooks/useFinanceData';
import { budgetVsExpense, calculateDashboardMetrics, categoryTotals, monthlyEvolution } from '../utils/finance';
import type { FilterState } from '../types/domain';

export function DashboardPage() {
  const { data: categories = [] } = useCategories();
  const { data: transactions = [] } = useTransactions();
  const { data: budgets = [] } = useBudgets();
  const [filter, setFilter] = useState<FilterState>({ mes: new Date().toISOString().slice(0, 7), categoriaId: '', tipo: 'todos' });

  const filteredTransactions = useMemo(() => transactions.filter((tx) => {
    if (filter.tipo !== 'todos' && tx.tipo !== filter.tipo) return false;
    if (filter.categoriaId && tx.categoria_id !== filter.categoriaId) return false;
    if (filter.mes && !tx.fecha.startsWith(filter.mes)) return false;
    return true;
  }), [transactions, filter]);

  const metrics = calculateDashboardMetrics(transactions, filter.mes);

  return (
    <div className="space-y-4">
      <DashboardCards metrics={metrics} />
      <Filters categories={categories} filter={filter} onChange={setFilter} />
      <Charts
        gastosPorCategoria={categoryTotals(filteredTransactions, categories, 'gasto')}
        ingresosPorCategoria={categoryTotals(filteredTransactions, categories, 'ingreso')}
        evolucionMensual={monthlyEvolution(transactions)}
        presupuestoVsGasto={budgetVsExpense(budgets, filteredTransactions, categories, filter.mes)}
      />
    </div>
  );
}
