import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/shared/CustomText';

import IconEntypo from 'react-native-vector-icons/Entypo';
import {Theme} from '../../../../constants/Theme';

export type MenuItem = {
  icon?: any;
  title: string;
  onPress?: () => void;
  isChevronVisible?: boolean;
  subItem?: MenuItem[];
  divider?: boolean;
  subItemVisible?: boolean;
};

const MenuItemComponent = ({menuItem}: {menuItem: MenuItem}) => {
  const [isSubItemVisible, setIsSubItemVisible] = React.useState(
    menuItem.subItemVisible || false,
  );

  console.log('MenuItemComponent rendered');
  return (
    <View>
      <TouchableOpacity
        onPress={
          menuItem.onPress
            ? menuItem.onPress
            : () => {
                setIsSubItemVisible(!isSubItemVisible);
              }
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
          }}>
          {menuItem.icon}
          <CustomText
            text={menuItem.title}
            weight="medium"
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
            }}></CustomText>
        </View>
        {menuItem.isChevronVisible && (
          <IconEntypo
            name="chevron-right"
            size={24}
            color={Theme.colors.white}
            style={{position: 'absolute', right: 0}}
          />
        )}
        {
          // if there is a subItem, show the chevron icon
          menuItem.subItem && (
            <IconEntypo
              name={isSubItemVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={Theme.colors.white}
              style={{position: 'absolute', right: 0}}
            />
          )
        }
      </TouchableOpacity>
      {isSubItemVisible && menuItem.subItem && (
        <View
          style={{
            paddingLeft: 40,
            backgroundColor: '#030713FF',
            borderRadius: 12,
            paddingRight: 18,
            paddingVertical: 8,
          }}>
          {menuItem.subItem.map((item, index) => {
            return <MenuItemComponent key={index} menuItem={item} />;
          })}
        </View>
      )}
      {menuItem.divider && (
        <View
          style={{
            height: 1,
            backgroundColor: '#4F4F4F',
            marginVertical: 4,
          }}></View>
      )}
    </View>
  );
};

export default React.memo(MenuItemComponent);

const styles = StyleSheet.create({});
