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
import BiographyCard from '../../../../components/shared/Cards/BiographyCard';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import {Theme} from '../../../../constants/Theme';
import ClipsTab from '../components/ClipsTab';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import TitlesTab from '../components/TitlesTab';

const {width, height} = Dimensions.get('window');

type Props = {};

const CompaniesDetailView = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 0.45,
          justifyContent: 'flex-end',
          gap: 12,
          zIndex: 0,
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
        <Header />
        <CustomText
          text="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
          style={{
            color: 'white',
            fontSize: 13,
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          }}
          weight="light"
        />
        {/* <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 8,
            justifyContent: 'flex-end',
          }}>
          <InteractionButton
            icon={<LikeIcon size={24} />}
            initialActive={false}
          />
          <EmojiesToggleComponent />
          <InteractionButton
            icon={<PlayListAddIcon size={24} />}
            initialActive={false}
          />
          <InteractionButton
            icon={
              <IconIonicons name={'share-social'} color="white" size={24} />
            }
            initialActive={false}
          />
        </View> */}

        <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              colors={['#8b5cf6', '#a855f7']} // from violet-500 to purple-500
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 36,
              }}>
              <CustomText
                text="Follow"
                style={{
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                  textAlign: 'center',
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <CustomTabBar routes={routes} renderScene={renderScene} />
    </View>
  );
};

export default CompaniesDetailView;

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
  biography: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
  biographyCard: {
    backgroundColor: Theme.colors.sambucus,
    paddingHorizontal: 4,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    width:
      (Dimensions.get('window').width -
        24 -
        2 * Theme.paddings.viewHorizontalPadding) /
      4,
  },
  biographyValue: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  biographyTitle: {
    color: Theme.colors.primary,
    textAlign: 'center',
    fontSize: 10,
  },
  biographySupText: {
    color: 'white',
    fontSize: 6,
    textAlignVertical: 'top',
  },
});

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={'xl'}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/009/398/577/non_2x/man-avatar-clipart-illustration-free-png.png',
          }}
        />
        <View
          style={{
            justifyContent: 'center',
          }}>
          <CustomText text="Company Name" weight="bold" style={styles.name} />
          <CustomText
            text="Şişli, İstanbul, Türkiye • 2005"
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
            }}
          />
          <CustomText
            text="82 Titles • 1.7K Clips"
            style={{
              color: 'white',
              opacity: 0.7,
              fontSize: Theme.fontSizes.sm,
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Avatar.Group
              style={{
                paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              }}
              _avatar={{
                size: 7,
              }}
              max={3}>
              <Avatar
                bg="green.500"
                borderWidth={0}
                zIndex={1}
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}></Avatar>
              <Avatar
                bg="cyan.500"
                borderWidth={0}
                zIndex={0}
                left={-8}
                source={{
                  uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                }}></Avatar>
            </Avatar.Group>
          </View>
        </View>
      </View>
    </View>
  );
};

const Biography = () => {
  return (
    <View style={styles.biography}>
      <BiographyCard title={'Director'} value="43" />
      <BiographyCard title={'Screenwriter'} value="21" />
      <BiographyCard title={'Producer'} value="12" />
      <BiographyCard title={'Actor / Actress'} value="8" />
    </View>
  );
};

const CrewDiscussions = () => {};

const renderScene = SceneMap({
  first: TitlesTab,
  second: ClipsTab,
  third: CommentsTab,
  fourth: DiscussionsTab,
  fifth: TitlesTab,
  sixth: TitlesTab,
});

const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Clips'},
  {key: 'third', title: 'Comments'},
  {key: 'fourth', title: 'Discussions'},
  {key: 'fifth', title: 'Lists'},
  {key: 'sixth', title: 'Fans'},
];
