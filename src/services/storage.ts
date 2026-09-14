import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList } from '../types';
import { generateId } from '../utils/id';

const STORAGE_KEY = '@lista_facil:lists';
export const MAX_LISTS = 5;

async function readAll(): Promise<ShoppingList[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const lists: ShoppingList[] = JSON.parse(raw);
  return lists.sort((a, b) => b.createdAt - a.createdAt);
}

async function writeAll(lists: ShoppingList[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

export async function getLists(): Promise<ShoppingList[]> {
  return readAll();
}

export async function getListById(id: string): Promise<ShoppingList | undefined> {
  const lists = await readAll();
  return lists.find((list) => list.id === id);
}

export async function createList(name: string): Promise<ShoppingList> {
  const lists = await readAll();
  const newList: ShoppingList = {
    id: generateId(),
    name,
    createdAt: Date.now(),
    items: [],
  };
  const updated = [newList, ...lists].slice(0, MAX_LISTS);
  await writeAll(updated);
  return newList;
}

export async function updateList(list: ShoppingList): Promise<void> {
  const lists = await readAll();
  const updated = lists.map((current) => (current.id === list.id ? list : current));
  await writeAll(updated);
}

export async function deleteList(id: string): Promise<void> {
  const lists = await readAll();
  await writeAll(lists.filter((list) => list.id !== id));
}
