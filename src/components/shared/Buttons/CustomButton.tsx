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
}: {
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  fontsize?: number;
  child: React.ReactNode;
  backgroundColor?: string;

  onPress: () => void;
}) {
  const styles = StyleSheet.create({
    button: {
      borderColor: Theme.colors.primary,
      borderWidth: 2,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor || Theme.colors.primary,
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {child}
    </TouchableOpacity>
  );
}

export default CustomButton;
