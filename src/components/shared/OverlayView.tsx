import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const OverlayView = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}></View>
  );
};

export default OverlayView;

const styles = StyleSheet.create({});
