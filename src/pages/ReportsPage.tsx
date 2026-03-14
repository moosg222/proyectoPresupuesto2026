import { useMemo } from 'react';
import { useTransactions } from '../hooks/useFinanceData';
import { formatCurrency } from '../utils/finance';

export function ReportsPage() {
  const { data: transactions = [] } = useTransactions();

  const report = useMemo(() => {
    const byMonth = new Map<string, { ingresos: number; gastos: number; count: number }>();
    transactions.forEach((tx) => {
      const month = tx.fecha.slice(0, 7);
      const row = byMonth.get(month) ?? { ingresos: 0, gastos: 0, count: 0 };
      if (tx.tipo === 'ingreso') row.ingresos += Number(tx.valor);
      else row.gastos += Number(tx.valor);
      row.count += 1;
      byMonth.set(month, row);
    });

    return Array.from(byMonth.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([month, row]) => ({
      month,
      ...row,
      flujoCaja: row.ingresos - row.gastos,
      ticketPromedio: row.count ? (row.ingresos + row.gastos) / row.count : 0
    }));
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr><th className="p-2">Mes</th><th className="p-2">Ingresos</th><th className="p-2">Gastos</th><th className="p-2">Ticket promedio</th><th className="p-2">Flujo de caja</th></tr>
        </thead>
        <tbody>
          {report.map((r) => (
            <tr key={r.month} className="border-t">
              <td className="p-2 text-center">{r.month}</td>
              <td className="p-2 text-right">{formatCurrency(r.ingresos)}</td>
              <td className="p-2 text-right">{formatCurrency(r.gastos)}</td>
              <td className="p-2 text-right">{formatCurrency(r.ticketPromedio)}</td>
              <td className="p-2 text-right">{formatCurrency(r.flujoCaja)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
