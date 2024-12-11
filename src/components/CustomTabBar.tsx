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
import {Theme} from '../utils/theme';

type CustomTabBarProps = {
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

export default function CustomTabBar(props: CustomTabBarProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

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
                  backgroundColor: 'black',

                  borderColor: focused
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
    <TabView
      lazy
      swipeEnabled={props.swipeEnabled}
      navigationState={{index, routes: props.routes}}
      renderScene={props.renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
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
