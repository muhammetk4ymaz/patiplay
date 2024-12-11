import React from 'react';
import {Keyboard} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import networkService from '../../../helpers/networkService';
import {Avatar, Button, Input} from 'native-base';
import {Theme} from '../../../utils/theme';
import {ImageManager} from '../../../constants/ImageManager';
import IconIonicons from 'react-native-vector-icons/Ionicons';

type CommentInputProps = {
  uuid: string;
  onSend: () => void;
  endpoint: string;
};

export const CommentInput = (props: CommentInputProps) => {
  const insets = useSafeAreaInsets();
  const [comment, onChangeText] = React.useState('');
  const bottom = useSharedValue(insets.bottom);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: bottom.value,
    };
  });

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        bottom.value = withTiming(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        bottom.value = withTiming(insets.bottom);
      },
    );

    // Event listener'ları temizle
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSend = async () => {
    // console.log('CommentId', props.uuid);
    try {
      if (comment.trim() !== '') {
        const response = await networkService.post(
          `title/api/${props.endpoint}-view/`,
          // 'title/api/company-comment-view/',
          {comment: comment, uuid: props.uuid},
        );

        if (response.data.status === 200) {
          Keyboard.dismiss();
          onChangeText('');
          props.onSend();
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Input
        borderRadius={0}
        value={comment}
        onChangeText={text => onChangeText(text)}
        placeholder={'Your Comment'}
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
    </Animated.View>
  );
};
