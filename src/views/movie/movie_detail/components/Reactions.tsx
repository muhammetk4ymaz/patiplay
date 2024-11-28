import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InteractionButton from './InteractionButton';
import EmojiesToggleComponent from '../../../../components/shared/EmojiesToggleComponent';
import {
  GiftIcon,
  HeartIcon,
  LikeIcon,
  PlayListAddIcon,
  ShareIcon,
} from '../../../../../assets/icons';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const Reactions = () => {
  const iconSize = 18;
  return (
    <View style={styles.view}>
      <InteractionButton
        icon={<LikeIcon size={iconSize} />}
        initialActive={false}
      />

      <InteractionButton
        icon={<HeartIcon size={iconSize} />}
        initialActive={false}
      />
      <InteractionButton
        icon={<PlayListAddIcon size={iconSize} />}
        initialActive={false}
      />
      <InteractionButton
        icon={<GiftIcon size={iconSize} />}
        initialActive={false}
      />
      <InteractionButton
        icon={
          <IconIonicons
            name="notifications-outline"
            size={iconSize}
            color={'white'}
          />
        }
        initialActive={false}
      />
      <InteractionButton
        icon={<ShareIcon size={iconSize} />}
        initialActive={false}
      />
    </View>
  );
};

export default React.memo(Reactions);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',

    gap: 12,
    justifyContent: 'flex-start',
  },
});
