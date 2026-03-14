import { useState } from 'react';
import type { Category, Subcategory, TransactionType } from '../types/domain';

interface Props {
  categories: Category[];
  subcategories: Subcategory[];
  userId: string;
  onSubmit: (payload: {
    descripcion: string;
    valor: number;
    tipo: TransactionType;
    categoria_id: string;
    subcategoria_id: string | null;
    fecha: string;
    user_id: string;
  }) => Promise<void>;
}

export function TransactionForm({ categories, subcategories, userId, onSubmit }: Props) {
  const [form, setForm] = useState({
    descripcion: '',
    valor: 0,
    tipo: 'gasto' as TransactionType,
    categoria_id: '',
    subcategoria_id: '',
    fecha: new Date().toISOString().slice(0, 10)
  });

  const filteredCategories = categories.filter((c) => c.tipo === form.tipo);
  const filteredSubcategories = subcategories.filter((s) => s.categoria_id === form.categoria_id);

  return (
    <form
      className="bg-white p-4 rounded-xl border shadow-sm grid gap-3 md:grid-cols-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({ ...form, subcategoria_id: form.subcategoria_id || null, user_id: userId });
        setForm({ ...form, descripcion: '', valor: 0 });
      }}
    >
      <input className="border rounded px-3 py-2" placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} required />
      <input className="border rounded px-3 py-2" type="number" min={0} placeholder="Valor" value={form.valor} onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })} required />
      <input className="border rounded px-3 py-2" type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} required />
      <select className="border rounded px-3 py-2" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TransactionType, categoria_id: '', subcategoria_id: '' })}>
        <option value="gasto">Gasto</option>
        <option value="ingreso">Ingreso</option>
      </select>
      <select className="border rounded px-3 py-2" value={form.categoria_id} onChange={(e) => setForm({ ...form, categoria_id: e.target.value, subcategoria_id: '' })} required>
        <option value="">Selecciona categoría</option>
        {filteredCategories.map((c) => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>
      <select className="border rounded px-3 py-2" value={form.subcategoria_id} onChange={(e) => setForm({ ...form, subcategoria_id: e.target.value })}>
        <option value="">Sin subcategoría</option>
        {filteredSubcategories.map((s) => (
          <option key={s.id} value={s.id}>{s.nombre}</option>
        ))}
      </select>
      <button className="md:col-span-3 bg-slate-900 text-white rounded py-2">Guardar transacción</button>
    </form>
  );
}
