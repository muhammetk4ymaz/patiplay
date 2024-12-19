import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/routes';

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
    </View>
  );
};

export default ContentWithIconCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    paddingBottom: 30,
    paddingTop: 70,
  },
  icon: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export const TermAndPrivacyText = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={{bottom: insets.bottom}}>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 12,
          // backgroundColor: 'red',
        }}
        onPress={() => {
          console.log('Learn More');
        }}>
        <CustomText
          text="Terms | Privacy "
          style={{
            color: 'white',
            opacity: 0.7,
            fontSize: Theme.fontSizes.xs,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
