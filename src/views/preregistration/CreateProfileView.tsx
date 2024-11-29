import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DateTimeInputIos from '../../components/shared/ForIos/DateTimeInput';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

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
  // const [usernameError, setUsernameError] = React.useState(
  //   "Oops, that's not unique!. Please try another one.",
  // );
  const [usernameError, setUsernameError] = React.useState('');
  const [date, setDate] = React.useState(new Date(Date.now()));

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
      </View>

      <View style={{flexDirection: 'row', gap: 8}}>
        <View style={{flex: 1}}>
          {Platform.select({
            ios: (
              <DateTimeInputIos value={date} onChange={date => setDate(date)} />
            ),
            android: (
              <TouchableOpacity
                onPress={() => {
                  DateTimePickerAndroid.open({
                    value: date,
                    onChange(event, selectedDate) {
                      setDate(selectedDate || date);
                    },
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 2,
                  paddingHorizontal: 16,
                  paddingVertical: Platform.select({ios: 6, android: 9}),
                  borderRadius: 30,
                  borderColor: Theme.colors.primary,
                  gap: 12,
                }}>
                <IconMaterialIcons name="date-range" size={32} color="white" />
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
          <DropdownComponent />
        </View>
      </View>
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
  );
};

const data = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
  {label: "I'dont want to specify.", value: '3'},
  {label: 'Non-Binary', value: '4'},
  {label: 'Other', value: '5'},
];

const DropdownComponent = () => {
  const [value, setValue] = React.useState<string>('Male');
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <Dropdown
      style={stylesDropdown.dropdown}
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
      onChange={item => {}}
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
    paddingVertical: Platform.select({ios: 12, android: 15}),
    borderColor: Theme.colors.primary,
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
