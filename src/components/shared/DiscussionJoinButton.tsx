import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onPress: () => void;
};

const DiscussionJoinButton = (props: Props) => {
  return (
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
  );
};

export default DiscussionJoinButton;

const styles = StyleSheet.create({});
