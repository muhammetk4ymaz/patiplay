import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import TopMovie from '../../../../models/top_movie';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {RootStackParamList} from '../../../../navigation/routes';
import PeopleLabel from '../../../../components/shared/Labels/PeopleLabel';
import FastImage from 'react-native-fast-image';
import {Theme} from '../../../../utils/theme';
import {TitleModel} from '../../../../models/patiplay/TitleModel';

const {height, width} = Dimensions.get('window');

type TitleCardProps = {
  topMovie: TopMovie | TitleModel;
  width: number;
};

export const TitleCard = (props: TitleCardProps) => {
  if ('poster_path' in props.topMovie) {
    const {poster_path} = props.topMovie;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const topMovie = props.topMovie as TopMovie;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('MovieDetail', {
            movieId: topMovie.id.toString(),
          });
        }}
        style={{gap: 12}}>
        <View
          style={{
            width: props.width,
            aspectRatio: 2 / 3,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}>
          <VerticalPoster
            posterPath={poster_path}
            width={'100%'}
            style={StyleSheet.absoluteFillObject}
          />
          <PeopleLabel />
        </View>
      </TouchableOpacity>
    );
  } else {
    const title = props.topMovie as TitleModel;

    console.log('Title1', title);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {}}
        style={{gap: 12}}>
        <View
          style={{
            width: props.width,
            aspectRatio: Theme.aspectRatios.vertical,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}>
          <FastImage
            source={{
              uri: title.verticalPhotos[0].url,
            }}
            style={[
              StyleSheet.absoluteFillObject,
              {borderRadius: Theme.titlePosterRadius},
            ]}
          />
          <PeopleLabel />
        </View>
      </TouchableOpacity>
    );
  }
};

export default TitleCard;

const styles = StyleSheet.create({});
