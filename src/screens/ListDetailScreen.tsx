import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import { Category, ShoppingItem, ShoppingList } from '../types';
import { getListById, updateList } from '../services/storage';
import { formatDateLong } from '../utils/date';
import { generateId } from '../utils/id';
import { CATEGORIES } from '../constants/categories';
import { colors } from '../constants/theme';
import { ProgressBar } from '../components/ProgressBar';
import { CategoryChip } from '../components/CategoryChip';
import { CategoryDropdown } from '../components/CategoryDropdown';
import { ItemRow } from '../components/ItemRow';

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetail'>;

export function ListDetailScreen({ route, navigation }: Props) {
  const { listId } = route.params;
  const insets = useSafeAreaInsets();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState<Category>('Outros');
  const [filter, setFilter] = useState<'Todas' | Category>('Todas');

  useFocusEffect(
    useCallback(() => {
      getListById(listId).then((found) => found && setList(found));
    }, [listId])
  );

  const total = list?.items.length ?? 0;
  const checkedCount = list?.items.filter((item) => item.checked).length ?? 0;
  const percent = total === 0 ? 0 : Math.round((checkedCount / total) * 100);

  const filteredItems = useMemo(() => {
    if (!list) return [];
    if (filter === 'Todas') return list.items;
    return list.items.filter((item) => item.category === filter);
  }, [list, filter]);

  const canAddItem = itemName.trim().length > 0;

  async function persist(updated: ShoppingList) {
    setList(updated);
    await updateList(updated);
  }

  async function handleAddItem() {
    if (!list || !canAddItem) return;
    const newItem: ShoppingItem = {
      id: generateId(),
      name: itemName.trim(),
      quantity: quantity.trim() || '1',
      category,
      checked: false,
      favorite: false,
    };
    await persist({ ...list, items: [...list.items, newItem] });
    setItemName('');
    setQuantity('1');
  }

  async function toggleChecked(itemId: string) {
    if (!list) return;
    await persist({
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    });
  }

  async function toggleFavorite(itemId: string) {
    if (!list) return;
    await persist({
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, favorite: !item.favorite } : item
      ),
    });
  }

  function handleDeleteItem(item: ShoppingItem) {
    Alert.alert('Excluir item', `Tem certeza que deseja excluir "${item.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          if (!list) return;
          await persist({
            ...list,
            items: list.items.filter((current) => current.id !== item.id),
          });
        },
      },
    ]);
  }

  if (!list) return <View style={styles.container} />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable style={styles.backRow} onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={18} color={colors.textMuted} />
          <Text style={styles.backText}>Minhas listas</Text>
        </Pressable>
        <Text style={styles.title}>{list.name}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.meta}>
            {' '}
            {formatDateLong(list.createdAt)} • {total} {total === 1 ? 'item' : 'itens'}
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {total > 0 && (
              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>PROGRESSO DA COMPRA</Text>
                <View style={styles.progressNumbers}>
                  <Text style={styles.progressCount}>
                    {checkedCount} <Text style={styles.progressTotal}>/ {total}</Text>
                  </Text>
                  <Text style={styles.progressPercent}>{percent}%</Text>
                </View>
                <ProgressBar percent={percent} dark style={{ marginTop: 8 }} />
              </View>
            )}

            <View style={styles.formCard}>
              <View style={styles.formFieldItem}>
                <Text style={styles.label}>Item</Text>
                <TextInput
                  style={[styles.input, styles.itemInput]}
                  placeholder="O que você precisa comprar?"
                  placeholderTextColor={colors.textFaint}
                  value={itemName}
                  onChangeText={setItemName}
                  returnKeyType="done"
                  onSubmitEditing={handleAddItem}
                />
              </View>
              <View style={styles.formRow}>
                <View style={styles.formFieldQty}>
                  <Text style={styles.label}>Qtd.</Text>
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                  />
                </View>
                <View style={styles.formFieldCategory}>
                  <Text style={styles.label}>Categoria</Text>
                  <CategoryDropdown value={category} onChange={setCategory} />
                </View>
                <Pressable
                  style={[styles.addButton, !canAddItem && styles.addButtonDisabled]}
                  onPress={handleAddItem}
                  disabled={!canAddItem}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={canAddItem ? colors.white : colors.buttonDisabledText}
                  />
                </Pressable>
              </View>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={['Todas', ...CATEGORIES] as const}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.chipsRow}
              renderItem={({ item }) => (
                <CategoryChip
                  label={item}
                  selected={filter === item}
                  onPress={() => setFilter(item)}
                />
              )}
            />
          </>
        }
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onToggleChecked={() => toggleChecked(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onDelete={() => handleDeleteItem(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              {total === 0 ? 'Nenhum item ainda' : 'Nenhum item nesta categoria'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {total === 0
                ? 'Adicione acima o que você precisa comprar.'
                : 'Escolha outra categoria ou adicione um novo item.'}
            </Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  backText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
  },
  content: {
    padding: 20,
    paddingTop: 16,
  },
  progressCard: {
    backgroundColor: colors.dark,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textFaint,
    letterSpacing: 0.5,
  },
  progressNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  progressCount: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
  },
  progressTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textFaint,
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  formFieldItem: {
    marginBottom: 12,
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  formFieldQty: {
    flex: 1,
    minWidth: 56,
  },
  formFieldCategory: {
    flex: 1.4,
    minWidth: 110,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: colors.text,
  },
  itemInput: {
    height: 52,
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.buttonEnabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  chipsRow: {
    paddingBottom: 16,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
});
