import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuItemComponent, {MenuItem} from '../components/MenuItem';
import Tabs from './components/Tabs';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LayoutAnimationConfig,
} from 'react-native-reanimated';

type Props = {};

const tabs = ['red', 'gold'];

const WatchHistoryView = (props: Props) => {
  const menuItems: MenuItem[] = [
    {
      icon: (
        <IconIonicons
          name="play-circle"
          size={Theme.menuIconSize}
          color={Theme.colors.white}
        />
      ),
      title: 'Watch History',
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      icon: (
        <IconMaterialCommunityIcons
          name="movie-play"
          size={Theme.menuIconSize}
          color={Theme.colors.white}
        />
      ),
      title: 'Mission History',
      onPress: () => {},
      isChevronVisible: true,
    },
    {
      icon: (
        <IconMaterialIcons
          name="payment"
          size={Theme.menuIconSize}
          color={Theme.colors.white}
        />
      ),
      title: 'Payment History',
      onPress: () => {},
      isChevronVisible: true,
    },
  ];
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <View style={styles.view}>
      <Tabs
        data={[
          {icon: 'play-circle', label: 'Watch History'},
          {icon: 'movie-play', label: 'Mission History'},
        ]}
        onChange={index => {
          setSelectedIndex(index);
        }}
        selectedIndex={selectedIndex}
      />
      <LayoutAnimationConfig skipEntering>
        <Animated.View
          key={`tab-content-${selectedIndex}`}
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
          style={{
            backgroundColor: tabs[selectedIndex],
            flex: 1,
            borderRadius: 8,
          }}
        />
      </LayoutAnimationConfig>
    </View>
  );
};

export default WatchHistoryView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    gap: 12,
    padding: 12,
  },
});
