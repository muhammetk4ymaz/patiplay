import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../../components/shared/CustomText';
import ProgressIndicator from '../../../../../components/shared/ProgressIndicator';
import VerticalPoster from '../../../../../components/shared/VerticalPoster';
import {ImageManager} from '../../../../../constants/ImageManager';
import nowPlayMovies from '../../../../../models/now_play_movies';
import TopMovie from '../../../../../models/top_movie';
import {RootStackParamList} from '../../../../../navigation/routes';
import {Theme} from '../../../../../utils/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {calculateGridItemWidth} from '../../../../../utils/calculateGridItemWidth';

const paddingHorizontal = Theme.paddings.viewHorizontalPadding;

const ListDetailView = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Content type="tv" titles={nowPlayMovies} />
      <CommentButton />
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
                width={calculateGridItemWidth(4)}
              />
            );
          } else {
            return (
              <View
                style={{
                  width: calculateGridItemWidth(2),
                  gap: 5,
                }}>
                <View
                  style={{
                    aspectRatio: 500 / 281,
                    width: calculateGridItemWidth(2),
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

const CommentButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={['#8b5cf6', '#a855f7']}
      style={{
        position: 'absolute',
        bottom: insets.bottom + 12,
        right: 24,
        borderRadius: 36,
      }}>
      <TouchableOpacity
        style={{
          padding: 12,
        }}
        onPress={() => {
          navigation.navigate('ListComments');
        }}>
        <IconMaterialCommunityIcons
          name="comment-text-multiple-outline"
          size={24}
          color={Theme.colors.white}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};
