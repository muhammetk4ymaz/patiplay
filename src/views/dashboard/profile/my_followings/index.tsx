import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {Theme} from '../../../../utils/theme';
import CustomTabBar from '../../../../components/CustomTabBar';
import {SceneMap} from 'react-native-tab-view';
import CompaniesFollowings from './CompaniesFollowings';
import CastFollowings from './CastFollowings';
import CrewFollowings from './CrewFollowings';

const SPACE = Theme.spacing.columnGap;

const routes = [
  {key: 'first', title: 'Companies'},
  {key: 'second', title: 'Cast'},
  {key: 'third', title: 'Crew'},
];

const renderScene = SceneMap({
  first: CompaniesFollowings,
  second: CastFollowings,
  third: CrewFollowings,
});

const MyFollowingsView = () => {
  return (
    <CustomTabBar
      renderScene={renderScene}
      routes={routes}
      swipeEnabled={false}
    />
  );
};

export default MyFollowingsView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    gap: SPACE,
  },
});
