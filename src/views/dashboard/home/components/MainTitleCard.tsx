import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {RootStackParamList} from '../../../../navigation/routes';

const {height, width} = Dimensions.get('window');

type MainTitleCardProps = {
  title: NowPlayMovie;
  scrollX: SharedValue<number>;
  index: number;
};

const MainTitleCard = (props: MainTitleCardProps) => {
  console.log(props.title.original_title);
  const {title} = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCardPress = () => {
    navigation.navigate('MovieDetail', {movieId: title.id.toString()});
  };

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
    <View
      key={title.id}
      style={{
        borderRadius: 12,
        width: width * 0.7,
        aspectRatio: 2 / 3,
        overflow: 'hidden',
      }}>
      <Animated.Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.title.poster_path}`,
        }}
        style={[{flex: 1, borderRadius: 12}, styleZ]}
      />
    </View>
  );
};

export default React.memo(MainTitleCard);

const styles = StyleSheet.create({});
