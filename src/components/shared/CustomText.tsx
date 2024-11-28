import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type CustomTextProps = {
  text: string;
  weight?: 'bold' | 'medium' | 'light';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';

  style?: StyleProp<TextStyle>;
};

const CustomText = ({
  text,
  style,
  weight,
  numberOfLines,
  ellipsizeMode,
}: CustomTextProps) => {
  let fontFamily: string = 'HelveticaNeue-Medium';
  switch (weight) {
    case 'bold':
      fontFamily = 'HelveticaNeue-Bold';
      break;
    case 'medium':
      fontFamily = 'HelveticaNeue-Medium';
      break;
    case 'light':
      fontFamily = 'HelveticaNeue-Light';
      break;
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[{fontFamily: fontFamily}, style]}>
      {text}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
