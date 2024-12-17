import React, {forwardRef, ReactNode, useState} from 'react';
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
import {Theme} from '../../../utils/theme';

type CustomTextInputProps = {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  onChangeText: (text: string) => void;
  value?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  editable?: boolean;
  label?: string;
  onChange?: (e: any) => void;
  onSubmitEditing?: () => void;
  icon?: ReactNode;
  inputStyle?: StyleProp<ViewStyle>;
  placeHolderTextColor?: string;
  maxLength?: number;
};

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (props, ref) => {
    const [focus, setFocus] = useState(false);

    return (
      <View
        style={[
          styles.inputBox,
          focus && {borderColor: Theme.colors.primary},
          props.error && {borderColor: Theme.colors.error},
        ]}>
        {props.label && (focus || props.value) && (
          <View style={[styles.label]}>
            <Text
              style={[
                styles.labelText,
                {color: focus || props.value ? 'white' : 'gray'},
                props.error && {color: Theme.colors.error},
              ]}>
              {props.label}
            </Text>
          </View>
        )}
        {props.icon && <View>{props.icon}</View>}
        <TextInput
          onChange={props.onChange}
          editable={props.editable}
          ref={ref}
          multiline={false}
          placeholder={props.label && focus ? '' : props.placeholder}
          returnKeyType={props.returnKeyType ?? 'next'}
          placeholderTextColor={
            props.placeHolderTextColor || 'rgba(255, 255, 255, 0.6)'
          }
          keyboardType={props.keyboardType}
          value={props.value}
          secureTextEntry={false} // Eğer şifre alanı değilse, secureTextEntry'yi kaldırabiliriz.
          onChangeText={props.onChangeText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          blurOnSubmit={false}
          onSubmitEditing={props.onSubmitEditing}
          cursorColor={Theme.colors.white}
          style={[
            styles.inputStyle,
            props.inputStyle,
            {color: Theme.colors.white, flex: 1},
          ]}
          maxLength={props.maxLength}
        />
      </View>
    );
  },
);

export default CustomTextInput;

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
