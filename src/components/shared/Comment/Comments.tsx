import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const Comments = (props: Props) => {
  const comments = [
    {
      id: 1,
      comment: 'This is a comment',
      replies: [],
    },
    {
      id: 2,
      comment: 'This is a comment',
      replies: [
        {
          id: 1,
          comment: 'This is a comment',
          replies: [],
        },
        {
          id: 2,
          comment: 'This is a comment',
          replies: [],
        },
        {
          id: 3,
          comment: 'This is a comment',
          replies: [],
        },
      ],
    },
    {
      id: 3,
      comment: 'This is a comment',
      replies: [],
    },
  ];
  return <View></View>;
};

export default Comments;

const styles = StyleSheet.create({});
