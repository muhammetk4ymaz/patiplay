import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../../constants/Theme';
import TitleWithProgress from '../../../../../components/shared/CustomComponents/TitleWithProgress';
import CustomText from '../../../../../components/shared/CustomText';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

type Props = {
  type: 'movie' | 'clips' | 'episodes' | 'trailers';
  title?: string;
  backdropPath?: string;
  runtime?: number;
  percentage?: number;
  onPressButton: () => void;
  poster_path?: string;
};

const FavoriteItemComponent = (props: Props) => {
  let caption = '';
  switch (props.type) {
    case 'clips':
      caption = 'Şehzade Mustafanın Ölümü';
      break;

    case 'episodes':
      caption =
        'S4 E18 • Entrance Entrance Entrance Entrance Entrance Entrance Entrance';
      break;

    case 'trailers':
      caption = 'S2 E18 • Trailer 2';
      break;
  }

  if (props.type === 'movie') {
    return (
      <View
        style={{
          width:
            (Dimensions.get('window').width -
              2 * Theme.paddings.viewHorizontalPadding -
              2 -
              Theme.spacing.rowGap) /
            3,
          borderTopLeftRadius: Theme.titlePosterRadius,
          borderTopRightRadius: Theme.titlePosterRadius,
          aspectRatio: Theme.aspectRatios.vertical,
          justifyContent: 'flex-end',
        }}>
        <FastImage
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + props.poster_path,
          }}
          style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
        />
        <HeartButtonForVerticalPoster
          onPress={() => {
            props.onPressButton();
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          width:
            (Dimensions.get('window').width -
              2 * Theme.paddings.viewHorizontalPadding -
              Theme.spacing.rowGap) /
            2,
          gap: 5,
        }}>
        <TitleWithProgress
          backdropPath={props.backdropPath!}
          runtime={props.runtime!}
          percentage={props.percentage!}
        />
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <CustomText
              numberOfLines={1}
              text={caption}
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
              }}
              weight="light"
            />
            <CustomText
              numberOfLines={1}
              text={props.title!}
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
                opacity: 0.5,
              }}
              weight="light"
            />
          </View>
          <HeartButtonForHorizontalPoster onPress={props.onPressButton} />
          {/* <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity> */}
        </View>
      </View>
    );
  }
};

export default React.memo(FavoriteItemComponent);

const styles = StyleSheet.create({});

type HeartButtonProps = {
  onPress: () => void;
};

const HeartButtonForHorizontalPoster = (props: HeartButtonProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}>
        <IconMaterialCommunityIcons
          name="cards-heart"
          color={Theme.colors.primary}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

const HeartButtonForVerticalPoster = (props: HeartButtonProps) => {
  const [backgroundColor, setBackgroundColor] = React.useState(
    Theme.colors.primary,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.onPress();
        }}
        onPressIn={() => {
          setBackgroundColor(Theme.colors.background);
        }}
        onPressOut={() => {
          setBackgroundColor(Theme.colors.primary);
        }}
        style={{
          padding: 4,
          bottom: -10,
          right: -10,
        }}>
        <IconMaterialCommunityIcons
          name="cards-heart"
          color={backgroundColor}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};
