import type { DashboardMetrics } from '../types/domain';
import { formatCurrency } from '../utils/finance';

export function DashboardCards({ metrics }: { metrics: DashboardMetrics }) {
  const cards = [
    { label: 'Ingresos del mes', value: metrics.totalIngresosMes },
    { label: 'Gastos del mes', value: metrics.totalGastosMes },
    { label: 'Balance mensual', value: metrics.balanceMensual },
    { label: 'Balance anual', value: metrics.balanceAnual }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="text-xl font-semibold">{formatCurrency(card.value)}</p>
        </div>
      ))}
    </div>
  );
}
