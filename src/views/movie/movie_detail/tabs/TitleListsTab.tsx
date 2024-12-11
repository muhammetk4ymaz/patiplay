import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import popularTitles from '../../../../models/popular';
import TopMovie from '../../../../models/top_movie';
import {Theme} from '../../../../utils/theme';

import axios from 'axios';
import CustomText from '../../../../components/shared/CustomText';
import networkService from '../../../../helpers/networkService';
import {RootStackParamList} from '../../../../navigation/routes';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import FastImage from 'react-native-fast-image';
import {ImageManager} from '../../../../constants/ImageManager';

type Props = {
  uuid: string;
};

const TitleListsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [lists, setLists] = React.useState<any[]>([]);

  const fetchCastData = async () => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: props.uuid,
        tab: 'Lists',
      });
      setLists(response.data.lists);
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
          width: '100%',
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
        data={lists}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return <OtherListItem item={item} />;
        }}
      />
    );
  }
};

export default React.memo(TitleListsTab);

const styles = StyleSheet.create({});

const OtherListItem = ({item, index}: {item: any; index?: number}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListDetail');
      }}
      style={{
        width: calculateGridItemWidth(2),
        gap: 3,
      }}>
      <PosterStack
        postersPaths={item.title.map(
          (item: any) => item.title.verticalPhotos[0].url,
        )}
        posterWidth={calculateGridItemWidth(2) / 2}
        posterContainerWidth={calculateGridItemWidth(2)}
      />
      <View>
        <CustomText
          text={item.name}
          style={{color: 'white', fontSize: Theme.fontSizes.sm}}
          numberOfLines={1}
          weight="light"
        />
        <CustomText
          text="@muhammetk4ymaz"
          weight="light"
          style={{color: 'white', opacity: 0.5, fontSize: Theme.fontSizes.xs}}
          numberOfLines={1}
        />
        <CustomText
          text={
            item.title.length +
            ' Titles • ' +
            new Date(item.created_at).toLocaleString('en', {
              month: 'short',
              day: 'numeric',
            })
          }
          // text="17 Titles • Mar 24"
          weight="light"
          style={{color: 'white', opacity: 0.5, fontSize: Theme.fontSizes.xs}}
          numberOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
};

const PosterStack = ({
  postersPaths,
  posterWidth,
  posterContainerWidth,
}: {
  postersPaths: string[];
  posterWidth: number;
  posterContainerWidth: number;
}) => {
  const posterSpacing = (posterContainerWidth - posterWidth) / 2;

  return (
    <View style={{width: posterContainerWidth}}>
      <View style={{width: posterWidth, aspectRatio: 2 / 3}}>
        <View
          style={{
            flexDirection: 'row',
            width: posterContainerWidth,
            aspectRatio: 2 / 3,
            overflow: 'hidden',
          }}>
          {postersPaths.reverse().map((posterPath, index) => {
            return (
              <View
                style={[
                  {
                    width: posterWidth,
                    aspectRatio: 2 / 3,
                    borderRadius: 12,
                    position: 'absolute',
                    zIndex: index,
                    right: index * posterSpacing,
                  },
                ]}
                key={index}>
                <Image
                  source={{
                    uri: posterPath,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
