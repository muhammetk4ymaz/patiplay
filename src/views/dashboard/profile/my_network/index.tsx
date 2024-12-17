import {BottomSheetModal} from '@gorhom/bottom-sheet';
import axios from 'axios';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import CustomTextButton from '../../../../components/shared/Buttons/CustomTextButton';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import CustomBottomSheetModal from '../../../../components/shared/CustomBottomSheetModal';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import networkService from '../../../../helpers/networkService';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import {Theme} from '../../../../utils/theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

export const characterLimited = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

const SPACE = 12;

type MyNetworkViewProps = {};

const MyNetworkView = (props: MyNetworkViewProps) => {
  const [loading, setLoading] = React.useState(true);

  const [myNetworkData, setMyNetworkData] = React.useState<any[]>();

  const fetchMyNetworkData = async () => {
    try {
      const response = await networkService.get('title/api/my-network/');

      console.log('Response My Network', response.data.my_network);

      setMyNetworkData(response.data.my_network);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

              break;
            case 401:
              console.log(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );

              break;
            case 500:
              console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

              break;
            default:
              console.log(
                'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          console.log(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [selectedUser, setSelectedUser] = React.useState<string>();

  React.useEffect(() => {
    fetchMyNetworkData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        data={myNetworkData}
        numColumns={3}
        columnWrapperStyle={{
          gap: SPACE,
        }}
        contentContainerStyle={{
          paddingHorizontal: SPACE,
          paddingVertical: 12,
          gap: SPACE * 2,
        }}
        keyExtractor={item => item.username}
        renderItem={({item}) => (
          <MyNetworkItem
            user={item}
            onPress={() => {
              setSelectedUser(item.username);
              bottomSheetModalRef.current?.present();
            }}
          />
        )}></FlatList>
      <CustomBottomSheetModal bottomSheetModalRef={bottomSheetModalRef}>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={async () => {
              try {
                const response = await networkService.delete(
                  'title/api/my-network/',
                  {
                    data: {
                      username: selectedUser,
                    },
                  },
                );
                if (response.status === 200) {
                  fetchMyNetworkData();
                  setSelectedUser('');
                  bottomSheetModalRef.current?.dismiss();
                }
              } catch (error) {}
            }}
            style={{
              padding: 12,
              backgroundColor: 'transparent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 4,
            }}>
            <IconAntDesign
              name="deleteuser"
              color="white"
              size={28}
              style={{marginRight: 8}}
            />
            <CustomText
              text="Remove from My Network"
              style={{
                color: 'white',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedUser('');
              bottomSheetModalRef.current?.dismiss();
            }}
            style={{padding: 12, backgroundColor: 'transparent'}}>
            <CustomText
              text="Cancel"
              style={{
                color: Theme.colors.primary,
                textAlign: 'center',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};

export default MyNetworkView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

type MyNetworkItemProps = {
  user: any;
  onPress: () => void;
};

const MyNetworkItem = (props: MyNetworkItemProps) => {
  return (
    <View
      style={{
        gap: SPACE,
        alignItems: 'center',
        width: calculateGridItemWidth(3),
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          position: 'absolute',
          right: -4,
          top: -4,
          padding: 4,
        }}>
        <IconIonicons name="ellipsis-vertical" color={'white'} size={20} />
      </TouchableOpacity>
      <CircularAvatar imagePath={ImageManager.IMAGE_NAMES.MANAVATAR} />
      <View
        style={{
          alignItems: 'center',
        }}>
        <CustomText
          numberOfLines={1}
          text={characterLimited(props.user.name_surname, 12)}
          weight="medium"
          style={{
            color: 'white',
            textAlign: 'center',

            fontSize: Theme.fontSizes.sm,
          }}
        />
        <CustomText
          text={'@' + characterLimited(props.user.username, 12)}
          numberOfLines={1}
          weight="medium"
          style={{
            fontSize: Theme.fontSizes.xs,
            textAlign: 'center',
            color: 'white',
            opacity: 0.5,
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <CustomTextButton
            text="Slay Together"
            paddingVertical={6}
            borderRadius={36}
            paddingHorizontal={16}
            backgroundColor={'#202124'}
            onPress={() => {}}
            textStyle={{
              fontSize: Theme.fontSizes.xs,
            }}
          />
        </View>
      </View>
    </View>
  );
};
