import { useState } from 'react';
import type { TransactionType } from '../types/domain';

export function CategoryForm({
  userId,
  onCreate
}: {
  userId: string;
  onCreate: (payload: { nombre: string; tipo: TransactionType; user_id: string }) => Promise<void>;
}) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState<TransactionType>('gasto');

  return (
    <form
      className="bg-white p-4 rounded-xl border shadow-sm flex gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        await onCreate({ nombre, tipo, user_id: userId });
        setNombre('');
      }}
    >
      <input className="border rounded px-3 py-2 flex-1" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre categoría" required />
      <select className="border rounded px-3 py-2" value={tipo} onChange={(e) => setTipo(e.target.value as TransactionType)}>
        <option value="gasto">Gasto</option>
        <option value="ingreso">Ingreso</option>
      </select>
      <button className="bg-slate-900 text-white rounded px-4">Crear</button>
    </form>
  );
}
