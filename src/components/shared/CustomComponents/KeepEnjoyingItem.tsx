import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import TitleWithProgress from './TitleWithProgress';
import {calculateGridItemWidth} from '../../../utils/calculateGridItemWidth';

type Props = {
  item: any;
  index: number;
  type: 'Title' | 'Episode' | 'Clip';
};

const KeepEnjoyingItem = (props: Props) => {
  return (
    <View
      style={{
        width: calculateGridItemWidth(2),
        gap: 5,
      }}>
      <TitleWithProgress
        backdropPath={{uri: props.item.video.filmImageUrl[0]?.url}}
        percentage={parseInt(props.item.completion_rate.replace('%', ''), 10)}
        runtime={props.item.title.total_time}
      />
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={props.item.title.title[0].title}
            style={{color: 'white', fontSize: Theme.fontSizes.sm}}
            weight="light"
          />

          {props.type === 'Episode' && (
            <CustomText
              numberOfLines={1}
              text={
                'S4 E18 • Entrance Entrance Entrance Entrance Entrance Entrance Entrance'
              }
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
                opacity: 0.5,
              }}
              weight="light"
            />
          )}

          <CustomText
            numberOfLines={1}
            text={
              formatDuration(props.item.title.total_time - props.item.time) +
              ' left'
            }
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

export default React.memo(KeepEnjoyingItem);

const styles = StyleSheet.create({});

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }

  if (hours === 0 || minutes === 0) {
    if (remainingSeconds !== 0) {
      formattedTime += `${remainingSeconds}s`;
    }
  }

  return formattedTime.trim();
}
