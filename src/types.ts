export type Category =
  | 'Hortifruti'
  | 'Padaria'
  | 'Laticínios'
  | 'Carnes'
  | 'Mantimentos'
  | 'Bebidas'
  | 'Limpeza'
  | 'Higiene'
  | 'Outros';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: Category;
  checked: boolean;
  favorite: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: number;
  items: ShoppingItem[];
}
