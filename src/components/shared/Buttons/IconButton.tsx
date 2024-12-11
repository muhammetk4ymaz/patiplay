import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../utils/theme';

type Props = {
  onPress: () => void;
  icon: React.JSX.Element;
  style?: any;
  positionGetter?: (x: number, y: number) => void;
};

const IconButton = (props: Props) => {
  const buttonRef = React.useRef<View>(null);

  const handlePress = () => {
    // Butonun konumunu almak için measure metodunu kullanıyoruz
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log('x: ', x, 'y: ', y, 'width: ', width, 'height: ', height);
        console.log('pageX: ', pageX, 'pageY: ', pageY);
        if (props.positionGetter) {
          // Ekrandaki tam konum
          props.positionGetter(pageX, pageY);
        }
        // Ekrandaki tam konum
      });
    }
    props.onPress();
  };

  return (
    <TouchableOpacity
      ref={buttonRef}
      onLayout={event => {
        const {x, y, width, height} = event.nativeEvent.layout;
        // console.log('y: ', y);
      }}
      onPress={handlePress}
      style={[styles.button, props.style]}>
      {props.icon}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderColor: Theme.colors.gray,
    borderRadius: 36,
    padding: Theme.paddings.interactionButtonPadding,
  },
});
