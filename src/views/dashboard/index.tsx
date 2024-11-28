import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {HomeIcon, SearchFilledIcon, SearchIcon} from '../../../assets/icons';
import HeaderLeftTitle from '../../components/shared/ForIos/HeaderLeftTitle';
import {ImageManager} from '../../constants/ImageManager';
import {Theme} from '../../constants/Theme';
import '../../i18n';
import {RootStackParamList, Routes} from '../../navigation/routes';
import {setSearchFilterVisible} from '../../redux/features/search/searchSlice';
import {useAppDispatch} from '../../redux/hooks';
import {
  FilterBotton,
  LanguageButton,
  MessageButton,
  NotificationButton,
} from '../../components/shared/HeaderRight';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import ShareButton from '../../components/shared/ShareButton';

type Props = {};

const RootTabs = createBottomTabNavigator();

const activeColor = Theme.colors.white;

const tabIconSize: number = 28;
const iconPadding: number = 8;

const DashboardView = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
        }}
      />

      <RootTabs.Screen
        name="ProfileRoute"
        component={Routes.PROFILE}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return (
              <Avatar
                borderWidth={1.5}
                borderColor={focused ? activeColor : 'transparent'}
                size={'sm'}
                source={ImageManager.IMAGE_NAMES.MANAVATAR}
              />
            );
          },
        }}
      />
    </RootTabs.Navigator>
  );
};

export default DashboardView;

const styles = StyleSheet.create({});
