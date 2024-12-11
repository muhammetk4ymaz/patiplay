import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import CustomTextButton from '../Buttons/CustomTextButton';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  button: React.ReactNode;
};

const ContentWithIconCard = (props: Props) => {
  const [buttonHeight, setButtonHeight] = React.useState(0);
  return (
    <View style={styles.card}>
      <View style={styles.icon}>{props.icon}</View>
      {props.children}
      <View
        style={[styles.button, {bottom: -(buttonHeight / 2)}]}
        onLayout={event => {
          setButtonHeight(event.nativeEvent.layout.height);
        }}>
        {props.button}
      </View>
      {/* <View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 12,
            bottom: -20,
          }}
          onPress={() => {
            console.log('Learn More');
          }}>
          <CustomText
            text="Terms | Privacy "
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.xs,
            }}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ContentWithIconCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    borderRadius: 72,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    paddingBottom: 30,
    paddingTop: 90,
  },
  icon: {
    position: 'absolute',
    top: -52,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
