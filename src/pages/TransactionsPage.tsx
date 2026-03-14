import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionTable } from '../components/TransactionTable';
import { useCategories, useCreateTransaction, useDeleteTransaction, useSubcategories, useTransactions } from '../hooks/useFinanceData';
import { financeService } from '../services/financeService';
import type { Transaction } from '../types/domain';

export function TransactionsPage({ userId }: { userId: string }) {
  const { data: categories = [] } = useCategories();
  const { data: subcategories = [] } = useSubcategories();
  const { data: transactions = [] } = useTransactions();
  const createTx = useCreateTransaction();
  const deleteTx = useDeleteTransaction();
  const qc = useQueryClient();

  const editTx = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Transaction> }) => financeService.updateTransaction(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transacciones'] })
  });

  return (
    <div className="space-y-4">
      <TransactionForm categories={categories} subcategories={subcategories} userId={userId} onSubmit={async (payload) => { await createTx.mutateAsync(payload); }} />
      <TransactionTable
        transactions={transactions}
        categories={categories}
        onDelete={(id) => deleteTx.mutate(id)}
        onEdit={(id, payload) => editTx.mutate({ id, payload })}
      />
    </div>
  );
}
