import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from '../../constants/Theme';

type Props = {};

const ShareButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Share button pressed');
      }}>
      <LinearGradient
        colors={['#8b5cf6', '#a855f7']} // from violet-500 to purple-500
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 36,
        }}>
        <CustomText
          text="Invite"
          style={{color: 'white', fontSize: Theme.fontSizes.sm}}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ShareButton;

const styles = StyleSheet.create({});
