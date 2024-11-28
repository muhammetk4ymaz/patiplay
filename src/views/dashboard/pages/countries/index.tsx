import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SceneMap} from 'react-native-tab-view';
import CustomTabBar from '../../../../components/CustomTabBar';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import FeaturesTab from '../components/FeaturesTab';
import ShortsTab from '../components/ShortsTab';
import TvShowsTab from '../components/TvShowsTab';
import {FlagList} from '../../home';
import FlagComponent from '../../../../components/shared/FlagComponent';

const {width, height} = Dimensions.get('window');

type Props = {};

const CountriesView = (props: Props) => {
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
            source={{
              uri: `https://flagpedia.net/data/flags/h80/us.png`,
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: width,
              height: height * 0.35,
            }}
            blurRadius={25}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{width: width, height: height * 0.35}}
          />
        </View>
        <FlagList />
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

export default CountriesView;

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
            elevation: 5,
            height: 45,
            width: 45,
            borderRadius: 45 / 2,
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {width: 2, height: 2},
            backgroundColor: 'white',
          }}>
          <FlagComponent isoCode={'us'} width={45} height={45} />
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <CustomText text="United States" weight="bold" style={styles.name} />
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
