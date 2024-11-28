import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {Theme} from '../../../../constants/Theme';
import {faker} from '@faker-js/faker';
import {Avatar, ScrollView} from 'native-base';
import CustomText from '../../../../components/shared/CustomText';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomTabBar from '../../../../components/CustomTabBar';
import {SceneMap} from 'react-native-tab-view';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import ScrollableRow from '../../../../components/shared/ScrollableRow';

const SPACE = Theme.spacing.columnGap;

const companies: Company[] = Array(20)
  .fill(null)
  .map(() => ({
    name: faker.company.name(), // Şirket adını al
    logo: faker.image.urlPicsumPhotos(), // Avatar resmini al
  }));

interface Company {
  name: string;
  logo: string;
}

const FirstRoute = React.memo(() => {
  return (
    <ScrollView
      contentContainerStyle={{gap: Theme.spacing.columnGap}}
      removeClippedSubviews={true}
      style={{
        flex: 1,
      }}>
      <MyFollowingList />
      <FollowerList title="My Network Follows" list={companies} />
      <FollowerList title="Software Engineers Follow" list={companies} />
      <FollowerList title="Sarıyer Follows" list={companies} />
      <FollowerList title="Istanbul Follows" list={companies} />
      <FollowerList title="Turkey Follows" list={companies} />
      <FollowerList title="Everyone Follows" list={companies} />
      <FollowerList title="For Me" list={companies} />
    </ScrollView>
  );
});

const routes = [
  {key: 'first', title: 'Companies'},
  {key: 'second', title: 'Cast'},
  {key: 'third', title: 'Crew'},
];

const renderScene = SceneMap({
  first: FirstRoute,
  second: FirstRoute,
  third: FirstRoute,
});

const MyFollowingsView = () => {
  return (
    <CustomTabBar
      renderScene={renderScene}
      routes={routes}
      swipeEnabled={false}
    />
  );
};

export default MyFollowingsView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    gap: SPACE,
  },
});

const FollowerList = ({title, list}: {title: string; list: any[]}) => {
  const renderItem = useCallback(
    ({item}: {item: Company}) => (
      <CircularAvatar
        imagePath={{
          uri: item.logo,
        }}
      />
    ),
    [],
  );
  return (
    <View style={{gap: SPACE}}>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <CustomText
          text={title}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.md,
          }}
          weight="medium"
        />
      </View>
      <ScrollableRow
        data={list}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        initialNumToRender={8}
      />
    </View>
  );
};

const MyFollowingList = () => {
  const renderItem = useCallback(
    ({item}: {item: Company}) => <AvatarComponent item={item} />,
    [],
  );
  return (
    <View style={{gap: SPACE}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <IconMaterialIcons
            name="mode-edit-outline"
            size={24}
            color={Theme.colors.white}
          />
          <CustomText text="Edit" weight="medium" style={{color: 'white'}} />
        </TouchableOpacity>
      </View>
      <ScrollableRow
        data={companies}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        initialNumToRender={6}
      />
    </View>
  );
};

const AvatarComponent = React.memo(({item}: {item: any}) => (
  <Avatar size={'xl'} source={{uri: item.logo}} />
));
