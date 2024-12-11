import React, {PropsWithChildren, ReactNode} from 'react';
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

type PasswordTextFieldProps = PropsWithChildren<{
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  error?: boolean;
  onChangeText: (text: string) => void;
  value?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  ref?: any;
  editable?: boolean;
  label?: string;
  onChange?: (e: any) => void;
  onSubmitEditing?: () => void;
}>;

function PasswordTextField({
  keyboardType,
  error,
  editable,
  onChangeText,
  returnKeyType,
  onChange,
  ref,
  onSubmitEditing,
  placeholder,
  value,
}: PasswordTextFieldProps) {
  const [focus, setFocus] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View style={[styles.inputBox, error && {borderColor: Theme.colors.error}]}>
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
}

export default PasswordTextField;

const styles = StyleSheet.create({
  inputBox: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 30,
    borderColor: Theme.colors.primary,
    borderWidth: 2,
    flexDirection: 'row',
  },
  inputStyle: {
    paddingVertical: Platform.select({ios: 10, android: 6}),
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
