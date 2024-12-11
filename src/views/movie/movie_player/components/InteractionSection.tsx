import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../redux/hooks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Comments from './Comments';
import {Button} from 'native-base';
import {Theme} from '../../../../utils/theme';
import Replies from './Replies';
import Live from './Live';

type Props = {};

const InteractionSection = (props: Props) => {
  console.log(InteractionSection.name);

  const replySectionVisible = useAppSelector(
    state => state.interaction.replySectionVisible,
  );
  const commentViewWidth = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const [currentTab, setCurrentTab] = useState(1);
  const tabs = [
    {
      index: 0,
      title: 'Live',
      component: <Live></Live>,
    },
    {
      index: 1,
      title: 'Comments',
      component: <Comments></Comments>,
    },
  ];

  const commentViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${commentViewWidth.value}%`,
      right: 0,
      opacity: 1,
      position: 'absolute',
      height: '100%',
      backgroundColor: 'black',
    };
  });

  const contentViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  const toggleComment = () => {
    if (!replySectionVisible) {
      commentViewWidth.value = withTiming(0);
      contentOpacity.value = withTiming(0, {duration: 150});
    } else {
      commentViewWidth.value = withTiming(100);
      contentOpacity.value = withTiming(1, {duration: 1200});
    }
  };

  useEffect(() => {
    toggleComment();
  }, [replySectionVisible]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              title={tab.title}
              onPress={() => setCurrentTab(tab.index)}
              active={currentTab === tab.index}
            />
          ))}
        </View>
        <View style={{flex: 1}}>{tabs[currentTab].component}</View>
      </View>
      <Animated.View style={[commentViewAnimatedStyle]}>
        <Animated.View style={[contentViewAnimatedStyle]}>
          <Replies />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default InteractionSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    paddingTop: 12,
  },
});

const Tab = ({
  title,
  onPress,
  active,
}: {
  title: string;
  onPress: () => void;
  active: boolean;
}) => {
  return (
    <Button
      variant={'outline'}
      flex={1}
      borderRadius={32}
      paddingTop={1}
      paddingBottom={1}
      onPress={onPress}
      _pressed={{
        backgroundColor: 'transparent',
      }}
      _text={{
        color: active ? Theme.colors.primary : Theme.colors.lightgray,
      }}
      borderColor={active ? Theme.colors.primary : Theme.colors.lightgray}>
      {title}
    </Button>
  );
};
