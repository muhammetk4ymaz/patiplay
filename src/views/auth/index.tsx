import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../constants/Theme';
import {AuthIcon} from '../../../assets/icons';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

type Props = {};

const AuthView = (props: Props) => {
  const [auth = 'login', setAuth] = useState<string>();
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <View style={styles.authLogo}>
          <AuthIcon size={100} />
        </View>
        {auth === 'login' ? (
          <LoginForm setAuth={setAuth} />
        ) : (
          <RegisterForm setAuth={setAuth} />
        )}
      </View>
    </ScrollView>
  );
};

export default AuthView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
    paddingVertical: 100,
  },
  card: {
    backgroundColor: Theme.colors.sambucus,
    paddingHorizontal: 16,
    borderRadius: 72,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    paddingBottom: 30,
    paddingTop: 100,
  },
  authLogo: {
    position: 'absolute',
    top: -64,
    alignSelf: 'center',
    backgroundColor: Theme.colors.sambucus,
    borderColor: '#7F838D',
    borderWidth: 2,
    padding: 12,
    borderRadius: 100,
  },
});
