import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../constants/Theme';

type Props = {
  onPress: () => void;
  icon: React.JSX.Element;
  style?: any;
};

const IconButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.style]}>
      {props.icon}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderColor: Theme.colors.gray,
    borderRadius: 36,
    padding: 10,
  },
});
