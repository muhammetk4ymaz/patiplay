import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../utils/theme';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import ContentWithIconCard, {
  TermAndPrivacyText,
} from '../../components/shared/Cards/ContentWithIconCard';
import {ImageManager} from '../../constants/ImageManager';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

const AlreadyHaveAnAccountView = (props: Props) => {
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
              text={'Close'}
              backgroundColor="black"
              border={true}
              onPress={() => {
                navigation.goBack();
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
        <View style={{gap: 5, paddingBottom: 24, alignSelf: 'center'}}>
          <CustomText
            text="Getting exciting for exploring Pati Play?"
            style={styles.informationText}
          />
          <CustomText text="So are we." style={styles.informationText} />
          <View style={{flexDirection: 'row'}}>
            <CustomText text="Wait until " style={styles.informationText} />
            <CustomText
              text="March 28"
              style={{
                fontSize: Theme.fontSizes.sm,
                color: Theme.colors.lightGreen,
                fontWeight: 'bold',
              }}
            />
            <CustomText text="." style={styles.informationText} />
          </View>
          <CustomText text="Then..." style={styles.informationText} />
          <CustomText
            text="Pandora’s box will open."
            style={styles.informationText}
          />
        </View>
      </ContentWithIconCard>
      {/* <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 12,
          marginTop: 32,
        }}
        onPress={() => {
          navigation.dispatch(StackActions.replace('DontHaveAnAccount'));
        }}>
        <CustomText
          text="Don't have an account?"
          style={{
            color: 'white',
            fontSize: 13,
            opacity: 0.7,
          }}
        />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default AlreadyHaveAnAccountView;

const styles = StyleSheet.create({
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.7,
  },
  releaseText: {
    textAlign: 'center',
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.white,
  },
});
