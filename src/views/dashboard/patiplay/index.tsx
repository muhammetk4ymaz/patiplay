import React from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/shared/CustomText';
import {Theme} from '../../../utils/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useHeaderHeight} from '@react-navigation/elements';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/routes';

const {width, height} = Dimensions.get('window');

const fontSize = Theme.fontSizes.md;
const backgroundColor: string = Theme.colors.sambucus;
const SPACE = Theme.spacing.rowGap;

const PatiplayView = () => {
  console.log('PatiplayView Rendered');
  return (
    <FlatList
      data={menuItems}
      scrollEnabled={false}
      contentContainerStyle={{
        paddingVertical: SPACE,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: SPACE,
      }}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item, index}) => {
        return (
          <CardItem
            icon={item.icon}
            text={item.text}
            page={item.page}
            backgroundColor={menuColors[index]}
          />
        );
      }}
      numColumns={2}
    />
  );
};

export default PatiplayView;

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

const CardItem = React.memo((props: CardItemProps) => {
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
        width: (width - 2 * Theme.paddings.viewHorizontalPadding - SPACE) / 2,
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
    icon: 'movie-open-outline',
    text: 'In Theaters',
    page: 'InTheaters',
  },
  {
    icon: 'television-classic',
    text: 'On TV',
    page: 'OnTv',
  },
  {
    icon: 'movie-outline',
    text: 'Shorts',
    page: 'Shorts',
  },
  {
    icon: 'video-outline',
    text: 'Clips',
    page: 'Clips',
  },
  {
    icon: 'gesture-tap-button',
    text: 'Buttons',
    page: 'Premiere',
  },
  {
    icon: 'movie-filter-outline',
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
    icon: 'account-group-outline',
    text: 'Communities',
    page: 'Communities',
  },
  {
    icon: 'bullhorn-outline',
    text: 'Campaigns',
    page: 'Campaigns',
  },
  {
    icon: 'calendar-outline',
    text: 'Calendar',
    page: 'Calendar',
  },
];
