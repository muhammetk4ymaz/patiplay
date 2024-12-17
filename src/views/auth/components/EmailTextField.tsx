import {ReturnKeyTypeOptions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../utils/theme';
import {EmailIcon} from '../../../../assets/icons';
import CustomTextInput from '../../../components/shared/Inputs/CustomTextInput';

type Props = {
  onChangeText: (text: string) => void;
  value?: string;
  error?: boolean;
  onChange?: (text: string) => void;
  ref?: any;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
};

const EmailTextField = (props: Props) => {
  return (
    <CustomTextInput
      ref={props.ref}
      onChangeText={props.onChangeText}
      returnKeyType={props.returnKeyType || 'next'}
      error={props.error}
      onChange={props.onChange}
      value={props.value}
      placeholder={'Email'}
      icon={<EmailIcon size={Theme.iconSize} fiil={Theme.colors.white} />}
      keyboardType="email-address"
      onSubmitEditing={props.onSubmitEditing}
    />
  );
};

export default EmailTextField;

const styles = StyleSheet.create({});
