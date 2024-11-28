import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Avatar, FlatList} from 'native-base';
import {Theme} from '../../../../constants/Theme';
import CustomText from '../../../../components/shared/CustomText';
import {EmojiLaughIcon} from '../../../../../assets/icons';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  setChatInputText,
  setChatInputVisible,
} from '../../../../redux/features/interaction/interactionSlice';
import Comment from './Comment';

type Props = {};

const Live = (props: Props) => {
  const comments = ['Yorum 1', 'Yorum 2'];

  console.log(Live.name);

  return (
    <View style={{paddingTop: 12, height: '100%'}}>
      <FlatList
        data={comments}
        contentContainerStyle={{paddingHorizontal: 18, paddingVertical: 5}}
        ItemSeparatorComponent={() => {
          return <View style={{height: 10}}></View>;
        }}
        renderItem={() => {
          return <Comment />;
        }}
      />
      <ChatInput />
    </View>
  );
};

export default React.memo(Live);

const ChatInput = React.memo(() => {
  const chatInputText = useAppSelector(
    state => state.interaction.chatInputText,
  );
  const dispatch = useAppDispatch();

  console.log('ChatInput rendered');
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        borderTopColor: 'gray',
        borderWidth: 1,
      }}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setChatInputVisible(true));
        }}
        style={{
          flex: 1,
          borderRadius: 36,
          backgroundColor: '#1F1F1F',
          paddingVertical: 8,
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText
          text={chatInputText || 'Sohbet...'}
          style={{color: Theme.colors.gray}}></CustomText>
        <EmojiLaughIcon size={24} />
      </TouchableOpacity>
      {chatInputText && (
        <TouchableOpacity
          onPress={() => {
            dispatch(setChatInputText(''));
          }}>
          <CustomText text="Gönder" style={{color: Theme.colors.primary}} />
        </TouchableOpacity>
      )}
    </View>
  );
});
