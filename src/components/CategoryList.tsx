import type { Category } from '../types/domain';

export function CategoryList({
  categories,
  onDelete,
  onEdit
}: {
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit: (id: string, nombre: string) => void;
}) {
  return (
    <ul className="bg-white rounded-xl border divide-y">
      {categories.map((cat) => (
        <li key={cat.id} className="p-3 flex justify-between items-center gap-3">
          <span>
            {cat.nombre} <small className="text-slate-500">({cat.tipo})</small>
          </span>
          <div className="space-x-2">
            <button className="text-sky-700" onClick={() => {
              const next = window.prompt('Nuevo nombre de categoría', cat.nombre);
              if (next) onEdit(cat.id, next);
            }}>Editar</button>
            <button className="text-red-600" onClick={() => onDelete(cat.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
