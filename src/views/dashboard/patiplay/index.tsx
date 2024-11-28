import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../constants/Theme';
import CustomText from '../../../components/shared/CustomText';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../navigation/routes';

type Props = {};

const {width, height} = Dimensions.get('window');

const SPACE = 12;

const fontSize = Theme.fontSizes.md;
const backgroundColor: string = Theme.colors.sambucus;

type CardItemProps = {
  icon: string;
  text: string;
  page:
    | 'Premiere'
    | 'InTheaters'
    | 'OnTv'
    | 'Shorts'
    | 'Clips'
    | 'Lists'
    | 'Campaigns'
    | 'Calendar'
    | 'Communities'
    | 'Charts'
    | 'Movements';
  backgroundColor?: string;
};

const menuColors = [
  '#ff6f61', // Premiere - vibrant red-orange
  '#ffb74d', // In Theaters - warm orange
  '#64b5f6', // On TV - sky blue
  '#4db6ac', // Shorts - teal
  '#ba68c8', // Clips - lavender purple
  '#81c784', // Buttons - green
  '#7986cb', // Movements - periwinkle blue
  '#f06292', // List - pink
  '#9575cd', // Charts - deep purple
  '#ff8a65', // Communities - coral
  '#4fc3f7', // Campaigns - light blue
  '#aed581', // Calendar - light green
];

const menuItems: CardItemProps[] = [
  {
    icon: 'movie-roll',
    text: 'Premiere',
    page: 'Premiere',
  },
  {
    icon: 'movie-open',
    text: 'In Theaters',
    page: 'InTheaters',
  },
  {
    icon: 'television-classic',
    text: 'On TV',
    page: 'OnTv',
  },
  {
    icon: 'movie',
    text: 'Shorts',
    page: 'Shorts',
  },
  {
    icon: 'video',
    text: 'Clips',
    page: 'Clips',
  },
  {
    icon: 'gesture-tap-button',
    text: 'Buttons',
    page: 'Premiere',
  },
  {
    icon: 'movie-filter',
    text: 'Movements',
    page: 'Movements',
  },
  {
    icon: 'playlist-check',
    text: 'Lists',
    page: 'Lists',
  },
  {
    icon: 'chart-line',
    text: 'Charts',
    page: 'Charts',
  },
  {
    icon: 'account-group',
    text: 'Communities',
    page: 'Communities',
  },
  {
    icon: 'bullhorn',
    text: 'Campaigns',
    page: 'Campaigns',
  },
  {
    icon: 'calendar',
    text: 'Calendar',
    page: 'Calendar',
  },
];

const CardItem3 = React.memo((props: CardItemProps) => {
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(props.page);
      }}
      style={{
        height: (height - 7 * SPACE - headerHeight - bottomTabBarHeight) / 6,
        width: (width - 2 * Theme.paddings.viewHorizontalPadding - 12) / 2,
        backgroundColor: props.backgroundColor || backgroundColor,
        borderRadius: 12,
        padding: SPACE,
      }}>
      <CustomText
        text={props.text}
        style={{
          color: 'white',
          fontSize: fontSize,
          fontWeight: 'bold',
        }}
      />
      <IconMaterialCommunityIcons
        name={props.icon}
        size={
          Math.min(
            (height - 7 * SPACE - headerHeight - bottomTabBarHeight) / 6,
          ) / 2
        }
        style={{position: 'absolute', bottom: 0, right: 12}}
        color={'white'}
      />
    </TouchableOpacity>
  );
});

const PatiplayView = (props: Props) => {
  console.log('PatiplayView Rendered');
  return (
    <View style={styles.view}>
      {menuItems.map((item, index) => {
        return (
          <CardItem3
            icon={item.icon}
            text={item.text}
            page={item.page}
            key={index}
            backgroundColor={menuColors[index]}
          />
        );
      })}
    </View>
  );
};

export default PatiplayView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    gap: SPACE,
    flexWrap: 'wrap',
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    paddingVertical: 12,
  },
});
