import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {Theme} from '../../constants/Theme';

type Props = {
  title: string;
};

const SectionTitleText = (props: Props) => {
  return (
    <CustomText
      text={props.title}
      weight="bold"
      style={{
        color: 'white',
        fontSize: Theme.fontSizes.md,
      }}
    />
  );
};

export default SectionTitleText;

const styles = StyleSheet.create({});
