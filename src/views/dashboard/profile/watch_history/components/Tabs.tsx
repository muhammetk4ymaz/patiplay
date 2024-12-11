import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {act} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../../components/shared/CustomText';
import {Theme} from '../../../../../utils/theme';
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition,
} from 'react-native-reanimated';
import {MotiView} from 'moti';

type TabItem = {
  icon: string;
  label: string;
};

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

const Tabs = ({
  data,
  selectedIndex,
  onChange,
  activeColor = '#fff',
  inactiveColor = '#999',
  activeBackgroundColor = '#111',
  inactiveBackgroundColor = '#ddd',
}: TabsProps) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        paddingVertical: 12,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {data.map((item, index) => {
        const isActive = selectedIndex === index;
        return (
          <MotiView
            key={`tab-${index}`}
            animate={{
              backgroundColor: isActive
                ? activeBackgroundColor
                : inactiveBackgroundColor,
              borderRadius: 16,
              overflow: 'hidden',
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}>
            <TouchableOpacity
              onPress={() => onChange(index)}
              style={{
                paddingHorizontal: 18,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 12,
                flexDirection: 'row',
                paddingVertical: 4,
              }}>
              <MaterialCommunityIcons
                name={item.icon}
                size={30}
                color={Theme.colors.primary}
              />
              <LayoutAnimationConfig skipEntering>
                {isActive && (
                  <Animated.Text
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    style={{
                      color: 'white',
                      fontFamily: 'HelveticaNeue-Medium',
                    }}>
                    {item.label}
                  </Animated.Text>
                )}
              </LayoutAnimationConfig>
            </TouchableOpacity>
          </MotiView>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
