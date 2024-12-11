import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Theme} from '../utils/theme';
import '../i18n';
import {RootStackParamList, Routes} from './routes';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const UnauthenticatedRoute = (props: Props) => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'light',
        headerBackTitleVisible: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: Theme.appBarTitleFontSize,
        },
      }}>
      <Stack.Screen
        name="Auth"
        component={Routes.AUTH}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Routes.VERIFICATION}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Routes.DASBOARD}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllReadyHaveAnAccount"
        component={Routes.ALLREADYHAVEANACCOUNT}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="DontHaveAnAccount"
        component={Routes.DONTHAVEANDACCOUNT}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="PreVerification"
        component={Routes.PREVERIFICATION}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="AlmostHere"
        component={Routes.ALMOSTHERE}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="CreateProfile"
        component={Routes.CREATEPROFILE}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="Packages"
        component={Routes.PACKAGES}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Routes.PAYMENT}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={Routes.NOTIFICATIONS}
        options={{
          animation: 'fade',
          headerTitle: t('notifications:title'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Routes.MESSAGES}
        options={{
          animation: 'fade',
          headerTitle: t('profile:messages.title'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedRoute;

const styles = StyleSheet.create({});
