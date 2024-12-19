import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import TabView from './TabView';

type Props = {
  components: React.JSX.Element[];
  tabChange?: (index: number) => void;
  tabs: string[];
};

const DynamicTabBar = (props: Props) => {
  const tabBarScrollRef = React.useRef<FlatList>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeTabs, setActiveTabs] = React.useState([0]);

  const onTabPress = (index: number) => {
    setActiveTab(index);
    if (!activeTabs.includes(index)) {
      setActiveTabs([...activeTabs, index]);
    }
    tabBarScrollRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  return (
    <View>
      <FlatList
        ref={tabBarScrollRef}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          backgroundColor: Theme.colors.background,
          gap: 10,
        }}
        data={props.tabs}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[
                {
                  paddingBottom: 12,
                },
              ]}
              onPress={() => {
                onTabPress(index);
                props.tabChange && props.tabChange(index);
              }}>
              <View
                style={[
                  {
                    paddingHorizontal: 24,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderRadius: 36,
                    borderColor:
                      activeTab === index
                        ? Theme.colors.primary
                        : Theme.colors.lightgray,
                  },
                ]}>
                <CustomText
                  text={item.toString()}
                  style={{
                    color:
                      activeTab === index
                        ? Theme.colors.primary
                        : Theme.colors.lightgray,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {props.components.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              display: activeTab === index ? 'flex' : 'none',
            }}>
            <TabView isViewable={activeTabs.includes(index)} id={index}>
              {item}
            </TabView>
          </View>
        );
      })}
    </View>
  );
};

export default DynamicTabBar;

const styles = StyleSheet.create({});
