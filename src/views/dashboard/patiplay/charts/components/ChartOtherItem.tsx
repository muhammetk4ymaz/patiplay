import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Avatar} from 'native-base';
import {ImageManager} from '../../../../../constants/ImageManager';
import CustomText from '../../../../../components/shared/CustomText';
import {characterLimited} from '../../../profile/favorite_companies';
import {Theme} from '../../../../../constants/Theme';

const {width} = Dimensions.get('window');

type Props = {
  onPress: () => void;
};

const ChartOtherItem = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        gap: 12,
        alignItems: 'center',
        width:
          (width -
            2 * Theme.paddings.viewHorizontalPadding -
            2 * Theme.spacing.rowGap) /
          3,
      }}
      onPress={props.onPress}>
      <View style={{}}>
        <Avatar size="lg" source={ImageManager.IMAGE_NAMES.MANAVATAR} />
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 36,
            alignSelf: 'flex-end',
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center',
            top: -8,
            right: -8,
          }}>
          <CustomText
            text="14"
            weight="medium"
            style={{
              color: 'white',
              fontSize: 18,
            }}
          />
        </View>
      </View>
      <View>
        <CustomText
          numberOfLines={1}
          text={characterLimited('Beren Saat', 12)}
          weight="medium"
          style={{
            color: 'white',
            textAlign: 'center',

            fontSize: Theme.fontSizes.sm,
          }}
        />
        <CustomText
          text="13 in My Network"
          numberOfLines={1}
          weight="medium"
          style={{
            fontSize: Theme.fontSizes.sm,
            textAlign: 'center',
            color: 'white',
            opacity: 0.5,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ChartOtherItem;

const styles = StyleSheet.create({});
