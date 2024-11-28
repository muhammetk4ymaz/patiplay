import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import TopMovie from '../../models/top_movie';
import {Theme} from '../../constants/Theme';

type Props = {
  data: any[];
  renderItem: ({item}: {item: any}) => JSX.Element;
  keyExtractor: (item: any) => string;
  initialNumToRender?: number;
};

const ScrollableRow = (props: Props) => {
  const renderItem = useCallback(
    ({item}: {item: any}) => props.renderItem({item}),
    [],
  );

  return (
    <FlatList
      data={props.data}
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      horizontal
      initialNumToRender={props.initialNumToRender}
      contentContainerStyle={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: Theme.spacing.rowGap,
      }}
      renderItem={({item}) => renderItem({item})}
    />
  );
};

export default ScrollableRow;

const styles = StyleSheet.create({});
