import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import nowPlayMovies from '../../../../models/now_play_movies';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingWidget from '../../../../components/shared/LoadingWidget';
const {width} = Dimensions.get('window');

type Props = {
  data: any;
};

const TitlesTab = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <FlatList
        removeClippedSubviews={true}
        data={props.data.titles}
        numColumns={4}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <TitleItem item={item} />}></FlatList>
    );
  }
};

export default TitlesTab;

type TitleItemProps = {
  item: any;
};

const TitleItem = React.memo((props: TitleItemProps) => {
  return (
    <View
      style={{
        width: calculateGridItemWidth(4),
        aspectRatio: Theme.aspectRatios.vertical,
      }}>
      <View
        style={[
          {
            overflow: 'hidden',
            width: '100%',
            aspectRatio: 2000 / 3000,
            borderRadius: 12,
          },
        ]}>
        <FastImage
          source={{
            uri: props.item.verticalPhotos[0].url,
          }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </View>
    </View>
  );
});
