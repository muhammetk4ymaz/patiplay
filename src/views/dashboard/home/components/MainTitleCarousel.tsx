import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import nowPlayMovies from '../../../../models/now_play_movies';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import '../../../../i18n';
import MainTitleCard from './MainTitleCard';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import TopMovie from '../../../../models/top_movie';
const {width} = Dimensions.get('window');

const itemWidth = width * 0.7;

const MainTitleCarousel = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value =
      event.contentOffset.x / (itemWidth + Theme.spacing.columnGap);
  });

  console.log('MainTitleCarousel Rendered');

  const renderItem = useCallback(
    ({item, index}: {item: TopMovie; index: number}) => (
      <MainTitleCard title={item} index={index} scrollX={scrollX} />
    ),
    [],
  );

  return (
    <View>
      {nowPlayMovies.map((movie, index) => (
        <BlurredBackground
          key={movie.id}
          scrollX={scrollX}
          backgroundPath={movie.poster_path}
          index={index}
        />
      ))}
      <Header />
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
        data={nowPlayMovies}
        nestedScrollEnabled
        style={{flexGrow: 0}}
        contentContainerStyle={{
          gap: Theme.spacing.columnGap,
          paddingHorizontal: (width - itemWidth) / 2,
        }}
        onScroll={onScroll}
        keyExtractor={(_, index) => _.id.toString()}
        horizontal
        pagingEnabled
        removeClippedSubviews={true}
        snapToInterval={itemWidth + Theme.spacing.columnGap}
        scrollEventThrottle={1000 / 60}
        decelerationRate="fast"
        initialNumToRender={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => renderItem({item, index})}
      />
    </View>
  );
};

export default React.memo(MainTitleCarousel);

const Header = React.memo(() => {
  const {t} = useTranslation();

  console.log('Header Rendered');

  return (
    <View style={[styles.header]}>
      <CustomText
        text={t('home:title')}
        style={{color: Theme.colors.white}}
        weight="medium"
      />
      <CustomText
        text="Muhammet Kaymaz,"
        style={styles.nameSurname}
        weight="bold"
      />
    </View>
  );
});

type BlurredBackgroundProps = {
  scrollX: SharedValue<number>;
  backgroundPath: string;
  index: number;
};

const BlurredBackground = React.memo((props: BlurredBackgroundProps) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        props.scrollX.value,
        [props.index - 1, props.index, props.index + 1],
        [0, 1, 0],
      ),
    };
  });
  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <Animated.Image
        key={`image-${props.index}`}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.backgroundPath}`,
        }}
        style={[StyleSheet.absoluteFillObject, stylez]}
        blurRadius={50}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    zIndex: 1,
    marginBottom: 18,
    marginTop: StatusBar.currentHeight + 12,
  },
  nameSurname: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.lg,
  },
});
