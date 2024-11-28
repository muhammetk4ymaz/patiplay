import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../constants/Theme';
import {AuthIcon, UserIcon} from '../../../assets/icons';
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
import CustomTextInput from '../../components/shared/CustomTextInput';
import InputErrorText from '../../components/shared/InputErrorText';

const CreateProfileView = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard icon={<AuthIcon size={100} />}>
        <CreateProfileForm />
      </ContentWithIconCard>
    </ScrollView>
  );
};

export default CreateProfileView;

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

const CreateProfileForm = () => {
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(
    "Oops, that's not unique!. Please try another one.",
  );

  return (
    <View style={{gap: 12}}>
      <View style={{gap: 5}}>
        <CustomTextInput
          onChangeText={setUsername}
          placeholder={'Username'}
          error={usernameError ? true : false}
          icon={<UserIcon size={Theme.iconSize} fiil={Theme.colors.white} />}
        />
        {usernameError && <InputErrorText errorMessage={usernameError} />}
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <CustomTextButton
            text={'Continue'}
            onPress={() => {}}
            textColor="black"
            paddingHorizontal={36}
            paddingVertical={8}
          />
        </View>
      </View>
    </View>
  );
};
