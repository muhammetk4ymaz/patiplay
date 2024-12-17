import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../../../utils/theme';
import popularTitles from '../../../../models/popular';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../components/shared/CustomText';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ProgressIndicator from '../../../../components/shared/ProgressIndicator';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import RemoveFavoriteModal from './components/RemoveFavoriteModal';
import FavoriteItemComponent from './components/FavoriteItemComponent';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {};

const {width} = Dimensions.get('window');

const FavoriteTrailersView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  console.log('FavoriteEpisodesView');

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <View>
        <FlatList
          data={popularTitles.slice(0, 5)}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            rowGap: Theme.spacing.rowGap,
          }}
          columnWrapperStyle={{
            columnGap: Theme.spacing.columnGap,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <FavoriteItemComponent
              onPressButton={() => {
                bottomSheetModalRef.current?.present();
              }}
              poster_path={item.poster_path}
              type="trailers"
              title={item.title}
              backdropPath={item.backdrop_path}
              runtime={120}
              percentage={5}
            />
          )}></FlatList>
        <RemoveFavoriteModal bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    );
  }
};

export default React.memo(FavoriteTrailersView);

const styles = StyleSheet.create({});

interface FavoriteEpisodeItemProps {
  id: number;
  title: string;
  backdrop_path: string;
}

const FavoriteEpisodeItem = React.memo((props: FavoriteEpisodeItemProps) => {
  return (
    <View
      style={{
        flex: 1 / 2,
        gap: 5,
      }}>
      <View
        style={{
          flex: 1,
          aspectRatio: 500 / 281,
          borderRadius: 12,
          justifyContent: 'flex-end',
          gap: 5,
          overflow: 'hidden',
        }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.backdrop_path}`,
          }}
          style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 8,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingVertical: 2,
              paddingHorizontal: 4,
              borderRadius: 4,
            }}>
            <CustomText
              text="3h 18m"
              style={{color: 'white', fontSize: 12, opacity: 1}}
            />
          </View>
        </View>
        <ProgressIndicator percentage={80} />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={'S2 E18 • Trailer 2'}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
            }}
            weight="light"
          />
          <CustomText
            numberOfLines={1}
            text={props.title}
            style={{color: 'white', fontSize: Theme.fontSizes.sm, opacity: 0.5}}
            weight="light"
          />
        </View>
        <HeartButton />
        {/* <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
});

const HeartButton = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}>
        <IconMaterialCommunityIcons
          name="cards-heart"
          color={Theme.colors.primary}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};
