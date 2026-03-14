import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { financeService } from '../services/financeService';

export function useCategories() {
  return useQuery({ queryKey: ['categorias'], queryFn: financeService.getCategories });
}

export function useSubcategories() {
  return useQuery({ queryKey: ['subcategorias'], queryFn: financeService.getSubcategories });
}

export function useTransactions() {
  return useQuery({ queryKey: ['transacciones'], queryFn: financeService.getTransactions });
}

export function useBudgets() {
  return useQuery({ queryKey: ['presupuestos'], queryFn: financeService.getBudgets });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: financeService.createTransaction,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transacciones'] })
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: financeService.deleteTransaction,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transacciones'] })
  });
}
