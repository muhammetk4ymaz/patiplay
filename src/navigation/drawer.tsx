import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

type Props = {};

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props: Props) => {
  return (
    <View>
      <Text>drawer</Text>
    </View>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
