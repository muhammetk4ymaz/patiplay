import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Platform,
  Settings,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import {Theme} from '../utils/theme';

import MyNetworkView from '../views/dashboard/profile/my_network';
import {RootStackParamList, Routes} from './routes';
import ProfileView from '../views/dashboard/profile';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';

import HeaderLeftTitle from '../components/shared/ios/HeaderLeftTitle';
import {
  LanguageButton,
  MessageButton,
  NotificationButton,
  SettingsButton,
} from '../components/shared/HeaderRight';
import ShareButton from '../components/shared/Buttons/ShareButton';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const tabIconSize: number = 28;
const iconPadding: number = 8;

const ProfileRoute = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        contentStyle: {
          backgroundColor: Theme.colors.background,
        },
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: Theme.appBarTitleFontSize,
          color: Theme.colors.white,
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileView}
        options={{
          headerTitle: Platform.select({
            ios: '',
            android: isAuthenticated ? 'My Profile' : 'Profile',
          }),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerLeft: () => {
            return (
              <HeaderLeftTitle
                title={isAuthenticated ? 'My Profile' : 'Profile'}
              />
            );
          },
          headerRight(props) {
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
                {isAuthenticated ? <SettingsButton /> : null}
              </View>
            );
          },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MyFavorites"
        component={Routes.MYFAVORITES}
        options={{
          title: 'This Is Me!',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
          headerRight: () => {
            return (
              <TouchableOpacity style={{padding: 12}}>
                <IconIonicons
                  name={'search'}
                  size={24}
                  color={Theme.colors.white}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="MyWatchlist"
        component={Routes.MYWATCHLIST}
        options={{
          title: 'My Watchlist',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
          headerRight: () => {
            return (
              <TouchableOpacity style={{padding: 12}}>
                <IconIonicons
                  name={'search'}
                  size={24}
                  color={Theme.colors.white}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="FavoriteCompanies"
        component={Routes.FAVORITECOMPANIES}
        options={{
          title: 'Favorite Companies',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
          headerRight: () => {
            return (
              <TouchableOpacity style={{padding: 12}}>
                <IconIonicons
                  name={'search'}
                  size={24}
                  color={Theme.colors.white}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="FavoriteActors"
        component={Routes.FAVORITEACTORS}
        options={{
          title: 'Favorite Actors & Actresses',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
          headerRight: () => {
            return (
              <TouchableOpacity style={{padding: 12}}>
                <IconIonicons
                  name={'search'}
                  size={24}
                  color={Theme.colors.white}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="FavoriteCrew"
        component={Routes.FAVORITECREW}
        options={{
          title: 'Favorite Crew Members',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
          headerRight: () => {
            return (
              <TouchableOpacity style={{padding: 12}}>
                <IconIonicons
                  name={'search'}
                  size={24}
                  color={Theme.colors.white}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="WatchHistory"
        component={Routes.WATCHHISTORY}
        options={{
          title: 'Watch History',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="MyNetwork"
        component={MyNetworkView}
        options={{
          title: 'My Network',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="MyFollowings"
        component={Routes.MYFOLLOWINGS}
        options={{
          title: 'My Followings',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="EditFollowings"
        component={Routes.EDITFOLLOWINGS}
        options={{
          title: 'Edit Followings',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileRoute;

const styles = StyleSheet.create({});
