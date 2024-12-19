import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../utils/theme';
import '../i18n';
import {RootStackParamList, Routes} from './routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ImageManager} from '../constants/ImageManager';

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
        name="SignUpWebView"
        component={Routes.SIGNUPWEBVİEW}
        options={{
          animation: 'slide_from_bottom',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={ImageManager.IMAGE_NAMES.PATIHORIZONTALLOGO}
              resizeMode="contain"
              style={{height: 50, width: 75}}
            />
          ),

          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: 'black',
          },

          headerRight(props) {
            const navigation =
              useNavigation<NavigationProp<RootStackParamList>>();
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{padding: 8}}>
                  <IconMaterialCommunityIcons
                    name="close"
                    size={24}
                    color={Theme.colors.white}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Routes.VERIFICATION}
        options={{
          animation: 'fade',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={Routes.FORGOTPASSWORD}
        options={{
          animation: 'fade',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={Routes.NEWPASSWORD}
        options={{
          animation: 'fade',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordChangeSucces"
        component={Routes.PASSWORDCHANGESUCCES}
        options={{
          animation: 'fade',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Reply"
        component={Routes.REPLY}
        options={{
          animation: 'none',
          presentation: 'transparentModal',

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
        name="WelcomePati"
        component={Routes.WELCOMEPATI}
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
          // headerTitle: t('notifications:title'),
          headerTitle: 'Notifications',
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
          // headerTitle: t('profile:messages.title'),
          headerTitle: 'Messages',
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
