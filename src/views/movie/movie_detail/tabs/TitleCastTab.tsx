import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import {RootState} from '../../../../redux/store';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import {Theme} from '../../../../utils/theme';
import axios from 'axios';
import networkService from '../../../../helpers/networkService';

type Props = {
  uuid: string;
};

const width = Dimensions.get('window').width;

const TitleCastTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [cast, setCast] = React.useState<any[]>([]);

  const fetchCastData = async () => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: props.uuid,
        tab: 'Cast',
      });
      setCast(response.data.actors);
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

  React.useEffect(() => {
    console.log('Rendered CastTab');

    fetchCastData();
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
      <FlatList
        data={cast}
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                width: calculateGridItemWidth(3),
              }}>
              <CircularAvatar
                imagePath={
                  item.image
                    ? {uri: item.image}
                    : ImageManager.IMAGE_NAMES.MANAVATAR
                }
              />
              <CustomText
                text={item.name}
                style={{
                  color: Theme.colors.white,
                  textAlign: 'center',
                  fontSize: Theme.fontSizes.xs,
                }}
              />
              <CustomText
                text={'Character'}
                style={{
                  color: Theme.colors.white,
                  textAlign: 'center',
                  opacity: 0.5,
                  fontSize: Theme.fontSizes.xs,
                }}
              />
            </View>
          );
        }}
      />
    );
  }
};

export default React.memo(TitleCastTab);

const styles = StyleSheet.create({});
