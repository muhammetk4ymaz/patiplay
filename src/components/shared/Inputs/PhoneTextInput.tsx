import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-input';
import OutsidePressHandler from 'react-native-outside-press';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';

const PhoneTextInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const phoneRef = React.useRef<PhoneInput>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [pickerData, setPickerData] = useState<any>();

  const onPressFlag = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  };

  const onChangeCountry = (country: any) => {
    phoneRef.current?.selectCountry(country.iso2);
    bottomSheetModalRef.current?.dismiss();
    phoneRef.current?.focus();
  };

  useEffect(() => {
    if (phoneRef.current) {
      const data = phoneRef.current.getPickerData();
      setPickerData(data);
    }
  }, [phoneRef.current]);

  return (
    <Pressable
      onPress={() => {
        phoneRef.current?.focus();
        setIsFocused(true);
      }}>
      {isFocused ? (
        <View style={styles.label}>
          <Text
            style={[styles.labelText, {color: isFocused ? 'white' : 'gray'}]}>
            Telefon Numarası
          </Text>
        </View>
      ) : null}
      <PhoneInput
        ref={phoneRef}
        autoFormat={true}
        flagStyle={{
          padding: 12,
          width: 30,
        }}
        initialCountry="us"
        onChangePhoneNumber={(phoneNumber: string) => {
          console.log(phoneNumber);
        }}
        onPressFlag={onPressFlag}
        textProps={{
          cursorColor: 'white',
          placeholder: 'Telefon Numarası',
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
        style={[
          styles.input,
          {borderColor: isFocused ? Theme.colors.primary : '#4A4A4A'},
        ]}
        textStyle={styles.inputText}
      />
      <CountryPickerModal
        selectedCountry={phoneRef.current?.getISOCode()}
        onChange={onChangeCountry}
        bottomSheetModalRef={bottomSheetModalRef}
        data={pickerData}
      />
    </Pressable>
  );
};

export default PhoneTextInput;

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 20,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 6,
  },
  labelText: {
    fontSize: Theme.fontSizes.xs,
    fontFamily: 'Quicksand-Bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,

    paddingHorizontal: 18,
    borderRadius: 30,
    paddingVertical: 14,
  },
  inputText: {
    color: 'white',
    fontSize: Theme.fontSizes.sm,
    fontFamily: 'Quicksand-Bold',
  },
});

type CountryPickerModalProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  data: any;
  onChange: (country: any) => void;
  selectedCountry: any;
};

const CountryPickerModal = React.memo((props: CountryPickerModalProps) => {
  console.log('FilterModal rendered');
  console.log(props.selectedCountry);

  const bottomSheetModalRef = props.bottomSheetModalRef;

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handlePresentModalPress = () => {};

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  React.useEffect(() => {
    handlePresentModalPress();
  }, []);

  return (
    <OutsidePressHandler
      onOutsidePress={() => {
        bottomSheetModalRef.current?.dismiss();
      }}>
      <BottomSheetModal
        backgroundStyle={{backgroundColor: Theme.colors.background}}
        handleIndicatorStyle={{backgroundColor: Theme.colors.white}}
        ref={bottomSheetModalRef}
        onDismiss={() => {}}
        index={0}
        snapPoints={snapPoints}
        enableDismissOnClose={true}
        onChange={handleSheetChanges}>
        <BottomSheetFlatList
          data={props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <FlagItem item={item.item} onChange={props.onChange}></FlagItem>
          )}></BottomSheetFlatList>
      </BottomSheetModal>
    </OutsidePressHandler>
  );
});

type FlagItemProps = {
  onChange: (country: any) => void;
  item: any;
};

const FlagItem = React.memo((props: FlagItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onChange(props.item);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
      }}>
      <Image
        source={props.item.image}
        style={{
          width: 50,
          height: 30,
        }}
      />
      <View style={{flex: 1}}>
        <CustomText
          text={props.item.label}
          style={{
            color: Theme.colors.white,
            textAlign: 'center',
          }}
        />
      </View>
      <CustomText
        text={props.item.dialCode}
        style={{
          color: Theme.colors.white,
        }}
      />
    </TouchableOpacity>
  );
});
