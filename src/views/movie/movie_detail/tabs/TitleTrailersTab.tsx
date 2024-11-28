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
import {
  setClips,
  setEpisodes,
} from '../../../../redux/features/titledetail/titleDetailSlice';
import nowPlayMovies from '../../../../models/now_play_movies';
import TitleWithProgress from '../../../../components/shared/CustomComponents/TitleWithProgress';

type Props = {};

const width = Dimensions.get('window').width;

const TitleTrailersTab = (props: Props) => {
  const trailers = useSelector(
    (state: RootState) => state.titleDetail.trailers,
  );
  const trailersInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.trailersInitialLoading,
  );

  return (
    <FlatList
      data={trailers}
      scrollEnabled={false}
      ListHeaderComponent={() => {
        return (
          trailersInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={trailersInitialLoading}
              />
            </View>
          )
        );
      }}
      contentContainerStyle={{
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

export default React.memo(TitleTrailersTab);

const styles = StyleSheet.create({});
