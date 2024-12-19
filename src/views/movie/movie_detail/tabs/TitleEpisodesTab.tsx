import axios from 'axios';
import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TitleWithProgress from '../../../../components/shared/CustomComponents/TitleWithProgress';
import CustomText from '../../../../components/shared/CustomText';
import LoadingWidget from '../../../../components/shared/LoadingWidget';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';

type Props = {
  uuid: string;
};

const width = Dimensions.get('window').width;

const TitleEpisodesTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [episodes, setEpisodes] = React.useState<any[]>([]);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    console.log('Rendered EpisodeTab');

    const fetchClipData = async () => {
      try {
        const response = await networkService.post(
          'title/api/title-tab-movie/',
          {
            slug: props.uuid,
            tab: 'Episodes',
          },
        );
        console.log('Episodes', response.data.episodes);
        setEpisodes(response.data.episodes);
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
    return <LoadingWidget />;
  }

  return (
    <FlatList
      data={episodes}
      scrollEnabled={false}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: Theme.spacing.columnGap,
      }}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,

              alignItems: 'center',
            }}>
            <View
              style={{
                width: '45%',
              }}>
              <TitleWithProgress
                backdropPath={{
                  uri:
                    item.video.filmImageUrl[0]?.url ||
                    'https://static.vecteezy.com/system/resources/thumbnails/042/517/471/small_2x/neon-question-marks-animation-moving-on-alpha-channel-black-background-4k-resolution-free-video.jpg',
                }}
                percentage={item.completion_rate}
                runtime={item.total_time}
              />
            </View>
            <View style={{flex: 1}}>
              <CustomText
                text={(index + 1).toString() + '. ' + item.name[0].title}
                style={{color: 'white', fontWeight: 'bold'}}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default React.memo(TitleEpisodesTab);

const styles = StyleSheet.create({});
