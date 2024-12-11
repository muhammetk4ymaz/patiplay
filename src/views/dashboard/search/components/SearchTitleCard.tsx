import {DimensionValue, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/shared/CustomText';
import CustomTextButton from '../../../../components/shared/Buttons/CustomTextButton';
import {Theme} from '../../../../utils/theme';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import genres from '../../../../models/genres';
import TopMovie from '../../../../models/top_movie';
import FastImage from 'react-native-fast-image';

type SearchTitleCardProps = {
  title: TopMovie;
  width: DimensionValue;
};

type BlurredBackgroundProps = {
  poster_path: string;
};

const SearchTitleCard = (props: SearchTitleCardProps) => {
  return (
    <View style={styles.card}>
      <BlurredBackground poster_path={props.title.poster_path} />
      <View style={{flex: 3}}>
        <TitlePoster poster_path={props.title.poster_path} />
      </View>
      <View
        style={{
          flex: 7,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <TitleInformation
          title={props.title.title}
          genre_ids={props.title.genre_ids}
        />
      </View>
    </View>
  );
};

const BlurredBackground = (props: BlurredBackgroundProps) => {
  return (
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
      }}
      blurRadius={75}
      style={[
        StyleSheet.absoluteFillObject,
        {
          borderRadius: 12,
        },
      ]}
    />
  );
};

const TitlePoster = (props: {poster_path: string}) => {
  return (
    <FastImage
      source={{
        uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
      }}
      resizeMode="cover"
      style={{
        aspectRatio: 500 / 750,
        borderRadius: 12,
      }}
    />
  );
};

const TitleInformation = (props: {title: string; genre_ids: number[]}) => {
  const tags = ['2023', '2h 20m', 'PG 13'];
  return (
    <View style={{justifyContent: 'space-around', flex: 1}}>
      <View style={{gap: 5}}>
        <View style={styles.genreContainer}>
          {props.genre_ids.map((genreId: number, index) => {
            const genre = genres.find(genre => genre.id === genreId);
            return (
              <View style={{flexDirection: 'row'}} key={index}>
                <CustomText
                  key={genreId}
                  text={genre?.name || ''}
                  style={styles.genreText}
                />
                {index !== props.genre_ids.length - 1 && (
                  <View style={styles.categorySeperator}></View>
                )}
              </View>
            );
          })}
        </View>
        <CustomText text={props.title} style={styles.titleText} weight="bold" />
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 2,
          }}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <CustomText text={tag} style={{color: Theme.colors.white}} />
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <CustomTextButton
          borderRadius={8}
          paddingVertical={8}
          paddingHorizontal={8}
          text="Add To Watchlist"
          textStyle={{
            fontSize: Theme.fontSizes.sm,
          }}
          backgroundColor={Theme.colors.sambucus}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default React.memo(SearchTitleCard, (prevprops, nextprops) => {
  return prevprops.title.id === nextprops.title.id;
});

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
  },
  titleText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.md,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreText: {
    color: Theme.colors.gray,
    fontSize: Theme.fontSizes.xs,
  },
  categorySeperator: {
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Theme.colors.gray,
    width: 3,
    height: 3,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.gray,
  },
});
