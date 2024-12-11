import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';

type Props = {};

const SoldOutLabel = (props: Props) => {
  return (
    <LinearGradient
      colors={['#8b5cf6', '#a855f7']}
      style={{
        position: 'absolute',
        zIndex: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 4,
        left: -6,
        top: 0,
        transform: [{rotate: '-10deg'}],
      }}>
      <CustomText
        text="Sold Out"
        weight="bold"
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.xs,
        }}
      />
    </LinearGradient>
  );
};

export default SoldOutLabel;

const styles = StyleSheet.create({});
