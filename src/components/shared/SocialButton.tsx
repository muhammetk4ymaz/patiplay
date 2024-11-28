import {ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

type Props = {
  icon: string | React.ReactNode;
  onpress: () => void;
};

const SocialButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onpress}>
      {typeof props.icon === 'string' ? (
        <IconMaterialCommunityIcons
          name={props.icon as string}
          size={36}
          color="black"
        />
      ) : (
        props.icon
      )}
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({});
