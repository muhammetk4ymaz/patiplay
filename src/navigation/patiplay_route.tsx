import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/shared/CustomText';
import HeaderRight from '../components/shared/HeaderRight';
import HeaderBackWithTitle from '../components/shared/ios/HeaderBackWithTitle';
import HeaderLeftTitle from '../components/shared/ios/HeaderLeftTitle';
import {Theme} from '../utils/theme';
import PatiplayView from '../views/dashboard/patiplay';
import {RootStackParamList, Routes} from './routes';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const iconPadding: number = 8;

const PatiPlayRoute = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack.Navigator
      initialRouteName="PatiPlay"
      screenOptions={{
        headerBackVisible: Platform.select({ios: false, android: true}),
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        contentStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: Theme.colors.white,
        headerTitleStyle: {
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: Theme.appBarTitleFontSize,
          color: Theme.colors.white,
        },
      }}>
      <Stack.Screen
        name="PatiPlay"
        component={PatiplayView}
        options={{
          headerTitle: headerTitle('Menu'),
          headerStyle: {
            backgroundColor: 'black',
          },

          headerLeft(props) {
            return <HeaderLeftTitle title="Menu" />;
          },

          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Premiere"
        component={Routes.PREMIERE}
        options={{
          animation: 'slide_from_left',
          headerTitle: headerTitle('Premiere'),

          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Premiere" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="InTheaters"
        component={Routes.INTHEATERS}
        options={{
          animation: 'slide_from_right',
          headerTitle: headerTitle('In Theaters'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="In Theaters" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="OnTv"
        component={Routes.ONTV}
        options={{
          animation: 'slide_from_left',
          headerTitle: headerTitle('On TV'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="On TV" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Shorts"
        component={Routes.SHORTS}
        options={{
          animation: 'slide_from_right',
          headerTitle: headerTitle('Shorts'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Shorts" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Clips"
        component={Routes.CLIPS}
        options={{
          animation: 'slide_from_left',
          headerTitle: headerTitle('Clips'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Clips" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Lists"
        component={Routes.LISTS}
        options={{
          animation: 'slide_from_right',
          headerTitle: headerTitle('Lists'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Lists" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="MyLists"
        component={Routes.MYLIST}
        options={{
          animation: 'slide_from_right',
          headerTitle: 'My Lists',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MyListDetail"
        component={Routes.MYLISTDETAIL}
        options={{
          animation: 'slide_from_right',
          headerTitle: 'Details',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerRight(props) {
            const [liked, setLiked] = React.useState(false);
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 11,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setLiked(!liked);
                    }}
                    style={{padding: iconPadding}}>
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
                <TouchableOpacity
                  onPress={() => {}}
                  style={{padding: iconPadding}}>
                  <IconIonicons name={'share-social'} color="white" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{padding: iconPadding}}>
                  <IconIonicons
                    name={'ellipsis-vertical'}
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
        name="Campaigns"
        component={Routes.CAMPAIGNS}
        options={{
          animation: 'slide_from_left',
          headerTitle: headerTitle('Campaigns'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Campaigns" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Charts"
        component={Routes.CHARTS}
        options={{
          animation: 'slide_from_left',
          headerTitleAlign: 'left',
          headerTitle: headerTitle('Charts'),

          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerTransparent: true,
          headerLeft(props) {
            return <HeaderBackWithTitle title="Charts" />;
          },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Communities"
        component={Routes.COMMUNITIES}
        options={{
          animation: 'slide_from_left',
          headerTitleAlign: 'left',
          headerTitle: headerTitle('Communities'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerTransparent: true,
          headerLeft(props) {
            return <HeaderBackWithTitle title="Communities" />;
          },
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Calendar"
        component={Routes.CALENDAR}
        options={{
          animation: 'slide_from_right',
          headerTitle: headerTitle('Calendar'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Calendar" />;
          },
          headerRight(props) {
            return <HeaderRight />;
          },
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Movements"
        component={Routes.MOVEMENTS}
        options={{
          animation: 'slide_from_left',
          headerTitle: headerTitle('Movements'),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft(props) {
            return <HeaderBackWithTitle title="Movements" />;
          },
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

export default PatiPlayRoute;

const styles = StyleSheet.create({});

function headerTitle(title: string) {
  return Platform.select({ios: '', android: title});
}
