import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../utils/theme';
import {AuthIcon} from '../../../assets/icons';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import {ImageManager} from '../../constants/ImageManager';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import LoginButton from './components/LoginButton';

type Props = {};

const AuthView = (props: Props) => {
  const [auth = 'login', setAuth] = useState<string>();
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard
        button={
          <LoginButton
            handleSubmit={() => {
              console.log('Login');
            }}
            onSubmitted={() => {
              console.log('Submitted');
            }}
          />
        }
        icon={
          <Image
            source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
            style={{
              height: 80,
              width: 80,
            }}
          />
        }>
        {auth === 'login' ? (
          <LoginForm setAuth={setAuth} />
        ) : (
          <RegisterForm setAuth={setAuth} />
        )}
      </ContentWithIconCard>
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
});
