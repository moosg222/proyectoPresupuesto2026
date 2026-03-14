import type { ReactElement } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export function Charts({
  gastosPorCategoria,
  ingresosPorCategoria,
  evolucionMensual,
  presupuestoVsGasto
}: {
  gastosPorCategoria: { name: string; value: number }[];
  ingresosPorCategoria: { name: string; value: number }[];
  evolucionMensual: { month: string; ingresos: number; gastos: number; balance: number }[];
  presupuestoVsGasto: { categoria: string; presupuestado: number; gastado: number }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ChartCard title="Gastos por categoría">
        <BarChart data={gastosPorCategoria}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#ef4444" /></BarChart>
      </ChartCard>
      <ChartCard title="Ingresos por categoría">
        <BarChart data={ingresosPorCategoria}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#22c55e" /></BarChart>
      </ChartCard>
      <ChartCard title="Evolución mensual">
        <LineChart data={evolucionMensual}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line dataKey="ingresos" stroke="#16a34a" /><Line dataKey="gastos" stroke="#dc2626" /><Line dataKey="balance" stroke="#1d4ed8" /></LineChart>
      </ChartCard>
      <ChartCard title="Presupuesto vs gasto">
        <BarChart data={presupuestoVsGasto}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="categoria" /><YAxis /><Tooltip /><Legend /><Bar dataKey="presupuestado" fill="#0ea5e9" /><Bar dataKey="gastado" fill="#f97316" /></BarChart>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactElement }) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm h-80">
      <p className="font-medium mb-2">{title}</p>
      <ResponsiveContainer width="100%" height="90%">{children}</ResponsiveContainer>
    </div>
  );
}
