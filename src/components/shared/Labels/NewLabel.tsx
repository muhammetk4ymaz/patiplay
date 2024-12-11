import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';

type Props = {};

const NewLabel = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      <LinearGradient
        colors={['#8b5cf6', '#a855f7']}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderBottomRightRadius: 12,
        }}>
        <CustomText
          text={'New'}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.xs,
          }}
        />
      </LinearGradient>
    </View>
  );
};

export default NewLabel;

const styles = StyleSheet.create({});
