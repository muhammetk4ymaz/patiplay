import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../constants/Theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuItemComponent, {MenuItem} from '../components/MenuItem';

import {useTranslation} from 'react-i18next';
import IconEntypo from 'react-native-vector-icons/Entypo';
import '../../../../i18n';
import {RootStackParamList} from '../../../../navigation/routes';

const SettingsView = () => {
  console.log(SettingsView.name + ' rendered');
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const menuItems: MenuItem[] = [
    {
      icon: (
        <IconIonicons
          name="person-circle"
          size={Theme.menuIconSize}
          color={Theme.colors.white}
        />
      ),
      title: t('profile:settings:menu.accountProfile'),
      onPress: () => {
        navigation.navigate('AccountProfile');
      },
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.profileTransfer'),
      icon: (
        <IconMaterialIcons
          name="transfer-within-a-station"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.preferences'),
      icon: (
        <IconMaterialIcons
          name="settings"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.language'),
      icon: (
        <IconMaterialIcons
          name="language"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {
        navigation.navigate('Language');
      },
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.subtitleSettings'),
      icon: (
        <IconMaterialIcons
          name="subtitles"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.notificationSettings'),
      icon: (
        <IconMaterialIcons
          name="notifications"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.parentalControls'),
      icon: (
        <IconMaterialIcons
          name="child-care"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.security'),
      icon: (
        <IconMaterialIcons
          name="security"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.subscription'),
      icon: (
        <IconMaterialIcons
          name="subscriptions"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      title: t('profile:settings:menu.paymentMethod'),
      icon: (
        <IconMaterialIcons
          name="payment"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },

    {
      title: t('profile:settings:menu.paymentHistory'),
      icon: (
        <IconMaterialIcons
          name="payments"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      icon: (
        <IconEntypo name="log-out" size={Theme.menuIconSize} color={'white'} />
      ),
      title: t('profile:menu.logout'),
      onPress: () => {},
    },
  ];
  return (
    <View style={styles.view}>
      <FlatList
        data={menuItems}
        renderItem={menuItem => {
          return <MenuItemComponent menuItem={menuItem.item} />;
        }}
      />
    </View>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
});
