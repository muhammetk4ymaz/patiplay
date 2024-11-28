import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {FlatList} from 'native-base';

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import TopMovie from '../../../../../models/top_movie';
import topMovies from '../../../../../models/topMovies';
import CustomText from '../../../../../components/shared/CustomText';
import {Theme} from '../../../../../constants/Theme';

type WatchHistoryItemProps = {
  item: TopMovie;
  index: number;
  type: 'movie' | 'clip' | 'episode' | 'trailer';
};

const WatchHistoryView = () => {
  return (
    <View style={styles.view}>
      <FlatList
        data={topMovies}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
          gap: 24,
        }}
        renderItem={({item, index}) => {
          return (
            <WatchHistoryItem
              item={item}
              index={topMovies.length - index}
              type={
                index % 4 === 0
                  ? 'movie'
                  : index % 4 === 1
                  ? 'clip'
                  : index % 4 === 2
                  ? 'episode'
                  : 'trailer'
              }
            />
          );
        }}
      />
    </View>
  );
};

export default WatchHistoryView;

const WatchHistoryItem = React.memo((props: WatchHistoryItemProps) => {
  return (
    <View style={{flexDirection: 'row', gap: 12}}>
      <View
        style={{
          alignItems: 'center',
          gap: 12,
        }}>
        <View>
          <CustomText
            text="OCT"
            style={{
              color: 'white',
              opacity: 0.5,
              fontSize: 16,
              textAlign: 'center',
            }}
            weight="light"
          />
          <CustomText
            text={`${props.index + 1}`}
            style={{color: 'white', fontSize: 28, textAlign: 'center'}}
            weight="bold"
          />
        </View>
        <View
          style={{
            padding: 6,
            borderRadius: 8,
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            alignItems: 'center',
            gap: 4,
          }}>
          <IconMaterialCommunityIcons
            name="clock-outline"
            size={16}
            color="#FFA500"
          />
          <CustomText
            text={`in day\nTotal`}
            style={{color: '#FFA500', fontSize: 12, textAlign: 'center'}}
            weight="bold"
          />
          <CustomText
            text={'1h 23m'}
            style={{color: 'white', fontSize: 12}}
            weight="bold"
          />
        </View>
        <View
          style={{
            flex: 1,
            width: 1.5,
            height: '100%',
            backgroundColor: '#2F2F2F',
          }}></View>
      </View>
      <View
        style={{
          flex: 1,
          gap: 20,
        }}>
        <HistoryTitle {...props} />

        <HistoryTitle index={1} item={topMovies[2]} type="episode" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.background,
  },
});

const HistoryTitle = (props: WatchHistoryItemProps) => {
  return (
    <View style={{flex: 1, gap: 12}}>
      <View
        style={{
          width: '100%',
          aspectRatio: 500 / 281,
          borderRadius: 12,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.item.backdrop_path}`,
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 8,
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
        <View>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'darkgray',
                opacity: 0.5,
              },
            ]}></View>
          <LinearGradient
            colors={['#8b5cf6', '#a855f7']}
            style={{
              height: 4,
              width: '75%',
            }}></LinearGradient>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20,
          }}>
          <View style={{flex: 1}}>
            <CustomText
              numberOfLines={1}
              text={
                props.type === 'episode'
                  ? `S4 E18 • Entrance Entrance Entrance Entrance Entrance Entrance Entrance`
                  : props.type === 'clip'
                  ? 'This Is A Clip Title'
                  : props.type === 'trailer'
                  ? 'Trailer'
                  : props.item.title
              }
              style={{color: 'white', fontSize: 18}}
              weight="bold"
            />
            {props.type !== 'movie' && (
              <CustomText
                text={props.item.title}
                numberOfLines={1}
                style={{
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                }}
                weight="bold"
              />
            )}
          </View>
        </View>
        <CustomText
          text={props.item.overview}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.sm,
            opacity: 0.5,
            marginTop: 6,
          }}
          weight="medium"
        />
      </View>
    </View>
  );
};
