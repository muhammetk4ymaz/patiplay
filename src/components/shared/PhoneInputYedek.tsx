import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PhoneInput from 'react-native-phone-input';
import {Theme} from '../../constants/Theme';

const PhoneTextInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const phoneRef = React.useRef<PhoneInput>(null);
  const [phoneValidateCheck, setPhoneValidateCheck] = useState(true);
  const [initialValue, setInitialValue] = useState('+90');
  const [maxLength, setMaxLength] = useState<number | undefined>();
  const [countryCode, setCountryCode] = useState('90');

  useEffect(() => {
    if (phoneRef.current?.isValidNumber()) {
      if (phoneValidateCheck) {
        const maxLength = phoneRef.current?.getValue()?.length;
        console.log(maxLength);

        setMaxLength(maxLength);
        setPhoneValidateCheck(false);
      }
    }
  }, [phoneRef.current?.isValidNumber()]);

  useEffect(() => {}, [phoneRef.current?.isValidNumber()]);

  useEffect(() => {
    console.log('Country Code Değiştirildi');
    setMaxLength(undefined);
    setPhoneValidateCheck(true);
  }, [countryCode]);

  return (
    <Pressable
      onPress={() => {
        phoneRef.current?.focus();
        setIsFocused(true);
      }}>
      {isFocused ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            left: 20,
            top: -10,
            zIndex: 999,
            paddingHorizontal: 6,
          }}>
          <Text
            style={[styles.labelText, {color: isFocused ? 'white' : 'gray'}]}>
            Telefon Numarası
          </Text>
        </View>
      ) : null}
      <PhoneInput
        ref={phoneRef}
        autoFormat={true}
        initialValue={'+90'}
        initialCountry="tr"
        onChangePhoneNumber={(phoneNumber: string) => {
          setCountryCode(phoneRef.current?.getCountryCode());
          console.log(phoneRef.current?.isValidNumber());
        }}
        onPressFlag={() => {}}
        textProps={{
          cursorColor: 'white',
          placeholder: 'Telefon Numarası',
          maxLength: maxLength,
          onChange(e) {
            if (phoneRef.current?.isValidNumber()) {
              setMaxLength(e.nativeEvent.text.length + 1);
            }
          },
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: isFocused ? Theme.colors.primary : '#4A4A4A',
          paddingHorizontal: 18,
          borderRadius: 30,
          paddingVertical: 14,
        }}
        textStyle={{
          color: 'white',
          fontSize: Theme.fontSizes.sm,
          fontFamily: 'Quicksand-Bold',
        }}
      />
    </Pressable>
  );
};

export default PhoneTextInput;

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 10,
    top: -10,
    paddingHorizontal: 6,
  },
  labelText: {
    fontSize: Theme.fontSizes.xs,
    fontFamily: 'Quicksand-Bold',
  },
});
