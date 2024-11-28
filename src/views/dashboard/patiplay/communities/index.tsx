import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import {useHeaderHeight} from '@react-navigation/elements';

type Props = {};

const CommunitiesView = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const headerHeight = useHeaderHeight();

  if (!isAuthenticated) {
    return (
      <PreRegistrationView title={'Communities United\nby Films & TV Shows?'} />
    );
  }
  return <View style={{flex: 1}}></View>;
};

export default CommunitiesView;

const styles = StyleSheet.create({});
