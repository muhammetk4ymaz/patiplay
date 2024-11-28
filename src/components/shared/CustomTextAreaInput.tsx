import React, {PropsWithChildren, ReactNode} from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../constants/Theme';

type CustomTextAreaInputProps = PropsWithChildren<{
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
  numberOfLines?: number;
}>;

function CustomTextAreaInput(props: CustomTextAreaInputProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <View
      style={[
        styles.inputStyle,
        props.inputStyle,
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
                  {color: focus ? 'white' : 'gray'},
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
        multiline={true}
        textAlignVertical="top"
        numberOfLines={props.numberOfLines}
        placeholder={props.label && focus ? '' : props.placeholder}
        returnKeyType={props.returnKeyType ?? 'next'}
        placeholderTextColor={
          props.placeHolderTextColor || Theme.colors.lightgray
        }
        keyboardType={props.keyboardType}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmitEditing={props.onSubmitEditing}
        cursorColor={Theme.colors.white}
        style={{color: Theme.colors.white, flex: 1, height: 110}}
      />
    </View>
  );
}

export default CustomTextAreaInput;

const styles = StyleSheet.create({
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 6,
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
