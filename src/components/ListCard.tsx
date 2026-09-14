import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ShoppingList } from '../types';
import { formatDateShort } from '../utils/date';
import { colors } from '../constants/theme';
import { ProgressBar } from './ProgressBar';

interface Props {
  list: ShoppingList;
  onPress: () => void;
  onDelete: () => void;
}

export function ListCard({ list, onPress, onDelete }: Props) {
  const total = list.items.length;
  const checked = list.items.filter((item) => item.checked).length;
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name}>{list.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
            <Text style={styles.meta}>
              {' '}
              {formatDateShort(list.createdAt)} • {total} {total === 1 ? 'item' : 'itens'}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.percent}>{percent}%</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          <Pressable style={styles.deleteButton} onPress={onDelete} hitSlop={8}>
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </Pressable>
        </View>
      </View>
      <ProgressBar percent={percent} style={styles.progress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
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
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  percent: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textMuted,
  },
  deleteButton: {
    marginLeft: 4,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  progress: {
    marginTop: 12,
  },
});
