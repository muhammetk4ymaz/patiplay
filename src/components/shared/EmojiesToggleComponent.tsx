import {
  Box,
  HStack,
  IconButton,
  Stagger,
  theme,
  useDisclose,
} from 'native-base';
import React from 'react';
import MyIconButton from './IconButton';
import {Image, View} from 'react-native';
import {EmojiLaughIcon} from '../../../assets/icons';
import OutsidePressHandler from 'react-native-outside-press';
import {ImageManager} from '../../constants/ImageManager';

const height = 18;
const width = 18;

const EmojiesToggleComponent = () => {
  const {isOpen, onToggle, onClose} = useDisclose();
  const emojis = [
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
  const [selectedEmoji, setSelectedEmoji] = React.useState(null);

  return (
    <Box alignItems={'center'}>
      <HStack justifyContent="center">
        <MyIconButton
          onPress={onToggle}
          style={{
            backgroundColor: selectedEmoji ? theme.colors.primary : '#222121FF',
          }}
          icon={
            selectedEmoji ? (
              <Image
                style={{
                  width: height,
                  height: width,
                }}
                source={selectedEmoji?.url!}
              />
            ) : (
              <EmojiLaughIcon size={width} />
            )
          }
        />
      </HStack>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
          top: 55,
          left: -60,
          zIndex: 1000,
        }}>
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
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
          <IconButton
            mb="4"
            onPress={() => {
              onClose();
              setSelectedEmoji(emojis[0]);
            }}
            marginRight={1}
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={emojis[0].url}
              />
            }
          />
          <IconButton
            mb="4"
            marginRight={1}
            onPress={() => {
              setSelectedEmoji(emojis[1]);
              onClose();
            }}
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={emojis[1].url}
              />
            }
          />
          <IconButton
            mb="4"
            marginRight={1}
            onPress={() => {
              setSelectedEmoji(emojis[2]);
              onClose();
            }}
            variant="solid"
            bg="teal.400"
            colorScheme="teal"
            borderRadius="full"
            icon={
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={emojis[2].url}
              />
            }
          />
          <IconButton
            mb="4"
            marginRight={1}
            onPress={() => {
              setSelectedEmoji(emojis[3]);
              onClose();
            }}
            variant="solid"
            bg="orange.400"
            colorScheme="orange"
            borderRadius="full"
            icon={
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={emojis[3].url}
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            onPress={() => {
              setSelectedEmoji(emojis[4]);
              onClose();
            }}
            bg="red.500"
            colorScheme="red"
            borderRadius="full"
            icon={
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={emojis[4].url}
              />
            }
          />
        </Stagger>
      </View>
    </Box>
  );
};

export default EmojiesToggleComponent;
