import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';

type Props = {
  users: number;
  onPress: () => void;
};

const DiscussionJoinButton = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={props.onPress}>
        <IconMaterialCommunityIcons
          name="account-group-outline"
          color="white"
          size={24}
        />
      </TouchableOpacity>
      <CustomText
        text={props.users.toString()}
        style={{color: '#D1D5DB', fontSize: Theme.fontSizes.xs}}
      />
    </View>
  );
};

export default DiscussionJoinButton;

const styles = StyleSheet.create({});
