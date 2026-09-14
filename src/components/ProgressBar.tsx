import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../constants/theme';

interface Props {
  percent: number;
  dark?: boolean;
  style?: ViewStyle;
}

export function ProgressBar({ percent, dark, style }: Props) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View
      style={[
        styles.track,
        { backgroundColor: dark ? colors.progressTrackDark : colors.progressTrack },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%`,
            backgroundColor: dark ? colors.white : colors.buttonEnabled,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
