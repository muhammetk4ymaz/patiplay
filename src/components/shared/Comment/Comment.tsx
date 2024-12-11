import {
  differenceInDays,
  differenceInMinutes,
  formatDistanceToNow,
} from 'date-fns';
import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {EmojiLaughIcon} from '../../../../assets/icons';
import {ImageManager} from '../../../constants/ImageManager';
import networkService from '../../../helpers/networkService';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {Theme} from '../../../utils/theme';
import ReplyButton from '../Buttons/ReplyButton';
import CustomText from '../CustomText';

type Props = {
  item: any;
  replyOnPress: () => void;
  endpoint: string;
};

const Comment = (props: Props) => {
  React.useEffect(() => {
    // console.log('Comment Rendered', props.item.id);
  }, []);

  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      <Avatar
        source={ImageManager.IMAGE_NAMES.ANGRYEMOJI}
        borderColor={Theme.colors.gray}
        borderWidth={1}
        size={'sm'}
      />
      <View style={{flex: 1, gap: 8}}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <View>
            <CustomText
              // text={`@${props.item.username} • ${formatDistanceCustom(
              //   new Date(props.item.created_at),
              // )}`}
              text="@muhammetk4ymazzzzzz • 2d ago"
              style={{color: '#B0B0B0', fontSize: Theme.fontSizes.xs}}
              numberOfLines={1}
              ellipsizeMode="tail"></CustomText>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <CustomText
            text={props.item.comment}
            style={{color: '#D1D5DB', fontSize: Theme.fontSizes.sm}}
            ellipsizeMode="tail"></CustomText>
        </View>
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
            endpoint={props.endpoint}
            id={props.item.id}
            reaction={props.item.reactions[0]}
          />
          <ReplyButton onPress={props.replyOnPress} />
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

export default Comment;

const styles = StyleSheet.create({});

type CommentLikeButtonProps = {
  likes: number;
  isLiked: boolean;
  isDisliked: boolean;
  id: number;
  endpoint: string;
};

export const CommentLikeButton = (props: CommentLikeButtonProps) => {
  const [liked, setLiked] = useState(props.isLiked);
  const [disliked, setDisliked] = useState(props.isDisliked);
  const [likes, setLikes] = useState(props.likes);

  const handleLike = async () => {
    const response = await networkService.post(
      `title/api/${props.endpoint}-like/`,
      // 'title/api/company-comment-like/',
      {
        type: 'like',
        comment: props.id,
        uuid: props.id,
      },
    );

    console.log('Like', response.data);

    if (response.status === 200) {
      setLiked(!liked);

      if (disliked) {
        await handleDislike();
      }
    }
    if (response.data.action === 'create') {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };

  const handleDislike = async () => {
    const response = await networkService.post(
      `title/api/${props.endpoint}-dislike/`,
      {
        type: 'dislike',
        comment: props.id,
        uuid: props.id,
      },
    );
    console.log('Dislike', response.data);

    if (response.status === 200) {
      setDisliked(!disliked);
      if (liked) {
        await handleLike();
      }
    }
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
      <TouchableOpacity
        onPress={async () => {
          await handleLike();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          padding: 5,
        }}>
        <IconAntDesign
          name={liked ? 'like1' : 'like2'}
          color="white"
          size={18}
        />
        {likes > 0 && (
          <CustomText
            text={likes.toString()}
            style={{
              color: '#D1D5DB',
              fontSize: Theme.fontSizes.xs,
            }}></CustomText>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await handleDislike();
        }}
        style={{padding: 5}}>
        <IconAntDesign
          name={disliked ? 'dislike1' : 'dislike2'}
          color="white"
          size={18}
          style={{transform: [{scaleX: -1}]}}
        />
      </TouchableOpacity>
    </View>
  );
};

type CommentReactionsProps = {
  id: number;
  reaction: string;
  endpoint: string;
};

export type Reaction = {
  id: number;
  name: string;
  source: ImageSourcePropType;
};

export const CommentReactions = (props: CommentReactionsProps) => {
  const uuid = useAppSelector((state: RootState) => state.auth.user.uuid);
  const reaction =
    reactions.find(reaction => reaction.name === props.reaction) || null;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<Reaction | null>(reaction);
  const buttonRef = React.useRef<View>(null);

  const [positionY, setPositionY] = React.useState(0);
  const [positionX, setPositionX] = React.useState(0);

  const handlePress = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log('x: ', x, 'y: ', y, 'width: ', width, 'height: ', height);
        console.log('pageX: ', pageX, 'pageY: ', pageY);

        setPositionX(pageX);
        setPositionY(pageY);
        setIsModalVisible(true);
      });
    }
  };

  const handleReactions = async (reaction: Reaction) => {
    const response = await networkService.post(
      `title/api/${props.endpoint}-reaction/`,
      // 'title/api/company-comment-reaction/',
      {
        reaction: reaction.name,
        comment: props.id,
        uuid: uuid,
      },
    );

    console.log('Reaction', response.data);

    if (response.status === 200) {
      setSelectedEmoji(reaction);
    }
  };

  return (
    <View>
      <Modal visible={isModalVisible} transparent>
        <Pressable
          onPress={() => {
            setIsModalVisible(false);
          }}
          style={{flex: 1, backgroundColor: 'transparent'}}>
          <View
            style={{
              top: positionY - 30,
              left: positionX - (24 * 4 + 5 * 3) / 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#1F1F1F',
                padding: 5,
                borderRadius: 10,
                gap: 5,
                width: 24 * 5 + 5 * 4 + 10,
              }}>
              {reactions.map((reaction, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleReactions(reaction);
                    }}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={reaction.source}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>
      <TouchableOpacity
        style={{
          padding: 8,
        }}
        ref={buttonRef}
        onPress={() => {
          handlePress();
        }}>
        {selectedEmoji ? (
          <Image
            resizeMode="contain"
            style={{
              width: 22,
              height: 22,
            }}
            source={selectedEmoji.source}
          />
        ) : (
          <EmojiLaughIcon size={18} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export function formatDistanceCustom(date: Date) {
  // 'date-fns' ile zaman farkını al, "about" kısmını ekleme
  let timeAgo = formatDistanceToNow(date, {addSuffix: false});

  // 'about' kelimesini kaldır
  timeAgo = timeAgo.replace('about ', '');

  // Gün farkını hesapla
  const daysDifference = differenceInDays(new Date(), date);

  const minutesDifference = differenceInMinutes(new Date(), date);

  if (minutesDifference <= 1) {
    timeAgo = 'now';
  } else {
    if (daysDifference >= 1) {
      // 1 gün veya daha fazla fark var ise, sadece gün cinsinden döndür
      timeAgo = `${daysDifference}d`;
    } else {
      // 'hours', 'minutes' gibi diğer birimlerin dönüşümleri
      timeAgo = timeAgo.replace('years', 'y').replace('year', 'y');
      timeAgo = timeAgo.replace('days', 'd').replace('day', 'd');
      timeAgo = timeAgo.replace('hours', 'h').replace('hour', 'h');
      timeAgo = timeAgo.replace('minutes', 'm').replace('minute', 'm');
      timeAgo = timeAgo.replace('seconds', 's').replace('second', 's');
      // Boşlukları kaldır ve " ago" ekle
    }

    timeAgo = timeAgo.replace(' ', '') + ' ago';
  }

  return timeAgo;
}

export const reactions: Reaction[] = [
  {
    id: 1,
    name: 'Haha',
    source: ImageManager.IMAGE_NAMES.LAUGHINGEMOJI,
  },
  {
    id: 2,
    name: 'Wow',
    source: ImageManager.IMAGE_NAMES.SUPRISEDEMOJI,
  },
  {
    id: 3,
    name: 'Sad',
    source: ImageManager.IMAGE_NAMES.EMBARRASSEDEMOJI,
  },
  {
    id: 4,
    name: 'Angry',
    source: ImageManager.IMAGE_NAMES.ANGRYEMOJI,
  },
  {
    id: 5,
    name: 'Love',
    source: ImageManager.IMAGE_NAMES.INLOVEEMOJI,
  },
];
