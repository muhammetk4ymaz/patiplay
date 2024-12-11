import {Box, IconButton, Stagger, useDisclose} from 'native-base';
import React from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EmojiLaughIcon} from '../../../assets/icons';
import networkService from '../../helpers/networkService';
import {Theme} from '../../utils/theme';
import MyIconButton from './Buttons/IconButton';
import {Reaction, reactions} from './Comment/Comment';

type ReactionToggleComponentProps = {
  iconSize: number;
  uuid: string;
  endpoint: string;
  initialValue: Reaction | undefined;
};

const ReactionToggleComponent = (props: ReactionToggleComponentProps) => {
  const [selectedReaction, setSelectedReaction] = React.useState<Reaction>();

  React.useEffect(() => {
    if (props.initialValue) {
      setSelectedReaction(props.initialValue);
    }
  }, []);

  const {isOpen, onToggle, onClose} = useDisclose();

  const [positionY, setPositionY] = React.useState(0);
  const [positionX, setPositionX] = React.useState(0);

  const [fadeAnim] = React.useState(new Animated.Value(0)); // Başlangıçta görünmez

  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [onToggle]);

  const reactionsWithColors = [
    {reaction: reactions[0], bg: 'yellow.400', colorScheme: 'yellow'},
    {reaction: reactions[1], bg: 'indigo.500', colorScheme: 'indigo'},
    {reaction: reactions[2], bg: 'teal.400', colorScheme: 'teal'},
    {reaction: reactions[3], bg: 'orange.400', colorScheme: 'orange'},
    {reaction: reactions[4], bg: 'red.500', colorScheme: 'red'},
  ];

  const handleReaction = async (reaction: Reaction) => {
    try {
      const response = await networkService.post(
        `title/api/${props.endpoint}-buttons/`,
        {
          reaction: reaction.name,
          type: 'reaction',
          uuid: props.uuid,
        },
      );

      if (response.status === 200) {
        console.log('Reaction added', response.data, reaction);
        setSelectedReaction(reaction);
        onClose();
      }
    } catch (error) {}
  };

  return (
    <Box>
      {isOpen && (
        <Modal visible={isOpen} transparent>
          <Pressable
            onPress={onClose}
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
            <Stagger
              visible={isOpen}
              initial={{
                opacity: 0,
                scale: 0,
                translateY: 34,
              }}
              animate={{
                translateY: 0, // const OldComponent = () => {
                scale: 1,
                opacity: 1,
                transition: {
                  type: 'spring',
                  mass: 0.8,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                  duration: 100,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  top: positionY,
                  justifyContent: 'center',
                }}>
                {reactionsWithColors.map(reactionWithColor => (
                  <ReactionButton
                    key={reactionWithColor.reaction.id}
                    reaction={reactionWithColor.reaction}
                    onPress={handleReaction}
                    bg={reactionWithColor.bg}
                    colorScheme={reactionWithColor.colorScheme}
                  />
                ))}
                <TouchableOpacity
                  onPress={() => {
                    setSelectedReaction(undefined);
                    onClose();
                  }}
                  style={{
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    borderRadius: 100,
                    backgroundColor: '#1a202c',
                  }}>
                  <Ionicons name="close" size={24} color={'white'} />
                </TouchableOpacity>
              </View>
            </Stagger>
          </Pressable>
        </Modal>
      )}
      <MyIconButton
        positionGetter={(x, y) => {
          positionY !== y && setPositionY(y);
          positionX !== x && setPositionX(x);
        }}
        onPress={onToggle}
        style={{
          backgroundColor: selectedReaction
            ? Theme.colors.primary
            : '#222121FF',
          borderColor: selectedReaction
            ? Theme.colors.primary
            : Theme.colors.gray,
        }}
        icon={
          selectedReaction ? (
            <Image
              style={{
                width: props.iconSize,
                height: props.iconSize,
              }}
              source={selectedReaction.source}
            />
          ) : (
            <EmojiLaughIcon size={props.iconSize} />
          )
        }
      />
    </Box>
  );
};

export default ReactionToggleComponent;

type ReactionButtonProps = {
  reaction: Reaction;
  onPress: (reaction: Reaction) => void;
  bg: string;
  colorScheme: string;
};

const ReactionButton = (props: ReactionButtonProps) => {
  return (
    <IconButton
      mb="4"
      variant="solid"
      onPress={() => {
        props.onPress(props.reaction);
      }}
      bg={props.bg}
      colorScheme={props.colorScheme}
      borderRadius="full"
      icon={
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          source={props.reaction.source}
        />
      }
    />
  );
};
