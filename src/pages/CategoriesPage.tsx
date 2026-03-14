import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryForm } from '../components/CategoryForm';
import { CategoryList } from '../components/CategoryList';
import { SubcategoryForm } from '../components/SubcategoryForm';
import { SubcategoryList } from '../components/SubcategoryList';
import { useCategories, useSubcategories } from '../hooks/useFinanceData';
import { financeService } from '../services/financeService';

export function CategoriesPage({ userId }: { userId: string }) {
  const { data: categories = [] } = useCategories();
  const { data: subcategories = [] } = useSubcategories();
  const qc = useQueryClient();

  const createCategory = useMutation({ mutationFn: financeService.createCategory, onSuccess: () => qc.invalidateQueries({ queryKey: ['categorias'] }) });
  const updateCategory = useMutation({ mutationFn: ({ id, nombre }: { id: string; nombre: string }) => financeService.updateCategory(id, { nombre }), onSuccess: () => qc.invalidateQueries({ queryKey: ['categorias'] }) });
  const deleteCategory = useMutation({ mutationFn: financeService.deleteCategory, onSuccess: () => qc.invalidateQueries({ queryKey: ['categorias'] }) });

  const createSubcategory = useMutation({ mutationFn: financeService.createSubcategory, onSuccess: () => qc.invalidateQueries({ queryKey: ['subcategorias'] }) });
  const updateSubcategory = useMutation({ mutationFn: ({ id, nombre }: { id: string; nombre: string }) => financeService.updateSubcategory(id, { nombre }), onSuccess: () => qc.invalidateQueries({ queryKey: ['subcategorias'] }) });
  const deleteSubcategory = useMutation({ mutationFn: financeService.deleteSubcategory, onSuccess: () => qc.invalidateQueries({ queryKey: ['subcategorias'] }) });

  return (
    <div className="space-y-4">
      <CategoryForm userId={userId} onCreate={async (payload) => { await createCategory.mutateAsync(payload); }} />
      <CategoryList categories={categories} onDelete={(id) => deleteCategory.mutate(id)} onEdit={(id, nombre) => updateCategory.mutate({ id, nombre })} />

      <SubcategoryForm categories={categories} onCreate={async (payload) => { await createSubcategory.mutateAsync(payload); }} />
      <SubcategoryList
        subcategories={subcategories}
        categories={categories}
        onDelete={(id) => deleteSubcategory.mutate(id)}
        onEdit={(id, nombre) => updateSubcategory.mutate({ id, nombre })}
      />
    </div>
  );
}
