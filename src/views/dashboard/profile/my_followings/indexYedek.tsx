import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Theme} from '../../../../constants/Theme';
import {faker} from '@faker-js/faker';
import {Avatar, FlatList, ScrollView} from 'native-base';
import CustomText from '../../../../components/shared/CustomText';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import {debounce} from 'lodash';

const SPACE = 12;

const companies: Company[] = Array(23)
  .fill(null)
  .map(() => ({
    name: faker.company.name(), // Şirket adını al
    logo: faker.image.urlPicsumPhotos(), // Avatar resmini al
  }));

interface Company {
  name: string;
  logo: string;
}

const tabs = [
  {
    icon: 'heart',
    label: 'First',
  },
  {
    icon: 'star',
    label: 'My Network',
  },
  {
    icon: 'star',
    label: 'Software Engineers',
  },
  {
    icon: 'star',
    label: 'Sarıyer',
  },
  {
    icon: 'star',
    label: 'Istanbul',
  },

  {
    icon: 'star',
    label: 'Turkey',
  },
  {
    icon: 'star',
    label: 'Everyone',
  },
  {
    icon: 'star',
    label: 'For Me',
  },
];

const FirstRoute = () => {
  const scrollViewRef = useRef(null);
  const listRefs = useRef([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sectionsYPositions, setSectionsYPositions] = useState([]);

  // İlk render sonrası pozisyonları ölçüp saklıyoruz
  useEffect(() => {
    const positions = [];
    listRefs.current.forEach((ref, index) => {
      ref?.measureLayout(scrollViewRef.current.getInnerViewNode(), (x, y) => {
        positions[index] = y;
      });
    });
    setSectionsYPositions(positions);
  }, []);

  const onTabChange = index => {
    setSelectedIndex(index);
    const yPos = sectionsYPositions[index];
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({
        y: scrollPosition > yPos ? yPos - 60 : yPos - SPACE,
        animated: true,
      });
    }
  };

  const handleScroll = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    // const contentHeight = event.nativeEvent.contentSize.height;
    // const viewHeight = event.nativeEvent.layoutMeasurement.height;

    // setScrollPosition(currentScrollY);

    // // Detect if the user has reached the end of the scroll
    // if (currentScrollY + viewHeight >= contentHeight - 50) {
    //   // User is at the bottom, set the last section as active
    //   setSelectedIndex(sectionsYPositions.length - 1);
    //   return;
    // }

    // // Determine which section should be active based on the scroll position
    // sectionsYPositions.forEach((yPos, index) => {
    //   if (currentScrollY >= yPos - 60 && currentScrollY < yPos + 200) {
    //     if (selectedIndex !== index) {
    //       setSelectedIndex(index);
    //     }
    //   }
    // });
  };

  return (
    <ScrollView
      overScrollMode="never"
      ref={scrollViewRef}
      style={styles.view}
      stickyHeaderHiddenOnScroll={true}
      onScroll={handleScroll}
      stickyHeaderIndices={[0]}>
      <Tabs data={tabs} onChange={onTabChange} selectedIndex={selectedIndex} />
      <Content listRefs={listRefs} />
    </ScrollView>
  );
};

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    activeColor={Theme.colors.primary}
    indicatorStyle={{backgroundColor: Theme.colors.primary}}
    style={{backgroundColor: Theme.colors.background}}
  />
);

const MyFollowingsView = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Companies'},
    {key: 'second', title: 'Cast'},
    {key: 'third', title: 'Crew'},
  ]);

  return (
    <TabView
      swipeEnabled={false}
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: Theme.colors.background}}
    />
  );
};

export default MyFollowingsView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
  },
});

const Content = React.memo(({listRefs}: {listRefs: any}) => {
  console.log('Content rendered');

  return (
    <View
      style={{
        flex: 1,
        gap: SPACE,
      }}>
      <View ref={ref => (listRefs.current[0] = ref)}>
        <FirstList />
      </View>
      <View ref={ref => (listRefs.current[1] = ref)}>
        <MyNetworkFollowers />
      </View>
      <View ref={ref => (listRefs.current[2] = ref)}>
        <UnscrollableList title="Software Engineers Follow" list={companies} />
      </View>
      <View ref={ref => (listRefs.current[3] = ref)}>
        <UnscrollableList title="Sarıyer Follows" list={companies} />
      </View>
      <View ref={ref => (listRefs.current[4] = ref)}>
        <UnscrollableList title="Istanbul Follows" list={companies} />
      </View>

      <View ref={ref => (listRefs.current[5] = ref)}>
        <UnscrollableList title="Turkey Follows" list={companies} />
      </View>

      <View ref={ref => (listRefs.current[6] = ref)}>
        <UnscrollableList title="Everyone" list={companies} />
      </View>

      <View ref={ref => (listRefs.current[7] = ref)}>
        <UnscrollableList title="For Me" list={companies} />
      </View>
    </View>
  );
});

const FirstList = () => {
  return (
    <View style={{gap: SPACE}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <TouchableOpacity>
          <CustomText
            text="Arrange"
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.xs,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={companies}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: SPACE,
        }}
        keyExtractor={item => item.name}
        renderItem={({item}) => {
          return <FollowingsAvatar item={item} />;
        }}></FlatList>
    </View>
  );
};

const MyNetworkFollowers = () => {
  return (
    <View style={{gap: SPACE}}>
      <ListTitle title="My Network Followers" />
      <FlatList
        data={companies}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: SPACE,
        }}
        horizontal
        keyExtractor={item => item.name}
        renderItem={({item}) => {
          return <FollowingsAvatar item={item} key={`imge-${item.name}`} />;
        }}></FlatList>
    </View>
  );
};

const ListTitle = ({title}: {title: string}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      <CustomText
        text={title}
        weight="bold"
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.sm,
        }}
      />
    </View>
  );
};

const FollowingsAvatar = React.memo(({item}: {item: Company}) => {
  return <Avatar size={'lg'} source={{uri: item.logo}} />;
});

const UnscrollableList = ({title, list}: {title: string; list: any[]}) => {
  return (
    <View style={{gap: SPACE}}>
      <ListTitle title={title} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: SPACE,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        {list.map((company, index) => {
          return <FollowingsAvatar item={company} key={`${title}-${index}`} />;
        })}
      </View>
    </View>
  );
};

type TabItem = {
  icon: string;
  label: string;
};

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

const Tabs = ({data, selectedIndex, onChange}: TabsProps) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: selectedIndex, animated: true});
    }
  }, [selectedIndex]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={flatListRef}
      contentContainerStyle={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: 12,
        paddingVertical: 12,
        backgroundColor: 'black',
      }}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <TabBarItem
            item={item}
            index={index}
            selectedIndex={selectedIndex}
            onChange={onChange}
          />
        );
      }}
    />
  );
};

type TabBarItemProps = {
  item: TabItem;
  index: number;
  selectedIndex: number;
  onChange: (index: number) => void;
};

const TabBarItem = React.memo(
  ({item, index, selectedIndex, onChange}: TabBarItemProps) => {
    const isActive = selectedIndex === index;
    return (
      <TouchableOpacity onPress={() => onChange(index)}>
        <LinearGradient
          colors={['#8b5cf6', '#a855f7']}
          style={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            justifyContent: 'center',

            borderRadius: 16,
            overflow: 'hidden',
            alignItems: 'center',
            gap: 12,
            flexDirection: 'row',
            paddingVertical: 8,
          }}>
          <CustomText style={{color: '#fff'}} text={item.label} />
        </LinearGradient>
      </TouchableOpacity>
    );
  },
);
