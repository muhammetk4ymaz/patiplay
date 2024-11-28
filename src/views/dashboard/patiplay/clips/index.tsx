import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomPage from '../../../../components/shared/CustomPage';
import {FlagList} from '../../home';
import popularTitles from '../../../../models/popular';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import TopMovie from '../../../../models/top_movie';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import NewLabel from '../../../../components/shared/NewLabel';
import ProgressIndicator from '../../../../components/shared/ProgressIndicator';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import nowPlayMovies from '../../../../models/now_play_movies';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';

type Props = {};

const ClipsView = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return (
      <PreRegistrationView
        title={'Clips from Your Favorite\nFilms & TV Shows?'}
      />
    );
  }

  return (
    <CustomPage
      pageName="Clips"
      animationMultiplier={0.4}
      isBackButton={true}
      titleInitialOpacity={1}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => (
            <VerticalPoster
              width={Dimensions.get('window').width * 0.7}
              posterPath={item.poster_path}
            />
          )}
        />
      </View>
      <FlagList />
      <View style={{marginTop: 12, gap: 24}}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
          }}
          columnWrapperStyle={{gap: 12}}
          data={popularTitles.slice(0, 10)}
          renderItem={({item, index}) => <ClipCard item={item} index={index} />}
        />
        <FlatList
          horizontal
          data={popularTitles.slice(0, 10)}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
          }}
          renderItem={({item}) => (
            <View
              style={{
                aspectRatio: 2 / 3,
                width: (Dimensions.get('window').width - 60) / 2.5,
                alignSelf: 'center',
                borderRadius: 12,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          )}
        />
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
          }}
          columnWrapperStyle={{gap: 12}}
          data={popularTitles}
          renderItem={({item, index}) => <ClipCard item={item} index={index} />}
        />
        <FlatList
          horizontal
          data={popularTitles.slice(0, 10)}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
          }}
          renderItem={({item}) => (
            <View
              style={{
                aspectRatio: 2 / 3,
                width: (Dimensions.get('window').width - 60) / 2.5,
                alignSelf: 'center',
                borderRadius: 12,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          )}
        />
      </View>
    </CustomPage>
  );
};

export default ClipsView;

const styles = StyleSheet.create({});

const ClipCard = ({item, index}: {item: TopMovie; index: number}) => {
  return (
    <View style={{flex: 1, gap: 5}}>
      <View
        style={{
          aspectRatio: 500 / 281,
          width: '100%',
          borderRadius: 12,
          overflow: 'hidden',
          justifyContent: 'flex-end',
          gap: 8,
        }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {index % 4 === 3 && <NewLabel />}
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
        <ProgressIndicator
          percentage={50}
          progressColor={['#080808', '#080808']}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={"Şehzade Mustafa'nın İntikamı"}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
            }}
            weight="light"
          />
          <CustomText
            numberOfLines={1}
            text={item.title}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
              opacity: 0.5,
            }}
            weight="light"
          />
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
