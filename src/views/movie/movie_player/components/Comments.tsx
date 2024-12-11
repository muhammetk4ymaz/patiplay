import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  setCommentInputVisible,
  setReplyInputVisible,
  setReplySectionVisible,
} from '../../../../redux/features/interaction/interactionSlice';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import Comment from './Comment';
import {Avatar, Button} from 'native-base';
import {ImageManager} from '../../../../constants/ImageManager';

type Props = {};

const Comments = (props: Props) => {
  const dispatch = useAppDispatch();
  const comments = [<Comment />, <Comment />];
  return (
    <View style={{paddingTop: 12, height: '100%'}}>
      <FlatList
        data={comments}
        contentContainerStyle={{paddingHorizontal: 18, paddingVertical: 5}}
        ItemSeparatorComponent={() => {
          return <View style={{height: 10}}></View>;
        }}
        renderItem={() => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setReplySectionVisible(true));
                }}>
                <Comment />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', paddingLeft: 35}}>
                <Button
                  variant={'solid'}
                  onPress={() => {
                    dispatch(setReplySectionVisible(true));
                  }}
                  _pressed={{
                    _text: {
                      color: 'transparent',
                    },
                  }}
                  background={'transparent'}
                  _text={{
                    color: '#3ea6ff',
                  }}>
                  3 yanıt
                </Button>
              </View>
            </View>
          );
        }}
      />
      <CommentInput />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  commentInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderTopColor: 'gray',
    borderWidth: 1,
  },
});

const CommentInput = () => {
  const dispatch = useAppDispatch();
  const commentInputText = useAppSelector(
    state => state.interaction.commentInputText,
  );
  return (
    <View style={styles.commentInput}>
      <Avatar
        borderColor={Theme.colors.gray}
        borderWidth={1}
        source={ImageManager.IMAGE_NAMES.ANGRYEMOJI}
        size="xs"
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(setCommentInputVisible(true));
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
          text={commentInputText || 'Yorum ekleyin...'}
          style={{color: Theme.colors.gray}}></CustomText>
      </TouchableOpacity>
    </View>
  );
};
