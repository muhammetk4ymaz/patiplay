import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ImageManager} from '../../../constants/ImageManager';
import {RootStackParamList} from '../../../navigation/routes';
import {Theme} from '../../../utils/theme';
import ReplyButton from '../Buttons/ReplyButton';
import {
  CommentLikeButton,
  CommentReactions,
  formatDistanceCustom,
} from '../Comment/Comment';
import CustomText from '../CustomText';
import DiscussionJoinButton from './DiscussionJoinButton';

type Props = {
  item: any;
  uuid: string;
  replyOnPress?: () => void;
  isCommentable?: boolean;
  endpoint: string;
};

const Dicussion = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      <Avatar
        source={ImageManager.IMAGE_NAMES.ANGRYEMOJI}
        borderColor={Theme.colors.gray}
        borderWidth={1}
        size={'sm'}
      />
      <View style={{flex: 1, gap: 3}}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <View>
            <CustomText
              text={`@${props.item.username} • ${formatDistanceCustom(
                new Date(props.item.created_at),
              )}`}
              style={{color: '#B0B0B0', fontSize: Theme.fontSizes.xs}}
              numberOfLines={1}
              ellipsizeMode="tail"></CustomText>
          </View>
        </View>

        {props.item.title && (
          <CustomText
            text={props.item.title}
            style={{color: 'white', fontSize: Theme.fontSizes.lg}}
            ellipsizeMode="tail"></CustomText>
        )}

        <CustomText
          text={props.item.comment}
          style={{color: '#D1D5DB', fontSize: Theme.fontSizes.sm}}
          ellipsizeMode="tail"></CustomText>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}>
          <CommentLikeButton
            endpoint={props.endpoint}
            id={props.item.id}
            likes={props.item.likes}
            isLiked={props.item.is_liked_by_user}
            isDisliked={props.item.is_disliked_by_user}
          />
          <CommentReactions
            id={props.item.id}
            endpoint={props.endpoint}
            reaction={props.item.reactions[0]}
          />

          {props.isCommentable ? (
            <View style={{marginLeft: 2}}>
              <ReplyButton onPress={props.replyOnPress!} />
            </View>
          ) : (
            <DiscussionJoinButton
              users={props.item.users}
              onPress={() => {
                navigation.navigate('Discussion', {
                  discussionId: props.item.id,
                });
              }}
            />
          )}
        </View>
      </View>

      <TouchableOpacity
        style={{
          padding: 5,
        }}>
        <IconFontAwesome6 name="ellipsis-vertical" color="white" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Dicussion);

const styles = StyleSheet.create({});
