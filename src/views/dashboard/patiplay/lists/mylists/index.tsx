import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import nowPlayMovies from '../../../../../models/now_play_movies';
import {Theme} from '../../../../../constants/Theme';
import CustomText from '../../../../../components/shared/CustomText';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import TopMovie from '../../../../../models/top_movie';
import index from '../../../../../navigation';
import ProgressIndicator from '../../../../../components/shared/ProgressIndicator';

const width = Dimensions.get('window').width;

const myListsPosterWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding - 24) / 2.5;
const myListsPosterContainerWidth =
  (width - 2 * Theme.paddings.viewHorizontalPadding) / 2;

const MyListsView = () => {
  return (
    <FlatList
      data={[
        {
          title: 'Top Sci-Fi Movies of All Time',
          description:
            'Explore new worlds and futuristic possibilities with our list of the best sci-fi movies. From space adventures and advanced technology to artificial intelligence and dystopian futures, these films push the boundaries of imagination and storytelling. Get ready to be transported to another universe!',
          updatedAt: 'Mar 24',
        },
        {
          title: 'Must-Watch Classic Movies',
          updatedAt: 'Mar 23',
        },
      ]}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        paddingVertical: 12,
      }}
      renderItem={({item, index}) => (
        <MyListsItem
          list={nowPlayMovies}
          title={item.title}
          description={item.description}
          updatedAt="Mar 24"
        />
      )}
      keyExtractor={item => item.title}
    />
  );
};

export default MyListsView;

const styles = StyleSheet.create({});

type MyListsItemProps = {
  list: TopMovie[];
  title: string;
  description?: string;
  updatedAt: string;
};

const MyListsItem = (props: MyListsItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        flex: 1,
      }}>
      <PosterStack
        posters={props.list.slice(4, 7)}
        posterWidth={myListsPosterWidth}
        posterContainerWidth={myListsPosterContainerWidth}
      />
      <View style={{flex: 1, justifyContent: 'flex-start', gap: 3}}>
        <CustomText
          text={props.title}
          numberOfLines={props.description ? 1 : 2}
          weight="light"
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes.sm,
          }}
        />

        {props.description && (
          <CustomText
            text={props.description}
            numberOfLines={2}
            weight="light"
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.xs,
              opacity: 0.5,
            }}
          />
        )}
        <CustomText
          text={`${props.list.length} Titles • ${props.updatedAt}`}
          weight="light"
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes.xs,
            opacity: 0.5,
          }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => {}} style={{padding: 4}}>
          <IconIonicons name={'ellipsis-vertical'} color="white" size={12} />
        </TouchableOpacity>
      </View>
    </View>
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
      <View style={{width: posterWidth, aspectRatio: 500 / 281}}>
        <View
          style={{
            flexDirection: 'row',
            width: posterContainerWidth,
            aspectRatio: 500 / 281,
            overflow: 'hidden',
          }}>
          {posters.reverse().map((poster, index) => {
            return (
              <View
                style={[
                  {
                    width: posterWidth,
                    aspectRatio: 500 / 281,
                    borderRadius: 12,
                    position: 'absolute',
                    zIndex: index,
                    right: index * posterSpacing,
                    overflow: 'hidden',
                    justifyContent: 'flex-end',
                    gap: 5,
                  },
                ]}
                key={poster.id}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${poster.backdrop_path}`,
                  }}
                  style={StyleSheet.absoluteFillObject}
                />
                {index === 2 && (
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
                        style={{color: 'white', fontSize: 9, opacity: 1}}
                      />
                    </View>
                  </View>
                )}
                {index === 2 && <ProgressIndicator index={index} />}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
