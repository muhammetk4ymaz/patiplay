import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import Video from 'react-native-video';
import CustomText from '../../../../components/shared/CustomText';
import {Avatar} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import TopMovie from '../../../../models/top_movie';
import nowPlayMovies from '../../../../models/now_play_movies';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

type PremiereTitleCardProps = {
  title: TopMovie;
  isExpired: boolean;
  remainingSeatCount: number;
};

type Props = {};

const PremiereView = (props: Props) => {
  return (
    <ScrollView style={styles.view}>
      <View
        style={{
          height: height * 0.4,
          width: '100%',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          justifyContent: 'flex-end',
        }}>
        <Video
          source={require('../../../../../assets/boluk-trailer.mp4')}
          repeat={true}
          resizeMode="cover"
          // controls={true}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={{
            gap: 12,
            bottom: '8%',
          }}>
          <Image
            source={require('../../../../../assets/boluk.webp')}
            style={{
              aspectRatio: 625 / 250,
              height: '25%',
              resizeMode: 'contain',
            }}
          />
          <View style={{width: '75%'}}>
            <CustomText
              style={{
                color: Theme.colors.white,
              }}
              numberOfLines={2}
              text="Film, bir askerin kışın meşakkatli yollarını aştığı dokunaklı bir hikayeyi anlatır. Farklı yerlerden gelen bu askerlerin, askeri hayata uyum sağlamaları gerekmektedir. Rüyaları, hedefleri, korkuları ve hırsları olan bu genç erkekler, karşılarına çıkan zorluklara rağmen kendilerini geliştirmeyi öğreneceklerdir. Bu sadece bir savaş hikayesi değil, aynı zamanda kişisel gelişim, dayanışma ve olgunlaşma hikayesidir. Genç askerler, sivil hayattan askeri hayata geçişin"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 36,
              alignItems: 'center',
            }}>
            <CustomText text="Last 103 Seats" style={{color: 'white'}} />
            <View>
              <Avatar.Group
                _avatar={{
                  size: 9,
                }}
                _hiddenAvatarPlaceholder={{
                  borderColor: Theme.colors.primary,
                  bg: Theme.colors.primary,
                  zIndex: 4,
                  _text: {
                    fontWeight: 'bold',
                  },
                  onTouchStart(event) {
                    console.log('Tıklandı');
                  },
                }}
                max={3}>
                <Avatar
                  bg="green.500"
                  borderWidth={0}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}></Avatar>
                <Avatar
                  bg="cyan.500"
                  borderWidth={0}
                  zIndex={1}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                  }}></Avatar>
                <Avatar
                  bg="indigo.500"
                  borderWidth={0}
                  zIndex={2}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}></Avatar>
              </Avatar.Group>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {}}>
              <LinearGradient
                colors={['#8b5cf6', '#a855f7']} // from violet-500 to purple-500
                style={{
                  paddingHorizontal: Theme.paddings.viewHorizontalPadding,
                  paddingVertical: 6,
                  borderRadius: 36,
                }}>
                <CustomText
                  text="Join"
                  style={{color: 'white', fontSize: Theme.fontSizes.sm}}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <CustomText
          text="Now or Never"
          weight="bold"
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.md,
          }}
        />
      </View>
      <FlatList
        scrollEnabled={false}
        data={nowPlayMovies}
        numColumns={4}
        contentContainerStyle={{
          rowGap: Theme.spacing.rowGap,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
        }}
        columnWrapperStyle={{columnGap: Theme.spacing.columnGap}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <PremireTitleCard
            title={item}
            isExpired={index % 5 == 2 ? true : false}
            remainingSeatCount={index % 5 == 3 ? 20 : 132}
          />
        )}
      />
    </ScrollView>
  );
};

export default PremiereView;

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.background,
  },
});

const PremireTitleCard = React.memo((props: PremiereTitleCardProps) => {
  return (
    <TouchableOpacity
      disabled={props.isExpired}
      style={{
        width: (width - 72) / 4,
        aspectRatio: 2000 / 3000,
        borderRadius: 12,
        // overflow: 'hidden',
        justifyContent: 'flex-end',
      }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.title.poster_path}`,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            resizeMode: 'cover',
            borderRadius: 12,
          },
        ]}
      />
      {!props.isExpired && (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              // backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderTopLeftRadius: 8,

              borderBottomRightRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              backgroundColor:
                props.remainingSeatCount < 100
                  ? 'rgba(255, 0, 0,0.5)'
                  : 'rgba(17, 24, 39,0.5)',
            }}>
            <IconMaterialCommunityIcons
              name="seat"
              size={10}
              color={'#E0E0E0'}
            />
            <CustomText
              text={props.remainingSeatCount.toString()}
              style={{
                color: 'white',
                fontSize: Theme.fontSizes['2xs'],
              }}
            />
          </View>
        </View>
      )}
      {props.isExpired && (
        <View
          style={{
            // backgroundColor: 'red',
            backgroundColor: Theme.colors.primary,
            position: 'absolute',
            zIndex: 1,
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRadius: 4,
            left: -6,
            top: 0,
            transform: [{rotate: '-10deg'}],
          }}>
          <CustomText
            text="Sold Out"
            weight="bold"
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
            }}
          />
        </View>
      )}
      {props.isExpired && (
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></View>
      )}
    </TouchableOpacity>
  );
});
