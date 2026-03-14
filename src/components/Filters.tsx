import type { Category, FilterState } from '../types/domain';

interface Props {
  categories: Category[];
  filter: FilterState;
  onChange: (next: FilterState) => void;
}

export function Filters({ categories, filter, onChange }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <input
        type="month"
        className="border rounded px-3 py-2"
        value={filter.mes}
        onChange={(e) => onChange({ ...filter, mes: e.target.value })}
      />
      <select
        className="border rounded px-3 py-2"
        value={filter.categoriaId}
        onChange={(e) => onChange({ ...filter, categoriaId: e.target.value })}
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>
      <select
        className="border rounded px-3 py-2"
        value={filter.tipo}
        onChange={(e) => onChange({ ...filter, tipo: e.target.value as FilterState['tipo'] })}
      >
        <option value="todos">Todos</option>
        <option value="ingreso">Ingresos</option>
        <option value="gasto">Gastos</option>
      </select>
    </div>
  );
}
