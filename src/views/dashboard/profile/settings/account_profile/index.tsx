import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../../utils/theme';
import CustomText from '../../../../../components/shared/CustomText';
import IconEntypo from 'react-native-vector-icons/Entypo';
import CustomTextInput from '../../../../../components/shared/Inputs/CustomTextInput';
import PhoneTextInput from '../../../../../components/shared/Inputs/PhoneTextInput';

const AccountProfileView = () => {
  return (
    <View style={styles.view}>
      <InfoText />
      <View style={{height: 6}}></View>
      <CustomTextInput
        label="Legal Name"
        placeholder="Legal Name"
        onChangeText={() => {}}
        inputStyle={{
          paddingHorizontal: 12,
          paddingVertical: 0,
          borderColor: '#4A4A4A',
        }}
        placeHolderTextColor="#4A4A4A"
      />
      <CustomTextInput
        label="Website Link"
        placeholder="Website Link"
        onChangeText={() => {}}
        inputStyle={{
          paddingHorizontal: 12,
          paddingVertical: 0,
          borderColor: '#4A4A4A',
        }}
        placeHolderTextColor="#4A4A4A"
      />
      <PhoneTextInput />
      <CustomTextInput
        label="Email Address"
        placeholder="Email Address"
        onChangeText={() => {}}
        inputStyle={{
          paddingHorizontal: 12,
          paddingVertical: 0,
          borderColor: '#4A4A4A',
        }}
        placeHolderTextColor="#4A4A4A"
      />
    </View>
  );
};

export default AccountProfileView;

const InfoText = () => {
  return (
    <View style={{flexDirection: 'row', gap: 12, alignItems: 'flex-start'}}>
      <IconEntypo
        name="info-with-circle"
        color={'white'}
        size={28}
        style={{
          marginTop: 8,
        }}
      />
      <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
        <CustomText
          text="To harness the power of our recommendation algorithm to the maximum extent, please take care to fill in blanks "
          style={{color: Theme.colors.white}}
        />
        <CustomText text="completely" style={{color: Theme.colors.primary}} />
        <CustomText text=" and" style={{color: Theme.colors.white}} />
        <CustomText
          text=" without errors"
          style={{color: Theme.colors.primary}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 12,
    gap: 12,
  },
});
