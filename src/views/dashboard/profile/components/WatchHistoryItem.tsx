import {Dimensions, TouchableOpacity, View} from 'react-native';
import TitleWithProgress from '../../../../components/shared/CustomComponents/TitleWithProgress';
import CustomText from '../../../../components/shared/CustomText';
import DeviceInfo from 'react-native-device-info';
import React from 'react';
import {Theme} from '../../../../constants/Theme';

const width = Dimensions.get('window').width;

const WatchHistoryItem = ({
  backdropPath,
  title,
  type,
}: {
  backdropPath: string;
  title: string;
  type: 'movie' | 'clip' | 'episode' | 'trailer';
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('WatchHistoryItem');
      }}
      style={{
        gap: 5,
        width: DeviceInfo.isTablet()
          ? width / 4
          : (width -
              2 * Theme.paddings.viewHorizontalPadding -
              2 * Theme.spacing.rowGap) /
            2,
      }}>
      <TitleWithProgress
        backdropPath={backdropPath}
        percentage={50}
        runtime={120}
      />

      <View style={{paddingRight: 10}}>
        <CustomText
          numberOfLines={1}
          text={
            type === 'episode'
              ? 'S4 E18 • Entrance'
              : type === 'clip'
              ? 'This Is A Clip Title'
              : type === 'trailer'
              ? 'Trailer'
              : title
          }
          style={{color: 'white', fontSize: 12}}
          weight="light"
        />
        {type !== 'movie' && (
          <CustomText
            numberOfLines={1}
            text={title}
            style={{
              color: 'white',
              fontSize: 12,
              opacity: 0.5,
              textAlign: 'left',
            }}
            weight="light"
          />
        )}

        <CustomText
          numberOfLines={1}
          text={'Mar 18 | 2m enjoyed'}
          style={{
            color: 'white',
            fontSize: 12,
            opacity: 0.5,
            textAlign: 'left',
          }}
          weight="light"
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(WatchHistoryItem);
