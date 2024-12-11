import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import TitleWithProgress from '../../../../components/shared/CustomComponents/TitleWithProgress';
import {ImageManager} from '../../../../constants/ImageManager';
import CustomText from '../../../../components/shared/CustomText';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

type Props = {
  uuid: string;
};

const TitleTrailersTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [trailers, setTrailers] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log('Rendered TrailerTab');

    const fetchClipData = async () => {
      try {
        const response = await networkService.post(
          'title/api/title-tab-movie/',
          {
            slug: props.uuid,
            tab: 'Trailers',
          },
        );
        console.log('Trailer', response.data);
        setTrailers(response.data);
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
    return (
      <FlatList
        removeClippedSubviews={true}
        scrollEnabled={false}
        data={trailers}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => <TrailerItem item={item} />}></FlatList>
    );
  }
};

export default TitleTrailersTab;

const styles = StyleSheet.create({});

type TrailerItemProps = {
  item: any;
};

const TrailerItem = (props: TrailerItemProps) => {
  // React.useEffect(() => {
  //   console.log('ClipItem', props.item);
  // }, []);

  return (
    <View
      style={{
        width: calculateGridItemWidth(2),
      }}>
      <TitleWithProgress
        backdropPath={
          props.item.video?.filmImageUrl[0]?.url
            ? {uri: props.item.video?.filmImageUrl[0]?.url}
            : ImageManager.IMAGE_NAMES.PATOHORIZONTALLOGOWHITE
        }
        percentage={props.item.completion_rate}
        runtime={props.item.total_time}
      />
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={props.item.name[0].title}
            style={{color: 'white', fontSize: Theme.fontSizes.sm}}
            weight="light"
          />

          {/* <CustomText
            numberOfLines={1}
            text={props.item.title.title[0].title}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
              opacity: 0.5,
            }}
            weight="light"
          /> */}
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
