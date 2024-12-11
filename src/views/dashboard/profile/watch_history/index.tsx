import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import CustomText from '../../../../components/shared/CustomText';
import topMovies from '../../../../models/topMovies';
import {FlatList} from 'native-base';
import TopMovie from '../../../../models/top_movie';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

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
            text={`counted\nin total`}
            style={{color: '#FFA500', fontSize: 12, textAlign: 'center'}}
            weight="bold"
          />
          <CustomText
            text={'1h 23m'}
            style={{color: 'white', fontSize: 12}}
            weight="bold"
          />
        </View>
        {/* <View
          style={{
            flex: 1,
            width: 1.5,
            height: '100%',
            backgroundColor: '#2F2F2F',
          }}></View> */}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          gap: 12,
        }}>
        <HistoryTitle2 {...props} />

        <HistoryTitle2 index={1} item={topMovies[5]} type="episode" />
        <HistoryTitle2 index={1} item={topMovies[6]} type="clip" />
        <HistoryTitle2 index={1} item={topMovies[7]} type="trailer" />
        <HistoryTitle2 index={1} item={topMovies[8]} type="trailer" />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.background,
  },
});

const Design1 = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        gap: 20,
      }}>
      <HistoryTitle1 {...props} />

      <HistoryTitle1 index={1} item={topMovies[2]} type="episode" />
    </View>
  );
};

const HistoryTitle1 = (props: WatchHistoryItemProps) => {
  return (
    <View style={{flex: 1, gap: 12, flexDirection: 'row'}}>
      <View
        style={{
          width: Dimensions.get('window').width * 0.2,
          aspectRatio: 2 / 3,
          borderRadius: 12,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <CustomText
          numberOfLines={1}
          text={props.item.title}
          style={{color: 'white', fontSize: Theme.fontSizes.md}}
          weight="bold"
        />
        <CustomText
          numberOfLines={1}
          text={
            props.type === 'movie'
              ? '0 clips • 0 trailers'
              : '4 episodes • 18 clips • 2 trailers'
          }
          style={{color: 'white', fontSize: Theme.fontSizes.xs, opacity: 0.5}}
          weight="medium"
        />
        <CustomText
          numberOfLines={1}
          text={props.type === 'movie' ? '4h 23m' : '1h 57m'}
          style={{color: 'white', fontSize: Theme.fontSizes.xs, opacity: 0.5}}
          weight="medium"
        />
      </View>
    </View>
  );
};

const HistoryTitle2 = (props: WatchHistoryItemProps) => {
  return (
    <View
      style={{flex: 1, gap: 12, width: Dimensions.get('window').width / 2.5}}>
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
      </View>
      <View
        style={{
          flex: 1,
        }}>
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
          style={{color: 'white', fontSize: Theme.fontSizes.sm}}
          weight="medium"
        />
        {props.type !== 'movie' && (
          <CustomText
            numberOfLines={1}
            text={props.item.title}
            style={{color: 'white', fontSize: Theme.fontSizes.sm, opacity: 0.5}}
            weight="light"
          />
        )}
        <CustomText
          text={`4h 23m enjoyed\n1h 21m counted`}
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
};
