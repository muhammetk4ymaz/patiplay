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
import LoadingWidget from '../../../../components/shared/LoadingWidget';
const {width} = Dimensions.get('window');

type Props = {
  data: any;
};

const FeaturesTab = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <FlatList
        removeClippedSubviews={true}
        data={props.data}
        numColumns={4}
        contentContainerStyle={{
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

export default FeaturesTab;
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
