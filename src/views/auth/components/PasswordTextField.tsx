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
import {Theme} from '../../../constants/Theme';
import {PasswordIcon} from '../../../../assets/icons';
import IconEntypo from 'react-native-vector-icons/Entypo';

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
    <View
      style={[styles.inputStyle, error && {borderColor: Theme.colors.error}]}>
      <PasswordIcon size={Theme.iconSize} />
      <TextInput
        onChange={onChange}
        editable={editable}
        ref={ref}
        multiline={false}
        placeholder={placeholder}
        returnKeyType={returnKeyType ?? 'next'}
        placeholderTextColor={Theme.colors.lightgray}
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={!showPassword}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmitEditing={onSubmitEditing}
        cursorColor={Theme.colors.white}
        style={{color: Theme.colors.white, flex: 1}}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <IconEntypo
          name={showPassword ? 'eye' : 'eye-with-line'}
          size={Theme.iconSize}
          color={Theme.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PasswordTextField;

const styles = StyleSheet.create({
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ios: 10, android: 6}),
    borderRadius: 30,
    borderColor: Theme.colors.primary,
    gap: 12,
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
