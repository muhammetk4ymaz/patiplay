import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../../navigation/routes';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

const SignUpWebView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{flex: 1, paddingVertical: 12}}>
      <WebView
        source={{uri: 'https://reactnative.dev/'}}
        style={{flex: 1, backgroundColor: 'black'}}
        onNavigationStateChange={navState => {
          if (
            navState.url === 'https://reactnative.dev/docs/environment-setup'
          ) {
            navigation.navigate('WelcomePati');
          }
        }}
      />
    </View>
  );
};

export default SignUpWebView;

const styles = StyleSheet.create({});
