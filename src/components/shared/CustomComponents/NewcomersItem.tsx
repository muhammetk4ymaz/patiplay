import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import NewLabel from '../Labels/NewLabel';

type Props = {
  item: any;
  index: number;
};

const NewcomersItem = (props: Props) => {
  return (
    <View
      style={{
        width:
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            2 * Theme.spacing.columnGap) /
          2,
        gap: 5,
      }}>
      <View
        style={{
          aspectRatio: Theme.aspectRatios.horizontal,
          // height: 100,
          borderRadius: Theme.titlePosterRadius,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        }}>
        <FastImage
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.item.backdrop_path}`,
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <NewLabel />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 8,
            marginBottom: 8,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingVertical: 2,
              paddingHorizontal: 4,
              borderRadius: 4,
            }}>
            <CustomText
              text={props.index % 2 === 0 ? '3h 18m' : '13 episodes'}
              style={{color: 'white', fontSize: 12, opacity: 1}}
            />
          </View>
        </View>
      </View>
      <View>
        <CustomText
          text={props.item.title}
          style={{color: 'white', fontSize: Theme.fontSizes.sm}}
          weight="light"
        />
        <CustomText
          text={'2024'}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.sm,
            opacity: 0.5,
          }}
          weight="light"
        />
      </View>
    </View>
  );
};

export default React.memo(NewcomersItem);

const styles = StyleSheet.create({});
