import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../constants/Theme';
import TitleWithProgress from '../../../../components/shared/CustomComponents/TitleWithProgress';

type Props = {};

const TitleClipsTab = (props: Props) => {
  console.log('TitleClipsTab');
  const clips = useSelector((state: RootState) => state.titleDetail.clips);
  const clipsInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.clipsInitialLoading,
  );

  return (
    <FlatList
      data={clips}
      scrollEnabled={false}
      ListHeaderComponent={() => {
        return (
          clipsInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={clipsInitialLoading}
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

export default React.memo(TitleClipsTab);

const styles = StyleSheet.create({});
