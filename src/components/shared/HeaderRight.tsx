import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ShareButton from './ShareButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../constants/Theme';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setSearchFilterVisible} from '../../redux/features/search/searchSlice';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootState} from '../../redux/store';

type Props = {};

const iconPadding: number = 8;
const HeaderRight = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {isAuthenticated ? <ShareButton /> : <LanguageButton />}
      <View style={{width: isAuthenticated ? 12 : 0}} />
      <MessageButton />
      <NotificationButton />
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});

export const MessageButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Messages');
      }}
      style={{padding: iconPadding}}>
      <IconIonicons
        name="chatbubbles-outline"
        size={Theme.menuIconSize}
        color={'white'}
        style={{
          transform: [{scaleX: -1}],
        }}
      />
    </TouchableOpacity>
  );
};

export const NotificationButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Notifications');
      }}
      style={{padding: iconPadding}}>
      <IconIonicons
        name="notifications-outline"
        size={Theme.menuIconSize}
        color={'white'}
      />
    </TouchableOpacity>
  );
};

export const LanguageButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('LanguageButton');
      }}
      style={{padding: iconPadding}}>
      <IconMaterialIcons
        name="language"
        size={Theme.menuIconSize}
        color={'white'}
      />
    </TouchableOpacity>
  );
};

export const SettingsButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Settings');
      }}
      style={{padding: iconPadding}}>
      <IconIonicons
        name="settings-outline"
        size={Theme.menuIconSize}
        color={'white'}
      />
    </TouchableOpacity>
  );
};

export const FilterBotton = () => {
  const dispatch = useAppDispatch();
  const searchFilterVisible = useAppSelector(
    (state: RootState) => state.search.searchFilterVisible,
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSearchFilterVisible(!searchFilterVisible));
      }}
      style={{padding: iconPadding}}>
      <IconFeather
        name="sliders"
        size={Theme.menuIconSize}
        color={Theme.colors.white}
      />
    </TouchableOpacity>
  );
};
