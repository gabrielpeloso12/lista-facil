import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ShoppingItem } from '../types';
import { CATEGORY_COLORS } from '../constants/categories';
import { colors } from '../constants/theme';

interface Props {
  item: ShoppingItem;
  onToggleChecked: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export function ItemRow({ item, onToggleChecked, onToggleFavorite, onDelete }: Props) {
  const categoryColor = CATEGORY_COLORS[item.category];

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.checkbox, item.checked && styles.checkboxChecked]}
        onPress={onToggleChecked}
        hitSlop={8}
      >
        {item.checked && <Ionicons name="checkmark" size={16} color={colors.white} />}
      </Pressable>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.name, item.checked && styles.nameChecked]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View style={[styles.tag, { backgroundColor: categoryColor.bg }]}>
            <Text style={[styles.tagText, { color: categoryColor.text }]}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>

      <Pressable onPress={onToggleFavorite} hitSlop={8}>
        <Ionicons
          name={item.favorite ? 'star' : 'star-outline'}
          size={20}
          color={item.favorite ? colors.star : colors.textFaint}
        />
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={onDelete} hitSlop={8}>
        <Ionicons name="trash-outline" size={18} color={colors.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.buttonEnabled,
    borderColor: colors.buttonEnabled,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  nameChecked: {
    textDecorationLine: 'line-through',
    color: colors.textFaint,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  quantity: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  deleteButton: {
    marginLeft: 4,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
});
