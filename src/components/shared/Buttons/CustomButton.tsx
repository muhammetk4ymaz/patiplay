import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Theme} from '../../../utils/theme';

function CustomButton({
  borderRadius = 100,
  paddingVertical = 12,
  paddingHorizontal = 24,
  backgroundColor = Theme.colors.primary,
  onPress,
  child,
  border = false,
  activeOpacity,
}: {
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  fontsize?: number;
  child: React.ReactNode;
  backgroundColor?: string;
  border?: boolean;
  activeOpacity?: number;
  onPress: () => void;
}) {
  const styles = StyleSheet.create({
    button: {
      borderColor: border ? Theme.colors.primary : 'transparent',
      borderWidth: border ? 2 : 0,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor || Theme.colors.primary,
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={activeOpacity}>
      {child}
    </TouchableOpacity>
  );
}

export default CustomButton;
