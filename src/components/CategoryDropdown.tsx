import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../types';
import { CATEGORIES } from '../constants/categories';
import { colors } from '../constants/theme';

interface Props {
  value: Category;
  onChange: (category: Category) => void;
}

export function CategoryDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, item === value && styles.optionTextSelected]}>
                    {item}
                  </Text>
                  {item === value && (
                    <Ionicons name="checkmark" size={18} color={colors.buttonEnabled} />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    flexShrink: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    padding: 32,
  },
  sheet: {
    backgroundColor: colors.card,
    borderRadius: 16,
    maxHeight: 360,
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
  },
  optionTextSelected: {
    fontWeight: '700',
    color: colors.buttonEnabled,
  },
});
