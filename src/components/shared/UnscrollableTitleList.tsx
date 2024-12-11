import {FlatList} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import TopMovie from '../../models/top_movie';
import {calculateGridItemWidth} from '../../utils/calculateGridItemWidth';
import {Theme} from '../../utils/theme';
import TitleCard from '../../views/dashboard/home/components/TitleCard';
import ListHeaderText from './Texts/ListHeaderText';
import {TitleModel} from '../../models/patiplay/TitleModel';

const UnscrollableTitleList = ({
  title,
  titles,
  keyExtractor,
}: {
  title: string;
  titles: TopMovie[] | TitleModel[];
  keyExtractor?: string;
}) => {
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
    ({item, index}: {item: TopMovie | TitleModel; index: number}) => (
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
        contentContainerStyle={{
          rowGap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        keyExtractor={(item, index) =>
          keyExtractor ? keyExtractor + index : item.id.toString()
        }
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

export default React.memo(UnscrollableTitleList);

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
