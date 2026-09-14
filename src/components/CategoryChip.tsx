import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function CategoryChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      style={[styles.chip, selected ? styles.chipSelected : styles.chipUnselected]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  chipUnselected: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.white,
  },
  labelUnselected: {
    color: colors.text,
  },
});
