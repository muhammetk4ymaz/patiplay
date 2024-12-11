import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../utils/theme';
import {EmailIcon} from '../../../../assets/icons';
import CustomTextInput from '../../../components/shared/Inputs/CustomTextInput';

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
      icon={<EmailIcon size={Theme.iconSize} fiil={Theme.colors.white} />}
      keyboardType="email-address"
    />
  );
};

export default EmailTextField;

const styles = StyleSheet.create({});
