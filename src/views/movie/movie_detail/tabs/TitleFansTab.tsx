import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../utils/theme';
import Comment from '../../../../components/shared/Comment/Comment';
import Comments from '../../../../components/shared/Comment/Comments';
import CommentsTab from '../../../dashboard/pages/components/CommentsTab';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import FansTab from '../../../dashboard/pages/components/FansTab';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {
  uuid: string;
};

const width = Dimensions.get('window').width;

const TitleFansTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [fans, setFans] = React.useState<any[]>([]);

  const fetchFansData = async () => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: props.uuid,
        tab: 'Fans',
      });
      setFans(response.data.fans);
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
    console.log('Rendered FansTab');

    fetchFansData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return <FansTab data={{fans}} />;
  }
};

export default React.memo(TitleFansTab);

const styles = StyleSheet.create({});
