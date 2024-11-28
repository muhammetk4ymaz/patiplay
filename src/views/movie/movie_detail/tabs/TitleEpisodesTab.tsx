import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../constants/Theme';
import {useAppDispatch} from '../../../../redux/hooks';
import {setEpisodes} from '../../../../redux/features/titledetail/titleDetailSlice';
import nowPlayMovies from '../../../../models/now_play_movies';
import TitleWithProgress from '../../../../components/shared/CustomComponents/TitleWithProgress';
import topMovies from '../../../../models/topMovies';

type Props = {};

const width = Dimensions.get('window').width;

const TitleEpisodesTab = (props: Props) => {
  console.log('TitleEpisodesTab');
  const episodes = useSelector(
    (state: RootState) => state.titleDetail.episodes,
  );
  const episodesLoading = useSelector(
    (state: RootState) => state.titleDetail.episodesInitialLoading,
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (episodesLoading) {
      setTimeout(() => {
        dispatch(setEpisodes(topMovies));
      }, 300);
    }
  }, []);

  if (episodesLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
          paddingTop: Theme.spacing.columnGap,
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={episodesLoading}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={episodes}
      scrollEnabled={false}
      contentContainerStyle={{
        paddingVertical: Theme.spacing.columnGap,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: Theme.spacing.rowGap,
      }}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return (
          <View
            style={{
              width: '45%',
              marginBottom: Theme.spacing.rowGap,
            }}>
            <TitleWithProgress
              backdropPath={item.backdrop_path}
              percentage={0}
              runtime={0}
            />
          </View>
        );
      }}
    />
  );
};

export default React.memo(TitleEpisodesTab);

const styles = StyleSheet.create({});
