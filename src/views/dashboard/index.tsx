import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Platform, StyleSheet, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {
  HomeIcon,
  SearchFilledIcon,
  SearchIcon,
  TrophyIcon,
} from '../../../assets/icons';
import ShareButton from '../../components/shared/Buttons/ShareButton';
import {
  FilterBotton,
  LanguageButton,
  MessageButton,
  NotificationButton,
} from '../../components/shared/HeaderRight';
import HeaderLeftTitle from '../../components/shared/ios/HeaderLeftTitle';
import {ImageManager} from '../../constants/ImageManager';
import '../../i18n';
import {Routes} from '../../navigation/routes';
import {RootState} from '../../redux/store';
import {Theme} from '../../utils/theme';

type Props = {};

const RootTabs = createBottomTabNavigator();

const activeColor = Theme.colors.white;

const tabIconSize: number = 28;
const iconPadding: number = 8;

const DashboardView = (props: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const {t} = useTranslation();
  return (
    <RootTabs.Navigator
      initialRouteName="HomeRoute"
      sceneContainerStyle={{backgroundColor: 'black'}}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
        },
      }}>
      <RootTabs.Screen
        name="HomeRoute"
        component={Routes.HOME}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <HomeIcon size={tabIconSize} fill={activeColor} />
            ) : (
              <HomeIcon size={tabIconSize} />
            );
          },
        }}
      />
      <RootTabs.Screen
        name="Search"
        component={Routes.SEARCH}
        options={{
          headerTitle: Platform.select({ios: '', android: 'Search'}),
          headerTitleStyle: {
            fontFamily: 'HelveticaNeue-Medium',
            fontSize: Theme.appBarTitleFontSize,
            color: Theme.colors.white,
          },
          tabBarLabel: 'Search',
          tabBarHideOnKeyboard: true,
          headerShown: true,

          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  paddingHorizontal: Theme.paddings.viewHorizontalPadding,
                }}>
                <HeaderLeftTitle title={'Search'} />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: Theme.paddings.viewHorizontalPadding,
                }}>
                {isAuthenticated ? <ShareButton /> : <LanguageButton />}
                <View style={{width: isAuthenticated ? 12 : 0}} />
                <NotificationButton />
                <MessageButton />
                {isAuthenticated ? <FilterBotton /> : null}
              </View>
            );
          },
          tabBarIcon: ({focused}) => {
            return focused ? (
              <SearchFilledIcon
                size={tabIconSize}
                fill={focused && activeColor}
              />
            ) : (
              <SearchIcon size={tabIconSize} />
            );
          },
        }}
      />

      <RootTabs.Screen
        name="PatiplayRoute"
        component={Routes.PATIPLAY}
        options={{
          tabBarLabel: 'Patiplay',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
                style={{height: 32, width: 32}}
              />
            );
          },
        }}
      />
      <RootTabs.Screen
        name="Mission"
        component={Routes.MISSION}
        options={{
          tabBarLabel: 'Mission',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <TrophyIcon size={tabIconSize} fill={activeColor} />
            ) : (
              <TrophyIcon size={tabIconSize} />
            );
          },
        }}
      />

      <RootTabs.Screen
        name="ProfileRoute"
        component={Routes.PROFILE}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <IconIonicons
                name="person-circle"
                size={tabIconSize + 2}
                color={activeColor}
              />
            ) : (
              <IconIonicons
                name="person-circle-outline"
                size={tabIconSize + 2}
                color={Theme.colors.white}
              />
            );

            // return (
            //   <Avatar
            //     borderWidth={1.5}
            //     borderColor={focused ? activeColor : 'transparent'}
            //     size={'sm'}
            //     source={ImageManager.IMAGE_NAMES.MANAVATAR}
            //   />
            // );
          },
        }}
      />
    </RootTabs.Navigator>
  );
};

export default DashboardView;

const styles = StyleSheet.create({});
