import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {Theme} from '../../constants/Theme';
import TopMovie from '../../models/top_movie';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

type Props = {
  data: TopMovie[];
  renderItem: (item: TopMovie, index: number) => React.ReactNode;
  itemWidth?: number;
};

const TitleCarousel = (props: Props) => {
  const headerHeight = useHeaderHeight();
  const scrollX = useSharedValue(0);

  const itemWidth = props.itemWidth || width * 0.7;

  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x / (itemWidth + Theme.spacing.rowGap);
  });

  const renderItem = useCallback((item: TopMovie, index: number) => {
    return (
      <RenderItem
        index={index}
        item={item}
        itemWidth={itemWidth}
        renderItem={props.renderItem}
        scrollX={scrollX}
      />
    );
  }, []);

  return (
    <View>
      {props.data.map((movie, index) => {
        const stylez = useAnimatedStyle(() => {
          return {
            opacity: interpolate(
              scrollX.value,
              [index - 1, index, index + 1],
              [0, 1, 0],
            ),
          };
        });
        return (
          <Animated.Image
            key={`image-${index}`}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={[StyleSheet.absoluteFillObject, stylez]}
            blurRadius={100}
          />
        );
      })}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,1)',
        ]}
        style={[StyleSheet.absoluteFillObject]}
      />
      <Animated.FlatList
        data={props.data}
        horizontal
        pagingEnabled
        initialNumToRender={2}
        contentContainerStyle={{
          paddingTop: headerHeight + 12,
          gap: Theme.spacing.rowGap,
          paddingHorizontal: (width - itemWidth) / 2,
        }}
        snapToInterval={itemWidth + Theme.spacing.rowGap}
        scrollEventThrottle={1000 / 60}
        decelerationRate="fast"
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default TitleCarousel;

const styles = StyleSheet.create({});

type RenderItemProps = {
  index: number;
  item: TopMovie;
  renderItem: (item: TopMovie, index: number) => React.ReactNode;
  scrollX: SharedValue<number>;
  itemWidth: number;
};

const RenderItem = React.memo((props: RenderItemProps) => {
  const styleZ = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            props.scrollX.value,
            [props.index - 1, props.index, props.index + 1],
            [0.9, 1, 0.9],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[{width: props.itemWidth}, styleZ]}>
      {props.renderItem(props.item, props.index)}
    </Animated.View>
  );
});
