import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  setReplySectionVisible,
  setReplyInputVisible,
} from '../../../../redux/features/interaction/interactionSlice';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import Comment from './Comment';
import {Avatar, FlatList} from 'native-base';
import Reply from './Reply';
import {ImageManager} from '../../../../constants/ImageManager';

type Props = {};

const Replies = (props: Props) => {
  const replies: any = ['Yanıt 1', 'Yanıt 2', 'Yanıt 3'];

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        contentContainerStyle={{padding: 12}}
        data={replies}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <TouchableOpacity
              style={styles.comment}
              onPress={() => {
                dispatch(setReplyInputVisible(true));
              }}>
              <Comment />
            </TouchableOpacity>
          );
        }}
        renderItem={() => {
          return (
            <View style={styles.reply}>
              <Reply />
            </View>
          );
        }}></FlatList>
      <ReplyInput />
    </View>
  );
};

export default React.memo(Replies);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.background,
    zIndex: 1,
  },
  comment: {
    padding: 12,
    backgroundColor: Theme.colors.sambucus,
    borderRadius: 12,
    marginBottom: 12,
  },
  reply: {
    paddingLeft: 48,
    paddingVertical: 12,
  },
});

const Header = React.memo(() => {
  const dispatch = useAppDispatch();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setReplySectionVisible(false));
          dispatch(setReplyInputVisible(false));
        }}
        style={{padding: 12}}>
        <IconIonicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <CustomText
        text="Yanıtlar"
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: Theme.fontSizes.lg,
        }}></CustomText>
    </View>
  );
});

const ReplyInput = React.memo(() => {
  const dispatch = useAppDispatch();
  const replyInputText = useAppSelector(
    state => state.interaction.replyInputText,
  );
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
      <Avatar
        borderColor={Theme.colors.gray}
        borderWidth={1}
        source={ImageManager.IMAGE_NAMES.ANGRYEMOJI}
        size="xs"
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(setReplyInputVisible(true));
        }}
        style={{
          flex: 1,
          borderRadius: 4,
          backgroundColor: '#1F1F1F',
          paddingVertical: 8,
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText
          text={replyInputText || 'Yanıt ekleyin...'}
          style={{color: Theme.colors.gray}}></CustomText>
      </TouchableOpacity>
    </View>
  );
});
