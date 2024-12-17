import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard, {
  TermAndPrivacyText,
} from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import CustomTextInput from '../../components/shared/Inputs/CustomTextInput';
import {ImageManager} from '../../constants/ImageManager';
import {Theme} from '../../utils/theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';

type Props = {};

const WelcomePatiView = (props: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.view,
        {paddingTop: insets.top + 50, paddingBottom: insets.bottom},
      ]}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ContentWithIconCard
          button={
            <View style={{backgroundColor: 'black'}}>
              <CustomTextButton
                text={'Done'}
                onPress={() => {
                  navigation.goBack();
                }}
                textColor="white"
                paddingHorizontal={36}
                backgroundColor="transparent"
                border={true}
              />
            </View>
          }
          icon={
            <Image
              source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
              style={{height: 80, width: 80}}
            />
          }>
          <View
            style={{
              gap: 12,
              paddingBottom: 24,
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            }}>
            <CustomText
              text="Welcome to Pati Play!"
              style={{color: 'white', fontSize: Theme.fontSizes.md}}
            />
            <CustomText
              text="You’re one of the select few witnessing the birth of a revolutionary digital platform built for cinephiles like you. 🎬"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: Theme.fontSizes.sm,
              }}
            />
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: Theme.fontSizes.sm,
                fontFamily: 'HelveticaNeue-Medium',
              }}>
              All you must do now is wait until
              <Text
                style={{
                  color: 'red',
                  fontSize: Theme.fontSizes.sm,
                  fontFamily: 'HelveticaNeue-Bold',
                }}>
                {' '}
                March 17
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: Theme.fontSizes.sm,
                    fontFamily: 'HelveticaNeue-Medium',
                  }}>
                  . That’s when the magic begins, and you’ll gain access to a
                  world of curated cinematic experiences, exclusive features,
                  and a community that truly gets your passion for films. Get
                  ready to redefine the way you experience cinema and TV. The
                  countdown has begun! ⏳
                </Text>
              </Text>
            </Text>

            <CustomText
              text="Thank you for being a part of this journey. Your love for this medium is about to be rewarded in ways you’ve never imagined. 🍿"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: Theme.fontSizes.sm,
              }}
            />
            <CustomText
              text="Stay tuned—your free watch hours are almost here!"
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
                opacity: 0.7,
              }}
            />
          </View>
        </ContentWithIconCard>
      </View>
      <TermAndPrivacyText />
    </ScrollView>
  );
};

export default WelcomePatiView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
  },
});