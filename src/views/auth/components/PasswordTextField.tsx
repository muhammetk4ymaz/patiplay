import React, {forwardRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Theme} from '../../../utils/theme';
import {PasswordIcon} from '../../../../assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PasswordTextFieldProps = {
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  error?: boolean;
  onChangeText: (text: string) => void;
  value?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  editable?: boolean;
  label?: string;
  onChange?: (e: any) => void;
  onSubmitEditing?: () => void;
};

const PasswordTextField = forwardRef<TextInput, PasswordTextFieldProps>(
  (
    {
      keyboardType,
      error,
      editable,
      onChangeText,
      returnKeyType,
      onChange,
      onSubmitEditing,
      placeholder,
      value,
    }: PasswordTextFieldProps,
    ref,
  ) => {
    const [focus, setFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View
        style={[
          styles.inputBox,
          focus && {borderColor: Theme.colors.primary},
          error && {borderColor: Theme.colors.error},
        ]}>
        <PasswordIcon size={Theme.iconSize} />
        <TextInput
          onChange={onChange}
          editable={editable}
          ref={ref}
          multiline={false}
          placeholder={placeholder}
          returnKeyType={returnKeyType ?? 'next'}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          keyboardType={keyboardType}
          value={value}
          secureTextEntry={!showPassword}
          onChangeText={onChangeText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          blurOnSubmit={false}
          onSubmitEditing={onSubmitEditing}
          cursorColor={Theme.colors.white}
          style={[styles.inputStyle, {color: Theme.colors.white, flex: 1}]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={Theme.iconSize}
            color={'#b1b1b1'}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

export default PasswordTextField;

const styles = StyleSheet.create({
  inputBox: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 30,
    borderColor: 'rgb(75, 85, 99)',
    borderWidth: 2,
    flexDirection: 'row',
  },
  inputStyle: {
    paddingVertical: Platform.select({ios: 10, android: 6}),
    flex: 1, // Ensures input takes available width
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSizes.sm,
  },
});
