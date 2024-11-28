import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Theme} from '../../../../constants/Theme';
import TitleCard from './TitleCard';
import TopMovie from '../../../../models/top_movie';
import ListHeaderText from '../../../../components/shared/ListHeaderText';
import {FlatList} from 'native-base';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';

const UnscrollableList = ({
  title,
  titles,
}: {
  title: string;
  titles: TopMovie[];
}) => {
  console.log('TopMovieList');

  useEffect(() => {
    /* axios
      .get(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjJiZDMzNWRmNWNmZDdhYzQ2MzNlZGJjMTc0ZjY1ZiIsIm5iZiI6MTcyNTk0OTgwMi41NzAyNTMsInN1YiI6IjY2ZGZlNjY5MDAwMDAwMDAwMDY0MGJkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GB1aK7PWy5JY5gM4IYUGcfDSv9OVf33IBHURWcsn2bo',
          },
        },
      )
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.log(error);
      }); */
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TopMovie; index: number}) => (
      <TitleCard
        topMovie={item}
        key={index}
        width={calculateGridItemWidth(4)}
      />
    ),
    [],
  );

  return (
    <View style={{gap: Theme.spacing.columnGap}}>
      <View style={styles.header}>
        <ListHeaderText title={title} />
        {/* <CustomText text="See All" style={styles.seeAllText} weight="light" /> */}
      </View>

      <FlatList
        scrollEnabled={false}
        data={titles}
        numColumns={4}
        removeClippedSubviews={true}
        columnWrapperStyle={{
          // rowGap: Theme.spacing.rowGap,
          columnGap: Theme.spacing.rowGap,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => renderItem({item, index})}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        {titles.map((topMovie, index) => {
          return <TitleCard topMovie={topMovie} key={index} />;
        })}
      </View> */}
    </View>
  );
};

export default React.memo(UnscrollableList);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAllText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xs,
  },
  contentContainer: {
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    gap: Theme.spacing.rowGap,
  },
});
