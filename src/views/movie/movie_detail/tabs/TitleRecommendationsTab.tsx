import axios from 'axios';
import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import CommentsTab from '../../../dashboard/pages/components/CommentsTab';

type Props = {
  uuid: string;
};

const width = Dimensions.get('window').width;

const TitleRecommendationsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [recommentaions, setRecommentaions] = React.useState<any[]>([]);

  const fetchRecommentaionsData = async () => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: props.uuid,
        tab: 'Recommendations',
      });
      // console.log('CommentTab', response.data);
      setRecommentaions(response.data.recommentaions);
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
    console.log('Rendered CommentTab');

    fetchRecommentaionsData();
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
      <CommentsTab
        data={recommentaions}
        endpoint="title-recommendation"
        refreshData={() => {
          fetchRecommentaionsData();
        }}
        uuid={props.uuid}
      />
    );
  }
};

export default React.memo(TitleRecommendationsTab);

const styles = StyleSheet.create({});
