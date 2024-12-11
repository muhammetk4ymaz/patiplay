import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../utils/theme';
import TopMovie from '../../../models/top_movie';
import CustomText from '../CustomText';
import TitleWithProgress from './TitleWithProgress';
import {calculateGridItemWidth} from '../../../utils/calculateGridItemWidth';
import {ImageManager} from '../../../constants/ImageManager';

type Props = {
  item: TopMovie | any;
};

const ClipItem = (props: Props) => {
  // React.useEffect(() => {
  //   console.log('ClipItem', props.item);
  // }, []);

  return (
    <View
      style={{
        width: calculateGridItemWidth(2),
        gap: 5,
      }}>
      <TitleWithProgress
        backdropPath={
          props.item.video?.filmImageUrl[0]?.url
            ? {uri: props.item.video?.filmImageUrl[0]?.url}
            : ImageManager.IMAGE_NAMES.PATOHORIZONTALLOGOWHITE
        }
        percentage={props.item.completion_rate}
        runtime={props.item.total_time}
      />
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={props.item.name[0].title}
            style={{color: 'white', fontSize: Theme.fontSizes.sm}}
            weight="light"
          />

          <CustomText
            numberOfLines={1}
            text={props.item.title.title[0].title}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
              opacity: 0.5,
            }}
            weight="light"
          />
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ClipItem);

const styles = StyleSheet.create({});
