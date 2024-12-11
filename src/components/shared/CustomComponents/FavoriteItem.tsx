import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../utils/theme';
import {characterLimited} from '../../../views/dashboard/profile/favorite_companies';
import CircularAvatar from '../CircularAvatar';
import CustomText from '../CustomText';
import CustomTextButton from '../Buttons/CustomTextButton';
import {calculateGridItemWidth} from '../../../utils/calculateGridItemWidth';
import {ImageManager} from '../../../constants/ImageManager';

const SPACE = Theme.spacing.columnGap;

type Props = {
  image: string;
  name: string;
  description: string;
  buttonText: string;
  onPress: () => void;
};

const FavoriteItem = (props: Props) => {
  return (
    <View
      style={{
        gap: SPACE,
        alignItems: 'center',
        width: calculateGridItemWidth(3),
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          position: 'absolute',
          right: -4,
          top: -4,
          padding: 4,
        }}>
        <IconIonicons name="ellipsis-vertical" color={'white'} size={20} />
      </TouchableOpacity>
      <CircularAvatar
        imagePath={
          props.image
            ? {
                uri: props.image,
              }
            : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
        }
      />
      <View>
        <CustomText
          numberOfLines={1}
          text={characterLimited(props.name, 12)}
          weight="medium"
          style={{
            color: 'white',
            textAlign: 'center',

            fontSize: Theme.fontSizes.sm,
          }}
        />
        <CustomText
          text={props.description}
          numberOfLines={1}
          weight="medium"
          style={{
            fontSize: Theme.fontSizes.xs,
            textAlign: 'center',
            color: 'white',
            opacity: 0.5,
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <CustomTextButton
            text={props.buttonText}
            paddingVertical={6}
            borderRadius={36}
            paddingHorizontal={16}
            backgroundColor={'#202124'}
            onPress={props.onPress}
            textStyle={{
              fontSize: Theme.fontSizes.sm,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(FavoriteItem);

const styles = StyleSheet.create({});
