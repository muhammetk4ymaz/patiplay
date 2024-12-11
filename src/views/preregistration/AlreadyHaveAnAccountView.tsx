import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../utils/theme';
import {AuthIcon} from '../../../assets/icons';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';

type Props = {};

const AlreadyHaveAnAccountView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard icon={<AuthIcon size={100} />}>
        <View style={{gap: 5, alignSelf: 'center'}}>
          <CustomText
            text="Getting exciting for exploring Pati Play?"
            style={styles.informationText}
          />
          <CustomText text="So are we." style={styles.informationText} />
          <View style={{flexDirection: 'row'}}>
            <CustomText text="Wait until " style={styles.informationText} />
            <CustomText
              text="March 17."
              style={{
                fontSize: Theme.fontSizes.sm,
                color: 'red',
                fontWeight: 'bold',
              }}
            />
          </View>
          <CustomText text="Then..." style={styles.informationText} />
          <CustomText
            text="Pandora’s box will open."
            style={styles.informationText}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 32}}>
          <CustomTextButton
            text={'Close'}
            onPress={() => {
              navigation.goBack();
            }}
            textColor="black"
            paddingHorizontal={36}
            paddingVertical={8}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 12,
          }}
          onPress={() => {
            navigation.dispatch(StackActions.replace('DontHaveAnAccount'));
          }}>
          <CustomText
            text="Don't have an account?"
            style={{
              color: 'white',
              fontSize: 13,
            }}
          />
        </TouchableOpacity>
      </ContentWithIconCard>
    </ScrollView>
  );
};

export default AlreadyHaveAnAccountView;

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
  releaseText: {
    textAlign: 'center',
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.white,
  },
});
