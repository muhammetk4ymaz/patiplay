import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../constants/Theme';
import Dicussion from '../../../../components/shared/Discussion';
import Reply from '../../../movie/movie_player/components/Reply';
import Comment from '../../../movie/movie_player/components/Comment';

type Props = {};

const DiscussionView = (props: Props) => {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 18,
      }}
      ListHeaderComponent={() => {
        return (
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: Theme.colors.sambucus,
              borderRadius: 12,
              marginBottom: 12,
            }}
            onPress={() => {}}>
            <Dicussion
              replyOnPress={() => {
                console.log('replyOnPress');
              }}
              isCommentable
            />
          </TouchableOpacity>
        );
      }}
      style={{flex: 1, backgroundColor: Theme.colors.background}}
      renderItem={() => (
        <View style={{paddingLeft: 48, paddingVertical: 12}}>
          <Comment />
        </View>
      )}
    />
  );
};

export default DiscussionView;

const styles = StyleSheet.create({});
