import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as FlagsCollection from 'react-native-svg-circle-country-flags/src/flags';

type FlagComponentProps = {
  isoCode: string;
  width: number;
  height: number;
};

const FlagComponent = (props: FlagComponentProps) => {
  const Flag =
    FlagsCollection[
      props.isoCode.charAt(0).toUpperCase() +
        props.isoCode.slice(1).toLowerCase()
    ];
  return <Flag width={props.width} height={props.height} />;
};

export default React.memo(FlagComponent);

const styles = StyleSheet.create({});
