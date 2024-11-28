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
import {Theme} from '../../../../constants/Theme';
import SoldOutLabel from '../../../../components/shared/SoldOutLabel';
import OverlayView from '../../../../components/shared/OverlayView';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

type PremiereTitleCardProps = {
  title: TopMovie;
  isExpired: boolean;
  remainingSeatCount: number;
};

const PremiereTitleCard = (props: PremiereTitleCardProps) => {
  return (
    <TouchableOpacity
      disabled={props.isExpired}
      style={{
        width: (width - 2 * Theme.paddings.viewHorizontalPadding - 36) / 4,
        aspectRatio: 2000 / 3000,
        borderRadius: 12,
        justifyContent: 'flex-end',
      }}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.title.poster_path}`,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: 12,
          },
        ]}
      />
      {!props.isExpired && (
        <SeatLabel remainingSeatCount={props.remainingSeatCount} />
      )}
      {props.isExpired && <SoldOutLabel />}
      {props.isExpired && <OverlayView />}
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
