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
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';

type Props = {};

const TitleRelatedTab = (props: Props) => {
  const related = useSelector((state: RootState) => state.titleDetail.related);
  const relatedInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.relatedInitialLoading,
  );

  return (
    <FlatList
      data={related}
      scrollEnabled={false}
      initialNumToRender={5}
      numColumns={3}
      columnWrapperStyle={{
        gap: Theme.spacing.columnGap,
      }}
      ListHeaderComponent={() => {
        return (
          relatedInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={relatedInitialLoading}
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
          <VerticalPoster
            posterPath={item.poster_path}
            width={calculateGridItemWidth(3)}
          />
        );
      }}
    />
  );
};

export default React.memo(TitleRelatedTab);

const styles = StyleSheet.create({});
