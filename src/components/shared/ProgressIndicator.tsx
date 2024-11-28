import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  percentage: number;
  progressColor?: ['#080808', '#080808'] | ['#8b5cf6', '#a855f7'];
};

const ProgressIndicator = (props: Props) => {
  return (
    <View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'darkgray',
            opacity: 0.5,
          },
        ]}></View>
      <LinearGradient
        colors={props.progressColor || ['#8b5cf6', '#a855f7']}
        style={{
          height: 4,
          width: `${props.percentage}%`,
        }}></LinearGradient>
    </View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({});
