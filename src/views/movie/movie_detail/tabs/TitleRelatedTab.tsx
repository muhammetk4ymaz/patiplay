import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../utils/theme';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import FastImage from 'react-native-fast-image';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {
  uuid: string;
};

const TitleRelatedTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [related, setRelated] = React.useState<any[]>([]);

  const fetchRelatedData = async () => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: props.uuid,
        tab: 'Related',
      });
      setRelated(response.data.related);
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
    console.log('Rendered RelatedTab');

    fetchRelatedData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <FlatList
        data={related}
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
                overflow: 'hidden',
                width: calculateGridItemWidth(3),
                aspectRatio: 2000 / 3000,
                borderRadius: 12,
              }}>
              <FastImage
                source={{
                  uri: item.verticalPhotos__0__url,
                }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
    );
  }
};

export default React.memo(TitleRelatedTab);

const styles = StyleSheet.create({});
