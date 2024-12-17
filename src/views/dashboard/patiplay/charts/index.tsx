import {useHeaderHeight} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import CustomTabBar from '../../../../components/CustomTabBar';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import CastChartsView from './CastChartsView';
import CinephilesChartsView from './CinephilesChartsView';
import CompaniesChartsView from './CompaniesChartsView';
import CrewChartsView from './CrewChartsView';
import TitleChartsView from './TitlesChartsView';

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
