import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Theme} from '../../constants/Theme';

function CustomButton({
  borderRadius = 100,
  paddingVertical = 14,
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
