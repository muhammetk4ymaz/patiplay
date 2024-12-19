import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CaptionIcon, ResolutionIcon, SpeedIcon} from '../../../../assets/icons';
import {
  setQualitySettingsVisible,
  setSpeedSettingsVisible,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import CustomButton from '../Buttons/CustomButton';
import CustomText from '../CustomText';
import {RootStackParamList} from '../../../navigation/routes';

const VideoOptionsComponent = () => {
  const speed = useAppSelector(state => state.videoplayer.speed);
  const interactionSectionVisible = useAppSelector(
    state => state.interaction.interactionSectionVisible,
  );

  console.log(VideoOptionsComponent.name, 'rendered');

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      }}>
      <CustomButton
        onPress={() => {
          navigation.navigate('SubtitlesVoiceoverSettings');
        }}
        backgroundColor="transparent"
        borderRadius={10}
        child={
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}>
            <CaptionIcon size={32} />
            {!interactionSectionVisible && (
              <CustomText
                text="Alt Yazı & Seslendirme"
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              />
            )}
          </View>
        }
      />

      <CustomButton
        onPress={() => {
          dispatch(setSpeedSettingsVisible(true));
        }}
        backgroundColor="transparent"
        borderRadius={10}
        child={
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}>
            <SpeedIcon size={32} />
            {!interactionSectionVisible && (
              <CustomText
                text={'Oynatma Hızı (' + speed + 'x)'}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              />
            )}
          </View>
        }
      />

      {/* <CustomButton
        onPress={() => {
          dispatch(setQualitySettingsVisible(true));
        }}
        backgroundColor="transparent"
        borderRadius={10}
        child={
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}>
            <ResolutionIcon size={28} />
            {!interactionSectionVisible && (
              <CustomText
                text="Kalite"
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              />
            )}
          </View>
        }
      /> */}
    </View>
  );
};

export default React.memo(VideoOptionsComponent);

const styles = StyleSheet.create({});
