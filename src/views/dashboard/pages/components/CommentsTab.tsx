import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Avatar, Button, Input} from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import DicussionNew from '../../../../components/shared/DicussionNew';
import {ReplyModal} from '../../../../components/shared/ReplyModal';
import {ImageManager} from '../../../../constants/ImageManager';
import {Theme} from '../../../../constants/Theme';
import nowPlayMovies from '../../../../models/now_play_movies';

const width = Dimensions.get('window').width;

type Props = {};

const CommentsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={loading}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <FlatList
          removeClippedSubviews={true}
          data={nowPlayMovies}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
            paddingVertical: 12,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <DicussionNew
              replyOnPress={() => {
                bottomSheetModalRef.current?.present();
              }}
            />
          )}></FlatList>
        <CommentInput />
        <ReplyModal bottomSheetRef={bottomSheetModalRef} />
      </View>
    );
  }
};

export default CommentsTab;

const styles = StyleSheet.create({});

const CommentInput = () => {
  const [value, onChangeText] = React.useState('');

  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

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
