import React from 'react';
import {StyleSheet} from 'react-native';
import CustomTabBar from '../../../../components/CustomTabBar';
import {Theme} from '../../../../utils/theme';
import FavoriteClipsView from './FavoriteClipsView';
import FavoriteEpisodesView from './FavoriteEpisodesView';
import FavoriteTitlesView from './FavoriteTitlesView';
import FavoriteTrailersView from './FavoriteTrailersView';
import {RouteProp, useRoute} from '@react-navigation/native';

const renderScene = (
  {route}: {route: {key: string; title: string}},
  data: any[],
) => {
  switch (route.key) {
    case 'first':
      return (
        <FavoriteTitlesView
          data={data.filter(data => data.filmType.value === 'Film')}
        />
      );
    case 'second':
      return <FavoriteEpisodesView />;
    case 'third':
      return <FavoriteClipsView />;
    case 'fourth':
      return <FavoriteTrailersView />;
    default:
      return null;
  }
};

const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Episodes'},
  {key: 'third', title: 'Clips'},
  {key: 'fourth', title: 'Trailers'},
];

type RouteParams = {
  MyFavorites: {
    data: any[];
  };
};

const MyFavoritesView = () => {
  const routeParams = useRoute<RouteProp<RouteParams, 'MyFavorites'>>();

  return (
    <CustomTabBar
      routes={routes}
      renderScene={route => renderScene(route, routeParams.params.data)}
    />
  );
};

export default MyFavoritesView;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
  },
});
