import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SceneMap} from 'react-native-tab-view';
import CustomTabBar from '../../../../components/CustomTabBar';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import {Theme} from '../../../../constants/Theme';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import FeaturesTab from '../components/FeaturesTab';
import ShortsTab from '../components/ShortsTab';
import TvShowsTab from '../components/TvShowsTab';

const {width, height} = Dimensions.get('window');

type Props = {};

const ReleaseDatesView = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 0.35,
          justifyContent: 'flex-end',
          gap: 12,
          zIndex: 0,
          marginBottom: 12,
        }}>
        <View style={{flex: 1}}>
          <Image
            source={ImageManager.IMAGE_NAMES.DETAILBACKGROUND}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: width,
              height: height * 0.3,
            }}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{width: width, height: height * 0.3}}
          />
        </View>
        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              gap: Theme.spacing.rowGap,
            }}
            renderItem={({item}) => (
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  backgroundColor: Theme.colors.sambucus,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text="2024"
                  weight="bold"
                  style={{
                    color: Theme.colors.white,
                    fontSize: Theme.fontSizes.md,
                    textAlign: 'center',
                  }}
                />
              </View>
            )}
          />
        </View>
        <Header />
      </View>
      <CustomText
        text="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
        style={{
          color: 'white',
          fontSize: 13,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="light"
      />
      <CustomTabBar routes={routes} renderScene={renderScene} />
    </View>
  );
};

export default ReleaseDatesView;

const styles = StyleSheet.create({
  header: {
    width: width,
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    flexDirection: 'row',
    gap: 12,
  },
  name: {
    color: 'white',
    fontSize: Theme.fontSizes.lg,
  },
});

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            backgroundColor: '#D7CCC8',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            text="2019"
            weight="bold"
            style={{
              color: '#424242',
              fontSize: Theme.fontSizes.md,
              textAlign: 'center',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <CustomText text="2019" weight="bold" style={styles.name} />
          <CustomText
            text="1.4K Film • 13.2K TV Shows"
            style={{
              color: 'white',
              opacity: 0.7,
              fontSize: Theme.fontSizes.sm,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: FeaturesTab,
  second: ShortsTab,
  third: TvShowsTab,
  fourth: CommentsTab,
  fifth: DiscussionsTab,
});

const routes = [
  {key: 'first', title: 'Features'},
  {key: 'second', title: 'Shorts'},
  {key: 'third', title: 'TV Shows'},
  {key: 'fourth', title: 'Comments'},
  {key: 'fifth', title: 'Discussions'},
];
