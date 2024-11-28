import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../constants/Theme';
import CustomText from '../../components/shared/CustomText';
import {ImageManager} from '../../constants/ImageManager';
import {useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import PreRegistrationView from '../preregistration/PreRegistrationView';

type NotificationProps = {
  title: string;
  content: string;
  date: string;
};

const NotificationsView = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Recent Developments?'} />;
  }

  return (
    <View style={styles.view}>
      <Notification
        title="Yeni İçerik"
        content="PABLO ESCOBAR,KÖTÜLÜĞÜN EFENDİSİ"
        date="11.01.2024 13.22"
      />
      <Notification
        title="Yeni İçerik"
        content="İLLEGAL HAYATLAR"
        date="11.01.2024 13.22"
      />
      <Notification
        title="Yeni İçerik"
        content="SQUİD GAME"
        date="11.01.2024 13.22"
      />
      <Notification
        title="Yeni İçerik"
        content="LABİRENT ÖLÜMCÜL KAÇIŞ"
        date="11.01.2024 13.22"
      />
    </View>
  );
};

export default NotificationsView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

const Notification = (item: NotificationProps) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: Theme.colors.primary,
          }}></View>
        <Image
          source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
          style={{width: 32, height: 32}}
        />
        <View style={{flex: 1, paddingRight: 24}}>
          <CustomText
            text={item.title}
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.xs,
            }}
            weight="medium"
          />
          <CustomText
            text={item.content}
            numberOfLines={1}
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.sm,
            }}
            weight="bold"
          />
        </View>
      </View>
      <CustomText
        text={item.date}
        style={{
          fontSize: Theme.fontSizes.xs,
          textAlign: 'right',
          color: 'rgba(255,255,255,0.5)',
        }}
      />
    </TouchableOpacity>
  );
};
