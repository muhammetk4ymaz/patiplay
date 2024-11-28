import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../constants/Theme';
import {AuthIcon} from '../../../assets/icons';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/CustomTextButton';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import {ImageManager} from '../../constants/ImageManager';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';

const AlmostHereView = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard icon={<AuthIcon size={100} />}>
        <View style={{gap: 16, alignSelf: 'center'}}>
          <CustomText
            text="You're almost there...."
            style={styles.informationText}
          />
          <CustomText
            text="Creating a profile and selecting your subscription package are the only things left to unlock a world of premium entertainment! "
            style={styles.informationText}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 32}}>
          <CustomTextButton
            text={'Start'}
            onPress={() => {
              navigation.dispatch(StackActions.replace('CreateProfile'));
            }}
            textColor="black"
            paddingHorizontal={36}
            paddingVertical={8}
          />
        </View>
      </ContentWithIconCard>
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
    paddingVertical: 100,
  },
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.5,
  },
});
