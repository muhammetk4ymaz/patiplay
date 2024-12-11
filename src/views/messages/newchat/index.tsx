import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {RootStackParamList} from '../../../navigation/routes';

type Props = {};

const NewChatView = (props: Props) => {
  const webSocketContext = React.useContext(WebSocketContext);
  const users = webSocketContext.users;

  const [searchText, setSearchText] = React.useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    webSocketContext.setRoomCreatedCallback((room: any) => {
      console.log('room_created_callback', room);
      const roomId = room.id.toString();
      console.log('roomId', roomId);

      navigation.dispatch(
        StackActions.replace('Chat', {
          roomId: roomId.toString(),
          isGroup: false,
        }),
      );
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SearchField
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
        }}
      />
      <FlatList
        data={users}
        ListHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NewGroup');
                }}
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View
                  style={{
                    // height: 48,
                    // width: 48,
                    padding: 8,
                    backgroundColor: 'rgb(40, 40, 40)',
                    borderRadius: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconMaterialCommunityIcons
                    name="account-group"
                    size={32}
                    color="white"
                  />
                </View>
                <CustomText
                  text="Create a new group"
                  style={{color: 'white', fontSize: Theme.fontSizes.md}}
                />
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgb(40, 40, 40)',
                  marginTop: Theme.spacing.columnGap,
                }}></View>
            </View>
          );
        }}
        contentContainerStyle={{
          marginTop: 12,
          gap: Theme.spacing.columnGap,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              webSocketContext.createRoom(item.username || item.email, false, [
                item.uuid,
              ]);
            }}
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
                  text={item.email}
                  weight="bold"
                  style={{color: Theme.colors.white}}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NewChatView;

const styles = StyleSheet.create({});
