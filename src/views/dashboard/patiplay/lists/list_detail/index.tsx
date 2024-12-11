import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Avatar, Button, Input} from 'native-base';
import {ImageManager} from '../../../../../constants/ImageManager';
import CustomText from '../../../../../components/shared/CustomText';
import {Theme} from '../../../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import nowPlayMovies from '../../../../../models/now_play_movies';
import VerticalPoster from '../../../../../components/shared/VerticalPoster';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import OutsidePressHandler from 'react-native-outside-press';
import Comment from '../../../../movie/movie_player/components/Comment';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {FlatList, NativeViewGestureHandler} from 'react-native-gesture-handler';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import TopMovie from '../../../../../models/top_movie';
import HorizontalPoster from '../../../../../components/shared/HorizontalPoster';
import ProgressIndicator from '../../../../../components/shared/ProgressIndicator';

const paddingHorizontal = Theme.paddings.viewHorizontalPadding;

const ListDetailView = () => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Content type="tv" titles={nowPlayMovies} />
      <LinearGradient
        colors={['#8b5cf6', '#a855f7']}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 12,
          borderRadius: 36,
        }}>
        <TouchableOpacity
          style={{
            padding: 12,

            // backgroundColor: Theme.colors.primary,
          }}
          onPress={() => {
            bottomSheetModalRef.current?.present();
          }}>
          <IconMaterialCommunityIcons
            name="comment-text-multiple-outline"
            size={24}
            color={Theme.colors.white}
          />
        </TouchableOpacity>
      </LinearGradient>
      <CommentModal bottomSheetModalRef={bottomSheetModalRef} />
    </SafeAreaView>
  );
};

export default ListDetailView;

const styles = StyleSheet.create({
  enjoyedInfo: {
    borderColor: 'darkgray',
    borderWidth: 1.5,
    top: 2,
    marginHorizontal: Theme.paddings.viewHorizontalPadding,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 0,
  },
  enjoyedInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    top: -2,
  },
  enjoyedInfoText: {color: 'white', fontSize: Theme.fontSizes.md},
  progress: {
    height: 6,
    width: '25%',
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
});

type ContentProps = {
  titles: TopMovie[];
  type: 'movie' | 'tv' | 'clips';
};

const Content = React.memo((props: ContentProps) => {
  const [liked, setLiked] = useState(false);
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{gap: 12}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          paddingHorizontal: paddingHorizontal,
          paddingTop: 12,
        }}>
        <Avatar size="md" source={ImageManager.IMAGE_NAMES.ANGRYEMOJI} />
        <View>
          <CustomText
            text="Muhammet Kaymaz"
            style={{
              fontSize: Theme.fontSizes.md,
              color: Theme.colors.white,
            }}
          />
          <CustomText
            text="@muhammetk4ymaz"
            style={{
              opacity: 0.5,
              fontSize: Theme.fontSizes.sm,
              color: Theme.colors.white,
            }}
          />
          <CustomText
            text="Updated: 9m"
            style={{
              opacity: 0.5,
              fontSize: Theme.fontSizes.sm,
              color: Theme.colors.white,
            }}
          />
        </View>
      </View>
      <CustomText
        text="Top Sci-Fi Movies"
        weight="medium"
        style={{
          paddingHorizontal: paddingHorizontal,
          fontSize: Theme.fontSizes['2xl'],
          color: Theme.colors.white,
        }}
      />
      <CustomText
        text="Netflix (NFLX) continues to play the leading role in 2024, with a performance that would make even the most dramatic season finale look tame. With subscriber numbers soaring past 250 million and revenue reaching new heights at an eye-popping $40 billion, Netflix’s plot"
        style={{
          paddingHorizontal: paddingHorizontal,
          fontSize: 13,
          color: Theme.colors.white,
        }}
        weight="light"
      />

      <EnjoyedInfo />
      <FlatList
        data={props.titles}
        scrollEnabled={false}
        numColumns={props.type === 'movie' ? 4 : 2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{gap: Theme.spacing.columnGap}}
        contentContainerStyle={{
          paddingHorizontal: paddingHorizontal,
          rowGap: Theme.spacing.rowGap,
          paddingBottom: 12,
          marginTop: 3,
        }}
        renderItem={({item, index}) => {
          if (props.type === 'movie') {
            return (
              <VerticalPoster
                posterPath={item.poster_path}
                width={
                  (Dimensions.get('window').width -
                    2 * Theme.paddings.viewHorizontalPadding -
                    36) /
                  4
                }
              />
            );
          } else {
            return (
              <View
                style={{
                  width:
                    (Dimensions.get('window').width -
                      2 * Theme.paddings.viewHorizontalPadding -
                      12) /
                    2,
                  gap: 5,
                }}>
                <View
                  style={{
                    aspectRatio: 500 / 281,
                    width:
                      (Dimensions.get('window').width - 2 * paddingHorizontal) /
                      2,
                    borderRadius: 12,
                    overflow: 'hidden',
                    justifyContent: 'flex-end',
                    gap: 5,
                  }}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                    }}
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
              </View>
            );
          }
        }}
      />
    </ScrollView>
  );
});

const EnjoyedInfo = () => {
  const Content = () => {
    return (
      <View style={styles.enjoyedInfo}>
        <View style={styles.enjoyedInfoContent}>
          <CustomText
            text={'I’ve enjoyed\n21 of 243 episodes'}
            style={styles.enjoyedInfoText}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText
              text="25"
              weight="light"
              style={{color: 'white', fontSize: 42}}
            />
            <CustomText
              text="%"
              weight="light"
              style={{
                color: 'white',
                fontSize: 24,
                textAlignVertical: 'top',
                top: 6,
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const Progress = () => {
    return (
      <View
        style={{
          height: 6,
          marginHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: 'darkgray', borderRadius: 4},
          ]}
        />
        <LinearGradient
          colors={['#8b5cf6', '#a855f7']}
          style={styles.progress}
        />
      </View>
    );
  };
  return (
    <View>
      <Content />
      <Progress />
    </View>
  );
};

const CommentModal = ({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}) => {
  console.log('FilterModal rendered');

  // variables
  const snapPoints = React.useMemo(() => ['94%'], []);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BottomSheetModal
      backgroundStyle={{backgroundColor: Theme.colors.background}}
      handleIndicatorStyle={{backgroundColor: Theme.colors.white}}
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: paddingHorizontal,
          paddingBottom: 8,
          alignItems: 'center',
        }}>
        <CustomText
          text="Comments"
          style={{color: Theme.colors.white, fontSize: Theme.fontSizes.lg}}
        />
        <TouchableOpacity
          onPress={() => {
            bottomSheetModalRef.current?.close();
          }}>
          <IconMaterialCommunityIcons
            name="close"
            size={24}
            color={Theme.colors.white}
            style={{padding: 4, right: -4}}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          scrollEnabled={true}
          removeClippedSubviews={true}
          data={[1, 2, 3, 4]}
          contentContainerStyle={{
            paddingHorizontal: paddingHorizontal,
            paddingVertical: 10,
            gap: 12,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => <Comment />}></FlatList>
      )}

      <CommentInput />
    </BottomSheetModal>
  );
};

const CommentInput = () => {
  const [value, onChangeText] = React.useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true); // Klavye açıldığında durumu güncelle
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Klavye kapandığında durumu güncelle
        setKeyboardHeight(0);
      },
    );

    // Event listener'ları temizle
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{bottom: keyboardHeight}}>
      <Input
        borderRadius={0}
        value={value}
        onChangeText={() => {}}
        placeholder={'Your Comment'}
        variant="filled"
        bg="black"
        color="white"
        borderColor="transparent"
        _focus={{
          cursorColor: Theme.colors.primary,
          borderColor: 'transparent',
          backgroundColor: 'black',
        }}
        InputLeftElement={
          <Avatar
            borderColor={Theme.colors.gray}
            borderWidth={1}
            marginLeft={2}
            source={ImageManager.IMAGE_NAMES.ANGRYEMOJI}
            size="xs"
          />
        }
        InputRightElement={
          <Button
            variant="unstyled"
            onPress={() => {
              console.log('onSend');
            }}
            _pressed={{
              backgroundColor: 'transparent',
            }}>
            <IconIonicons name="send" size={24} color={Theme.colors.primary} />
          </Button>
        }
      />
    </View>
  );
};
