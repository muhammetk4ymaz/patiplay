import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'native-base';
import {ImageManager} from '../../constants/ImageManager';
import {Theme} from '../../constants/Theme';
import CustomText from './CustomText';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import OutsidePressHandler from 'react-native-outside-press';
import {EmojiLaughIcon} from '../../../assets/icons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReplyButton from './ReplyButton';

type Props = {
  replyOnPress: () => void;
};

const DicussionNew = (props: Props) => {
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
              text="@muhammetk4ymazzzzzz • 2d ago"
              style={{color: '#B0B0B0', fontSize: Theme.fontSizes.xs}}
              numberOfLines={1}
              ellipsizeMode="tail"></CustomText>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <CustomText
            text="This movie is a masterpiece! Heath Ledger’s portrayal of the Joker is nothing short of phenomenal. The direction by Christopher Nolan and the depth of the script keep the audience engaged throughout. Every scene is unforgettable, making it one of the greatest superhero films ever made."
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
          <DicussionLikeButton />
          <DicussionReactions />
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

export default React.memo(DicussionNew);

const styles = StyleSheet.create({});

const DicussionLikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
      <TouchableOpacity
        onPress={() => {
          setLiked(!liked);
          if (disliked) {
            setDisliked(false);
          }
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
        <CustomText
          text="138"
          style={{
            color: '#D1D5DB',
            fontSize: Theme.fontSizes.xs,
          }}></CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setDisliked(!disliked);
          if (liked) {
            setLiked(false);
          }
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

const DicussionReactions = () => {
  const reactions = [
    {
      id: 1,
      name: 'laughing',
      url: ImageManager.IMAGE_NAMES.LAUGHINGEMOJI,
      color: 'yellow',
    },
    {
      id: 2,
      name: 'surprised',
      url: ImageManager.IMAGE_NAMES.SUPRISEDEMOJI,
      color: 'indigo',
    },
    {
      id: 3,
      name: 'embarrassed',
      url: ImageManager.IMAGE_NAMES.EMBARRASSEDEMOJI,
      color: 'teal',
    },
    {
      id: 4,
      name: 'angry',
      url: ImageManager.IMAGE_NAMES.ANGRYEMOJI,
      color: 'orange',
    },
    {
      id: 5,
      name: 'in-love',
      url: ImageManager.IMAGE_NAMES.INLOVEEMOJI,
      color: 'red',
    },
  ];
  const [pressed, setPressed] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<{
    id: number;
    name: string;
    url: any;
  }>();
  return (
    <OutsidePressHandler
      disabled={!pressed}
      onOutsidePress={() => {
        setPressed(false);
      }}>
      <View>
        {pressed && (
          <View
            style={{
              alignContent: 'center',
              position: 'absolute',
              bottom: 35,
              left: -57,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                backgroundColor: '#1F1F1F',
                padding: 5,
                borderRadius: 10,
                gap: 5,
              }}>
              {reactions.map((reaction, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedEmoji(reaction);
                      setPressed(false);
                    }}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={reaction.url}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => {
            setPressed(!pressed);
          }}>
          {selectedEmoji ? (
            <Image
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
              }}
              source={selectedEmoji.url}
            />
          ) : (
            <EmojiLaughIcon size={18} />
          )}
        </TouchableOpacity>
      </View>
    </OutsidePressHandler>
  );
};
