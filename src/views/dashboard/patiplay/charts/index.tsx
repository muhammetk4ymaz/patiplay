import {MotiView} from 'moti';
import {Dimensions, FlatList, Pressable, StyleSheet, View} from 'react-native';
import {Theme} from '../../../../utils/theme';
import Animated, {
  FadeInDown,
  FadeInUp,
  LayoutAnimationConfig,
} from 'react-native-reanimated';
import {useState} from 'react';
import React from 'react';
import TitleChartsView from './TitlesChartsView';
import CompaniesChartsView from './CompaniesChartsView';
import CastChartsView from './CastChartsView';
import CrewChartsView from './CrewChartsView';
import CinephilesChartsView from './CinephilesChartsView';
import CustomTabBar from '../../../../components/CustomTabBar';
import {SceneMap} from 'react-native-tab-view';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import {useHeaderHeight} from '@react-navigation/elements';

type Props = {};

const renderScene = SceneMap({
  first: TitleChartsView,
  second: CompaniesChartsView,
  third: CastChartsView,
  fourth: CrewChartsView,
  fifth: CinephilesChartsView,
});

const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Companies'},
  {key: 'third', title: 'Cast'},
  {key: 'fourth', title: 'Crew'},
  {key: 'fifth', title: 'Cinephiles'},
];

const ChartsView = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const headerHeight = useHeaderHeight();

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Trends?'} />;
  }

  return (
    <View style={{paddingTop: headerHeight, flex: 1}}>
      <CustomTabBar routes={routes} renderScene={renderScene} />
    </View>
  );
};

export default ChartsView;
