import {
  Dimensions,
  ImageSourcePropType,
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
import {Theme} from '../../../../../utils/theme';
import {calculateGridItemWidth} from '../../../../../utils/calculateGridItemWidth';
import CircularAvatar from '../../../../../components/shared/CircularAvatar';
import {ChartRatingLabel} from '../../../../../components/shared/Labels/ChartRatingLabel';

const {width} = Dimensions.get('window');

type Props = {
  avatarUrl: ImageSourcePropType;
  title: string;
  subtitle: string;
  rate: number;
  onPress: () => void;
};

const ChartOtherItem = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        gap: 12,
        alignItems: 'center',
        width: calculateGridItemWidth(3),
      }}
      onPress={props.onPress}>
      <View>
        <CircularAvatar imagePath={props.avatarUrl} />
        <ChartRatingLabel rating={props.rate} />
      </View>
      <View>
        <CustomText
          numberOfLines={1}
          text={characterLimited(props.title, 12)}
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
