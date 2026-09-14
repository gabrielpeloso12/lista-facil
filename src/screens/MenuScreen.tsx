import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
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
import { ShoppingList } from '../types';
import { getLists, createList, deleteList, MAX_LISTS } from '../services/storage';
import { colors } from '../constants/theme';
import { ListCard } from '../components/ListCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export function MenuScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [newListName, setNewListName] = useState('');

  useFocusEffect(
    useCallback(() => {
      getLists().then(setLists);
    }, [])
  );

  const canCreate = newListName.trim().length > 0;

  async function handleCreate() {
    if (!canCreate) return;
    const name = newListName.trim();
    const list = await createList(name);
    setNewListName('');
    setLists(await getLists());
    navigation.navigate('ListDetail', { listId: list.id });
  }

  function handleDelete(list: ShoppingList) {
    Alert.alert(
      'Excluir lista',
      `Tem certeza que deseja excluir "${list.name}"? Essa ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteList(list.id);
            setLists(await getLists());
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.headerIcon}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.title}>Minhas Listas</Text>
          <Text style={styles.subtitle}>
            {lists.length} {lists.length === 1 ? 'lista' : 'listas'}
          </Text>
        </View>
      </View>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.createCard}>
              <Text style={styles.label}>Nome da nova lista</Text>
              <View style={styles.createRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Compra da semana"
                  placeholderTextColor={colors.textFaint}
                  value={newListName}
                  onChangeText={setNewListName}
                  maxLength={60}
                  returnKeyType="done"
                  onSubmitEditing={handleCreate}
                />
                <Pressable
                  style={[styles.createButton, !canCreate && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={!canCreate}
                >
                  <Ionicons
                    name="add"
                    size={18}
                    color={canCreate ? colors.white : colors.buttonDisabledText}
                  />
                  <Text
                    style={[
                      styles.createButtonText,
                      !canCreate && styles.createButtonTextDisabled,
                    ]}
                  >
                    Criar lista
                  </Text>
                </Pressable>
              </View>
            </View>

            {lists.length > 0 && <Text style={styles.sectionTitle}>ÚLTIMAS LISTAS</Text>}
          </>
        }
        renderItem={({ item }) => (
          <ListCard
            list={item}
            onPress={() => navigation.navigate('ListDetail', { listId: item.id })}
            onDelete={() => handleDelete(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhuma lista ainda</Text>
            <Text style={styles.emptySubtitle}>Crie sua primeira lista acima.</Text>
          </View>
        }
        ListFooterComponent={
          lists.length >= MAX_LISTS ? (
            <Text style={styles.footerNote}>
              Você atingiu o limite de {MAX_LISTS} listas salvas. Criar uma nova remove a mais
              antiga.
            </Text>
          ) : null
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerIcon: {
    width: 52,
    height: 52,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  content: {
    padding: 20,
    paddingTop: 12,
  },
  createCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 8,
  },
  createRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: colors.text,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.buttonEnabled,
  },
  createButtonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  createButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  createButtonTextDisabled: {
    color: colors.buttonDisabledText,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 12,
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
  },
  footerNote: {
    fontSize: 12,
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 16,
  },
});
