import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import '../i18n';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AuthenticatedRoutes from './authenticated_route';
import {RootStackParamList, Routes} from './routes';
import UnauthenticatedRoute from './unauthentiated_route';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoute />}
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
