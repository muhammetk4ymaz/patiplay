import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import {Theme} from '../../../constants/Theme';
import {UserIcon} from '../../../../assets/icons';

type Props = {
  onChangeText: (text: string) => void;
  value?: string;
  error?: boolean;
  onChange?: (text: string) => void;
};

const EmailTextField = (props: Props) => {
  return (
    <CustomTextInput
      onChangeText={props.onChangeText}
      error={props.error}
      onChange={props.onChange}
      value={props.value}
      placeholder={'E-mail address'}
      icon={<UserIcon size={Theme.iconSize} fiil={Theme.colors.white} />}
      keyboardType="email-address"
    />
  );
};

export default EmailTextField;

const styles = StyleSheet.create({});
