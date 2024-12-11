import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TopMovie from '../../../../models/top_movie';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import OverlayView from '../../../../components/shared/OverlayView';
import FastImage from 'react-native-fast-image';
import SoldOutLabel from '../../../../components/shared/Labels/SoldOutLabel';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import {DigitalGalaModel} from '../../../../models/patiplay/DigitalGalaModel';

const {width, height} = Dimensions.get('window');

type PremiereTitleCardProps = {
  item?: DigitalGalaModel;
};

const PremiereTitleCard = (props: PremiereTitleCardProps) => {
  console.log('isActive', props.item?.is_active);

  const isExpired = !props.item?.is_active || false;
  const isJoinable = props.item?.is_joinable || false;

  return (
    <TouchableOpacity
      disabled={isExpired}
      style={{
        width: calculateGridItemWidth(4),
        aspectRatio: Theme.aspectRatios.vertical,
        borderRadius: Theme.titlePosterRadius,
        justifyContent: 'flex-end',
      }}>
      <FastImage
        source={{
          uri: props.item?.title?.verticalPhotos[0].url,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: Theme.titlePosterRadius,
          },
        ]}
      />
      {!isExpired && (
        <SeatLabel
          remainingSeatCount={
            props.item?.quota! - (props.item?.users?.length || 0)
          }
        />
      )}
      {!isJoinable && <SoldOutLabel />}
      {isExpired && <OverlayView />}
    </TouchableOpacity>
  );
};

export default React.memo(PremiereTitleCard);

const SeatLabel = (props: {remainingSeatCount: number}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderTopLeftRadius: 8,

          borderBottomRightRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          backgroundColor:
            props.remainingSeatCount < 100
              ? 'rgba(255, 0, 0,0.5)'
              : 'rgba(17, 24, 39,0.5)',
        }}>
        <IconMaterialCommunityIcons name="seat" size={10} color={'#E0E0E0'} />
        <CustomText
          text={props.remainingSeatCount.toString()}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes['2xs'],
          }}
        />
      </View>
    </View>
  );
};
