import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  id: number;
  isViewable: boolean;
  children: React.ReactNode;
};

const TabView = (props: Props) => {
  React.useEffect(() => {
    console.log('TabView rendered');
  }, []);

  if (!props.isViewable) {
    return null;
  }

  return props.children;
};

export default React.memo(TabView, (prevProps, nextProps) => {
  return prevProps.isViewable === nextProps.isViewable;
});

const styles = StyleSheet.create({});
