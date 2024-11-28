import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import TopMovie from '../../../../models/top_movie';
import DeviceInfo from 'react-native-device-info';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import PeopleLabel from '../../../../components/shared/PeopleLabel';
import {Theme} from '../../../../constants/Theme';
import {RootStackParamList} from '../../../../navigation/routes';

const {height, width} = Dimensions.get('window');

type TopMovieProps = {
  topMovie: TopMovie;
  width: number;
};

export const TitleCard = (props: TopMovieProps) => {
  console.log('TitleCard');
  const {poster_path} = props.topMovie;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('MovieDetail', {
          movieId: props.topMovie.id.toString(),
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
};

export default TitleCard;

const styles = StyleSheet.create({});
