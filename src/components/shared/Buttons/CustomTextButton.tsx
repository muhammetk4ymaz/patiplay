import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {Theme} from '../../../utils/theme';
import CustomButton from './CustomButton';
import CustomText from '../CustomText';

type Props = {
  onPress: () => void;
  text: string;
  textColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  backgroundColor?: string;
  fontWeight?: 'light' | 'medium' | 'bold';
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  border?: boolean;
};

const CustomTextButton = (props: Props) => {
  return (
    <CustomButton
      borderRadius={props.borderRadius}
      paddingVertical={props.paddingVertical}
      paddingHorizontal={props.paddingHorizontal}
      backgroundColor={props.backgroundColor}
      activeOpacity={props.activeOpacity}
      border={props.border}
      child={
        <CustomText
          text={props.text}
          weight={props.fontWeight || 'medium'}
          style={[
            {
              color: props.textColor || Theme.colors.white,
              fontSize: Theme.fontSizes.md,
              textAlign: 'center',
            },
            props.textStyle,
          ]}
        />
      }
      onPress={props.onPress}
    />
  );
};

export default CustomTextButton;

const styles = StyleSheet.create({});
