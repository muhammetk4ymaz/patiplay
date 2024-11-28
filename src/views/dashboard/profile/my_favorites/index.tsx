import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Theme} from '../../../../constants/Theme';
import {MotiView} from 'moti';
import Animated, {
  FadeInDown,
  FadeInUp,
  LayoutAnimationConfig,
} from 'react-native-reanimated';
import FavoriteTitlesView from './FavoriteTitlesView';
import FavoriteEpisodesView from './FavoriteEpisodesView';
import FavoriteClipsView from './FavoriteClipsView';
import FavoriteTrailersView from './FavoriteTrailersView';
import CustomTabBar from '../../../../components/CustomTabBar';
import {SceneMap} from 'react-native-tab-view';

const renderScene = SceneMap({
  first: FavoriteTitlesView,
  second: FavoriteEpisodesView,
  third: FavoriteClipsView,
  fourth: FavoriteTrailersView,
});

const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Episodes'},
  {key: 'third', title: 'Clips'},
  {key: 'fourth', title: 'Trailers'},
];

const MyFavoritesView = () => {
  return <CustomTabBar routes={routes} renderScene={renderScene} />;
};

export default MyFavoritesView;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
  },
});
