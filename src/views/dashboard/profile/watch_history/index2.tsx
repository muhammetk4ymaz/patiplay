import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../constants/Theme';
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
    <View style={{flex: 1, gap: 12, flexDirection: 'row'}}>
      <View
        style={{
          width: Dimensions.get('window').width / 4,
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
