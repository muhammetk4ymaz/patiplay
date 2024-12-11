import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {Dimensions, Keyboard, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../utils/theme';
import CustomText from './CustomText';
import {Avatar, Button, FlatList, Input} from 'native-base';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageManager} from '../../constants/ImageManager';
import Comment from './Comment/Comment';
import networkService from '../../helpers/networkService';

type ReplyModalProps = {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  data: any;
  onSend: () => void;
  endpoint: string;
};

export const ReplyModal = (props: ReplyModalProps) => {
  const ReplyInputRef = React.useRef<any>(null);

  const [reply, setReplyText] = React.useState('');

  const [replyId, setReplyId] = React.useState(props.data?.id);

  const insets = useSafeAreaInsets();

  const snapPoints = React.useMemo(
    () => [
      Dimensions.get('window').height * 0.63,
      Dimensions.get('window').height * 0.93,
    ],
    [],
  );
  const height = useSharedValue(Dimensions.get('window').height * 0.6);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  React.useEffect(() => {
    if (props.data) {
      setReplyId(props.data.id);
      console.log('Reply Data', props.data.replies);
    }
  }, [props.data]);

  const handleSheetChanges = React.useCallback((index: number) => {
    height.value = withTiming(
      index === 0
        ? Dimensions.get('window').height * 0.6
        : Dimensions.get('window').height * 0.9,
    );
  }, []);

  const scrollRef = React.useRef<any>(null);

  return (
    <BottomSheetModal
      backgroundStyle={{backgroundColor: Theme.colors.background}}
      handleIndicatorStyle={{backgroundColor: Theme.colors.white}}
      ref={props.bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      onDismiss={() => {
        setReplyText('');
      }}
      containerStyle={{
        pointerEvents: 'auto',
      }}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      onChange={handleSheetChanges}>
      <Animated.View style={[animatedStyle]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 18,
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <CustomText
            text="Replies"
            style={{color: Theme.colors.white, fontSize: Theme.fontSizes.lg}}
          />
          <TouchableOpacity
            onPress={() => {
              props.bottomSheetRef.current?.close();
            }}>
            <IconMaterialCommunityIcons
              name="close"
              size={24}
              color={Theme.colors.white}
              style={{padding: 4, right: -4}}
            />
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList
          contentContainerStyle={{paddingHorizontal: 18}}
          data={props.data?.replies || []}
          ref={scrollRef}
          style={{flex: 1}}
          keyExtractor={(item, index) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor: Theme.colors.sambucus,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
                onPress={() => {}}>
                <Comment
                  endpoint={props.endpoint}
                  item={props.data}
                  replyOnPress={() => {
                    console.log('ReplyOnPress');
                    setReplyText('');
                    setReplyId(props.data.id);
                    ReplyInputRef.current?.focus();
                  }}
                />
              </TouchableOpacity>
            );
          }}
          renderItem={({item}: {item: any}) => {
            return (
              <View style={{paddingLeft: 48, paddingVertical: 12}}>
                <Replies
                  bottomSheetModalRef={ReplyInputRef}
                  data={item}
                  endpoint={props.endpoint}
                  replyOnPress={(username: string, id: number) => {
                    console.log('ReplyOnPress');
                    setReplyText(username + ' ');
                    setReplyId(id);
                    ReplyInputRef.current?.focus();
                  }}
                />
              </View>
            );
          }}></BottomSheetFlatList>

        <ReplyInput
          endpoint={props.endpoint}
          commentId={replyId}
          onSend={() => {
            setTimeout(() => {
              if (props.data?.replies.length > 0) {
                scrollRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                  viewOffset: 12,
                });
              }
            }, 500);
            setReplyId(props.data.id);
            props.onSend();
          }}
          ref={ReplyInputRef}
          reply={reply}
        />
      </Animated.View>
    </BottomSheetModal>
  );
};

type ReplyInputProps = {
  commentId: number;
  onSend: () => void;
  reply: string;
  endpoint: string;
};

export const ReplyInput = React.forwardRef(
  (props: ReplyInputProps, ref: any) => {
    const [reply, onChangeText] = React.useState(props.reply);
    const insets = useSafeAreaInsets();
    const bottom = useSharedValue(insets.bottom);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        marginBottom: bottom.value,
      };
    });

    React.useEffect(() => {
      onChangeText(props.reply); // props.reply değiştiğinde reply state'ini güncelliyoruz
      return () => {
        onChangeText(''); // unmount olduğunda reply state'ini sıfırlıyoruz
      };
    }, [props.reply]); // props.reply her değiştiğinde güncellenir

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

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    React.useEffect(() => {
      console.log('ReplyInput rendered');
      console.log('ReplyInput reply', props.reply);
    }, []);

    const onSend = async () => {
      // console.log('CommentId', props.commentId);
      // console.log('Reply', reply);
      // console.log('Uuid', props.commentId);
      try {
        if (reply.trim() !== '') {
          const response = await networkService.post(
            `title/api/${props.endpoint}-reply/`,
            {comment: props.commentId, reply: reply, uuid: props.commentId},
          );

          if (response.data.status === 200) {
            console.log('Reply sent');
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
          ref={ref}
          borderRadius={0}
          value={reply}
          onChangeText={text => onChangeText(text)}
          placeholder={'Your Reply'}
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
              <IconIonicons
                name="send"
                size={24}
                color={Theme.colors.primary}
              />
            </Button>
          }
        />
      </Animated.View>
    );
  },
);

type RepliesProps = {
  data: any;
  endpoint: string;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  replyOnPress: (username: string, id: number) => void;
};

const Replies = (props: RepliesProps) => {
  React.useEffect(() => {
    console.log('Replies data', props.data);
  });
  return (
    <View>
      <Comment
        endpoint={props.endpoint}
        item={props.data}
        replyOnPress={() => {
          props.replyOnPress(props.data.username, props.data.id);
        }}
      />
      {props.data.replies.length > 0 && (
        <FlatList // FlatList içinde FlatList
          data={props.data.replies}
          scrollEnabled={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}: {item: any}) => {
            return (
              <Replies
                bottomSheetModalRef={props.bottomSheetModalRef}
                data={item}
                endpoint={props.endpoint}
                replyOnPress={(username: string, id: number) => {
                  props.replyOnPress(username, id);
                }}
              />
            );
          }}></FlatList>
      )}
    </View>
  );
};
