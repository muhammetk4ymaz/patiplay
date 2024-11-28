import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../../constants/Theme';
import {
  setAutoQuality,
  setQuality,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import CustomText from '../CustomText';

export interface VideoQuality {
  index: number;
  height?: number;
  bitrate?: number;
  width?: number;
  codecs?: string;
  rotation?: number;
  selected?: boolean;
  trackId?: number;
}

const VideoQualityComponent = () => {
  const {qualityList, quality, autoQuality} = useAppSelector(
    state => state.videoplayer,
  );
  const dispatch = useAppDispatch();

  const sortedVideoQualityList = [...qualityList].sort(
    (a, b) => (a.height || 0) - (b.height || 0),
  );

  return (
    <View>
      {sortedVideoQualityList.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            dispatch(setQuality(item.index));
            dispatch(setAutoQuality(false));
          }}>
          <QualityText
            selectedQuality={!autoQuality ? item.index === quality : false}
            height={item.height}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => {
          dispatch(setAutoQuality(true));
        }}>
        <View
          style={[
            styles.item,
            {
              backgroundColor: autoQuality ? Theme.colors.primary : 'black',
            },
          ]}>
          <CustomText text={'auto'} style={styles.itemText} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VideoQualityComponent;

const QualityText = (props: any) => {
  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: props.selectedQuality
            ? Theme.colors.primary
            : 'black',
        },
      ]}>
      <CustomText text={props.height + 'p'} style={styles.itemText} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
  itemText: {
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
});
