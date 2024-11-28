import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {Theme} from '../../../constants/Theme';
import {WebSocketContext} from '../../../context/WebSocketContext';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import CustomText from '../../../components/shared/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {ImageManager} from '../../../constants/ImageManager';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Avatar, Button, Input} from 'native-base';
import {RootStackParamList} from '../../../navigation/routes';

type Props = {};

type RouteParams = {
  Chat: {
    roomId: string;
    isGroup: boolean;
  };
};

const ChatView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Chat'>>();
  console.log(route.params.isGroup);
  const webSocketContext = React.useContext(WebSocketContext);
  const room = webSocketContext.rooms.find(
    (room: any) => room.id.toString() === route.params.roomId,
  );

  const scrollRef = React.useRef<FlatList>(null);
  const messages: any[] =
    webSocketContext.rooms.find(
      (room: any) => room.id.toString() === route.params.roomId,
    )?.messages ?? [];

  const messageCount =
    webSocketContext.rooms.find(
      (room: any) => room.id.toString() === route.params.roomId,
    )?.messages_count ?? [];

  const prevMessagesRef = React.useRef(messages);

  const user = useSelector((state: RootState) => state.auth.user);

  React.useEffect(() => {
    webSocketContext.connectRoom(route.params.roomId);

    return () => {
      webSocketContext.disconnectRoom(route.params.roomId);
    };
  }, []);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Klavye açıldığında en son mesaja kaydır
        scrollToBottom();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Klavye kapanınca herhangi bir işlem yapılabilir
      },
    );

    // Cleanup listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  React.useEffect(() => {
    if (messages !== undefined) {
      const prevMessages = prevMessagesRef.current;
      const prevLastMessage = prevMessages[0];
      const currentLastMessage = messages[0];

      if (prevLastMessage !== currentLastMessage) {
        scrollToBottom();
      }

      prevMessagesRef.current = messages;
    }
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messages.length > 0) {
        scrollRef.current?.scrollToIndex({
          index: 0,
          viewOffset: 12,
          animated: true,
        });
      }
    }, 100);
  };

  // const scrollToFirstMessage = () => {
  //   setTimeout(() => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollToEnd({
  //         animated: true,
  //       });
  //     }
  //   }, 200);
  // };

  return (
    <SafeAreaView style={styles.view}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.select({ios: 'padding', android: 'height'})}>
        <Header displayName={room?.display_name} />
        <FlatList
          ref={scrollRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          inverted
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            paddingVertical: 12,
          }}
          renderItem={({item, index}) =>
            route.params.isGroup ? (
              <GroupMessage
                isSenderMe={item.user.email === user.email}
                content={item.content}
                id={item.id}
                sender={item.user}
              />
            ) : (
              <Message
                isSenderMe={item.user.email === user.email}
                content={item.content}
                id={item.id}
              />
            )
          }
          ListFooterComponent={() => {
            if (messageCount > messages.length) {
              return (
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    webSocketContext.getOlderMessages(route.params.roomId);
                  }}>
                  <CustomText text="Daha Fazla" style={{color: '#007AFF'}} />
                </TouchableOpacity>
              );
            }
          }}
        />
        <ChatInput roomId={route.params.roomId} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

type ChatInputProps = {
  roomId: string;
};

const ChatInput = (props: ChatInputProps) => {
  const [value, onChangeText] = React.useState('');
  const webSocketContext = useContext(WebSocketContext);
  return (
    <Input
      borderRadius={0}
      value={value}
      onChangeText={text => onChangeText(text)}
      placeholder={'Your Message'}
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
            if (value.trim() !== '') {
              webSocketContext.sendMessage(props.roomId, value);
              onChangeText('');
            }
          }}
          _pressed={{
            backgroundColor: 'transparent',
          }}>
          <IconIonicons name="send" size={24} color={Theme.colors.primary} />
        </Button>
      }
    />
  );
};

type MessageProps = {
  isSenderMe: boolean;
  content: string;
  id: string;
};

const Message = (props: MessageProps) => {
  return (
    <LinearGradient
      colors={
        props.isSenderMe ? ['#8b5cf6', '#a855f7'] : ['#4A5568', '#2D3748']
      }
      style={{
        alignSelf: props.isSenderMe ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
      }}>
      <CustomText text={props.content} style={{color: Theme.colors.white}} />
    </LinearGradient>
  );
};

type GroupMessageProps = {
  isSenderMe: boolean;
  content: string;
  id: string;
  sender: any;
};

const GroupMessage = (props: GroupMessageProps) => {
  return (
    <LinearGradient
      colors={
        props.isSenderMe ? ['#8b5cf6', '#a855f7'] : ['#4A5568', '#2D3748']
      }
      style={{
        alignSelf: props.isSenderMe ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: Theme.colors.gray,
      }}>
      {!props.isSenderMe ? (
        <CustomText
          text={props.sender.name + ' ' + props.sender.surname}
          style={{color: Theme.colors.sambucus}}
          weight="bold"
        />
      ) : null}
      <CustomText text={props.content} style={{color: Theme.colors.white}} />
    </LinearGradient>
  );
};

type HeaderProps = {
  displayName: string;
};

const Header = React.memo((props: HeaderProps) => {
  console.log('Header Rendered');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 12,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 8}}>
          <IconIonicons
            name="chevron-back"
            size={Theme.menuIconSize}
            color={'white'}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Avatar source={ImageManager.IMAGE_NAMES.MANAVATAR} size={'sm'} />
          <View>
            <CustomText
              text={props.displayName}
              style={{color: 'white'}}
              weight="bold"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          height: 24,
          width: 24,
        }}>
        <IconIonicons name="ellipsis-vertical" color={'white'} size={24} />
      </TouchableOpacity>
    </View>
  );
});
