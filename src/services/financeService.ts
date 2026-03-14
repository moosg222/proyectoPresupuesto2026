import { supabase } from './supabaseClient';
import type { Budget, Category, Subcategory, Transaction } from '../types/domain';

export const financeService = {
  async getCategories() {
    const { data, error } = await supabase.from('categorias').select('*').order('nombre');
    if (error) throw error;
    return data as Category[];
  },
  async createCategory(payload: Omit<Category, 'id'>) {
    const { data, error } = await supabase.from('categorias').insert(payload).select('*').single();
    if (error) throw error;
    return data as Category;
  },
  async updateCategory(id: string, payload: Partial<Category>) {
    const { data, error } = await supabase.from('categorias').update(payload).eq('id', id).select('*').single();
    if (error) throw error;
    return data as Category;
  },
  async deleteCategory(id: string) {
    const { error } = await supabase.from('categorias').delete().eq('id', id);
    if (error) throw error;
  },

  async getSubcategories() {
    const { data, error } = await supabase.from('subcategorias').select('*').order('nombre');
    if (error) throw error;
    return data as Subcategory[];
  },
  async createSubcategory(payload: Omit<Subcategory, 'id'>) {
    const { data, error } = await supabase.from('subcategorias').insert(payload).select('*').single();
    if (error) throw error;
    return data as Subcategory;
  },
  async updateSubcategory(id: string, payload: Partial<Subcategory>) {
    const { data, error } = await supabase.from('subcategorias').update(payload).eq('id', id).select('*').single();
    if (error) throw error;
    return data as Subcategory;
  },
  async deleteSubcategory(id: string) {
    const { error } = await supabase.from('subcategorias').delete().eq('id', id);
    if (error) throw error;
  },

  async getTransactions() {
    const { data, error } = await supabase.from('transacciones').select('*').order('fecha', { ascending: false });
    if (error) throw error;
    return data as Transaction[];
  },
  async createTransaction(payload: Omit<Transaction, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('transacciones').insert(payload).select('*').single();
    if (error) throw error;
    return data as Transaction;
  },
  async updateTransaction(id: string, payload: Partial<Transaction>) {
    const { data, error } = await supabase.from('transacciones').update(payload).eq('id', id).select('*').single();
    if (error) throw error;
    return data as Transaction;
  },
  async deleteTransaction(id: string) {
    const { error } = await supabase.from('transacciones').delete().eq('id', id);
    if (error) throw error;
  },

  async getBudgets() {
    const { data, error } = await supabase.from('presupuestos').select('*');
    if (error) throw error;
    return data as Budget[];
  },
  async upsertBudget(payload: Omit<Budget, 'id'>) {
    const { data, error } = await supabase
      .from('presupuestos')
      .upsert(payload, { onConflict: 'categoria_id,mes,user_id' })
      .select('*')
      .single();
    if (error) throw error;
    return data as Budget;
  }
};
