import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../utils/theme';

type Props = {};

const LoadingWidget = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={Theme.colors.primary} />
    </View>
  );
};

export default LoadingWidget;

const styles = StyleSheet.create({});
