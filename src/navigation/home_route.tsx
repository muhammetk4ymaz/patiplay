import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ShareButton from '../components/shared/ShareButton';
import {Theme} from '../constants/Theme';

import HomeView from '../views/dashboard/home';
import {RootStackParamList} from './routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderRight from '../components/shared/HeaderRight';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const iconPadding: number = 8;

const HomeRoute = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
          headerTitle: '',
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
