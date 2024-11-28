import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Theme} from '../../constants/Theme';
import CustomText from '../../components/shared/CustomText';
import {ImageManager} from '../../constants/ImageManager';
import {WebSocketContext} from '../../context/WebSocketContext';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {Avatar} from 'native-base';
import {RootStackParamList} from '../../navigation/routes';
import {useAppSelector} from '../../redux/hooks';
import PreRegistrationView from '../preregistration/PreRegistrationView';

const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const todayday = new Date().getDate().toString().padStart(2, '0');
  if (todayday === date) {
    return `${hours}:${minutes}`;
  } else {
    return `${hours}:${minutes}`;
  }
};

type MessageProps = {
  title: string;
  content: string;
  date: string;
};

const MessagesView = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'DMs?'} />;
  }

  return (
    <View style={styles.view}>
      <ChatList />
      <NewChatButton />
    </View>
  );
};

export default MessagesView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

const ChatList = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {rooms} = useContext(WebSocketContext);
  return (
    <View
      style={{
        paddingHorizontal: 12,
        gap: 12,
      }}>
      {rooms.map(
        (room: any) =>
          room.last_message && (
            <ChatItem
              members={room.members}
              key={room.id}
              chatId={room.id.toString()}
              chatName={room.display_name}
              onClick={(chatId: string) => {
                console.log('onClick', chatId);
              }}
              lastMessage={room.last_message?.content ?? ''}
              lastMessageDate={
                room.last_message?.timestamp &&
                formatTimestamp(room.last_message?.timestamp)
              }
              unReadCount={room.unread_messages}
              sender={
                room.last_message?.user.uuid === user.uuid
                  ? 'You'
                  : room.last_message?.user.name
              }
            />
          ),
      )}
    </View>
  );
};

type ChatItemProps = {
  key: string;
  chatId: string;
  chatName: string;
  onClick: (chatId: string) => void;
  lastMessage: string;
  lastMessageDate: string;
  unReadCount: number;
  sender: string;
  members: any[];
};

const ChatItem = (props: ChatItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {
          roomId: props.chatId,
          isGroup: props.members.length > 2,
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
        <Avatar size="md" source={ImageManager.IMAGE_NAMES.MANAVATAR} />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              text={props.chatName}
              weight="bold"
              style={{color: Theme.colors.white}}
            />
            <CustomText
              text={props.lastMessageDate}
              style={{
                color: props.unReadCount > 0 ? Theme.colors.primary : '#D1D5DB',
                fontSize: Theme.fontSizes.xs,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
            <CustomText
              text={props.sender + ': ' + props.lastMessage}
              numberOfLines={1}
              style={{color: '#D1D5DB', fontSize: Theme.fontSizes.xs}}
            />
            {props.unReadCount > 0 && (
              <View
                style={{
                  position: 'relative',
                  backgroundColor: Theme.colors.primary,
                  borderRadius: 36,
                  height: 18,
                  width: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  text={`${props.unReadCount} `}
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: Theme.fontSizes['2xs'],
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NewChatButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LinearGradient
      colors={['#8b5cf6', '#a855f7']}
      style={{
        position: 'absolute',
        bottom: 48,
        right: 12,
        borderRadius: 36,
      }}>
      <TouchableOpacity
        style={{
          padding: 12,
        }}
        onPress={() => {
          navigation.navigate('NewChat');
        }}>
        <IconEntypo name="plus" size={24} color={Theme.colors.white} />
      </TouchableOpacity>
    </LinearGradient>
  );
};
