import type { Category, Transaction } from '../types/domain';
import { formatCurrency } from '../utils/finance';

interface Props {
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit: (id: string, payload: Partial<Transaction>) => void;
}

export function TransactionTable({ transactions, categories, onDelete, onEdit }: Props) {
  const categoryMap = new Map(categories.map((c) => [c.id, c.nombre]));

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2 text-left">Fecha</th><th className="p-2 text-left">Descripción</th><th className="p-2">Tipo</th><th className="p-2">Categoría</th><th className="p-2 text-right">Valor</th><th className="p-2" />
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t">
              <td className="p-2">{tx.fecha}</td>
              <td className="p-2">{tx.descripcion}</td>
              <td className="p-2 text-center">{tx.tipo}</td>
              <td className="p-2 text-center">{categoryMap.get(tx.categoria_id) ?? 'N/A'}</td>
              <td className="p-2 text-right">{formatCurrency(Number(tx.valor))}</td>
              <td className="p-2 text-center space-x-2">
                <button className="text-sky-700" onClick={() => {
                  const descripcion = window.prompt('Editar descripción', tx.descripcion);
                  if (descripcion) onEdit(tx.id, { descripcion });
                }}>Editar</button>
                <button className="text-red-600" onClick={() => onDelete(tx.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
