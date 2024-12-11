import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Theme} from '../../../../utils/theme';
import CustomText from '../../../../components/shared/CustomText';
import popularTitles from '../../../../models/popular';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import TopMovie from '../../../../models/top_movie';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/routes';
import networkService from '../../../../helpers/networkService';

const width = Dimensions.get('window').width;

const myListsPosterWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding - 24) / 3;
const myListsPosterContainerWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding - 24) / 2;

const otherListsPosterWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding - 36) / 4;
const otherListsPosterContainerWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding - 36) / 3;

export const TitleListView = React.memo(() => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await networkService.post('title/api/lists-view/', {
          tab: 'Titles',
        });

        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  } else {
    return (
      <ScrollView
        style={{flex: 1}}
        removeClippedSubviews
        contentContainerStyle={{paddingVertical: 12}}>
        <MyLists />
        <OtherList
          title="My Network’s Lists"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />
        <OtherList
          title="Lists from Software Engineers"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />
        <OtherList
          title="Lists from Sarıyer"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />

        <OtherList
          title="Lists from Istanbul"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />

        <OtherList
          title="Lists from Turkey"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />
        <OtherList
          title="Lists from Worldwide"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />

        <OtherList
          title="For Me"
          renderItem={({item, index}) => {
            return <OtherListItem item={item} index={index} />;
          }}
        />
      </ScrollView>
    );
  }
});

const MyLists = React.memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyLists');
        }}
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomText
          text={'My Lists'}
          style={{color: Theme.colors.white, fontSize: Theme.fontSizes.lg}}
          weight="medium"
        />
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <IconIonicons
            name="chevron-forward"
            size={16}
            color={Theme.colors.white}
          />
        </View>
      </TouchableOpacity>

      <FlatList
        data={[
          popularTitles.slice(0, 3),
          popularTitles.slice(3, 6),
          popularTitles.slice(6, 9),
          popularTitles.slice(9, 12),
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
          gap: 12,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return <MyListItem item={item} index={index} />;
        }}
      />

      {/* <FlatList
        data={[
          nowPlayMovies.slice(0, 1),
          nowPlayMovies.slice(0, 2),
          nowPlayMovies.slice(0, 3),
          nowPlayMovies.slice(0, 4),
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingVertical: 12,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const filledItems = [...item, ...Array(4 - item.length).fill(null)];
          return (
            <View style={{width: width}}>
              <View
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  width: width - 36,
                  borderRightWidth: item.length === 4 ? 0 : 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                  height: ((width - 36) / 8) * 3,
                }}>
                {filledItems.map((item, index) => {
                  if (item) {
                    return (
                      <TitlePosterItem
                        backdrop_path={item.backdrop_path}
                        poster_path={item.poster_path}
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <View
                        style={{
                          width: (width - 36) / 4,
                          backgroundColor: 'transparent',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderTopWidth: 1,
                          borderRightWidth: index === 3 ? 0 : 1,
                          borderColor: 'rgba(255,255,255,0.2)',
                          borderBottomWidth: 1,
                        }}
                        key={index}>
                        <IconIonicons
                          name="add-circle"
                          size={32}
                          color={'gray'}
                        />
                      </View>
                    );
                  }
                })}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={[StyleSheet.absoluteFillObject]}></LinearGradient>
                <View style={{position: 'absolute', bottom: 0, padding: 12}}>
                  <CustomText
                    text={'My List ' + (index + 1)}
                    style={{
                      color: Theme.colors.white,
                      fontSize: Theme.fontSizes.lg,
                    }}
                    weight="medium"
                  />
                </View>
              </View>
            </View>
          );
        }}
      /> */}
    </View>
  );
});

const OtherList = ({
  title,
  renderItem,
}: {
  title: string;
  renderItem: ({item, index}: {item: TopMovie[]; index: number}) => JSX.Element;
}) => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomText
          text={title}
          style={{color: Theme.colors.white, fontSize: Theme.fontSizes.lg}}
          weight="medium"
        />
      </View>

      <FlatList
        data={[
          popularTitles.slice(0, 3),
          popularTitles.slice(3, 6),
          popularTitles.slice(6, 9),
          popularTitles.slice(9, 12),
          popularTitles.slice(12, 15),
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
          gap: 12,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return renderItem({item, index});
        }}
      />
    </View>
  );
};

const OtherListItem = ({item, index}: {item: TopMovie[]; index?: number}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListDetail');
      }}
      style={{
        width: otherListsPosterContainerWidth,
        gap: 3,
      }}>
      <PosterStack
        posters={item}
        posterWidth={otherListsPosterWidth}
        posterContainerWidth={otherListsPosterContainerWidth}
      />
      <View>
        <CustomText
          text="List Name"
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
          text="17 Titles • Mar 24"
          weight="light"
          style={{color: 'white', opacity: 0.5, fontSize: Theme.fontSizes.xs}}
          numberOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
};

const MyListItem = ({item, index}: {item: TopMovie[]; index: number}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MyListDetail');
      }}
      style={{
        width: myListsPosterContainerWidth,
        gap: 3,
      }}>
      <PosterStack
        posters={item}
        posterWidth={myListsPosterWidth}
        posterContainerWidth={myListsPosterContainerWidth}
      />
      <View>
        <CustomText
          text="List Name List Name"
          style={{color: 'white', fontSize: Theme.fontSizes.sm}}
          numberOfLines={1}
          weight="light"
        />
        <CustomText
          text="17 Titles • Mar 23"
          weight="light"
          style={{color: 'white', opacity: 0.5, fontSize: Theme.fontSizes.xs}}
          numberOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
};

const PosterStack = ({
  posters,
  posterWidth,
  posterContainerWidth,
}: {
  posters: any[];
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
          {posters.reverse().map((poster, index) => {
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
                key={poster.id}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${poster.poster_path}`,
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
