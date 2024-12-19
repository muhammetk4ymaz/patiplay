import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../utils/theme';
import {
  setAudioTrack,
  setSubtitleIndex,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import CustomText from '../CustomText';
import CustomTextButton from '../Buttons/CustomTextButton';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';

type Props = {};

export interface AudioTrack {
  type?: string;
  value?: number;
  language?: string;
  selected?: boolean;
  index?: number;
}

const SubtitlesVoiceoverSettings = (props: Props) => {
  const navigation = useNavigation();
  const audioTrackList = useAppSelector(
    state => state.videoplayer.audioTrackList,
  );
  const audioTrack = useAppSelector(state => state.videoplayer.audioTrack);
  const textTrackList = useAppSelector(
    state => state.videoplayer.textTrackList,
  );
  const subtitleIndex = useAppSelector(
    state => state.videoplayer.subtitleIndex,
  );

  const dispatch = useAppDispatch();

  const [audio, setAudio] = React.useState<number>(audioTrack);
  const [subtitle, setSubtitle] = React.useState<number>(subtitleIndex);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.colors.background,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      <View style={{flex: 1}}>
        <CustomText
          text="Seslendirme"
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes['2xl'],
            fontWeight: 'bold',
          }}
        />
        <FlatList
          data={audioTrackList}
          contentContainerStyle={{gap: 12, paddingVertical: 5}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setAudio(item.index!);
                }}
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <IconIonicons
                  name="checkmark"
                  size={28}
                  color={
                    audio === item.index
                      ? Theme.colors.white
                      : Theme.colors.background
                  }
                />
                <CustomText
                  text={item.language || ''}
                  style={
                    audio === item.index
                      ? styles.selectedAudioTrack
                      : styles.unselectedAudioTrack
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <CustomText
          text="Alt yazılar"
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes['2xl'],
            fontWeight: 'bold',
          }}
        />
        <FlatList
          data={textTrackList}
          contentContainerStyle={{gap: 12, paddingVertical: 5}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSubtitle(item.index!);
                }}
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <IconIonicons
                  name="checkmark"
                  size={28}
                  color={
                    subtitle === item.index
                      ? Theme.colors.white
                      : Theme.colors.background
                  }
                />
                <CustomText
                  text={item.language || ''}
                  style={
                    subtitle === item.index
                      ? styles.selectedAudioTrack
                      : styles.unselectedAudioTrack
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: insets.bottom + Theme.paddings.viewHorizontalPadding,
          flexDirection: 'row',
          gap: 12,
        }}>
        <CustomTextButton
          text="İptal"
          onPress={() => {
            navigation.goBack();
          }}
          borderRadius={8}
          textColor="black"
          paddingVertical={10}
          backgroundColor="lightgray"
        />
        <CustomTextButton
          text="Uygula"
          onPress={() => {
            dispatch(setAudioTrack(audio));
            dispatch(setSubtitleIndex(subtitle));
            navigation.goBack();
          }}
          borderRadius={8}
          textColor="white"
          paddingVertical={10}
          backgroundColor={Theme.colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

export default SubtitlesVoiceoverSettings;

const styles = StyleSheet.create({
  selectedAudioTrack: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.lg,
    fontWeight: 'bold',
  },
  unselectedAudioTrack: {
    color: Theme.colors.gray,
    fontSize: Theme.fontSizes.lg,
    fontWeight: '100',
  },
});
