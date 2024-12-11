import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {Avatar, Button, Input} from 'native-base';
import {
  setChatInputText,
  setChatInputVisible,
  setCommentInputText,
  setCommentInputVisible,
  setReplyInputText,
  setReplyInputVisible,
} from '../../../../redux/features/interaction/interactionSlice';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../../utils/theme';
import OutsidePressHandler from 'react-native-outside-press';
import {ImageManager} from '../../../../constants/ImageManager';

type Props = {};

const InteractionInputs = (props: Props) => {
  const dispatch = useAppDispatch();
  const chatInputText = useAppSelector(
    state => state.interaction.chatInputText,
  );
  const replyInputText = useAppSelector(
    state => state.interaction.replyInputText,
  );
  const commentInputText = useAppSelector(
    state => state.interaction.commentInputText,
  );
  const chatInputVisible = useAppSelector(
    state => state.interaction.chatInputVisible,
  );
  const replyInputVisible = useAppSelector(
    state => state.interaction.replyInputVisible,
  );

  const commentInputVisible = useAppSelector(
    state => state.interaction.commentInputVisible,
  );

  if (chatInputVisible) {
    return (
      <OutsidePressHandler
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        onOutsidePress={() => {
          dispatch(setChatInputVisible(false));
        }}>
        <InteractionInput
          onBlur={() => {
            dispatch(setChatInputVisible(false));
          }}
          onChangeText={text => {
            dispatch(setChatInputText(text));
          }}
          onSend={() => {
            dispatch(setChatInputVisible(false));
          }}
          value={chatInputText}
          placeholder="Sohbet edin..."
        />
      </OutsidePressHandler>
    );
  }

  if (replyInputVisible) {
    return (
      <OutsidePressHandler
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        onOutsidePress={() => {
          dispatch(setReplyInputVisible(false));
        }}>
        <InteractionInput
          onBlur={() => {
            dispatch(setReplyInputVisible(false));
          }}
          onChangeText={text => {
            dispatch(setReplyInputText(text));
          }}
          onSend={() => {
            dispatch(setReplyInputVisible(false));
          }}
          value={replyInputText}
          placeholder="Yanıt ekleyin..."
        />
      </OutsidePressHandler>
    );
  }

  if (commentInputVisible) {
    return (
      <OutsidePressHandler
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        onOutsidePress={() => {
          dispatch(setCommentInputVisible(false));
        }}>
        <InteractionInput
          onBlur={() => {
            dispatch(setCommentInputVisible(false));
          }}
          onChangeText={text => {
            dispatch(setCommentInputText(text));
          }}
          onSend={() => {
            dispatch(setCommentInputVisible(false));
          }}
          value={commentInputText}
          placeholder="Yorum ekleyin..."
        />
      </OutsidePressHandler>
    );
  }
};

export default React.memo(InteractionInputs);

const styles = StyleSheet.create({});

const InteractionInput = ({
  onBlur,
  onChangeText,
  onSend,
  value,
  placeholder,
}: {
  onBlur: () => void;
  onChangeText: (text: string) => void;
  onSend: () => void;
  value: string;
  placeholder: string;
}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View
      style={{
        position: 'absolute',
        bottom: keyboardHeight > 0 ? keyboardHeight : 0,
        width: '100%',
      }}>
      <Input
        borderRadius={0}
        autoFocus
        disableFullscreenUI
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        variant="filled"
        bg="black"
        color="white"
        borderColor="transparent"
        _focus={{
          cursorColor: Theme.colors.primary,
          borderColor: 'transparent',
          backgroundColor: 'black',
        }}
        InputLeftElement={
          <Avatar
            borderColor={Theme.colors.gray}
            borderWidth={1}
            marginLeft={2}
            source={ImageManager.IMAGE_NAMES.ANGRYEMOJI}
            size="xs"
          />
        }
        InputRightElement={
          <Button
            variant="unstyled"
            onPress={onSend}
            _pressed={{
              backgroundColor: 'transparent',
            }}>
            <IconIonicons name="send" size={24} color={Theme.colors.primary} />
          </Button>
        }
      />
    </View>
  );
};
