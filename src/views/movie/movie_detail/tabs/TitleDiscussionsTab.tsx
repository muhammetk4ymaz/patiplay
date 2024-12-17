import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import DiscussionsTab from '../../../dashboard/pages/components/DiscussionsTab';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {Theme} from '../../../../utils/theme';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {
  uuid: string;
};

const TitleDiscussionsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [discussions, setDiscussions] = React.useState<any[]>([]);

  const fetchDiscussionsData = async () => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: props.uuid,
        tab: 'Discussions',
      });
      // console.log('CommentTab', response.data);
      setDiscussions(response.data.discussions);
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
    fetchDiscussionsData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <DiscussionsTab
        endpoint="title-discussion"
        data={discussions}
        scrollEnabled={false}
        uuid={props.uuid}
      />
    );
  }
};

export default React.memo(TitleDiscussionsTab);

const styles = StyleSheet.create({});
