import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CalendarIcon, EmailIcon} from '../../../assets/icons';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard, {
  TermAndPrivacyText,
} from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import {ImageManager} from '../../constants/ImageManager';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';

import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import CustomTextInput from '../../components/shared/Inputs/CustomTextInput';
import DateTimeInputIos from '../../components/shared/ios/DateTimeInput';
import InputErrorText from '../../components/shared/Texts/InputErrorText';
import networkService from '../../helpers/networkService';

const CreateProfileView = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [dateError, setDateError] = React.useState('');
  const [genderError, setGenderError] = React.useState('');

  const [date, setDate] = React.useState(
    new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
  );

  let gender = '';

  const controlUsernameValid = async (value: string) => {
    const apiUrl = 'title/api/check-username/';
    const data = {username: value};
    const response = await networkService.post(apiUrl, data);
    console.log(response.data);
    return await response.data;
  };

  const handleContinue = async () => {
    if (!username || username.length < 3) {
      setUsernameError(
        'The username you entered cannot be less than 3 characters.',
      );
      return;
    } else if (username.length > 20) {
      setUsernameError(
        'The username you entered cannot be more than 20 characters.',
      );
      return;
    } else if (!/^[a-zA-Z0-9_\-.]+$/.test(username)) {
      setUsernameError(
        'The username you entered cannot contain spaces or special characters.',
      );
      return;
    }
    const response = await controlUsernameValid(username.toLowerCase());
    if (response.exists == true) {
      setUsernameError("Oops, that's not unique!. Please try another one.");
      return;
    } else {
      setUsernameError('');
    }
    if (!date) {
      setDateError('Please enter a valid date of birth.');
      return;
    }
    if (gender === '') {
      setGenderError('Please select your gender.');
      return;
    } else {
      setGenderError('');
    }

    console.log(username, date, gender);

    navigation.navigate('Packages');
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        style={{flex: 1, justifyContent: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ContentWithIconCard
          button={
            <View style={{backgroundColor: 'black'}}>
              <CustomTextButton
                text={'Continue'}
                onPress={handleContinue}
                textColor="white"
                paddingHorizontal={36}
                backgroundColor="black"
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
          <View style={{gap: 24, paddingBottom: 24}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText
                text="Profile"
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  flex: 1,
                }}
              />
              <View style={{position: 'absolute', right: 0}}>
                <CustomText
                  text="1/3"
                  style={{
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                    opacity: 0.7,
                  }}
                />
              </View>
            </View>
            <View style={{gap: 12}}>
              <View style={{gap: 5}}>
                <CustomTextInput
                  onChangeText={text => {
                    setUsername(text.toLowerCase());
                  }}
                  value={username}
                  placeholder={'Username'}
                  // error={usernameError ? true : false}
                  icon={
                    <EmailIcon
                      size={Theme.iconSize}
                      fiil={Theme.colors.white}
                    />
                  }
                />
                {usernameError && (
                  <InputErrorText errorMessage={usernameError} />
                )}
              </View>

              <View style={{flexDirection: 'row', gap: 8}}>
                <View style={{flex: 1}}>
                  {Platform.select({
                    ios: (
                      <DateTimeInputIos
                        value={date}
                        onChange={date => setDate(date)}
                      />
                    ),
                    android: (
                      <TouchableOpacity
                        onPress={() => {
                          DateTimePickerAndroid.open({
                            value: date,
                            onChange(event, selectedDate) {
                              setDate(selectedDate || date);
                            },
                            maximumDate: new Date(
                              Date.now() - 13 * 365 * 24 * 60 * 60 * 1000,
                            ),
                          });
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 2,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 30,
                          borderColor: 'rgb(75, 85, 99)',
                          gap: 16,
                        }}>
                        <CalendarIcon size={24} />
                        <CustomText
                          text={`${date.getFullYear()}/${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${date
                            .getDate()
                            .toString()
                            .padStart(2, '0')}`}
                          style={{color: Theme.colors.white}}
                        />
                      </TouchableOpacity>
                    ),
                  })}
                </View>
                <View style={{flex: 1}}>
                  <DropdownComponent
                    onChanged={item => {
                      gender = item.label;
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {genderError && <InputErrorText errorMessage={genderError} />}
              </View>
            </View>
          </View>
        </ContentWithIconCard>
      </KeyboardAvoidingView>
      <TermAndPrivacyText />
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
  },
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.5,
  },
});

const data = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
  {label: "I'dont want to specify.", value: '3'},
  {label: 'Non-Binary', value: '4'},
  {label: 'Other', value: '5'},
];

type DropdownComponentProps = {
  onChanged: (item: {label: string; value: string}) => void;
};

const DropdownComponent = (props: DropdownComponentProps) => {
  const [value, setValue] = React.useState<any>();
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <Dropdown
      style={[
        stylesDropdown.dropdown,
        {borderColor: isFocus ? Theme.colors.primary : 'rgb(75, 85, 99)'},
      ]}
      placeholderStyle={stylesDropdown.placeholderStyle}
      selectedTextProps={{
        numberOfLines: 1,
      }}
      selectedTextStyle={stylesDropdown.selectedTextStyle}
      iconStyle={stylesDropdown.iconStyle}
      data={data}
      maxHeight={300}
      autoScroll
      renderItem={(item, selected) => {
        return (
          <View
            style={{
              padding: Platform.select({ios: 12, android: 12}),
              backgroundColor: selected ? Theme.colors.primary : '#1a202c',
            }}>
            <CustomText
              text={item.label}
              style={{color: Theme.colors.white, opacity: selected ? 1 : 0.5}}
            />
          </View>
        );
      }}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Select gender' : '...'}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => props.onChanged(item)}
      containerStyle={{
        borderWidth: 0,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#1a202c',
        overflow: 'hidden',
      }}
    />
  );
};

const stylesDropdown = StyleSheet.create({
  dropdown: {
    paddingVertical: Platform.select({ios: 10, android: 10}),
    borderWidth: 2,
    borderRadius: 36,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: Theme.fontSizes.sm,
    fontFamily: 'HelveticaNeue-Medium',
    color: Theme.colors.white,
    opacity: 0.5,
  },
  selectedTextStyle: {
    fontSize: Theme.fontSizes.sm,
    fontFamily: 'HelveticaNeue-Medium',
    color: Theme.colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
