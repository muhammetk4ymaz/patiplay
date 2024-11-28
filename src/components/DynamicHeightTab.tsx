import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import CustomText from './shared/CustomText';
import {Theme} from '../constants/Theme';

type DynamicHeightTabProps = {
  renderScene: (
    props: SceneRendererProps & {
      route: {
        key: string;
        title: string;
      };
    },
  ) => React.ReactNode;
  routes: {key: string; title: string}[];
  swipeEnabled?: boolean;
};

export default function DynamicHeightTab(props: DynamicHeightTabProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [heights, setHeights] = React.useState<number[]>([]);
  const [containerHeight, setContainerHeight] = React.useState(0);

  React.useEffect(() => {
    // Update the container height whenever the tab index changes
    if (heights[index]) {
      setContainerHeight(heights[index]);
    }
  }, [index, heights]);

  const handleLayout = (event: any, tabIndex: number) => {
    const height = event.nativeEvent.layout.height;
    setHeights(prevHeights => {
      const updatedHeights = [...prevHeights];
      updatedHeights[tabIndex] = height;
      return updatedHeights;
    });
  };

  const renderScene = ({route}) => (
    <View
      onLayout={e =>
        handleLayout(
          e,
          props.routes.findIndex(r => r.key === route.key),
        )
      }>
      {props.renderScene({route})}
    </View>
  );

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    },
  ) => {
    if (props.navigationState.routes.length <= 4) {
      return (
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const focused = i === props.navigationState.index;
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.tabItem,
                  {
                    borderColor: focused
                      ? Theme.colors.primary
                      : Theme.colors.lightgray,
                  },
                ]}
                onPress={() => setIndex(i)}>
                <CustomText
                  text={route.title}
                  style={{
                    color: focused
                      ? Theme.colors.primary
                      : Theme.colors.lightgray,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <TabBar
          {...props}
          renderLabel={({route, focused}) => (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 24,
                borderWidth: 1,
                borderRadius: 36,
                borderColor: focused
                  ? Theme.colors.primary
                  : Theme.colors.lightgray,
              }}>
              <CustomText
                text={route.title}
                style={{
                  color: focused
                    ? Theme.colors.primary
                    : Theme.colors.lightgray,
                }}
              />
            </View>
          )}
          tabStyle={{
            width: 'auto',
            paddingHorizontal: 4,
            marginBottom: 4,
          }}
          indicatorStyle={{
            backgroundColor: Theme.colors.background,
          }}
          scrollEnabled={true}
          style={{
            backgroundColor: Theme.colors.background,
          }}
        />
      );
    }
  };

  return (
    <View style={{height: containerHeight === 0 ? 100 : containerHeight}}>
      <TabView
        lazy
        swipeEnabled={props.swipeEnabled}
        navigationState={{index, routes: props.routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 36,
    paddingVertical: 4,
  },
});
