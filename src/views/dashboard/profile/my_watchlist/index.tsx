import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import popularTitles from '../../../../models/popular';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBottomSheetModal from '../../../../components/shared/CustomBottomSheetModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import TopMovie from '../../../../models/top_movie';

type Props = {};

const SPACE = 12;

const MyWatchlistView = (props: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderItem = useCallback(({item}: {item: TopMovie}) => {
    return (
      <MyWatchlistItem item={item} bottomSheetModalRef={bottomSheetModalRef} />
    );
  }, []);

  return (
    <View>
      <FlatList
        removeClippedSubviews={true}
        data={popularTitles}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          gap: SPACE,
        }}
        contentContainerStyle={{
          paddingVertical: 12,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: SPACE,
        }}
        renderItem={({item}) => renderItem({item})}
      />
      <CustomBottomSheetModal bottomSheetModalRef={bottomSheetModalRef}>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: 'transparent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 4,
            }}>
            <IconIonicons name="time-outline" color={'white'} size={22} />
            <CustomText
              text="Surprise Me Later"
              style={{
                color: 'white',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: 'transparent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 4,
            }}>
            <IconMaterialCommunityIcons
              name="playlist-remove"
              color={'white'}
              size={28}
            />
            <CustomText
              text="Remove from My Watchlist"
              style={{
                color: 'white',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bottomSheetModalRef.current?.dismiss();
            }}
            style={{padding: 12, backgroundColor: 'transparent'}}>
            <CustomText
              text="Cancel"
              style={{
                color: Theme.colors.primary,
                textAlign: 'center',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};

export default MyWatchlistView;

const styles = StyleSheet.create({});

type MyWatchlistItemProps = {
  item: TopMovie;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

const MyWatchlistItem = React.memo((props: MyWatchlistItemProps) => {
  return (
    <View
      style={{
        width:
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            2 * Theme.spacing.rowGap) /
          3,
        aspectRatio: Theme.aspectRatios.vertical,
        overflow: 'hidden',
      }}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
        }}
        style={[
          {
            borderRadius: 12,
          },
          StyleSheet.absoluteFillObject,
        ]}
      />
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Pressable
          onPress={() => {
            props.bottomSheetModalRef.current?.present();
          }}
          style={{
            borderWidth: 1.5,
            borderColor: 'gray',
            padding: 8,
            borderRadius: 36,
            right: -8,
            top: -8,
          }}>
          <IconIonicons
            name="ellipsis-vertical"
            color={'white'}
            size={16}
            style={{
              left: -2,
              top: 2,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
});
