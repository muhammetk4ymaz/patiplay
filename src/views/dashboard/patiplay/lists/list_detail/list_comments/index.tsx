import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../../../utils/theme';
import Comment from '../../../../../movie/movie_player/components/Comment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

const ListCommentsView = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FlatList
        scrollEnabled={true}
        removeClippedSubviews={true}
        data={[1, 2, 3, 4]}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingBottom: insets.bottom,
          gap: 12,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <Comment />}></FlatList>
    </View>
  );
};

export default ListCommentsView;

const styles = StyleSheet.create({});
