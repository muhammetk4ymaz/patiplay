import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../../constants/Theme';
import CustomText from '../CustomText';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/routes';

type Props = {
  title: string;
};

const HeaderBackWithTitle = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  if (Platform.OS === 'ios') {
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 8}}>
          <IconIonicons
            name="chevron-back"
            size={Theme.menuIconSize}
            color={'white'}
          />
        </TouchableOpacity>
        <CustomText
          text={props.title}
          style={{
            fontFamily: 'HelveticaNeue-Medium',
            fontSize: Theme.appBarTitleFontSize,
            color: Theme.colors.white,
          }}
        />
      </View>
    );
  }
};

export default HeaderBackWithTitle;

const styles = StyleSheet.create({});
