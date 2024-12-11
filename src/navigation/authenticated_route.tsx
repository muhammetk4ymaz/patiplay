import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WebSocketProvider} from '../context/WebSocketContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Theme} from '../utils/theme';
import {RootStackParamList, Routes} from './routes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import '../i18n';
import {useTranslation} from 'react-i18next';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import CustomText from '../components/shared/CustomText';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import HeaderBackWithTitle from '../components/shared/ios/HeaderBackWithTitle';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticatedRoute = (props: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {t} = useTranslation();
  return (
    <WebSocketProvider currentUser={user}>
      <Stack.Navigator
        initialRouteName="Dashboard"
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
          name="Dashboard"
          component={Routes.DASBOARD}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={Routes.MOVIEDETAIL}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Details',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: 'white',

            headerStyle: {
              backgroundColor: 'black',
            },
            // headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Movie"
          component={Routes.MOVIE}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            orientation: 'landscape',
          }}
        />
        <Stack.Screen
          name="SubtitlesVoiceoverSettings"
          component={Routes.SUBTITLESVOICEOVERSETTINGS}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            orientation: 'landscape',
          }}
        />
        <Stack.Screen
          name="Countries"
          component={Routes.COUNTRIES}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="ReleaseDates"
          component={Routes.RELEASEDATES}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Genres"
          component={Routes.GENRES}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="LanguagesAudio"
          component={Routes.LANGUAGESAUDIO}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="LanguagesSubtitles"
          component={Routes.LANGUAGESSUBTITLES}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="CompaniesDetail"
          component={Routes.COMPANIESDETAIL}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="CastDetail"
          component={Routes.CASTDETAIL}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="CrewDetail"
          component={Routes.CREWDETAIL}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="CinephilesDetail"
          component={Routes.CINEPHILESDETAIL}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Discussion"
          component={Routes.DISCUSSION}
          options={{
            animation: 'slide_from_bottom',
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
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
          name="MyListEdit"
          component={Routes.MYLISTEDIT}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Edit List',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerRight(props) {
              const [liked, setLiked] = React.useState(false);
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 3,
                  }}>
                  <TouchableOpacity onPress={() => {}} style={{padding: 8}}>
                    <IconIonicons name={'checkmark'} color="white" size={24} />
                  </TouchableOpacity>
                </View>
              );
            },

            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ListDetail"
          component={Routes.LISTDETAIL}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Details',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerLeft(props) {
              return <HeaderBackWithTitle title="Details" />;
            },
            headerRight(props) {
              const [liked, setLiked] = React.useState(false);
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setLiked(!liked);
                      }}
                      style={{padding: 8}}>
                      <IconAntDesign
                        name={liked ? 'like1' : 'like2'}
                        color={'white'}
                        size={24}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                      <CustomText
                        text="113"
                        style={{
                          color: 'white',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => {}} style={{padding: 8}}>
                    <IconIonicons
                      name={'share-social'}
                      color="white"
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              );
            },
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Notifications"
          component={Routes.NOTIFICATIONS}
          options={{
            animation: 'fade',
            headerTitle: t('notifications:title'),
            headerStyle: {
              backgroundColor: 'black',
            },
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
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="Chat"
          component={Routes.CHAT}
          options={{
            animation: 'slide_from_right',
            // headerTitle: '',
            // headerStyle: {
            //   backgroundColor: 'black',
            // },
            // headerTitleAlign: 'center',
            // headerTintColor: 'white',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NewChat"
          component={Routes.NEWCHAT}
          options={{
            animation: 'slide_from_bottom',
            headerTitle: 'New Chat',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="NewGroup"
          component={Routes.NEWGROUP}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Add Member',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="Settings"
          component={Routes.SETTINGS}
          options={{
            headerTitle: t('profile:settings:title'),
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="AccountProfile"
          component={Routes.ACCOUNTPROFILE}
          options={{
            headerTitle: t('profile:settings:accountProfile.title'),
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="Language"
          component={Routes.LANGUAGE}
          options={{
            headerTitle: t('profile:settings:language.title'),
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </WebSocketProvider>
  );
};

export default AuthenticatedRoute;

const styles = StyleSheet.create({});
