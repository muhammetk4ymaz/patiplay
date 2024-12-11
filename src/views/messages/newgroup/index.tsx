import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/shared/CustomText';
import {Theme} from '../../../utils/theme';
import {WebSocketContext} from '../../../context/WebSocketContext';
import {Avatar} from 'native-base';
import {ImageManager} from '../../../constants/ImageManager';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';

import SearchField from '../../auth/components/SearchField';
import {characterLimited} from '../../dashboard/profile/favorite_companies';

import {RootStackParamList} from '../../../navigation/routes';
import CustomTextInput from '../../../components/shared/Inputs/CustomTextInput';

type NewGroupViewProps = {};

type User = {
  email: string;
  name?: string;
  surname?: string;
  id: number;
  uuid: string;
};

const NewGroupView = (props: NewGroupViewProps) => {
  const webSocketContext = React.useContext(WebSocketContext);
  const users: [] = webSocketContext.users;

  const horizontalSrcollRef = React.useRef<FlatList>(null);

  const [groupName, setGroupName] = React.useState('');

  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>(users);

  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    console.log('NewGroupView rendered');
  }, []);

  React.useEffect(() => {
    if (horizontalSrcollRef.current) {
      setTimeout(() => {
        horizontalSrcollRef.current?.scrollToEnd({animated: true});
      }, 200);
    }
  }, [selectedUsers]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    webSocketContext.setRoomCreatedCallback((room: any) => {
      console.log('room_created_callback', room);
      const roomId = room.id.toString();
      console.log('roomId', roomId);

      navigation.goBack();

      navigation.dispatch(
        StackActions.replace('Chat', {
          roomId: roomId.toString(),
          isGroup: true,
        }),
      );
    });
  }, []);

  React.useEffect(() => {
    const userList = users;
    const filtered = userList.filter((user: any) =>
      user.email.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [searchText]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingBottom: 36,
        paddingVertical: 12,
        gap: 12,
      }}>
      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <CustomTextInput
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Please enter a group name (optional)"
          label="Group Name"
        />
      </View>
      {selectedUsers.length > 0 && (
        <View>
          <FlatList
            ref={horizontalSrcollRef}
            data={selectedUsers}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              padding: Theme.paddings.viewHorizontalPadding,
              paddingVertical: 12,
              gap: 12,
            }}
            horizontal
            renderItem={({item}) => {
              return (
                <SelectedUserItem
                  item={item}
                  onPress={() => {
                    setSelectedUsers(prevUsers => {
                      return prevUsers.filter(user => user.id !== item.id);
                    });
                  }}
                />
              );
            }}
          />
        </View>
      )}
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <SearchField
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
          }}
        />
      </View>

      <FlatList
        data={filteredUsers}
        contentContainerStyle={{
          gap: Theme.spacing.columnGap,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        renderItem={({item}) => (
          <UserItem
            user={item}
            onPress={() => {
              if (selectedUsers.find(user => user.id === item.id)) {
                console.log('Item already selected');
              } else {
                setSelectedUsers(prevUsers => {
                  return [...prevUsers, item];
                });
                console.log('selectedUsers', selectedUsers);
              }
            }}
          />
        )}
      />
      {selectedUsers.length > 1 && (
        <View>
          <TouchableOpacity
            onPress={() => {
              webSocketContext.createRoom(
                groupName.trim() !== ''
                  ? groupName
                  : `Group Chat with ${selectedUsers.length} members`,
                true,
                selectedUsers.map(user => user.uuid),
              );
            }}
            style={{
              backgroundColor: Theme.colors.primary,
              padding: 12,
              borderRadius: 36,
              alignItems: 'center',
              justifyContent: 'center',
              margin: Theme.spacing.columnGap,
            }}>
            <CustomText
              text="Create Group"
              weight="bold"
              style={{color: 'white'}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NewGroupView;

const styles = StyleSheet.create({});

type UserItemProps = {
  user: User;
  onPress: () => void;
};

const UserItem = (props: UserItemProps) => {
  React.useEffect(() => {
    console.log('UserItem rendered');
  }, []);
  return (
    <TouchableOpacity
      onPress={props.onPress}
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
            // text={item.name + ' ' + item.surname}
            text={props.user.email}
            weight="bold"
            style={{color: Theme.colors.white}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

type SelectedUserItemProps = {
  item: User;
  onPress: () => void;
};

const SelectedUserItem = (props: SelectedUserItemProps) => {
  React.useEffect(() => {
    console.log('SelectedUserItem rendered');
  }, []);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    console.log('SelectedUserItem rendered');
    // Animasyonu başlat
    Animated.timing(fadeAnim, {
      toValue: 1, // Animasyon sonunda tam görünür olmalı
      duration: 500, // Animasyon süresi (500ms)
      useNativeDriver: true, // Performans için native driver kullanımı
    }).start();
  }, [fadeAnim]);

  // const removeUser = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0, // Animasyon sonunda tam görünür olmalı
  //     duration: 500, // Animasyon süresi (500ms)
  //     useNativeDriver: true, // Performans için native driver kullanımı
  //   }).start(() => {
  //     console.log('Animation finished');
  //     props.onPress();
  //   });
  // };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      <Pressable
        onPress={props.onPress}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
        <View>
          <Avatar size="lg" source={ImageManager.IMAGE_NAMES.MANAVATAR} />
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              backgroundColor: 'gray',
              borderRadius: 100,
              borderWidth: 2,
              borderColor: 'black',
              padding: 2,
            }}>
            <IconMaterialCommunityIcons name="close" size={14} color="white" />
          </View>
        </View>
        <CustomText
          text={characterLimited(props.item.name + ' ' + props.item.surname, 9)}
          style={{color: 'white'}}
        />
      </Pressable>
    </Animated.View>
  );
};
