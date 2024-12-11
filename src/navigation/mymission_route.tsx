import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Theme} from '../utils/theme';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import MyMissionView from '../views/dashboard/mymission';
import {RootStackParamList} from './routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';

import HeaderRight from '../components/shared/HeaderRight';
import HeaderLeftTitle from '../components/shared/ios/HeaderLeftTitle';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const iconPadding: number = 8;

const MissionRoute = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return (
    <Stack.Navigator
      initialRouteName="MyMission"
      screenOptions={{
        contentStyle: {
          backgroundColor: Theme.colors.background,
        },
        headerTitleStyle: {
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: Theme.appBarTitleFontSize,
          color: Theme.colors.white,
        },
      }}>
      <Stack.Screen
        name="MyMission"
        component={MyMissionView}
        options={{
          headerTitle: Platform.select({
            ios: '',
            android: isAuthenticated ? 'My Mission 🔥 705' : 'Mission',
          }),
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => {
            return (
              <HeaderLeftTitle
                title={isAuthenticated ? 'My Mission 🔥 705' : 'Mission'}
              />
            );
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MissionRoute;

const styles = StyleSheet.create({});
