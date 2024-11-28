import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../constants/Theme';
import nowPlayMovies from '../../../../models/now_play_movies';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
const {width} = Dimensions.get('window');

type Props = {};

const ShortsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={loading}
        />
      </View>
    );
  } else {
    return (
      <FlatList
        removeClippedSubviews={true}
        data={nowPlayMovies}
        numColumns={4}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.columnGap,
        }}
        columnWrapperStyle={{
          gap: Theme.spacing.rowGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TitleItem id={item.id} poster_path={item.poster_path} />
        )}></FlatList>
    );
  }
};

export default ShortsTab;

type TitleItemProps = {
  id: number;
  poster_path: string;
};

const TitleItem = React.memo((props: TitleItemProps) => {
  return (
    <View
      style={{
        width: calculateGridItemWidth(4),
        aspectRatio: Theme.aspectRatios.vertical,
      }}>
      <VerticalPoster posterPath={props.poster_path} width={'100%'} />
    </View>
  );
});
