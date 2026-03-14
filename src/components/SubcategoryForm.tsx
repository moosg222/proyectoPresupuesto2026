import { useState } from 'react';
import type { Category } from '../types/domain';

export function SubcategoryForm({
  categories,
  onCreate
}: {
  categories: Category[];
  onCreate: (payload: { nombre: string; categoria_id: string }) => Promise<void>;
}) {
  const [nombre, setNombre] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  return (
    <form
      className="bg-white p-4 rounded-xl border shadow-sm flex gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        await onCreate({ nombre, categoria_id: categoriaId });
        setNombre('');
      }}
    >
      <input className="border rounded px-3 py-2 flex-1" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre subcategoría" required />
      <select className="border rounded px-3 py-2" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
        <option value="">Categoría</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>
      <button className="bg-slate-900 text-white rounded px-4">Crear</button>
    </form>
  );
}
