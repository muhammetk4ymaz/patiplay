import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

import {Theme} from '../../../../../../utils/theme';

import nowPlayMovies from '../../../../../../models/now_play_movies';
import HorizontalPoster from '../../../../../../components/shared/HorizontalPoster';
import ProgressIndicator from '../../../../../../components/shared/ProgressIndicator';
import CustomText from '../../../../../../components/shared/CustomText';
import TopMovie from '../../../../../../models/top_movie';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import CustomTextButton from '../../../../../../components/shared/Buttons/CustomTextButton';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomBottomSheetModal from '../../../../../../components/shared/CustomBottomSheetModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInput from '../../../../../../components/shared/Inputs/CustomTextInput';
import CustomTextAreaInput from '../../../../../../components/shared/Inputs/CustomTextAreaInput';

const paddingHorizontal = Theme.paddings.viewHorizontalPadding;

const MyListEditView = () => {
  const [data, setData] = React.useState(nowPlayMovies.slice(0, 8));

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          gap: 12,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <CustomTextInput
          label="Name"
          placeholder="Name"
          onChangeText={() => {}}
          inputStyle={{
            paddingHorizontal: 12,
            paddingVertical: 0,
            borderColor: '#4A4A4A',
          }}
          placeHolderTextColor="#4A4A4A"
        />
        <CustomTextAreaInput
          label="Description"
          placeholder="Description"
          onChangeText={() => {}}
          numberOfLines={4}
          inputStyle={{
            paddingHorizontal: 12,
            paddingVertical: 0,
            borderColor: '#4A4A4A',
          }}
          placeHolderTextColor="#4A4A4A"
        />
      </View>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => setData(data)} // Sıra değiştiğinde veriyi güncelle
        keyExtractor={item => item.id.toString()}
        renderItem={({item, drag, isActive, getIndex}) => (
          <EditListItem
            item={item}
            drag={drag}
            getIndex={getIndex}
            isActive={isActive}
            onDeleted={(index: number) => {
              setData(data.filter((_, i) => i !== index));
            }}
          />
        )}
      />
    </View>
  );
};

export default MyListEditView;

const styles = StyleSheet.create({});

const EditListItem = ({
  item,
  index,
  drag,
  getIndex,
  isActive,
  onDeleted,
}: {
  item: TopMovie;
  onDeleted: (index: number) => void;
  index?: number;
  drag: any;
  getIndex: () => number | undefined;
  isActive: boolean;
}) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const currnetIndex = getIndex() || 0;
  return (
    <View>
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isActive}
          style={{
            height: (Dimensions.get('window').width * 0.36 * 281) / 500 + 12,
            flexDirection: 'row',
            gap: 12,
            paddingVertical: 6,
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
          onLongPress={drag}>
          <View style={{justifyContent: 'center'}}>
            <CustomText
              text={(currnetIndex + 1).toString()}
              style={{color: 'white', fontSize: 20, opacity: 0.5}}
            />
          </View>
          <View
            style={{
              width: Dimensions.get('window').width * 0.36,
              overflow: 'hidden',
              aspectRatio: 500 / 281,
              borderRadius: 12,
              justifyContent: 'flex-end',
              gap: 5,
            }}>
            <HorizontalPoster
              backdrop_path={item.backdrop_path}
              width={'100%'}
              style={StyleSheet.absoluteFillObject}
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
            <ProgressIndicator percentage={50} />
          </View>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <CustomText
                numberOfLines={1}
                text={item.title}
                style={{color: 'white', fontSize: Theme.fontSizes.sm}}
                weight="light"
              />

              <CustomText
                numberOfLines={1}
                text={
                  'S4 E18 • Entrance Entrance Entrance Entrance Entrance Entrance Entrance'
                }
                style={{
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                  opacity: 0.5,
                }}
                weight="light"
              />
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetModalRef.current?.present();
                }}>
                <IconMaterialCommunityIcons
                  name="trash-can-outline"
                  color="rgba(255,0,0,0.5)"
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
      <CustomBottomSheetModal bottomSheetModalRef={bottomSheetModalRef}>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={async () => {
              bottomSheetModalRef.current?.dismiss();
              setTimeout(() => {
                if (getIndex !== undefined) {
                  onDeleted(getIndex() as number);
                }
              }, 300);
            }}
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
              text="Remove from My List"
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
