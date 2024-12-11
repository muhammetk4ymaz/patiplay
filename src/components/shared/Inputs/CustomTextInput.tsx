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
import {Theme} from '../../../utils/theme';

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
  maxLength?: number;
}>;

function CustomTextInput(props: CustomTextInputProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <View
      style={[
        styles.inputBox,
        focus && {borderColor: Theme.colors.primary},
        props.error && {borderColor: Theme.colors.error},
      ]}>
      {focus || props.value
        ? props.label && (
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
                  {color: focus || props.value ? 'white' : 'gray'},
                  props.error && {color: Theme.colors.error},
                ]}>
                {props.label}
              </Text>
            </View>
          )
        : null}
      {props.icon}
      <TextInput
        onChange={props.onChange}
        editable={props.editable}
        ref={props.ref}
        multiline={false}
        placeholder={props.label && focus ? '' : props.placeholder}
        returnKeyType={props.returnKeyType ?? 'next'}
        placeholderTextColor={
          props.placeHolderTextColor || 'rgba(255, 255, 255, 0.6)'
        }
        keyboardType={props.keyboardType}
        value={props.value}
        secureTextEntry={false}
        onChangeText={props.onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
}

export default CustomTextInput;

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
