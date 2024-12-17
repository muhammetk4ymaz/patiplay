import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import {ImageManager} from '../../constants/ImageManager';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';

type Props = {};

const PasswordChangeSuccesView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      <ContentWithIconCard
        button={
          <View style={{backgroundColor: 'black'}}>
            <CustomTextButton
              text={'Sign In'}
              backgroundColor="black"
              border={true}
              onPress={() => {
                navigation.dispatch(StackActions.replace('Auth'));
              }}
              paddingHorizontal={36}
            />
          </View>
        }
        icon={
          <Image
            source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
            style={{
              height: 80,
              width: 80,
            }}
          />
        }>
        <View
          style={{
            gap: 5,
            paddingBottom: 24,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: Theme.fontSizes.sm,
              fontFamily: 'HelveticaNeue-Medium',
              textAlign: 'center',
            }}>
            Your password has been
            <Text
              style={{
                color: Theme.colors.lightGreen,
                fontSize: Theme.fontSizes.sm,
                fontFamily: 'HelveticaNeue-Bold',
              }}>
              {' '}
              successfully{' '}
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: Theme.fontSizes.sm,
                  fontFamily: 'HelveticaNeue-Medium',
                }}>
                updated. Please use your new password to sign in.
              </Text>
            </Text>
          </Text>
        </View>
      </ContentWithIconCard>
    </SafeAreaView>
  );
};

export default PasswordChangeSuccesView;

const styles = StyleSheet.create({
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.7,
  },
});
