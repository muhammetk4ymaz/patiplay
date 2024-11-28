import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {Theme} from '../../constants/Theme';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from './CustomText';
import Comment from '../../views/movie/movie_player/components/Comment';
import {Avatar, Input, Button} from 'native-base';
import {ImageManager} from '../../constants/ImageManager';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const ReplyModal = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}) => {
  console.log('FilterModal rendered');

  // variables
  const snapPoints = React.useMemo(() => ['60%', '90%'], []);

  const height = useSharedValue(Dimensions.get('window').height * 0.6);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const handleSheetChanges = React.useCallback((index: number) => {
    height.value = withTiming(
      index === 0
        ? Dimensions.get('window').height * 0.61
        : Dimensions.get('window').height * 0.93,
    );
  }, []);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const replies: any = ['Yanıt 1', 'Yanıt 2', 'Yanıt 3'];

  return (
    <BottomSheetModal
      backgroundStyle={{backgroundColor: Theme.colors.background}}
      handleIndicatorStyle={{backgroundColor: Theme.colors.white}}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      onChange={handleSheetChanges}>
      <Animated.View style={animatedStyle}>
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
              bottomSheetRef.current?.close();
            }}>
            <IconMaterialCommunityIcons
              name="close"
              size={24}
              color={Theme.colors.white}
              style={{padding: 4, right: -4}}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size="large" color={Theme.colors.primary} />
          </View>
        ) : (
          <BottomSheetFlatList
            contentContainerStyle={{paddingHorizontal: 18}}
            data={replies}
            keyExtractor={(item, index) => index.toString()}
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
                  <Comment />
                </TouchableOpacity>
              );
            }}
            renderItem={() => {
              return (
                <View style={{paddingLeft: 48, paddingVertical: 12}}>
                  <Comment />
                </View>
              );
            }}></BottomSheetFlatList>
        )}

        <CommentInput />
      </Animated.View>
    </BottomSheetModal>
  );
};

const CommentInput = () => {
  const [value, onChangeText] = React.useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true); // Klavye açıldığında durumu güncelle
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Klavye kapandığında durumu güncelle
        setKeyboardHeight(0);
      },
    );

    // Event listener'ları temizle
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{bottom: keyboardHeight}}>
      <Input
        borderRadius={0}
        value={value}
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
            onPress={() => {
              console.log('onSend');
            }}
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
