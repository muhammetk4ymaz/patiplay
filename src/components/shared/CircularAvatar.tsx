import {Avatar} from 'native-base';
import React from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';

type Props = {
  imagePath: ImageSourcePropType;
};

const CircularAvatar = (props: Props) => {
  return (
    <Avatar
      source={props.imagePath}
      size={'lg'}
      backgroundColor={'transparent'}
    />
  );
};

export default React.memo(CircularAvatar);

const styles = StyleSheet.create({});
