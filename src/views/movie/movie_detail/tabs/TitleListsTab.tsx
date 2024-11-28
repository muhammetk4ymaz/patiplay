import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import nowPlayMovies from '../../../../models/now_play_movies';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../constants/Theme';
import popularTitles from '../../../../models/popular';
import TopMovie from '../../../../models/top_movie';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import CustomText from '../../../../components/shared/CustomText';
import {RootStackParamList} from '../../../../navigation/routes';

type Props = {};

const TitleListsTab = (props: Props) => {
  const lists = useSelector((state: RootState) => state.titleDetail.lists);
  const listsInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.listsInitialLoading,
  );
  return (
    <FlatList
      data={lists}
      scrollEnabled={false}
      numColumns={2}
      columnWrapperStyle={{
        gap: Theme.spacing.rowGap,
      }}
      ListHeaderComponent={() => {
        return (
          listsInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={listsInitialLoading}
              />
            </View>
          )
        );
      }}
      contentContainerStyle={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: Theme.spacing.columnGap,
      }}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return <OtherListItem item={popularTitles.slice(0, 3)} />;
      }}
    />
  );
};

export default React.memo(TitleListsTab);

const styles = StyleSheet.create({});

const OtherListItem = ({item, index}: {item: TopMovie[]; index?: number}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListDetail');
      }}
      style={{
        width:
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            1 * Theme.spacing.rowGap) /
          2,
        gap: 3,
      }}>
      <PosterStack
        posters={item}
        posterWidth={
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            1 * Theme.spacing.rowGap) /
          4
        }
        posterContainerWidth={
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            1 * Theme.spacing.rowGap) /
          2
        }
      />
      <View>
        <CustomText
          text="List Name"
          style={{color: 'white', fontSize: Theme.fontSizes.sm}}
          numberOfLines={1}
          weight="light"
        />
        <CustomText
          text="@muhammetk4ymaz"
          weight="light"
          style={{color: 'white', opacity: 0.5, fontSize: Theme.fontSizes.xs}}
          numberOfLines={1}
        />
        <CustomText
          text="17 Titles • Mar 24"
          weight="light"
          style={{color: 'white', opacity: 0.5, fontSize: Theme.fontSizes.xs}}
          numberOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
};

const PosterStack = ({
  posters,
  posterWidth,
  posterContainerWidth,
}: {
  posters: any[];
  posterWidth: number;
  posterContainerWidth: number;
}) => {
  const posterSpacing = (posterContainerWidth - posterWidth) / 2;

  return (
    <View style={{width: posterContainerWidth}}>
      <View style={{width: posterWidth, aspectRatio: 2 / 3}}>
        <View
          style={{
            flexDirection: 'row',
            width: posterContainerWidth,
            aspectRatio: 2 / 3,
            overflow: 'hidden',
          }}>
          {posters.reverse().map((poster, index) => {
            return (
              <View
                style={[
                  {
                    width: posterWidth,
                    aspectRatio: 2 / 3,
                    borderRadius: 12,
                    position: 'absolute',
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
      </View>
    </View>
  );
};
