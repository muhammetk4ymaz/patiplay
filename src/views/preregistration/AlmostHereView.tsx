import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../utils/theme';
import {AuthIcon, PopcornIcon} from '../../../assets/icons';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import {ImageManager} from '../../constants/ImageManager';
import ContentWithIconCard, {
  TermAndPrivacyText,
} from '../../components/shared/Cards/ContentWithIconCard';

const AlmostHereView = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ContentWithIconCard
          button={
            <View style={{backgroundColor: 'black'}}>
              <CustomTextButton
                text={'Start'}
                onPress={() => {
                  navigation.dispatch(StackActions.replace('CreateProfile'));
                }}
                textColor="white"
                backgroundColor="black"
                border={true}
                paddingHorizontal={36}
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
              gap: 16,
              alignSelf: 'center',
              paddingBottom: 24,
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            }}>
            <CustomText
              text="You're almost there...."
              style={styles.informationText}
            />
            <CustomText
              text="Creating a profile and selecting your subscription package are the only things left to unlock a world of premium entertainment! "
              style={styles.informationText}
            />
          </View>
        </ContentWithIconCard>
      </View>
      <TermAndPrivacyText />
    </ScrollView>
  );
};

export default AlmostHereView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
  },
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.7,
  },
});
