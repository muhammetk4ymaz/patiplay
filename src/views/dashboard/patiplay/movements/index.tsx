import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import nowPlayMovies from '../../../../models/now_play_movies';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import {useHeaderHeight} from '@react-navigation/elements';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
const {width} = Dimensions.get('window');

const posterWidth = (width - 2 * Theme.paddings.viewHorizontalPadding - 12) / 4;
const posterContainerWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding - 12) / 2;

const MovementsView = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const headerHeight = useHeaderHeight();

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Film Movements?'} />;
  }

  return (
    <View style={{paddingTop: headerHeight}}>
      <FlatList
        data={[3, 4, 5, 6, 6, 3]}
        keyExtractor={item => item.toString()}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: 12,
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
          rowGap: 12,
        }}
        renderItem={({item}) => {
          return <PosterStack posters={nowPlayMovies.slice(0, item)} />;
        }}
      />
    </View>
  );
};

export default MovementsView;

const styles = StyleSheet.create({
  posterContainer: {
    flexDirection: 'row',
    flex: posterContainerWidth,
    height: (posterContainerWidth * 2) / 3 + 20,
  },
  poster: {
    width: posterWidth,
    aspectRatio: 2 / 3,
    position: 'absolute',
    borderRadius: 12,
  },
});

const PosterStack = ({posters}: {posters: []}) => {
  const numOfPosters = posters.length;
  const posterSpacing =
    (posterContainerWidth - posterWidth) / (numOfPosters - 1);

  return (
    <View style={{width: posterContainerWidth}}>
      <View style={styles.posterContainer}>
        {posters.reverse().map((poster, index) => {
          return (
            <View
              style={[
                styles.poster,
                {
                  zIndex: index,
                  right: index * posterSpacing,
                },
              ]}
              key={poster.id}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${poster.poster_path}`,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
          );
        })}
      </View>
      <View>
        <CustomText
          text="Post-Perestroika Russian Cinema"
          weight="medium"
          style={{color: 'white', textAlign: 'center'}}
        />
        <CustomText
          text="1990s - Present"
          weight="medium"
          style={{color: 'white', textAlign: 'center', opacity: 0.5}}
        />
      </View>
    </View>
  );
};
