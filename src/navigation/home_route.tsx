import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../utils/theme';

import HomeView from '../views/dashboard/home';
import {RootStackParamList} from './routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderRight from '../components/shared/HeaderRight';
import HeaderLeftTitle from '../components/shared/ios/HeaderLeftTitle';
import {useAppSelector} from '../redux/hooks';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const iconPadding: number = 8;

const HomeRoute = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: {
          backgroundColor: 'black',
        },
        headerBackTitleVisible: false,
        headerTintColor: Theme.colors.white,
        headerTitleStyle: {
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: Theme.appBarTitleFontSize,
          color: Theme.colors.white,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={{
          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          headerTitle: !isAuthenticated
            ? Platform.select({ios: '', android: 'Home'})
            : '',
          headerLeft: () =>
            !isAuthenticated ? <HeaderLeftTitle title="Home" /> : null,
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeRoute;

const styles = StyleSheet.create({});
