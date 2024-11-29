import React, {PropsWithChildren, ReactNode} from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../constants/Theme';

type CustomTextInputProps = PropsWithChildren<{
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  onChangeText: (text: string) => void;
  value?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  ref?: any;
  editable?: boolean;
  label?: string;
  onChange?: (e: any) => void;
  onSubmitEditing?: () => void;
  icon?: ReactNode;
  inputStyle?: StyleProp<ViewStyle>;
  placeHolderTextColor?: string;
}>;

function CustomTextInput({
  placeholder,
  keyboardType,
  error,
  editable,
  onChangeText,
  returnKeyType,
  onChange,
  ref,
  onSubmitEditing,
  icon,
  label,
  value,
  inputStyle,
  placeHolderTextColor,
}: CustomTextInputProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <View
      style={[
        styles.inputStyle,
        inputStyle,
        focus && {borderColor: Theme.colors.primary},
        error && {borderColor: Theme.colors.error},
      ]}>
      {focus || value
        ? label && (
            <View
              style={[
                {
                  height: 20,
                },
                styles.label,
              ]}>
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'black',
                  height: '100%',
                  left: 0,

                  right: 0,
                }}></View>
              <Text
                style={[
                  styles.labelText,
                  {color: focus || value ? 'white' : 'gray'},
                  error && {color: Theme.colors.error},
                ]}>
                {label}
              </Text>
            </View>
          )
        : null}
      {icon}
      <TextInput
        onChange={onChange}
        editable={editable}
        ref={ref}
        multiline={false}
        placeholder={label && focus ? '' : placeholder}
        returnKeyType={returnKeyType ?? 'next'}
        placeholderTextColor={
          placeHolderTextColor || 'rgba(255, 255, 255, 0.6)'
        }
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={false}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmitEditing={onSubmitEditing}
        cursorColor={Theme.colors.white}
        style={{color: Theme.colors.white, flex: 1}}
      />
    </View>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ios: 10, android: 2}),
    borderRadius: 30,
    borderColor: Theme.colors.primary,
    gap: 12,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 20,
    top: -10,
    paddingHorizontal: 6,
  },
  labelText: {
    fontSize: Theme.fontSizes.xs,
    fontFamily: 'Quicksand-Bold',
  },
});
