import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import ClipItem from '../../../../components/shared/CustomComponents/ClipItem';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import ClipsTab from '../../../dashboard/pages/components/ClipsTab';

const width = Dimensions.get('window').width;

type Props = {
  uuid: string;
};

const TitleClipsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [clips, setClips] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log('Rendered ClipTab');

    const fetchClipData = async () => {
      try {
        const response = await networkService.post(
          'title/api/title-tab-movie/',
          {
            slug: props.uuid,
            tab: 'Clips',
          },
        );
        console.log('ClipTab', response.data);
        setClips(response.data);
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

    fetchClipData();
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
    return <ClipsTab data={{clips}} scrollEnabled={false} />;
  }
};

export default TitleClipsTab;

const styles = StyleSheet.create({});
