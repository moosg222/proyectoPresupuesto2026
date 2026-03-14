import type { Category, Subcategory } from '../types/domain';

export function SubcategoryList({
  subcategories,
  categories,
  onDelete,
  onEdit
}: {
  subcategories: Subcategory[];
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit: (id: string, nombre: string) => void;
}) {
  const catMap = new Map(categories.map((c) => [c.id, c.nombre]));

  return (
    <ul className="bg-white rounded-xl border divide-y">
      {subcategories.map((s) => (
        <li key={s.id} className="p-3 flex justify-between items-center gap-3">
          <span>{s.nombre} <small className="text-slate-500">({catMap.get(s.categoria_id) ?? 'N/A'})</small></span>
          <div className="space-x-2">
            <button className="text-sky-700" onClick={() => {
              const next = window.prompt('Nuevo nombre de subcategoría', s.nombre);
              if (next) onEdit(s.id, next);
            }}>Editar</button>
            <button className="text-red-600" onClick={() => onDelete(s.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
