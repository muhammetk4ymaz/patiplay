import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';

type Props = {
  title: string;
};

const ListHeaderText = (props: Props) => {
  return (
    <CustomText text={props.title} style={styles.headerText} weight="medium" />
  );
};

export default ListHeaderText;

const styles = StyleSheet.create({
  headerText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.lg,
  },
});
